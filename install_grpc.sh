#!/bin/sh -x
#
# Rebuild grpc node module using electron node version.
#

#if [ ! -d ./deps/grpc ]; then
#    git clone https://github.com/grpc/grpc.git
#    cd deps/grpc
#    git submodule update --init
#    cd ../../
#fi

# Electron's version.
#export npm_config_target=1.4.15
export npm_config_target=1.6.2
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Install all dependencies, and store cache to ~/.electron-gyp.
#HOME=~/.electron-gyp npm install grpc
#HOME=~/.electron-gyp npm install git+https://github.com/grpc/grpc.git#40a947ef93aeddca3b606613f628d4d09f094e77
#HOME=~/.electron-gyp npm install ./deps/grpc
npm install ./deps/grpc

exit 0
