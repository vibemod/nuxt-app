############################################################
# PROJECT ##################################################
############################################################
.PHONY: project
project: install setup

.PHONY: init
init:
	cp .env.example .env

.PHONY: install
install:
	npm install

.PHONY: setup
setup:
	@echo "OK"

.PHONY: clean
clean:
	rm -rf .nuxt .output node_modules/.cache

############################################################
# DEVELOPMENT ##############################################
############################################################
.PHONY: qa
qa: lint

.PHONY: lint
lint:
	npm run lint

.PHONY: dev
dev:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: preview
preview:
	npm run preview

.PHONY: generate
generate:
	npm run generate
