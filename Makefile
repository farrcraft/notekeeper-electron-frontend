# Default action
build:
	npm run build

lint:
	npm run lint

# Run this after any npm install to make sure all dependencies work with electron's node verion
rebuild:
	./node_modules/.bin/electron-rebuild

boilerplate-diff:
	diff -ru --exclude .git --exclude flow-typed --exclude yarn.lock . ../boilerplate/electron-react-boilerplate/ > boilerplate.diff
