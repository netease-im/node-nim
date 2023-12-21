include(CMakeParseArguments)

# enable warning as error for all platform
set(COMPILE_WARNING_AS_ERROR ON)

# add -fvisibility-inlines-hidden option
set(CMAKE_VISIBILITY_INLINES_HIDDEN ON)

# add -fvisibility=hidden option for GCC like
set(CMAKE_CXX_VISIBILITY_PRESET hidden)
set(CMAKE_C_VISIBILITY_PRESET hidden)

# add -fsigned-char for ARM
if (CMAKE_SYSTEM_PROCESSOR STREQUAL "arm")
    add_compile_options(-fsigned-char)
endif ()

# add DEBUG macro when config as debug
if (CMAKE_BUILD_TYPE MATCHES "Debug")
    add_definitions(-DDEBUG -D_DEBUG)
endif ()

# using cppstd 17 default
if (NOT CMAKE_CXX_STANDARD)
    set(CMAKE_CXX_STANDARD 17)
endif ()

if (WIN32)
    message(STATUS "Yunxin: Configure for [Windows]")
    add_definitions(
        -DOS_WIN
        -DUNICODE
        -D_UNICODE
        -DNOMINMAX
        -DWIN32_LEAN_AND_MEAN
        -DPSAPI_VERSION=1
        -D_ENABLE_ATOMIC_ALIGNMENT_FIX
        -D_CRT_SECURE_NO_WARNINGS
    )
    add_compile_options(/wd4573 /MP /utf-8 /bigobj)
    set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} /SAFESEH:NO")
    set(CMAKE_SHARED_LINKER_FLAGS_RELEASE "${CMAKE_SHARED_LINKER_FLAGS_RELEASE} /DEBUG /OPT:REF /OPT:ICF /Zi")
    set(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS_RELEASE} /DEBUG /OPT:REF /OPT:ICF /Zi")
endif ()

if (APPLE)
    # target system is macOS, iOS, tvOS or watchOS
    add_compile_options(-Wno-deprecated-declarations)
    add_compile_options($<$<CONFIG:RELEASE>:-fembed-bitcode>)
endif ()

if (IOS)
    # target system is iOS
    message(STATUS "Yunxin: Configure for [iOS]")
    if (NOT CMAKE_OSX_DEPLOYMENT_TARGET)
        set(CMAKE_OSX_DEPLOYMENT_TARGET 9.3 CACHE STRING "Minimum iOS deployment version" FORCE)
    endif ()
    if (CMAKE_OSX_ARCHITECTURES STREQUAL "armv7")
        add_compile_options(-fno-aligned-allocation)
    endif ()
endif ()

if (CMAKE_SYSTEM_NAME STREQUAL "Darwin")
    # target system is Darwin
    message(STATUS "Yunxin: Configure for [Darwin]")
    if (NOT CMAKE_OSX_DEPLOYMENT_TARGET)
        set(CMAKE_OSX_DEPLOYMENT_TARGET 10.13 CACHE STRING "Minimum OS X deployment version" FORCE)
    endif ()
endif ()

if (ANDROID)
    message(STATUS "Yunxin: Configure for [Android]")
    add_definitions(-DANDROID=1)
    add_link_options(
        "LINKER:--exclude-libs,ALL"
        "LINKER:--as-needed"
        "LINKER:--unresolved-symbols=report-all"
    )
    set(CMAKE_POSITION_INDEPENDENT_CODE ON)
    set(THREADS_PREFER_PTHREAD_FLAG ON)
endif ()

if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
    message(STATUS "Yunxin: Configure for [Linux]")
    add_link_options(
        "LINKER:--exclude-libs,ALL"
        "LINKER:--as-needed"
    )
    set(CMAKE_POSITION_INDEPENDENT_CODE ON)
    set(THREADS_PREFER_PTHREAD_FLAG ON)
endif ()

