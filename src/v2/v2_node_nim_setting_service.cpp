#include "v2_node_nim_setting_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMSettingService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMSettingService", env, exports, {
        RegApi("getConversationMuteStatus", &V2NIMSettingService::getConversationMuteStatus),
        RegApi("setTeamMessageMuteMode", &V2NIMSettingService::setTeamMessageMuteMode),
        RegApi("getTeamMessageMuteMode", &V2NIMSettingService::getTeamMessageMuteMode),
        RegApi("getAllTeamMessageMuteMode", &V2NIMSettingService::getAllTeamMessageMuteMode),
        RegApi("setP2PMessageMuteMode", &V2NIMSettingService::setP2PMessageMuteMode),
        RegApi("getP2PMessageMuteMode", &V2NIMSettingService::getP2PMessageMuteMode),
        RegApi("getP2PMessageMuteList", &V2NIMSettingService::getP2PMessageMuteList), RegApi("setDndConfig", &V2NIMSettingService::setDndConfig),
        RegApi("getDndConfig", &V2NIMSettingService::getDndConfig),
        RegApi("setPushMobileOnDesktopOnline", &V2NIMSettingService::setPushMobileOnDesktopOnline),
        RegApi("getPushMobileOnDesktopOnline", &V2NIMSettingService::getPushMobileOnDesktopOnline),
    });
    // clang-format on
}

node_nim::V2NodeNIMSettingService::V2NodeNIMSettingService(const Napi::CallbackInfo& info)
    : BizService("V2NIMSettingService", info) {
    service_instance_ = &v2::V2NIMClient::get().getSettingService();
    initEventHandler();
}

V2NodeNIMSettingService::~V2NodeNIMSettingService() {
    auto& setting_service = v2::V2NIMClient::get().getSettingService();
    setting_service.removeSettingListener(listener_);
}

void V2NodeNIMSettingService::initEventHandler() {
    auto& setting_service = v2::V2NIMClient::get().getSettingService();
    listener_.onTeamMessageMuteModeChanged =
        MakeNotifyCallback<nstd::function<void(nstd::string teamId, V2NIMTeamType teamType, V2NIMTeamMessageMuteMode muteMode)>>(
            "teamMessageMuteModeChanged");
    listener_.onP2PMessageMuteModeChanged =
        MakeNotifyCallback<nstd::function<void(nstd::string accountId, V2NIMP2PMessageMuteMode muteMode)>>("p2pMessageMuteModeChanged");
    listener_.onPushMobileOnDesktopOnline = MakeNotifyCallback<nstd::function<void(bool need)>>("pushMobileOnDesktopOnline");
    setting_service.addSettingListener(listener_);
}
}  // namespace node_nim
