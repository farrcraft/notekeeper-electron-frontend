#!/bin/bash -ex
#
# Generate *.js & *.d.ts typescrypt definitions from the *.proto files
#

WORK_DIR=`pwd`

# Path to this plugin
# The .cmd extension is specific to work on the windows/msys2 bash platform
PROTOC_GEN_TS_PATH="${WORK_DIR}/node_modules/.bin/protoc-gen-ts.cmd"
PROTO_BIN=${WORK_DIR}/../protoc

# Directory to write generated code to (.js and .d.ts files)
#OUT_DIR="${WORK_DIR}/app/proto/"
OUT_DIR="."

cd app/proto
../../../protoc \
    -I . \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    *.proto
