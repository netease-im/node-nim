#include <array>
#include <string>
#include "ts_cpp_conversion.h"
thread_local std::map<std::string, FunctionDesc> ts_cpp_conversion_functions;
namespace file_helper {
enum utf8_states_t { S_STRT = 0, S_RJCT = 8 };
void appendUTF8(std::string& str, uint32_t unicode) {
    if (unicode <= 0x7f) {
        str.push_back(static_cast<char>(unicode));
    } else if (unicode >= 0x80 && unicode <= 0x7ff) {
        str.push_back(static_cast<char>((unicode >> 6) + 192));
        str.push_back(static_cast<char>((unicode & 0x3f) + 128));
    } else if ((unicode >= 0x800 && unicode <= 0xd7ff) || (unicode >= 0xe000 && unicode <= 0xffff)) {
        str.push_back(static_cast<char>((unicode >> 12) + 224));
        str.push_back(static_cast<char>(((unicode & 0xfff) >> 6) + 128));
        str.push_back(static_cast<char>((unicode & 0x3f) + 128));
    } else if (unicode >= 0x10000 && unicode <= 0x10ffff) {
        str.push_back(static_cast<char>((unicode >> 18) + 240));
        str.push_back(static_cast<char>(((unicode & 0x3ffff) >> 12) + 128));
        str.push_back(static_cast<char>(((unicode & 0xfff) >> 6) + 128));
        str.push_back(static_cast<char>((unicode & 0x3f) + 128));
    } else {
        appendUTF8(str, 0xfffd);
    }
}
unsigned consumeUtf8Fragment(const unsigned state, const uint8_t fragment, uint32_t& codepoint) {
    static const uint32_t utf8_state_info[] = {
        0x11111111u,
        0x11111111u,
        0x77777777u,
        0x77777777u,
        0x88888888u,
        0x88888888u,
        0x88888888u,
        0x88888888u,
        0x22222299u,
        0x22222222u,
        0x22222222u,
        0x22222222u,
        0x3333333au,
        0x33433333u,
        0x9995666bu,
        0x99999999u,
        0x88888880u,
        0x22818108u,
        0x88888881u,
        0x88888882u,
        0x88888884u,
        0x88888887u,
        0x88888886u,
        0x82218108u,
        0x82281108u,
        0x88888888u,
        0x88888883u,
        0x88888885u,
        0u,
        0u,
        0u,
        0u,
    };
    uint8_t category = fragment < 128 ? 0 : (utf8_state_info[(fragment >> 3) & 0xf] >> ((fragment & 7) << 2)) & 0xf;
    codepoint = (state ? (codepoint << 6) | (fragment & 0x3fu) : (0xffu >> category) & fragment);
    return state == S_RJCT ? static_cast<unsigned>(S_RJCT) : static_cast<unsigned>((utf8_state_info[category + 16] >> (state << 2)) & 0xf);
}

template <class StringType, typename std::enable_if<(sizeof(typename StringType::value_type) == 1)>::type* = nullptr>
inline StringType fromUtf8(const std::string& utf8String, const typename StringType::allocator_type& alloc = typename StringType::allocator_type()) {
    return StringType(utf8String.begin(), utf8String.end(), alloc);
}

template <class StringType, typename std::enable_if<(sizeof(typename StringType::value_type) == 2)>::type* = nullptr>
inline StringType fromUtf8(const std::string& utf8String, const typename StringType::allocator_type& alloc = typename StringType::allocator_type()) {
    StringType result(alloc);
    result.reserve(utf8String.length());
    std::string::const_iterator iter = utf8String.begin();
    unsigned utf8_state = S_STRT;
    std::uint32_t codepoint = 0;
    while (iter < utf8String.end()) {
        if ((utf8_state = consumeUtf8Fragment(utf8_state, static_cast<uint8_t>(*iter++), codepoint)) == S_STRT) {
            if (codepoint <= 0xffff) {
                result += static_cast<typename StringType::value_type>(codepoint);
            } else {
                codepoint -= 0x10000;
                result += static_cast<typename StringType::value_type>((codepoint >> 10) + 0xd800);
                result += static_cast<typename StringType::value_type>((codepoint & 0x3ff) + 0xdc00);
            }
            codepoint = 0;
        } else if (utf8_state == S_RJCT) {
            result += static_cast<typename StringType::value_type>(0xfffd);
            utf8_state = S_STRT;
            codepoint = 0;
        }
    }
    if (utf8_state) {
        result += static_cast<typename StringType::value_type>(0xfffd);
    }
    return result;
}

template <class StringType, typename std::enable_if<(sizeof(typename StringType::value_type) == 4)>::type* = nullptr>
inline StringType fromUtf8(const std::string& utf8String, const typename StringType::allocator_type& alloc = typename StringType::allocator_type()) {
    StringType result(alloc);
    result.reserve(utf8String.length());
    std::string::const_iterator iter = utf8String.begin();
    unsigned utf8_state = S_STRT;
    std::uint32_t codepoint = 0;
    while (iter < utf8String.end()) {
        if ((utf8_state = consumeUtf8Fragment(utf8_state, static_cast<uint8_t>(*iter++), codepoint)) == S_STRT) {
            result += static_cast<typename StringType::value_type>(codepoint);
            codepoint = 0;
        } else if (utf8_state == S_RJCT) {
            result += static_cast<typename StringType::value_type>(0xfffd);
            utf8_state = S_STRT;
            codepoint = 0;
        }
    }
    if (utf8_state) {
        result += static_cast<typename StringType::value_type>(0xfffd);
    }
    return result;
}

#ifdef _MSC_VER
FILE* OpenFile(const std::string& file_name, const std::string& mode) {
    FILE* result{nullptr};
    _wfopen_s(&result, fromUtf8<std::wstring>(file_name).c_str(), fromUtf8<std::wstring>(mode).c_str());
    return result;
}
#else
FILE* OpenFile(const std::string& file_name, const std::string& mode) {
    FILE* file = fopen(file_name.c_str(), mode.c_str());
    return file;
}
#endif
void CloseFile(FILE* file) {
    fclose(file);
}
bool FileExists(const std::string& filepath) {
    bool ret = false;
    FILE* pfile = OpenFile(filepath, "rb");
    do {
        if (pfile == nullptr)
            break;
        ret = true;
        CloseFile(pfile);
    } while (false);
    return ret;
}
int64_t GetFileSize(const std::string& filepath) {
    int64_t length = 0;
    FILE* pfile = OpenFile(filepath, "rb");
    do {
        if (pfile == nullptr)
            break;
        fseek(pfile, 0L, SEEK_END);
        length = ftell(pfile);
        CloseFile(pfile);
    } while (false);
    return length;
}
std::size_t WriteFile(const std::string& file_name, const std::string& data, const std::string& mode /* = "w+"*/) {
    auto pf = OpenFile(file_name, mode);
    if (pf == nullptr)
        return -1;
    size_t ret = fwrite(data.data(), data.size(), 1, pf);
    fclose(pf);
    return ret;
}
bool ReadFileToString(const std::string& file_name, std::string& contents, bool create) {
    contents.clear();
    if (!FileExists(file_name)) {
        if (create) {
            CloseFile(OpenFile(file_name, "wb+"));
            return true;
        } else {
            return false;
        }
    }

    size_t max_size = GetFileSize(file_name);
    FILE* file = OpenFile(file_name, "rb");
    if (!file)
        return false;
    static const size_t kBufferSize = (1 << 10) << 4;
    std::array<char, kBufferSize> buf;
    size_t len;
    size_t size = 0;
    bool read_status = true;
    while ((len = fread(buf.data(), 1, kBufferSize, file)) > 0) {
        contents.append(buf.data(), std::min(len, max_size - size));
        if ((max_size - size) < len) {
            read_status = false;
            break;
        }
        size += len;
    }
    read_status = read_status && !ferror(file);
    fclose(file);
    return read_status;
}
std::size_t ReadFile(const std::string& file_name, std::string& data) {
    GetFileSize(file_name);
    if (ReadFileToString(file_name, data, false))
        return data.size();
    return 0;
}
}  // namespace file_helper
