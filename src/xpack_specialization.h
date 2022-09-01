#include "cpp_invoker.h"
#include "nim_wrapper_util/nim_json_util.h"
#include "third_party/xpack/json.h"

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
    nim_cpp_wrapper_util::Json::Value json_val;
    json_val[key] = val;
    std::string str = nim::GetJsonStringWithNoStyled(json_val);
    if (!str.empty()) {
        xpack::JsonDecoder decoder(str);
        xpack::JsonData data;
        data.xpack_decode(decoder, key, ext);
        return obj.encode(key, data, ext);
    } else {
        return obj.encode(key, str, ext);
    }
}

// std::function
template <typename TR, typename... Args>
struct is_xpack_xtype<std::function<TR(Args...)>> {
    static bool const value = true;
};

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::function<TR(Args...)>& val, const Extend* ext) {
    if (ts_cpp_conversion_functions.empty()) {
        return false;
    }
    val = CppInvoker::ToThreadSafeCallback(ts_cpp_conversion_functions.front().env, ts_cpp_conversion_functions.front().function,
        "TempMemberCallback", (std::function<TR(Args...)>*)(nullptr));
    ts_cpp_conversion_functions.pop();
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str = "function is not supported to encode";
    return obj.encode(key, str, ext);
}

}  // namespace xpack
#endif
