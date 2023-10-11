#ifndef __CHATROOM_H__
#define __CHATROOM_H__
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMChatRoom : public BizService<NIMChatRoom> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMChatRoom(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __CHATROOM_H__