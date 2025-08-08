// Copyright (c) 2015-2016, NetEase Inc. All rights reserved.
//
// Author: litianyi <litianyi@corp.netease.com>
// Date: 2015/10/20
//
// NIM SDK内部使用的helper

#ifndef SRC_CPP_INVOKER_COMMON_HELPER_H_
#define SRC_CPP_INVOKER_COMMON_HELPER_H_

// #include <sys/timeb.h>
#include <list>
#include <string>
#include "extension/file_util/path_util.h"
#include "extension/file_util/utf8_file_util.h"
#include "node_public_defines.h"

namespace node_nim {

std::string GetUserAppDataPath(const std::string& app_account);

class PathChecker {
public:
    enum Result {
        Format_Error = 1,
        Absolute_Path = 2,
        Relative_Path = 3,
    };

    PathChecker(const std::string& path);
    ~PathChecker() = default;
    Result Check();
    std::string GetPath();

private:
    bool CheckFormat();
    bool CheckDrive(const std::string& data, bool& has_drive);
    std::list<std::string> SplitPathItem(const std::string& input, const char* delimitor);

    std::string src_path_;
    std::list<std::string> tokened_;
    static const std::string kCurrentDirectoryDescriptor;
    static const std::string kParentDirectoryDescriptor;
    static const char kDriveLettar;
    static const std::string kPathDelimiter;
    static const std::string kPathDelimiter_WIN;
    static const char kSpaceLettar;
    static const char kCurrentDirectoryDescriptorLettar;
};

bool parseAppdataPaths(const std::string& userAppData, base::FilePath& fullPath, std::string& parsedPath, std::string& parsedFolder);

}  // namespace node_nim

#endif  // SRC_CPP_INVOKER_COMMON_HELPER_H_
