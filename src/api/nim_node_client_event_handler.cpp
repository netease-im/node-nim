#include "nim_node_client_event_handler.h"
#include "../helper/nim_node_client_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"
// #include "DbgHelp.h"
#include <sstream>

namespace nim_node {
// string TraceStack()
// {
// 	static const int MAX_STACK_FRAMES = 5;

// 	void *pStack[MAX_STACK_FRAMES];

// 	HANDLE process = GetCurrentProcess();
// 	SymInitialize(process, NULL, TRUE);
// 	WORD frames = CaptureStackBackTrace(0, MAX_STACK_FRAMES, pStack, NULL);

// 	std::ostringstream oss;
// 	oss << "stack traceback: " << std::endl;
// 	for (WORD i = 0; i < frames; ++i) {
// 		DWORD64 address = (DWORD64)(pStack[i]);

// 		DWORD64 displacementSym = 0;
// 		char buffer[sizeof(SYMBOL_INFO) + MAX_SYM_NAME * sizeof(TCHAR)];
// 		PSYMBOL_INFO pSymbol = (PSYMBOL_INFO)buffer;
// 		pSymbol->SizeOfStruct = sizeof(SYMBOL_INFO);
// 		pSymbol->MaxNameLen = MAX_SYM_NAME;

// 		DWORD displacementLine = 0;
// 		IMAGEHLP_LINE64 line;
// 		//SymSetOptions(SYMOPT_LOAD_LINES);
// 		line.SizeOfStruct = sizeof(IMAGEHLP_LINE64);

// 		if (SymFromAddr(process, address, &displacementSym, pSymbol)
// 		 && SymGetLineFromAddr64(process, address, &displacementLine,
// &line)) { 			oss << "\t" << pSymbol->Name << " at " <<
// line.FileName << ":" << line.LineNumber << "(0x" << std::hex <<
// pSymbol->Address << std::dec << ")"
// << std::endl;
// 		}
// 		else {
// 			oss << "\terror: " << GetLastError() << std::endl;
// 		}
// 	}
// 	return oss.str();
// }

void ClientEventHandler::OnLoginCallback(const BaseCallbackPtr& bcb,
                                         bool relogin_cb,
                                         const nim::LoginRes& login_res) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnLoginCallback(bcb, relogin_cb,
                                                                login_res);
    });
}

void ClientEventHandler::Node_OnLoginCallback(const BaseCallbackPtr& bcb,
                                              bool relogin_cb,
                                              const nim::LoginRes& login_res) {
    // printf("###################%s\r", TraceStack().c_str());
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_client_login_res_to_obj(isolate, login_res, res);
    Local<Value> argv[argc] = {res};
    if (bcb != nullptr) {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                          bcb->data_.Get(isolate), argc, argv);
    } else {
        std::string fun_name =
            relogin_cb ? "OnReloginCallback" : "OnLoginCallback";
        auto it = callbacks_.find(fun_name);
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(
                isolate->GetCurrentContext(), it->second->data_.Get(isolate),
                argc, argv);
        }
    }
}

void ClientEventHandler::OnFunctionCallback() {
    node_async_call::async_call([]() {
        ClientEventHandler::GetInstance()->Node_OnFunctionCallback();
    });
}

void ClientEventHandler::Node_OnFunctionCallback() {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    auto it = callbacks_.find("OnFunctionCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 0, nullptr);
    }
}

void ClientEventHandler::OnLogoutCallback(const BaseCallbackPtr& bcb,
                                          nim::NIMResCode rescode) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnLogoutCallback(bcb, rescode);
    });
}

void ClientEventHandler::Node_OnLogoutCallback(const BaseCallbackPtr& bcb,
                                               nim::NIMResCode rescode) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {Integer::New(isolate, rescode)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void ClientEventHandler::OnKickoutCallback(const nim::KickoutRes& res) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnKickoutCallback(res);
    });
}
void ClientEventHandler::OnDisconnectCallback() {
    node_async_call::async_call([]() {
        ClientEventHandler::GetInstance()->Node_OnDisconnectCallback();
    });
}
void ClientEventHandler::OnMultispotLoginCallback(
    const nim::MultiSpotLoginRes& res) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnMultispotLoginCallback(res);
    });
}
void ClientEventHandler::OnKickOtherClientCallback(
    const nim::KickOtherRes& res) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnKickOtherClientCallback(res);
    });
}
void ClientEventHandler::OnSyncMultiportPushConfigCallback(
    const BaseCallbackPtr& bcb,
    int rescode,
    bool open) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()
            ->Node_OnSyncMultiportPushConfigCallback(bcb, rescode, open);
    });
}

void ClientEventHandler::Node_OnKickoutCallback(const nim::KickoutRes& res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_client_kickout_res_to_obj(isolate, res, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnKickoutCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}
void ClientEventHandler::Node_OnDisconnectCallback() {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    auto it = callbacks_.find("OnDisconnectCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 0, nullptr);
    }
}
void ClientEventHandler::Node_OnMultispotLoginCallback(
    const nim::MultiSpotLoginRes& res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_client_multispot_res_to_obj(isolate, res, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnMultispotLoginCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}
void ClientEventHandler::Node_OnKickOtherClientCallback(
    const nim::KickOtherRes& res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_client_kickother_res_to_obj(isolate, res, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnKickOtherClientCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}
void ClientEventHandler::Node_OnSyncMultiportPushConfigCallback(
    const BaseCallbackPtr& bcb,
    int rescode,
    bool open) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode),
                               nim_napi_new_bool(isolate, open)};
    if (bcb == nullptr) {
        auto it = callbacks_.find("OnSyncMultiportPushConfigCallback");
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(
                isolate->GetCurrentContext(), it->second->data_.Get(isolate), 2,
                argv);
        }
    } else {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                          bcb->data_.Get(isolate), argc, argv);
    }
}

void ClientEventHandler::OnGetServerCurrentTimeCallback(
    const BaseCallbackPtr& bcb,
    int rescode,
    bool calc_local,
    uint64_t time) {
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnGetServerCurrentTimeCallback(
            bcb, rescode, calc_local, time);
    });
}

void ClientEventHandler::Node_OnGetServerCurrentTimeCallback(
    const BaseCallbackPtr& bcb,
    int rescode,
    bool calc_local,
    uint64_t time) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode),
                               nim_napi_new_bool(isolate, calc_local),
                               nim_napi_new_uint64(isolate, time)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}
void ClientEventHandler::OnReloginRequestTokenCb(const BaseCallbackPtr& bcb,
                                                 std::string* res) {
    std::string temp = *res;
    node_async_call::async_call([=]() {
        ClientEventHandler::GetInstance()->Node_OnReloginRequestTokenCb(bcb,
                                                                        temp);
    });
}

void ClientEventHandler::Node_OnReloginRequestTokenCb(
    const BaseCallbackPtr& bcb,
    std::string res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, res.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}
}  // namespace nim_node