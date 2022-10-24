#ifndef __NIM_NODE_V2CLIENT_H__
#define __NIM_NODE_V2CLIENT_H__
/// @file nim_node_v2client.h
/// @brief V2Client API
/// @author Zvicii
/// @date 2022/10/24
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NODEV2Client;
template <>
NODEV2Client* node_nim::ServiceBase::GetCurrentService<NODEV2Client>(node_nim::ServiceBase* obj_holder);
class NODEV2Client : public BizService<NODEV2Client> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NODEV2Client(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __NIM_NODE_V2CLIENT_H__