#!/bin/sh
#
# Rebuild grpc node module using electron node version.
#

# Electron's version.
export npm_config_target=1.4.15
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install grpc

exit 0
