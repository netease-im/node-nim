#ifndef NODE_NIM_SRC_PUBLIC_DEFINES_H_
#define NODE_NIM_SRC_PUBLIC_DEFINES_H_

#if defined(_DEBUG) || defined(DEBUG)
static const char* DEFAULT_APP_DATA_DIR{"NIM_DEBUG"};
#else
static const char* DEFAULT_APP_DATA_DIR{"NIM"};
#endif
static const char* NIM_LOG_FILE_PREFIX{"nim-node"};
static const char* NIM_CHATROOM_LOG_FILE_PREFIX{"nim-chatroom-node"};

#endif  // NODE_NIM_SRC_PUBLIC_DEFINES_H_