# pre-commit hooks
macro(ne_install_pre_commit_hooks)
    if (NOT EXISTS ${CMAKE_CURRENT_LIST_DIR}/.git/hooks/pre-commit AND "CMAKE_BUILD_TYPE" STREQUAL "Debug")
        find_package(Python3 COMPONENTS Interpreter Development)

        if (POLICY CMP0094) # https://cmake.org/cmake/help/latest/policy/CMP0094.html
            cmake_policy(SET CMP0094 NEW) # FindPython should return the first matching Python
        endif ()

        # needed on GitHub Actions CI: actions/setup-python does not touch registry/frameworks on Windows/macOS
        # this mirrors PythonInterp behavior which did not consult registry/frameworks first
        if (NOT DEFINED Python_FIND_REGISTRY)
            set(Python_FIND_REGISTRY "LAST")
        endif ()

        if (NOT DEFINED Python_FIND_FRAMEWORK)
            set(Python_FIND_FRAMEWORK "LAST")
        endif ()

        find_package(Python REQUIRED COMPONENTS Interpreter)
        message(STATUS "Python executable: ${Python_EXECUTABLE}")
        execute_process(COMMAND ${Python_EXECUTABLE} -m pip install pre-commit)
        execute_process(COMMAND pre-commit install WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}")
    endif ()
endmacro()

# conan
macro(ne_install_conan_packages)
    if (NOT CONAN_CMAKE_SILENT_OUTPUT)
        execute_process(COMMAND conan config set general.revisions_enabled=True)
        include(${CMAKE_SOURCE_DIR}/.cmake/conan.cmake)
        if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
            set(CONAN_ENV_CFLAGS "CFLAGS=-fvisibility=hidden -fvisibility-inlines-hidden")
            set(CONAN_ENV_CXXFLAGS "CXXFLAGS=-fvisibility=hidden -fvisibility-inlines-hidden")
        elseif(CMAKE_SYSTEM_NAME STREQUAL "Darwin")
            set(CONAN_ENV_CFLAGS "CFLAGS=-fembed-bitcode -fvisibility=hidden -fvisibility-inlines-hidden -Wno-error=deprecated-declarations")
            set(CONAN_ENV_CXXFLAGS "CXXFLAGS=-fembed-bitcode -fvisibility=hidden -fvisibility-inlines-hidden -Wno-error=deprecated-declarations")
            set(CONAN_ENV_OBJCFLAGS "OBJCFLAGS=-fembed-bitcode -fvisibility=hidden -fvisibility-inlines-hidden -Wno-error=deprecated-declarations")
        endif()
        if (CONAN_PROFILE_BUILD AND CONAN_PROFILE_HOST)
            conan_cmake_install(PATH_OR_REFERENCE .. BUILD missing
                SETTINGS_HOST build_type=${CMAKE_BUILD_TYPE}
                SETTINGS_BUILD build_type=${CMAKE_BUILD_TYPE}
                PROFILE_BUILD ${CONAN_PROFILE_BUILD}
                PROFILE_HOST ${CONAN_PROFILE_HOST}
                ENV ${CONAN_ENV_CFLAGS} ${CONAN_ENV_CXXFLAGS} ${CONAN_ENV_OBJCFLAGS})
        else()
            conan_cmake_autodetect(settings)
            conan_cmake_install(PATH_OR_REFERENCE .. BUILD missing SETTINGS ${settings} ENV ${CONAN_ENV_CFLAGS} ${CONAN_ENV_CXXFLAGS} ${CONAN_ENV_OBJCFLAGS})
        endif ()
    endif ()
    include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
    include(${CMAKE_BINARY_DIR}/conan_paths.cmake)
    conan_basic_setup(${PROJECT_NAME} KEEP_RPATHS)
endmacro()

