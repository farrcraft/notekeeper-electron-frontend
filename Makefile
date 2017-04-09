# Default action
build:
	npm run build

lint:
	npm run lint

# Run this after any npm install to make sure all dependencies work with electron's node verion
rebuild:
	./node_modules/.bin/electron-rebuild

boilerplate-diff:
	diff -ru --exclude .git --exclude flow-typed --exclude yarn.lock --exclude README.md . ../boilerplate/electron-react-boilerplate/ > boilerplate.diff

# Backend repo is source of truth for proto definitions
proto-copy:
	cp ../notekeeper-electron-backend/src/proto/*.proto app/proto/

# Regenerate nodejs protobuf definitions
proto:
	./node_modules/grpc-tools/bin/protoc --js_out=import_style=commonjs,binary:./ app/proto/rpc.proto
