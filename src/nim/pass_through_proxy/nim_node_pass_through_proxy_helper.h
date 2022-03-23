/**
 * @file nim_node_pass_through_proxy_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_PASS_THROUGH_PROXY_HELPER_H
#define NIM_NODE_PASS_THROUGH_PROXY_HELPER_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
using namespace nim;
// Callback
CallbackSpecialization(PassThroughProxy::SendHttpRequestCallback);
CallbackSpecialization(PassThroughProxy::ReceivedHttpMsgCb);
#endif