function(ne_add_library target)
    set(oneValueArgs FRAMEWORK MACOSX_FRAMEWORK_IDENTIFIER PUBLIC_HEADERS NO_SYMLINKS)
    cmake_parse_arguments(PARSE_ARGV 1 arg "" "${oneValueArgs}" "")

    if (NOT DEFINED arg_FRAMEWORK)
        set(arg_FRAMEWORK TRUE)
    endif ()

    if (NOT DEFINED arg_MACOSX_FRAMEWORK_IDENTIFIER)
        set(arg_MACOSX_FRAMEWORK_IDENTIFIER "com.netease.nmc.${target}")
    endif ()

    if (WIN32 AND MSVC)
        configure_file(
            "${CMAKE_CURRENT_FUNCTION_LIST_DIR}/version.rc.in"
            "${CMAKE_BINARY_DIR}/version_${target}.rc"
        )
        list(APPEND arg_UNPARSED_ARGUMENTS "${CMAKE_BINARY_DIR}/version_${target}.rc")
    endif ()

    add_library("${target}" SHARED "${arg_UNPARSED_ARGUMENTS}")

    if (DEFINED arg_PUBLIC_HEADERS)
        set_target_properties(${target} PROPERTIES PUBLIC_HEADER "${arg_PUBLIC_HEADERS}")
    endif ()

    # Always build a framework for iOS
    if (IOS)
        set(BUNDLED_OUTPUT ON)
    else ()
        set(BUNDLED_OUTPUT ${arg_FRAMEWORK})
    endif ()

    if (APPLE)
        set_target_properties(${target} PROPERTIES
            LINK_FLAGS "-Wl,-F/Library/Frameworks"
            FRAMEWORK ${BUNDLED_OUTPUT}
            FRAMEWORK_VERSION A
            MACOSX_FRAMEWORK_IDENTIFIER ${arg_MACOSX_FRAMEWORK_IDENTIFIER}
            MACHO_CURRENT_VERSION ${GIT_VERSION}
        )
        if (CMAKE_BUILD_TYPE MATCHES "Release")
            set_target_properties(${target} PROPERTIES
                XCODE_ATTRIBUTE_DEPLOYMENT_POSTPROCESSING YES
                XCODE_ATTRIBUTE_STRIP_STYLE "non-global"
                XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS YES
                XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT "dwarf-with-dsym"
                XCODE_ATTRIBUTE_GCC_INLINES_ARE_PRIVATE_EXTERN YES
                XCODE_ATTRIBUTE_GCC_SYMBOLS_PRIVATE_EXTERN YES
            )
        endif ()
    elseif (UNIX)
        if (arg_NO_SYMLINKS)
            set_target_properties(${target} PROPERTIES
                BUILD_WITH_INSTALL_RPATH 1
                INSTALL_RPATH "$ORIGIN"
            )
        else ()
            set_target_properties(${target} PROPERTIES
                BUILD_WITH_INSTALL_RPATH 1
                INSTALL_RPATH "$ORIGIN"
                VERSION ${GIT_VERSION}
            )
        endif ()
    endif ()
    # set cmake install directories
    _ne_target_install(${target})
endfunction()

function(ne_target_link_libraries target)
    if (APPLE OR WIN32)
        target_link_libraries(${target} ${ARGN})
    elseif (ANDROID OR UNIX)
        target_link_libraries(${PROJECT_NAME} -Wl,--start-group)
        target_link_libraries(${target} ${ARGN})
        target_link_libraries(${PROJECT_NAME} -Wl,--end-group)
    endif ()
endfunction()

function(_ne_target_install target)
    if (ANDROID)
        install(
            TARGETS ${target}
            ARCHIVE DESTINATION ${CMAKE_INSTALL_PREFIX}/${CMAKE_ANDROID_ARCH_ABI}
            RUNTIME DESTINATION ${CMAKE_INSTALL_PREFIX}/${CMAKE_ANDROID_ARCH_ABI}
            LIBRARY DESTINATION ${CMAKE_INSTALL_PREFIX}/${CMAKE_ANDROID_ARCH_ABI}
            PUBLIC_HEADER DESTINATION include
        )
    elseif (APPLE)
        install(
            TARGETS ${target}
            ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
            RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
            LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
            FRAMEWORK DESTINATION ${CMAKE_INSTALL_LIBDIR}
            PUBLIC_HEADER DESTINATION include
        )
    elseif (MSVC)
        install(
            TARGETS ${target}
            ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
            RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
            LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
            PUBLIC_HEADER DESTINATION include
        )
        install(FILES $<TARGET_PDB_FILE:${target}> DESTINATION pdb OPTIONAL)
    elseif (UNIX)
        install(
            TARGETS ${target}
            ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
            RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
            LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
            PUBLIC_HEADER DESTINATION include
        )
    endif ()
endfunction()
