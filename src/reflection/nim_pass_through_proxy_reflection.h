/**
 * @file nim_pass_through_proxy_reflection.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_PASS_THROUGH_PROXY_HELPER_H
#define NIM_NODE_PASS_THROUGH_PROXY_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
// Callback
CallbackSpecialization(PassThroughProxy::SendHttpRequestCallback);
CallbackSpecialization(PassThroughProxy::ReceivedHttpMsgCb);
#endif
