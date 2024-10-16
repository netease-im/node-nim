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
#include "reflection/xpack/json.h"

struct FunctionDesc {
    Napi::Env env;
    Napi::Function function;
};
extern thread_local std::map<std::string, FunctionDesc> ts_cpp_conversion_functions;
namespace ts_cpp_conversion {
using ptr_int8_t = char*;
using ptr_void_t = void*;
static void StoreFunctionInObject(Napi::Env env, const Napi::Object& obj) {
    for (auto it = obj.begin(); it != obj.end(); ++it) {
        auto key = (*it).first;
        auto member = (*it).second.operator Napi::Value();
        if (member.IsFunction()) {
            FunctionDesc desc{env, member.As<Napi::Function>()};
            ts_cpp_conversion_functions.emplace(key.As<Napi::String>(), desc);
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
        if (json_str_value.IsNull() || json_str_value.IsUndefined()) {
            return _struct;
        }
        if (json_str_value.IsString()) {
            json_text = json_str_value.As<Napi::String>().Utf8Value();
        } else {
            throw std::runtime_error(
                "json stringify failed at index: " + std::to_string(index) + ", get type: " + kNapiValueTypeStrVec[json_str_value.Type()]);
        }
        if (json_text == "null") {
            return _struct;
        }
        try {
            xpack::json::decode(json_text, _struct);
        } catch (const std::exception& e) {
            throw std::runtime_error("xpack json decode failed at index: " + std::to_string(index) + ", error: " + e.what());
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
        throw std::runtime_error("ObjectToStruct<bool> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
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
    throw std::runtime_error("ObjectToStruct<int8_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
uint8_t ts_cpp_conversion::ObjectToStruct<uint8_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<uint8_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
int16_t ts_cpp_conversion::ObjectToStruct<int16_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int32Value();
    }
    if (value.IsString()) {
        return std::stoi(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<int16_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
uint16_t ts_cpp_conversion::ObjectToStruct<uint16_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<uint16_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
int32_t ts_cpp_conversion::ObjectToStruct<int32_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int32Value();
    }
    if (value.IsString()) {
        return std::stoi(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<int32_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
uint32_t ts_cpp_conversion::ObjectToStruct<uint32_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Uint32Value();
    }
    if (value.IsString()) {
        return std::stoul(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<uint32_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
int64_t ts_cpp_conversion::ObjectToStruct<int64_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int64Value();
    }
    if (value.IsString()) {
        return std::stoll(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<int64_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
uint64_t ts_cpp_conversion::ObjectToStruct<uint64_t>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().Int64Value();
    }
    if (value.IsString()) {
        return std::stoull(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<uint64_t> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
float ts_cpp_conversion::ObjectToStruct<float>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().FloatValue();
    }
    if (value.IsString()) {
        return std::stof(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<float> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
template <>
double ts_cpp_conversion::ObjectToStruct<double>(Napi::Env env, const Napi::Value& value, int32_t index) {
    if (value.IsNumber()) {
        return value.As<Napi::Number>().DoubleValue();
    }
    if (value.IsString()) {
        return std::stod(value.As<Napi::String>());
    }
    throw std::runtime_error("ObjectToStruct<double> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
}
// template <>
// nstd::string ts_cpp_conversion::ObjectToStruct<nstd::string>(Napi::Env env, const Napi::Value& value, int32_t index) {
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
            throw std::runtime_error("ObjectToStruct<std::string> stringify fail, get type: " + kNapiValueTypeStrVec[value.Type()] +
                                     ", at index: " + std::to_string(index));
        }
    } else if (value.IsString()) {
        return value.As<Napi::String>().Utf8Value();
    } else {
        throw std::runtime_error(
            "ObjectToStruct<std::string> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
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
            throw std::runtime_error("ObjectToStruct<const char*> stringify fail, get type: " + kNapiValueTypeStrVec[value.Type()] +
                                     ", at index: " + std::to_string(index));
        }
    } else if (value.IsString()) {
        str = value.As<Napi::String>().Utf8Value();
        return str.c_str();
    } else {
        throw std::runtime_error(
            "ObjectToStruct<const char*> get type: " + kNapiValueTypeStrVec[value.Type()] + ", at index: " + std::to_string(index));
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
// napi_value ts_cpp_conversion::StructToObject<nstd::string>(Napi::Env env, const nstd::string& value) {
//     return Napi::String::New(env, value.c_str());
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

#endif  // SRC_TS_CPP_CONVERSION_H_
