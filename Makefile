install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss
	npx pug-lint ./app/pug/**/*.pug

develop:
	npx gulp develop

build:
	npx gulp

.PHONY: build
