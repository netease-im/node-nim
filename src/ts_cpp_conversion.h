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
#include "third_party/xpack/json.h"

struct FunctionDesc {
    Napi::Env env;
    Napi::Function function;
};
extern thread_local std::deque<FunctionDesc> ts_cpp_conversion_functions;
namespace ts_cpp_conversion {
using ptr_int8_t = char*;
using ptr_void_t = void*;
static void StoreFunctionInObject(Napi::Env env, const Napi::Object& obj) {
    for (auto it = obj.begin(); it != obj.end(); ++it) {
        auto member = (*it).second.operator Napi::Value();
        if (member.IsFunction()) {
            ts_cpp_conversion_functions.push_front({env, member.As<Napi::Function>()});
        } else if (member.IsObject()) {
            StoreFunctionInObject(env, member.As<Napi::Object>());
        }
    }
}

inline const std::vector<std::string> kNapiValueTypeStrVec{
    "Undefined", "Null", "Boolean", "Number", "String", "Symbol", "Object", "Function", "External", "Bigint"};

template <typename T>
static T ObjectToStruct(Napi::Env env, const Napi::Value& value, int32_t index) {
    T _struct{};
    if (std::is_enum<T>::value) {
        int64_t temp = value.As<Napi::Number>().Int64Value();
        _struct = *(reinterpret_cast<T*>(&temp));
    } else {
        if (value.IsObject()) {
            StoreFunctionInObject(env, value.As<Napi::Object>());
        }
        std::string json_text;
        Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
        Napi::Function stringify = json.Get("stringify").As<Napi::Function>();
        auto json_str_value = stringify.Call(json, {value});
        if (json_str_value.IsString()) {
            json_text = json_str_value.As<Napi::String>().Utf8Value();
        } else {
            Napi::Error::New(env,
                "[node-nim] json stringify failed at index: " + std::to_string(index) + ", get type: " + kNapiValueTypeStrVec[json_str_value.Type()])
                .ThrowAsJavaScriptException();
            return _struct;
        }
        try {
            xpack::json::decode(json_text, _struct);
        } catch (const std::exception& e) {
            Napi::Error::New(env, "[node-nim] xpack json decode failed at index: " + std::to_string(index) + ", error: " + e.what())
                .ThrowAsJavaScriptException();
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
    std::string json_text = xpack::json::encode(value);
    if (json_text.empty()) {
        return env.Null();
    }
    Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
    Napi::Function parse = json.Get("parse").As<Napi::Function>();
    return parse.Call(json, {Napi::String::New(env, json_text)}).As<Napi::Object>();
}
}  // namespace ts_cpp_conversion
template <>
bool ts_cpp_conversion::ObjectToStruct<bool>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (!value.IsBoolean()) {
        Napi::Error::New(
            env, "[node-nim] ObjectToStruct<bool> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
            .ThrowAsJavaScriptException();
        return false;
    }
    return value.As<Napi::Boolean>();
}
template <>
int8_t ts_cpp_conversion::ObjectToStruct<int8_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int32Value();
    }
    if (value.IsString()) {
        return std::stoi(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<int8_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
uint8_t ts_cpp_conversion::ObjectToStruct<uint8_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<uint8_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
int16_t ts_cpp_conversion::ObjectToStruct<int16_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int32Value();
    }
    if (value.IsString()) {
        return std::stoi(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<int16_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
uint16_t ts_cpp_conversion::ObjectToStruct<uint16_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<uint16_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
int32_t ts_cpp_conversion::ObjectToStruct<int32_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int32Value();
    }
    if (value.IsString()) {
        return std::stoi(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<int32_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
uint32_t ts_cpp_conversion::ObjectToStruct<uint32_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<uint32_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
int64_t ts_cpp_conversion::ObjectToStruct<int64_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int64Value();
    }
    if (value.IsString()) {
        return std::stoll(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<int64_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
uint64_t ts_cpp_conversion::ObjectToStruct<uint64_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int64Value();
    }
    if (value.IsString()) {
        return std::stoull(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<uint64_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
float ts_cpp_conversion::ObjectToStruct<float>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().FloatValue();
    }
    if (value.IsString()) {
        return std::stof(value.As<Napi::String>());
    }
    Napi::Error::New(env, "[node-nim] ObjectToStruct<float> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
template <>
double ts_cpp_conversion::ObjectToStruct<double>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().DoubleValue();
    }
    if (value.IsString()) {
        return std::stod(value.As<Napi::String>());
    }
    Napi::Error::New(
        env, "[node-nim] ObjectToStruct<double> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
        .ThrowAsJavaScriptException();
    return 0;
}
// template <>
// ne_std::string ts_cpp_conversion::ObjectToStruct<ne_std::string>(Napi::Env env, const Napi::Value& value, int32_t index) {
//     return value.As<Napi::String>().operator std::string().c_str();
// }
template <>
std::string ts_cpp_conversion::ObjectToStruct<std::string>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsObject()) {
        Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
        Napi::Function stringify = json.Get("stringify").As<Napi::Function>();
        auto str_value = stringify.Call(json, {value});
        if (str_value.IsString()) {
            return str_value.As<Napi::String>().Utf8Value();
        } else {
            Napi::Error::New(env, "[node-nim] ObjectToStruct<std::string> stringify fail, get type: " + kNapiValueTypeStrVec[value.Type()] +
                                      ", at index: " + std::to_string(index))
                .ThrowAsJavaScriptException();
            return "";
        }
    } else if (value.IsString()) {
        return value.As<Napi::String>().Utf8Value();
    } else {
        Napi::Error::New(
            env, "[node-nim] ObjectToStruct<std::string> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
            .ThrowAsJavaScriptException();
        return "";
    }
}
template <>
const char* ts_cpp_conversion::ObjectToStruct<const char*>(Napi::Env env, const Napi::Value& value, int32_t index) {
    static std::string str;
    if (value.IsObject()) {
        Napi::Object json = env.Global().Get("JSON").As<Napi::Object>();
        Napi::Function stringify = json.Get("stringify").As<Napi::Function>();
        auto str_value = stringify.Call(json, {value});
        if (str_value.IsString()) {
            str = str_value.As<Napi::String>().Utf8Value();
            return str.c_str();
        } else {
            Napi::Error::New(env, "[node-nim] ObjectToStruct<const char*> stringify fail, get type: " + kNapiValueTypeStrVec[value.Type()] +
                                      ", at index: " + std::to_string(index))
                .ThrowAsJavaScriptException();
            return "";
        }
    } else if (value.IsString()) {
        str = value.As<Napi::String>().Utf8Value();
        return str.c_str();
    } else {
        Napi::Error::New(
            env, "[node-nim] ObjectToStruct<const char*> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index))
            .ThrowAsJavaScriptException();
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
    return Napi::String::New(env, std::to_string(value));
}
template <>
napi_value ts_cpp_conversion::StructToObject<uint64_t>(Napi::Env env, const uint64_t& value) {
    return Napi::String::New(env, std::to_string(value));
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

#define ReflectionDefinitionWithNoFiled(Class)                                                \
    namespace xpack {                                                                         \
    template <>                                                                               \
    struct is_xpack_xtype<Class> {                                                            \
        static bool const value = true;                                                       \
    };                                                                                        \
    template <class OBJ>                                                                      \
    bool xpack_xtype_decode(OBJ& obj, const char* key, Class& val, const Extend* ext) {       \
        return true;                                                                          \
    }                                                                                         \
    template <class OBJ>                                                                      \
    bool xpack_xtype_encode(OBJ& obj, const char* key, const Class& val, const Extend* ext) { \
        return true;                                                                          \
    }                                                                                         \
    }

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
