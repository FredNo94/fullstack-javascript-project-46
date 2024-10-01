install: deps-install
	npx simple-git-hooks

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

gendiff:
	node bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish