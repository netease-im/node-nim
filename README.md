# NetEase IM nodejs addon wrapper

## Build environment

 - CMake 3.10 or higher
 - Visual Studio 2017 or MSBuild 2017

## Build

An example of build C++ node addon for Electron-v8.0.0

```bash
# Building NIM C++ wrapper before build node addon
yarn run build_wrapper --platform=win32 --arch=ia32
# Building node addon
yarn run rebuild  --runtime=electron --dist-url=https://atom.io/download/electron --target=8.0.0 --target_arch=ia32 --target_platform=win32
# Packing artifacts
yarn run package  --runtime=electron --dist-url=https://atom.io/download/electron --target=8.0.0 --target_arch=ia32 --target_platform=win32
```
