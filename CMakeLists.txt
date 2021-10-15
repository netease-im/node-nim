message(STATUS "================== node-nim ==================")
cmake_minimum_required(VERSION 3.12.0)
set(TARGET_NAME nim)
project(${TARGET_NAME})
set(CMAKE_CXX_STANDARD 17)
                      
if (MSVC)
     add_definitions(
     -DUNICODE
     -D_UNICODE
     -DNOMINMAX
     -DWIN32_LEAN_AND_MEAN
     -DPSAPI_VERSION=1
     -DNIM_SDK_DLL_IMPORT
     -DWIN32)
     add_compile_options(/wd4573 /wd4251 /wd4273 /wd4819 /wd4996 /wd4275)
     add_compile_options("$<$<C_COMPILER_ID:MSVC>:/utf-8>")
     add_compile_options("$<$<CXX_COMPILER_ID:MSVC>:/utf-8>")
     set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} /Zi")
	 set(CMAKE_SHARED_LINKER_FLAGS_RELEASE "${CMAKE_SHARED_LINKER_FLAGS_RELEASE} /DEBUG /OPT:REF /OPT:ICF")
endif ()

add_subdirectory(sdk/wrapper)
file(GLOB_RECURSE NIM_NODE_SOURCE
     ${CMAKE_CURRENT_LIST_DIR}/src/*.cpp
     ${CMAKE_CURRENT_LIST_DIR}/src/*.c)
add_library(${TARGET_NAME} SHARED ${NIM_NODE_SOURCE} ${CMAKE_JS_SRC})

target_include_directories(${TARGET_NAME} PRIVATE
                           ${CMAKE_JS_INC}
                           ${CMAKE_CURRENT_LIST_DIR}/src
                           ${CMAKE_CURRENT_LIST_DIR}/sdk/include
                           ${CMAKE_CURRENT_LIST_DIR}/sdk/wrapper)
target_link_libraries(${TARGET_NAME}
                      ${CMAKE_JS_LIB}
                      nim_cpp_wrapper
                      nim_chatroom_cpp_wrapper
                      nim_wrapper_util)

set_target_properties(${TARGET_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
if (APPLE)
    target_link_libraries(${TARGET_NAME} nim)
    set_target_properties( ${TARGET_NAME}
        PROPERTIES
        BUILD_WITH_INSTALL_RPATH 1
        INSTALL_RPATH "@executable_path;@executable_path/framework"
    )
elseif (UNIX)
    set_target_properties( ${TARGET_NAME}
        PROPERTIES
        BUILD_WITH_INSTALL_RPATH 1
        INSTALL_RPATH "$\{ORIGIN\}"
    )
endif ()
