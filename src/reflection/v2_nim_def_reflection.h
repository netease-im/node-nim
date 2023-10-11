#ifndef V2_NIM_STRUCT_REFLECTION_H
#define V2_NIM_STRUCT_REFLECTION_H
#include "v2/v2_nim_api.hpp"
#include "xpack_specialization.h"
using namespace v2;
ReflectionDefinition_O(V2NIMError, source, code, desc, detail);

ReflectionDefinition_O(V2NIMLinkOption, useHttps, exclusiveCluster, asymmetricEncryptionAlgorithm, symmetricEncryptionAlgorithm);

ReflectionDefinition_O(V2NIMAttachmentOption,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailQuality,
    thumbnailNameTemplate,
    enableAnimatedImageThumbnail,
    autoDownloadImageThumb,
    autoDownloadVideoThumb,
    autoDownloadImage,
    autoDownloadAudio,
    autoDownloadVideo);

ReflectionDefinition_O(V2NIMFCSOption, enableFcs, fcsAuthType, mockRefer, mockUa);

ReflectionDefinition_O(V2NIMPrivateServerOption,
    ipProtocolVersion,
    useHttpdns,
    lbsAddresses,
    nosLbsAddress,
    defaultLinkAddress,
    defaultLinkAddressIpv6,
    defaultNosUploadAddress,
    defaultNosUploadHost,
    nosDownloadAddress,
    nosAccelerateHosts,
    nosAccelerateAddress,
    probeIpv4Url,
    probeIpv6Url,
    asymmetricEncryptionKeyA,
    asymmetricEncryptionKeyB,
    asymmetricEncryptionKeyVersion);

ReflectionDefinition_O(V2NIMDatabaseOption, encryptionKey, enableBackup, enableRestore, backupFolder);

ReflectionDefinition_O(V2NIMBasicOption, customClientType, customTag, logReserveDays, sdkLogLevel, disableAppNap, sdkType);

ReflectionDefinition_O(V2NIMInitOption,
    appkey,
    appDataPath,
    basicOption,
    linkOption,
    databaseOption,
    attachmentOption,
    fcsOption,
    privateServerOption);

ReflectionDefinition_O(V2NIMMessageAttachment, url, name, md5, length, uploadState, downloadState);

ReflectionDefinition_O(V2NIMMessagePushOption, content, payload, forcePush, forcePushContent, forcePushAccountIds);

ReflectionDefinition_O(V2NIMMessageAntiSpamOption,
    yidunAntiCheating,
    yidunAntiSpam,
    customMessageAntiSpamContent,
    yidunBusinessId,
    yidunAntiSpamDisabled);

ReflectionDefinition_O(V2NIMMessageConfig,
    historyDisabled,
    roamingDisabled,
    offlineDisabled,
    senderSyncDisabled,
    conversationUpdateDisabled,
    pushDisabled,
    pushBadgeDisabled,
    pushNickDisabled,
    teamReceiptEnabled,
    routeDisabled);

ReflectionDefinition_O(V2NIMMessageRefer, senderAccountId, receiverAccountId, clientId, serverId, time);

ReflectionDefinition_O(V2NIMMessageQueryTime, begin, end, includeBegin, includeEnd);

ReflectionDefinition_O(V2NIMMessageUpdatedInfo, state, serverExtension, localExtension);

ReflectionDefinition_O(V2NIMMessage,
    conversationId,
    clientId,
    serverId,
    time,
    senderAccountId,
    receiverAccountId,
    type,
    subType,
    text,
    attachment,
    serverExtension,
    localExtension,
    sendState,
    attachmentUploadState,
    attachmentDownloadState,
    state,
    pushOption,
    antiSpamOption,
    config,
    threadRefer,
    replyRefer,
    markAntiSpamIntercepted);

ReflectionDefinition_O(V2NIMSendMessageParam, env, pushOption, config, antiSpamOption);

ReflectionDefinition_O(V2NIMSendMessageResult, thirdPartyCallbackExtension, yidunAntiSpamResult);

ReflectionDefinition_O(V2NIMConversation, conversationId, localExt, serverExt, unreadCount, latestMessage);

ReflectionDefinition_O(V2NIMLoginOption, retryCount, forceMode, authType, tokenProvider, loginExtensionProvider, syncLevel);

ReflectionDefinition_O(V2NIMLoginClient,
    type,
    os,
    timestamp,
    custom,
    customClientType,
    deviceId,
    consid,
    ip,
    port,
    pushType,
    pushTokenExists,
    loginType);

ReflectionDefinition_O(V2NIMKickedOfflineDetail, reason, reasonDesc, clientType, customClientType);

ReflectionDefinition_O(V2NIMDataSyncDetail, type, state);

// Callback
CallbackSpecialization(V2NIMSuccessCallback);
CallbackSpecialization(V2NIMFailureCallback);
CallbackSpecialization(V2NIMProgressCallback);
CallbackSpecialization(V2NIMSendMessageSuccessCallback);
CallbackSpecialization(V2NIMMessageListSuccessCallback);
CallbackSpecialization(V2NIMReconnectDelayProvider);
#endif