message(STATUS "================== node-nim ==================")
cmake_minimum_required(VERSION 3.12.0)
set(TARGET_NAME node-nim)
project(${TARGET_NAME})
set(CMAKE_CXX_STANDARD 17)
# configure package.json, get NODE_NIM_VERSION from nim project
if(NOT NODE_NIM_VERSION)
    message(STATUS "NODE_NIM_VERSION is not set, use default version")
    set(NODE_NIM_VERSION "0.0.0")
endif()

# platform specific settings
if (WIN32)
    set(NPX_EXUTABLE "npx.cmd")
    set(NPM_EXUTABLE "npm.cmd")
else ()
    set(NPX_EXUTABLE "npx")
    set(NPM_EXUTABLE "npm")
endif ()

if(MSVC)
    ADD_COMPILE_OPTIONS(/wd4819)
    ADD_COMPILE_OPTIONS("$<$<C_COMPILER_ID:MSVC>:/utf-8>")
    ADD_COMPILE_OPTIONS("$<$<CXX_COMPILER_ID:MSVC>:/utf-8>")
    set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} /Gm- /Zi")
    set(CMAKE_SHARED_LINKER_FLAGS_RELEASE "${CMAKE_SHARED_LINKER_FLAGS_RELEASE} /DEBUG /OPT:REF /OPT:ICF")
    set(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS_RELEASE} /DEBUG /OPT:REF /OPT:ICF")
endif()

# get CMAKE_JS variables
if(CONAN_SETTINGS_ARCH STREQUAL "x86")
    set(CMAKE_JS_ARCH "ia32")
elseif(CONAN_SETTINGS_ARCH STREQUAL "x86_64")
    set(CMAKE_JS_ARCH "x64")
elseif(CONAN_SETTINGS_ARCH STREQUAL "armv8")
    set(CMAKE_JS_ARCH "arm64")
endif()
execute_process(COMMAND ${NPM_EXUTABLE} install --nim-sdk-url=${NIM_SDK_URL}
        WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
        OUTPUT_QUIET)
execute_process(COMMAND ${NPX_EXUTABLE} cmake-js print-configure -l error -a ${CMAKE_JS_ARCH}
        WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
        OUTPUT_VARIABLE CMAKE_JS_CONFIGURE_OUTPUT
        RESULT_VARIABLE AA)
string(REPLACE "[" "" CMAKE_JS_CONFIGURE_OUTPUT "${CMAKE_JS_CONFIGURE_OUTPUT}")
string(REPLACE "]" "" CMAKE_JS_CONFIGURE_OUTPUT "${CMAKE_JS_CONFIGURE_OUTPUT}")
string(REPLACE "\n" ";" CMAKE_JS_CONFIGURE_OUTPUT_LIST "${CMAKE_JS_CONFIGURE_OUTPUT}")
foreach(item ${CMAKE_JS_CONFIGURE_OUTPUT_LIST})
    string(FIND ${item} "CMAKE_JS_INC" CMAKE_JS_INC_INDEX)
    string(FIND ${item} "CMAKE_JS_SRC" CMAKE_JS_SRC_INDEX)
    string(FIND ${item} "CMAKE_JS_LIB" CMAKE_JS_LIB_INDEX)
    string(FIND ${item} "CMAKE_CXX_FLAGS" CMAKE_CXX_FLAGS_INDEX)
    string(FIND ${item} "CMAKE_SHARED_LINKER_FLAGS" CMAKE_SHARED_LINKER_FLAGS_INDEX)
    if(NOT CMAKE_JS_INC_INDEX EQUAL -1)
        string(REGEX REPLACE "^.*CMAKE_JS_INC=(.*)\'.*" "\\1" CMAKE_JS_INC ${item})
    elseif(NOT CMAKE_JS_SRC_INDEX EQUAL -1)
        string(REGEX REPLACE "^.*CMAKE_JS_SRC=(.*)\'.*" "\\1" CMAKE_JS_SRC ${item})
    elseif(NOT CMAKE_JS_LIB_INDEX EQUAL -1)
        string(REGEX REPLACE "^.*CMAKE_JS_LIB=(.*)\'.*" "\\1" CMAKE_JS_LIB ${item})
    elseif(NOT CMAKE_CXX_FLAGS_INDEX EQUAL -1)
        string(REGEX REPLACE "^.*CMAKE_CXX_FLAGS=(.*)\'.*" "\\1" CMAKE_CXX_FLAGS ${item})
    elseif(NOT CMAKE_SHARED_LINKER_FLAGS_INDEX EQUAL -1)
        string(REGEX REPLACE "^.*CMAKE_SHARED_LINKER_FLAGS=(.*)\'.*" "\\1" CMAKE_SHARED_LINKER_FLAGS ${item})
    endif()
