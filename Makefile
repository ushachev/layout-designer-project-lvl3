install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx pug-lint ./app/pug/**/*.pug

develop:
	npx gulp develop

build:
	NODE_ENV=production npx gulp

.PHONY: build
