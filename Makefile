# Backend repo is source of truth for proto definitions
proto-copy:
	cp ../notekeeper-electron-backend/src/proto/*.proto app/proto/

# Regenerate nodejs grpc definitions
proto-gen:
	./node_modules/grpc-tools/bin/protoc --js_out=import_style=commonjs,binary:./ --grpc_out=./ --plugin=protoc-gen-grpc=./node_modules/grpc-tools/bin/grpc_node_plugin.exe app/proto/backend.proto
