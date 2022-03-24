#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_wrapper_util/nim_json_util.h"
#include "xpack/json.h"
#ifndef XPACK_SPECIALIZATION_H
#define XPACK_SPECIALIZATION_H
namespace xpack {
// nim_cpp_wrapper_util::Json::Value
template <>
struct is_xpack_xtype<nim_cpp_wrapper_util::Json::Value> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, nim_cpp_wrapper_util::Json::Value& val, const Extend* ext) {
    xpack::JsonData data;
    data.xpack_decode(obj, key, ext);
    std::string str = data.String();
    nim::ParseJsonValue(str, val);
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const nim_cpp_wrapper_util::Json::Value& val, const Extend* ext) {
    std::string str = nim::GetJsonStringWithNoStyled(val);
    return obj.encode(key, str, ext);
}

// std::function
template <typename TR, typename... Args>
struct is_xpack_xtype<std::function<TR(Args...)>> {
    static bool const value = true;
};

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str;
    obj.decode(key, str, ext);
    if (str.empty()) {
        return false;
    }
    // todo
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str;
    // todo
    return obj.encode(key, str, ext);
}

}  // namespace xpack
#endif
