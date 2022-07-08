/**
 * @file ts_cpp_conversion.h
 * @author haokui
 * @date 2021-11-08
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef SRC_TS_CPP_CONVERSION_H_
#define SRC_TS_CPP_CONVERSION_H_

#include <napi.h>
#include <map>
#include <mutex>
#include <queue>
#include <string>
#include "xpack/json.h"

class ParamRegInfoCollector {
private:
    template <typename TClass>
    friend struct ParamRegistrar;
    struct ParamRefInfo {
        std::string typeid_name;
        std::string ref_value;
    };

private:
    ParamRegInfoCollector() = default;

public:
    static ParamRegInfoCollector* GetInstance() {
        static ParamRegInfoCollector _instance{};
        return &_instance;
    }
    void SetCacheFile(const std::string cache_file);
    std::string GetParamRefValue(const std::string& name);
    template <typename TParam>
    void UpdateParamRefValue(const std::string& value) {
        std::lock_guard<std::recursive_mutex> auto_lock(lock_);
        auto it = type_name_app_name_map_.find(std::string(typeid(TParam).name()));
        if (it == type_name_app_name_map_.end())
            return;
        param_ref_list_[it->second] = {it->first, value};
        FlushCacheFile();
    }

private:
    template <typename TParam>
    void RegisterParam(const std::string& name) {
        std::lock_guard<std::recursive_mutex> auto_lock(lock_);
        app_name_type_name_map_[name] = std::string(typeid(TParam).name());
        type_name_app_name_map_[std::string(typeid(TParam).name())] = name;
        param_ref_list_[name] = {std::string(typeid(TParam).name()), xpack::json::encode(TParam())};
    }
    void MergWithCache();
    void FlushCacheFile();

private:
    std::recursive_mutex lock_;
    std::map<std::string, ParamRefInfo> param_ref_list_;
    std::map<std::string, std::string> type_name_app_name_map_;
    std::map<std::string, std::string> app_name_type_name_map_;
    std::string cache_file_;
};

template <typename TClass>
struct ParamRegistrar {
    ParamRegistrar(const std::string& name) { ParamRegInfoCollector::GetInstance()->RegisterParam<TClass>(name); }
};

namespace ts_cpp_conversion {
using ptr_int8_t = char*;
using ptr_void_t = void*;
struct NapiFunctionDesc {
    Napi::Env env;
    Napi::Function function;
};
inline thread_local std::queue<NapiFunctionDesc> ts_cpp_conversion_functions;
static void StoreFunctionInObject(Napi::Env env, const Napi::Object& obj) {
    for (auto it = obj.begin(); it != obj.end(); ++it) {
        auto member = (*it).second.operator Napi::Value();
        if (member.IsFunction()) {
            ts_cpp_conversion_functions.push({env, member.As<Napi::Function>()});
        } else if (member.IsObject()) {
            StoreFunctionInObject(env, member.As<Napi::Object>());
        }
    }
}
template <typename T>
static T ObjectToStruct(Napi::Env env, const Napi::Value& value) {
    T _struct;
    if (std::is_enum<T>::value) {
        int64_t temp = value.As<Napi::Number>().Int64Value();
        _struct = *(reinterpret_cast<T*>(&temp));
    } else {
        if (value.IsObject()) {
            StoreFunctionInObject(env, value.As<Napi::Object>());
        }
        std::string _object_json_text;
        Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
        Napi::Function stringify = json.Get("stringify").As<Napi::Function>();
        _object_json_text = stringify.Call(json, {value}).As<Napi::String>();
        try {
            xpack::json::decode(_object_json_text, _struct);
            // ParamRegInfoCollector::GetInstance()->UpdateParamRefValue<T>(xpack::json::encode(_struct));
        } catch (const std::runtime_error& error) {
            throw(std::string(error.what()));
        } catch (const std::string& error) {
            throw(error);
        }
    }
    return _struct;
}

template <typename T, typename std::enable_if<std::is_enum<T>::value, std::nullptr_t>::type = nullptr>
static napi_value StructToObject(Napi::Env env, const T& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}

template <typename T, typename std::enable_if<!std::is_enum<T>::value, std::nullptr_t>::type = nullptr>
static napi_value StructToObject(Napi::Env env, const T& value) {
    std::string _struct_json_text = xpack::json::encode(value);
    Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
    Napi::Function parse = json.Get("parse").As<Napi::Function>();
    auto obj = parse.Call(json, {Napi::String::New(env, _struct_json_text)}).As<Napi::Object>();
    return obj;
}
}  // namespace ts_cpp_conversion
template <>
bool ts_cpp_conversion::ObjectToStruct<bool>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsBoolean()) {
        Napi::Error::New(env, "boolean type error").ThrowAsJavaScriptException();
        return false;
    }
    return value.As<Napi::Boolean>();
}
template <>
int8_t ts_cpp_conversion::ObjectToStruct<int8_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "int8_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Int32Value();
}
template <>
uint8_t ts_cpp_conversion::ObjectToStruct<uint8_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "uint8_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Uint32Value();
}
template <>
int16_t ts_cpp_conversion::ObjectToStruct<int16_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "int16_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Int32Value();
}
template <>
uint16_t ts_cpp_conversion::ObjectToStruct<uint16_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "uint16_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Uint32Value();
}
template <>
int32_t ts_cpp_conversion::ObjectToStruct<int32_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "int32_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Int32Value();
}
template <>
uint32_t ts_cpp_conversion::ObjectToStruct<uint32_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "uint32_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Uint32Value();
}
template <>
int64_t ts_cpp_conversion::ObjectToStruct<int64_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "int64_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Int64Value();
}
template <>
uint64_t ts_cpp_conversion::ObjectToStruct<uint64_t>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "uint64_t type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().Int64Value();
}
template <>
float ts_cpp_conversion::ObjectToStruct<float>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "float type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().FloatValue();
}
template <>
double ts_cpp_conversion::ObjectToStruct<double>(Napi::Env env, const Napi::Value& value) {
    if (!value.IsNumber()) {
        Napi::Error::New(env, "double type error").ThrowAsJavaScriptException();
        return 0;
    }
    return value.As<Napi::Number>().DoubleValue();
}
// template <>
// ne_std::string ts_cpp_conversion::ObjectToStruct<ne_std::string>(Napi::Env env, const Napi::Value& value) {
//     return value.As<Napi::String>().operator std::string().c_str();
// }
template <>
std::string ts_cpp_conversion::ObjectToStruct<std::string>(Napi::Env env, const Napi::Value& value) {
    if (value.IsObject()) {
        Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
        Napi::Function stringify = json.Get("stringify").As<Napi::Function>();
        return stringify.Call(json, {value}).As<Napi::String>();
    } else if (value.IsString()) {
        return value.As<Napi::String>().operator std::string();
    } else {
        Napi::Error::New(env, "string type error").ThrowAsJavaScriptException();
        return "";
    }
}
template <>
napi_value ts_cpp_conversion::StructToObject<int8_t>(Napi::Env env, const int8_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<uint8_t>(Napi::Env env, const uint8_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<int16_t>(Napi::Env env, const int16_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<uint16_t>(Napi::Env env, const uint16_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<bool>(Napi::Env env, const bool& value) {
    return Napi::Boolean::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<int32_t>(Napi::Env env, const int32_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<uint32_t>(Napi::Env env, const uint32_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<int64_t>(Napi::Env env, const int64_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<uint64_t>(Napi::Env env, const uint64_t& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<float>(Napi::Env env, const float& value) {
    return Napi::Number::New(env, static_cast<double>(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<double>(Napi::Env env, const double& value) {
    return Napi::Number::New(env, value);
}
// template <>
// napi_value ts_cpp_conversion::StructToObject<ne_std::string>(Napi::Env env, const ne_std::string& value) {
//     return Napi::String::New(env, value);
// }
template <>
napi_value ts_cpp_conversion::StructToObject<std::string>(Napi::Env env, const std::string& value) {
    return Napi::String::New(env, value);
}
template <>
napi_value ts_cpp_conversion::StructToObject<ts_cpp_conversion::ptr_int8_t>(Napi::Env env, const ts_cpp_conversion::ptr_int8_t& value) {
    return Napi::String::New(env, value);
}
template <>
napi_value ts_cpp_conversion::StructToObject<ts_cpp_conversion::ptr_void_t>(Napi::Env env, const ts_cpp_conversion::ptr_void_t& value) {
    return env.Null();
}
#define ReflectionDefinitionInternal(Class, ...) XPACK_OUT(Class, A(__VA_ARGS__));

#define RegistParamDefinition(Class, ...)                \
    namespace param_registrar {                          \
    static const ParamRegistrar<Class> g##Class{#Class}; \
    }

#define ReflectionDefinition(Class, ...) ReflectionDefinitionInternal(Class, __VA_ARGS__);

#define ReflectionDefinitionAndReg(Class, ...)        \
    ReflectionDefinitionInternal(Class, __VA_ARGS__); \
    RegistParamDefinition(Class, __VA_ARGS__)

#define ReflectionDefinitionInternal_O(Class, ...) XPACK_OUT(Class, O(__VA_ARGS__));

#define ReflectionDefinition_O(Class, ...) ReflectionDefinitionInternal_O(Class, __VA_ARGS__);

#define ReflectionDefinitionAndReg_O(ClassName, Class, ...) \
    ReflectionDefinitionInternal_O(Class, __VA_ARGS__);     \
    RegistParamDefinition(ClassName, __VA_ARGS__)

// using inuse_bool = ne_std::inuse_value<bool>;
// using inuse_int8 = ne_std::inuse_value<int8_t>;
// using inuse_uint8 = ne_std::inuse_value<uint8_t>;
// using inuse_int16 = ne_std::inuse_value<int16_t>;
// using inuse_uint16 = ne_std::inuse_value<uint16_t>;
// using inuse_int32 = ne_std::inuse_value<int32_t>;
// using inuse_uint32 = ne_std::inuse_value<uint32_t>;
// using inuse_int64 = ne_std::inuse_value<int64_t>;
// using inuse_uint64 = ne_std::inuse_value<uint64_t>;
// using inuse_string = ne_std::inuse_value<ne_std::string>;

// ReflectionDefinitionInternal(inuse_bool, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_int8, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_uint8, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_int16, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_uint16, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_int32, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_uint32, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_int64, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_uint64, inuse_, "inuse", value_, "value");
// ReflectionDefinitionInternal(inuse_string, inuse_, "inuse", value_, "value");

#endif  // SRC_TS_CPP_CONVERSION_H_
