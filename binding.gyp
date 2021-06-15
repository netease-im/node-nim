{
    "variables": {
        "NIM_SDK_DIR%": "<(PRODUCT_DIR)../../nim_sdk",
        "SOURCE_DIR": "<(PRODUCT_DIR)../../"
    },
    "targets": [
        {
            'target_name': 'nim',
            'includes': [
                # './common.gypi',
            ],
            'include_dirs': [
            ],
            'sources': [
                'src/nim_node_engine.cpp',
                'src/nim_node_engine.h',
                'src/api/nim_node_client.h',
                'src/api/nim_node_client.cpp',
                'src/api/nim_node_client_event_handler.h',
                'src/api/nim_node_client_event_handler.cpp',
                'src/helper/nim_node_client_helper.h',
                'src/helper/nim_node_client_helper.cpp',
                'src/api/nim_node_talk.h',
                'src/api/nim_node_talk.cpp',
                'src/api/nim_node_talk_event_handler.h',
                'src/api/nim_node_talk_event_handler.cpp',
                'src/helper/nim_node_talk_helper.h',
                'src/helper/nim_node_talk_helper.cpp',
                'src/api/nim_node_talk_ex.h',
                'src/api/nim_node_talk_ex.cpp',
                'src/api/nim_node_talk_ex_event_handler.h',
                'src/api/nim_node_talk_ex_event_handler.cpp',
                'src/helper/nim_node_talk_ex_helper.h',
                'src/helper/nim_node_talk_ex_helper.cpp',
                'src/api/nim_node_team.h',
                'src/api/nim_node_team.cpp',
                'src/api/nim_node_team_event_handler.h',
                'src/api/nim_node_team_event_handler.cpp',
                'src/helper/nim_node_team_helper.h',
                'src/helper/nim_node_team_helper.cpp',
                'src/api/nim_node_super_team.h',
                'src/api/nim_node_super_team.cpp',
                'src/api/nim_node_super_team_event_handler.h',
                'src/api/nim_node_super_team_event_handler.cpp',
                'src/helper/nim_node_super_team_helper.h',
                'src/helper/nim_node_super_team_helper.cpp',
                'src/api/nim_node_session.h',
                'src/api/nim_node_session.cpp',
                'src/api/nim_node_session_event_handler.h',
                'src/api/nim_node_session_event_handler.cpp',
                'src/helper/nim_node_session_helper.h',
                'src/helper/nim_node_session_helper.cpp',
                'src/api/nim_node_msglog.h',
                'src/api/nim_node_msglog.cpp',
                'src/api/nim_node_msglog_event_handler.h',
                'src/api/nim_node_msglog_event_handler.cpp',
                'src/helper/nim_node_msglog_helper.h',
                'src/helper/nim_node_msglog_helper.cpp',
                'src/api/nim_node_sysmsg.h',
                'src/api/nim_node_sysmsg.cpp',
                'src/api/nim_node_sysmsg_event_handler.h',
                'src/api/nim_node_sysmsg_event_handler.cpp',
                'src/helper/nim_node_sysmsg_helper.h',
                'src/helper/nim_node_sysmsg_helper.cpp',
                'src/api/nim_node_user.h',
                'src/api/nim_node_user.cpp',
                'src/api/nim_node_user_event_handler.h',
                'src/api/nim_node_user_event_handler.cpp',
                'src/helper/nim_node_user_helper.h',
                'src/helper/nim_node_user_helper.cpp',
                'src/api/nim_node_friend.h',
                'src/api/nim_node_friend.cpp',
                'src/api/nim_node_friend_event_handler.h',
                'src/api/nim_node_friend_event_handler.cpp',
                'src/helper/nim_node_friend_helper.h',
                'src/helper/nim_node_friend_helper.cpp',
                'src/api/nim_node_global.h',
                'src/api/nim_node_global.cpp',
                'src/api/nim_node_global_event_handler.h',
                'src/api/nim_node_global_event_handler.cpp',
                'src/helper/nim_node_global_helper.h',
                'src/helper/nim_node_global_helper.cpp',
                'src/api/nim_node_tool.h',
                'src/api/nim_node_tool.cpp',
                'src/api/nim_node_tool_event_handler.h',
                'src/api/nim_node_tool_event_handler.cpp',
                'src/helper/nim_node_tool_helper.h',
                'src/helper/nim_node_tool_helper.cpp',
                'src/api/nim_node_subscribe_event.h',
                'src/api/nim_node_subscribe_event.cpp',
                'src/api/nim_node_subscribe_event_handler.h',
                'src/api/nim_node_subscribe_event_handler.cpp',
                'src/helper/nim_node_subscribe_helper.h',
                'src/helper/nim_node_subscribe_helper.cpp',
                'src/api/nim_node_nos.h',
                'src/api/nim_node_nos.cpp',
                'src/api/nim_node_nos_event_handler.h',
                'src/api/nim_node_nos_event_handler.cpp',
                'src/helper/nim_node_nos_helper.h',
                'src/helper/nim_node_nos_helper.cpp',
                'src/api/nim_node_data_sync.h',
                'src/api/nim_node_data_sync.cpp',
                'src/api/nim_node_data_event_handler.h',
                'src/api/nim_node_data_event_handler.cpp',
                'src/api/nim_node_online_session.h',
                'src/api/nim_node_online_session.cpp',
                'src/api/nim_node_online_session_event_handler.h',
                'src/api/nim_node_online_session_event_handler.cpp',
                'src/helper/nim_node_online_session_helper.h',
                'src/helper/nim_node_online_session_helper.cpp',
                'src/api/nim_node_pass_through_proxy.h',
                'src/api/nim_node_pass_through_proxy.cpp',
                'src/api/nim_node_pass_service_event_handler.h',
                'src/api/nim_node_pass_service_event_handler.cpp',
                'src/api/nim_node_plugin.h',
                'src/api/nim_node_plugin.cpp',
                'src/nim_node_helper.h',
                'src/nim_node_helper.cpp',
                'src/nim_node_async_queue.h',
                'src/nim_node_async_queue.cpp',
                'src/nim_event_handler.h',
                'src/nim_event_handler.cpp',
            ],
            'conditions': [
                [
                    'OS=="win"',
                    {
                        'copies': [{
                            'destination': '<(PRODUCT_DIR)',
                            'files': [
                                '<(NIM_SDK_DIR)/bin/nim.dll',
                                '<(NIM_SDK_DIR)/bin/h_available.dll',
                                '<(NIM_SDK_DIR)/bin/nim_cpp_wrapper.dll',
                            ]
                        }],
                        'defines': [
                            'NIM_WIN_DESKTOP_ONLY_SDK',
                            'NIM_SDK_DLL_IMPORT',
                            'CPPWRAPPER_DLL',
                            'WIN32',
                            'WIN32_LEAN_AND_MEAN'
                        ],
                        'library_dirs': [
                            '<(NIM_SDK_DIR)/lib/',
                        ],
                        'link_settings': {
                            'libraries': [
                                '-lnim_cpp_wrapper.lib',
                                '-lnim_wrapper_util.lib'
                            ]
                        },
                        'msvs_settings': {
                            'VCCLCompilerTool': {
                                'AdditionalOptions': [
                                    '/utf-8'
                                ]
                            }
                        },
                        'defines!': [
                        ],
                        'sources': [
                        ],
                        'include_dirs': [
                            '<(NIM_SDK_DIR)/include/',
                            '<(SOURCE_DIR)/src/'
                        ],
                        'configurations': {
                            'Release': {
                                'msvs_settings': {
                                    'VCCLCompilerTool': {
                                        'RuntimeLibrary': '2',
                                        'Optimization': '2',
                                        'EnableIntrinsicFunctions': 'true',
                                        'DebugInformationFormat': '3',
                                        'AdditionalOptions': [
                                        ]
                                    }
                                },
                            },
                            'Debug': {
                                'msvs_settings': {
                                    'VCCLCompilerTool': {
                                        'RuntimeLibrary': '3',
                                        'AdditionalOptions': [
                                        ]
                                    }
                                },
                            }
                        }
                    }
                ],
                [
                    'OS=="mac"',
                    {
                        'copies': [{
                            'destination': '<(PRODUCT_DIR)',
                            'files': [
                                '<(NIM_SDK_DIR)/framework/nim.framework',
                            ]
                        }],
                        'defines': [
                            'NIM_SDK_DLL_IMPORT',
                            'OS_MACOSX'
                        ],
                        'mac_framework_dirs': [
                            '<(NIM_SDK_DIR)/framework'
                        ],
                        'library_dirs': [
                            '<(NIM_SDK_DIR)/lib',
                        ],
                        'link_settings': {
                            'libraries': [
                                'libnim_wrapper_util.a',
                                'libnim_cpp_wrapper.a',
                                'nim.framework',
                                '-rpath <(NIM_SDK_DIR)/framework/',
                                '-rpath <(NIM_SDK_DIR)/lib/'
                            ]
                        },
                        'defines!': [
                            '-std=c++11'
                        ],
                        'sources': [
                        ],
                        'include_dirs': [
                            '<(SOURCE_DIR)/src/',
                            '<(NIM_SDK_DIR)/include/',
                            '<(NIM_SDK_DIR)/framework/nim.framework/Headers/',
                        ],
                        'xcode_settings': {
                            'ARCHS': ['x86_64'],
                            'MACOSX_DEPLOYMENT_TARGET': '10.14',
                            'EXCUTABLE_EXTENSION': 'node',
                            'FRAMEWORK_SEARCH_PATHS': [
                                './nim_sdk/bin/osx'
                            ],
                            'DEBUG_INFORMATION_FORMAT': 'dwarf-with-dsym',
                            'OTHER_CFLAGS': [
                            ],
                        }
                    }
                ]
            ]
        }
    ]
}