endforeach()
message(STATUS "CMAKE_JS_INC ${CMAKE_JS_INC}")
message(STATUS "CMAKE_JS_SRC ${CMAKE_JS_SRC}")
message(STATUS "CMAKE_JS_LIB ${CMAKE_JS_LIB}")
message(STATUS "CMAKE_CXX_FLAGS ${CMAKE_CXX_FLAGS}")
message(STATUS "CMAKE_SHARED_LINKER_FLAGS ${CMAKE_SHARED_LINKER_FLAGS}")

# get NODE_ADDON_API_DIR
add_definitions(-DNAPI_VERSION=4)
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR)
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
message(STATUS "NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR}")

# get xpack
include(FetchContent)
FetchContent_Declare(
    xpack
    GIT_REPOSITORY https://github.com/xyz347/xpack.git
    GIT_TAG master
    SOURCE_DIR ${CMAKE_BINARY_DIR}/src/xpack
)
FetchContent_MakeAvailable(xpack)

# configure project
add_definitions(-DNIM_SDK_DLL_IMPORT)
file(GLOB_RECURSE NIM_NODE_SOURCE ${CMAKE_CURRENT_LIST_DIR}/src/*.cpp
                                  ${CMAKE_CURRENT_LIST_DIR}/src/*.cc
                                  ${CMAKE_CURRENT_LIST_DIR}/src/*.c)
add_library(${TARGET_NAME} SHARED ${NIM_NODE_SOURCE} ${CMAKE_JS_SRC})
target_include_directories(${TARGET_NAME} PRIVATE 
                           ${NODE_ADDON_API_DIR}
                           ${CMAKE_JS_INC}
                           ${CMAKE_BINARY_DIR}/src
                           ${CMAKE_CURRENT_LIST_DIR}/src)
if(TARGET nim_cpp_wrapper)
    # build as subproject of nim
    target_include_directories(${TARGET_NAME} PRIVATE 
                               ${CMAKE_SOURCE_DIR}
                               ${CMAKE_SOURCE_DIR}/nim/api/
                               ${CMAKE_SOURCE_DIR}/nim/nim_defines/
                               ${CMAKE_SOURCE_DIR}/nim_chatroom/api/
                               ${CMAKE_SOURCE_DIR}/nim_chatroom/nim_chatroom_defines/
                               ${CMAKE_SOURCE_DIR}/nim_qchat/api/
                               ${CMAKE_SOURCE_DIR}/nim_qchat/nim_qchat_defines/
                               ${CMAKE_SOURCE_DIR}/public_defines/
                               ${CMAKE_SOURCE_DIR}/wrapper)
else()
    # build with sdk package
    target_include_directories(${TARGET_NAME} PRIVATE 
                               ${CMAKE_CURRENT_LIST_DIR}/sdk/wrapper
                               ${CMAKE_CURRENT_LIST_DIR}/sdk/include)
    add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/sdk/wrapper)
endif()
target_link_libraries(${TARGET_NAME}
                      ${CMAKE_JS_LIB}
                      nim_cpp_wrapper
                      nim_chatroom_cpp_wrapper
                      nim_tools_cpp_wrapper
                      nim_qchat_cpp_wrapper
                      nim_wrapper_util)

set_target_properties(${TARGET_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
if(APPLE)
    set_target_properties( ${TARGET_NAME}
        PROPERTIES
        BUILD_WITH_INSTALL_RPATH 1
        INSTALL_RPATH "@loader_path")
endif ()

# installation
install(
    TARGETS ${TARGET_NAME}
    ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
if (MSVC)
    install(FILES $<TARGET_PDB_FILE:${TARGET_NAME}> DESTINATION pdb OPTIONAL)
endif ()
