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
    val = CppInvoker::ToThreadSafeCallback(ts_cpp_conversion_functions.back().env, ts_cpp_conversion_functions.back().function, "TempMemberCallback",
        (std::function<TR(Args...)>*)(nullptr));
    ts_cpp_conversion_functions.pop_back();
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str = "function encoding is not supported";
    return obj.encode(key, str, ext);
}

// ne_std::function
template <typename TR, typename... Args>
struct is_xpack_xtype<ne_std::function<TR(Args...)>> {
    static bool const value = true;
};

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_decode(OBJ& obj, const char* key, ne_std::function<TR(Args...)>& val, const Extend* ext) {
    if (ts_cpp_conversion_functions.empty()) {
        return false;
    }
    val = CppInvoker::ToThreadSafeCallback(ts_cpp_conversion_functions.back().env, ts_cpp_conversion_functions.back().function, "TempMemberCallback",
        (ne_std::function<TR(Args...)>*)(nullptr));
    ts_cpp_conversion_functions.pop_back();
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const ne_std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str = "function encoding is not supported";
    return obj.encode(key, str, ext);
}

// ne_std::string
template <>
struct is_xpack_xtype<ne_std::string> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, ne_std::string& val, const Extend* ext) {
    std::string str;
    if (!obj.decode(key, str, ext)) {
        return false;
    }
    val = str;
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const ne_std::string& val, const Extend* ext) {
    std::string str = val;
    return obj.encode(key, str, ext);
}

// ne_std::vector
template <typename T>
struct is_xpack_xtype<ne_std::_continuous_container<T>> {
    static bool const value = true;
};
template <class OBJ, typename T>
bool xpack_xtype_decode(OBJ& obj, const char* key, ne_std::_continuous_container<T>& val, const Extend* ext) {
    return obj.template decode_vector<ne_std::vector<T>>(key, val, ext);
}
template <class OBJ, typename T>
bool xpack_xtype_encode(OBJ& obj, const char* key, const ne_std::_continuous_container<T>& val, const Extend* ext) {
    return obj.template encode_list<ne_std::vector<T>>(key, val, ext);
}

// ne_std::map
template <typename K, typename V>
struct is_xpack_xtype<ne_std::map<K, V>> {
    static bool const value = true;
};
template <class OBJ, typename K, typename V>
bool xpack_xtype_decode(OBJ& obj, const char* key, ne_std::map<K, V>& val, const Extend* ext) {
    return obj.template decode_map<const ne_std::map<K, V>, K>(key, val, ext, [](const std::string& str, K& key) -> bool {
        key = str;
        return true;
    });
}
template <class OBJ, typename K, typename V>
bool xpack_xtype_encode(OBJ& obj, const char* key, const ne_std::map<K, V>& val, const Extend* ext) {
    return obj.template encode_map<const ne_std::map<K, V>, K>(key, val, ext, [](const K& key) -> std::string {
        return key;
    });
}

// ne_std::optional
template <typename T>
struct is_xpack_xtype<ne_std::optional<T>> {
    static bool const value = true;
};
template <class OBJ, typename T>
bool xpack_xtype_decode(OBJ& obj, const char* key, ne_std::optional<T>& val, const Extend* ext) {
    T value;
    if (!obj.decode(key, value, ext)) {
        return false;
    }
    val = value;
    return true;
}
template <class OBJ, typename T>
bool xpack_xtype_encode(OBJ& obj, const char* key, const ne_std::optional<T>& val, const Extend* ext) {
    if (val.has_value()) {
        obj.encode(key, val.value(), ext);
    }
    return true;
}

}  // namespace xpack
#endif
