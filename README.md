# NetEase IM Node.js addon wrapper

## Build environment

 - CMake 3.10 or higher
 - Visual Studio 2017 or MSBuild 2017

## Command line

|Options|Descroption|
|---|---|
|fetch-wrapper|Download NIM C++ SDK source files and C binary files|
|build-wrapper|Build NIM C++ SDK|
|package|Package the compiled artifacts|
|build|Build with specified parameters (build-wrapper+package)|

Examples:

Fetch C++ wrapper source files and build C++ addon for node.js.

```bash
npx just fetch-wrapper --target_platform=win32 --target_arch=ia32
npx just build --runtime=electron --target=13.1.2 --target_platform=win32 --target_arch=ia32
```

Just build NIM C++ wrapper, needs `npx just fetch-wrapper` before.

```bash
npx just build-wrapper --target_platform=win32 --target_arch=ia32
```

Packing a compiled artifact as `.tar.gz` in `packages` folder.

```bash
npx just package --runtime=electron --target=13.1.2 --target_platform=win32 --target_arch=ia32
```
