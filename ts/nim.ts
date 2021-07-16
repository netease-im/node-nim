import NIMClient from './api/client';
import NIMDataSync from './api/data_sync';
import NIMFriend from './api/friend';
import NIMGlobal from './api/global';
import NIMMsgLog from './api/msglog';
import NIMNOS from './api/nos';
import NIMOnlineSession from './api/online_session';
import NIMPassThroughProxy from './api/pass_through_proxy';
import NIMSession from './api/session';
import NIMSubscribeEvent from './api/subscribe_event';
import NIMSuperTeam from './api/super_team';
import NIMSysMsg from './api/sysmsg';
import NIMTalk from './api/talk';
import NIMTeam from './api/team';
import NIMTool from './api/tool';
import NIMUser from './api/user';
import NIMRts from './api/rts';
import NIMSignaling from './api/signaling';
import NIMTalkEx from './api/talkex';

const NIMSDK = {
    NIMClient,
    NIMDataSync,
    NIMFriend,
    NIMGlobal,
    NIMMsgLog,
    NIMNOS,
    NIMOnlineSession,
    NIMPassThroughProxy,
    NIMSession,
    NIMSubscribeEvent,
    NIMSuperTeam,
    NIMSysMsg,
    NIMTalk,
    NIMTeam,
    NIMTool,
    NIMUser,
    NIMRts,
    NIMSignaling,
    NIMTalkEx
};

export default NIMSDK;
