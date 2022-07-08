#include "qchat_attachment.h"
#include "qchat_attachment_helper.h"
namespace node_nim {
GetCurrentSDKServiceImpl(QChatAttachment, QChatAttachment, holder_service);
Napi::Object QChatAttachment::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatAttachment", env, exports, {
        RegApi("InitEventHandlers", &QChatAttachment::InitEventHandlers),
        RegApi("Upload", &Attachment::Upload),
        RegApi("StopUpload", &Attachment::StopUpload),
        RegApi("Download", &Attachment::Download),
        RegApi("StopDownload", &Attachment::StopDownload),
        });
    // clang-format on
}

void QChatAttachment::InitEventHandlers() {
    RegisterSDKNotifyCallback("upload", &Attachment::RegUploadCb);
    RegisterSDKNotifyCallback("download", &Attachment::RegDownloadCb);
    RegisterSDKNotifyCallback("progress", &Attachment::RegProgressCb);
}

QChatAttachment::QChatAttachment(const Napi::CallbackInfo& info)
    : BizService("QChatAttachment", info) {}
}  // namespace node_nim