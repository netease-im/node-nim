// Copyright (c) 2015-2016, NetEase Inc. All rights reserved.
//
// Author: litianyi <litianyi@corp.netease.com>
// Date: 2015/10/20
//
// NIM SDK内部使用的helper

#include "common_helper.h"
#include "base/files/file_path.h"
#include "extension/file_util/path_util.h"
#include "extension/strings/string_util.h"

namespace node_nim {

const std::string PathChecker::kCurrentDirectoryDescriptor = ".";
const std::string PathChecker::kParentDirectoryDescriptor = "..";
const char PathChecker::kDriveLettar = ':';
const std::string PathChecker::kPathDelimiter = "/";
const std::string PathChecker::kPathDelimiter_WIN = "\\";
const char PathChecker::kCurrentDirectoryDescriptorLettar = '.';
const char PathChecker::kSpaceLettar = ' ';

PathChecker::PathChecker(const std::string& path)
    : src_path_(path) {}

PathChecker::Result PathChecker::Check() {
    if (!CheckFormat())
        return Format_Error;
#if !defined(OS_WIN)
    auto file_path = base::FilePath(src_path_);
    return file_path.IsAbsolute() ? Absolute_Path : Relative_Path;
#else
    auto it = tokened_.begin();
    bool has_drive;
    if (!CheckDrive(*it++, has_drive))
        return Format_Error;
    while (it != tokened_.end()) {
        if ((it->compare(kParentDirectoryDescriptor) == 0 && it == tokened_.begin()) ||
            (it != tokened_.begin() && it->find(kDriveLettar) != std::string::npos)) {
            return Format_Error;
        } else if (it->compare(kCurrentDirectoryDescriptor) == 0) {
            it = tokened_.erase(it);
        } else if (it->compare(kParentDirectoryDescriptor) == 0) {
            it = tokened_.erase(it);
            it--;
            it = tokened_.erase(it);
        } else {
            it++;
        }
    }
    if (has_drive) {
        bool has_drive_check;
        if (!CheckDrive(*tokened_.begin(), has_drive_check))
            return Format_Error;
        return has_drive_check ? Absolute_Path : Format_Error;
    }
    return Relative_Path;
#endif
}

std::string PathChecker::GetPath() {
#if !defined(OS_WIN)
    return src_path_;
#else
    std::string ret;
    auto it = tokened_.begin();
    while (it != tokened_.end()) {
        ret.append(*it).append(kPathDelimiter);
        it++;
    }
    return ret;
#endif
}

bool PathChecker::CheckFormat() {
    // 不可以含有不支持的字符
    static const std::string kFobidenLettars = "*?\"<>|";
    auto itFobidenLettars = kFobidenLettars.begin();
    while (itFobidenLettars != kFobidenLettars.end()) {
        if (src_path_.find(*itFobidenLettars) != std::string::npos)
            return false;
        itFobidenLettars++;
    }
    // C:\A\B\C\..\..\..\..\D:\A\B\C这种格式同样不支持
    if (src_path_.find(kDriveLettar) != std::string::npos && src_path_.find_first_of(kDriveLettar) != src_path_.find_last_of(kDriveLettar))
        return false;
#if !defined(OS_WIN)
    if (src_path_.length() == 0)
        return false;
#else
    nbase::StringReplaceAll(kPathDelimiter_WIN, kPathDelimiter, src_path_);
    tokened_ = SplitPathItem(src_path_.c_str(), kPathDelimiter.c_str());
    // 过滤掉最后一个右侧" "与"."
    {
        auto rit = tokened_.rbegin();
        auto temp = *rit;
        while (!temp.empty()) {
            if (temp[temp.length() - 1] == kSpaceLettar || temp[temp.length() - 1] == kCurrentDirectoryDescriptorLettar)
                temp.resize(temp.length() - 1);
            else
                break;
        }
        if (temp.empty())
            return false;
        if (rit->compare(temp) != 0)
            rit->assign(temp.begin(), temp.end());
    }
    // 判断中间路径是否有不合规则的"."或者".."或者""或者"    "或者(.... / .. .. / .  .   .///        )  并移除掉所有的"."
    auto it = tokened_.begin();
    while (it != tokened_.end()) {
        auto temp = *it;
        if (temp.compare(kCurrentDirectoryDescriptor) == 0)  // 合格的
        {
            it = tokened_.erase(it);
        } else if (temp.compare(kParentDirectoryDescriptor) == 0)  // 合格的
        {
            it++;
        } else {
            nbase::StringReplaceAll(" ", "", temp);
            nbase::StringReplaceAll(".", "", temp);
            if (temp.empty())  //(....、 .. ..、 .  .   .、       、这种型的）
                return false;
            temp = *it;
            if (*temp.rbegin() == kSpaceLettar)  // 不可以是空格结尾
                return false;
            if (temp.length() > 2) {
                if (temp[temp.length() - 1] == kCurrentDirectoryDescriptorLettar &&
                    (temp[temp.length() - 2] == kCurrentDirectoryDescriptorLettar ||
                        temp[temp.length() - 2] == kSpaceLettar))  // 末尾带一个点，合格，多于一个，不合格
                    return false;
                else if (temp[temp.length() - 1] == kCurrentDirectoryDescriptorLettar) {
                    temp.resize(temp.length() - 1);
                    it->assign(temp.begin(), temp.end());
                }
            }
            it++;
        }
    }
    if (tokened_.empty())
        return false;
    if (tokened_.begin()->compare(kParentDirectoryDescriptor) == 0)  //  ..\ABC\DEF 开头以..的不支持 但..ABC..\DEF是支持的
        return false;
#endif

    return true;
}

bool PathChecker::CheckDrive(const std::string& data, bool& has_drive) {
    has_drive = false;
    auto drive_pos = data.find(kDriveLettar);
    if (drive_pos == std::string::npos) {
        has_drive = false;
        return true;
    }
    std::string temp(data);
    if (temp.length() > 2)
        return false;
    auto drive = *data.begin();
    static const std::string kDriveList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (kDriveList.find(drive) != std::string::npos) {
        has_drive = true;
        return true;
    }
    return false;
}

std::list<std::string> PathChecker::SplitPathItem(const std::string& input, const char* delimitor) {
    std::list<std::string> output;
    std::string temp(input);
    if (*temp.rbegin() == *delimitor)
        temp.resize(temp.length() - 1);
    size_t pos{std::string::npos};
    do {
        pos = temp.find_first_of(delimitor);
        if (pos != std::string::npos) {
            output.emplace_back(temp.substr(0, pos));
            temp = temp.substr(pos + 1);
        } else {
            output.emplace_back(temp);
        }
    } while (pos != std::string::npos);
    return output;
}

bool parseAppdataPaths(const std::string& userAppData, base::FilePath& fullPath, std::string& parsedPath, std::string& parsedFolder) {
    std::string app_data_path = userAppData.empty() ? DEFAULT_APP_DATA_DIR : userAppData;
    node_nim::PathChecker path_checker(app_data_path);
    auto check_result = path_checker.Check();
    if (check_result == node_nim::PathChecker::Format_Error) {
        return false;
        // return V2NIMError{V2NIM_ERROR_CODE_INVALID_PARAMETER, {"appDataPath", appDataPath}};
    }
    base::FilePath local_app_data_path_obj;
    base::FilePath app_data_path_obj;
    if (check_result == node_nim::PathChecker::Absolute_Path) {
        std::list<UTF8String> path_components;
        bool result = nbase::ParsePathComponents(path_checker.GetPath().c_str(), path_components);
        if (!result)
            return false;
        std::size_t index = 0;
        for (const auto& path_component : path_components) {
            if (index < path_components.size() - 1) {
                parsedPath.append(path_component);
            }
            index++;
        }
        parsedFolder = base::FilePath::FromUTF8Unsafe(path_checker.GetPath()).BaseName().AsUTF8Unsafe();
    } else {
        parsedPath = base::FilePath::FromUTF8Unsafe(base::extension::GetSysLocalAppDataDir()).AsUTF8Unsafe();
        parsedFolder = app_data_path;
    }
    base::extension::SetLocalAppDataDir(parsedPath);
    base::extension::SetCustomAppDataDirName(parsedFolder);
    fullPath = base::FilePath::FromUTF8Unsafe(parsedPath).Append(base::FilePath::FromUTF8Unsafe(parsedFolder));
    return true;
}

}  // namespace node_nim
