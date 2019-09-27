# Default action
build:
	yarn build-dev

lint:
	yarn lint

# Run this after any npm install to make sure all dependencies work with electron's node verion
rebuild:
	./node_modules/.bin/electron-rebuild

# Check to see if any dependencies in package.json are outdated
check-dep-updates:
	yarn outdated

boilerplate-diff:
	diff -ru --exclude .git --exclude flow-typed --exclude yarn.lock --exclude README.md . ../boilerplate/erb/electron-react-boilerplate/ > boilerplate.diff

# Backend repo is source of truth for proto definitions
proto-copy:
	cp ../notekeeper-electron-backend/proto/*.proto app/proto/

# Regenerate nodejs protobuf definitions
proto:
	cd app/proto; ../../../protoc -I . *.proto --js_out=import_style=commonjs,binary:.

proto-gen:
	./scripts/proto-gen.sh
