#frontend
FRONTEND_SRC=frontend
BUILD_DIR=static

SCRIPT_DEV_PARAMS=--debug

NPM_DIR=$(FRONTEND_SRC)/node_modules/.bin
BROWSERIFY=$(NPM_DIR)/browserify
UGLIFYJS=$(NPM_DIR)/uglifyjs
UGLIFYCSS=$(NPM_DIR)/uglifycss
LESS=$(NPM_DIR)/lessc
WATCH=$(NPM_DIR)/wr
UNCSS=$(NPM_DIR)/uncss
CLOSURE=$(NPM_DIR)/ccjs

init:
	npm install

watch:
	$(WATCH) --exec 'make dev' $(FRONTEND_SRC)/scripts $(FRONTEND_SRC)/styles

reset:
	mkdir -p $(BUILD_DIR) && \
	rm -rf $(BUILD_DIR)/* && \
	mkdir $(BUILD_DIR)/js $(BUILD_DIR)/css $(BUILD_DIR)/img $(BUILD_DIR)/fonts && \
	mkdir $(BUILD_DIR)/css/fonts

dev: reset scripts styles

scripts:
	$(BROWSERIFY) $(SCRIPT_DEV_PARAMS) $(FRONTEND_SRC)/scripts/main.js > $(BUILD_DIR)/js/bundle.js

styles:
	$(LESS) --source-map-less-inline --source-map-map-inline --clean-css $(FRONTEND_SRC)/styles/main.less $(BUILD_DIR)/css/bundle.css

fonts:
	cp $(FRONTEND_SRC)/fonts/* $(BUILD_DIR)/fonts && \
	chmod 664 $(BUILD_DIR)/fonts/*

images:
	cp -a $(FRONTEND_SRC)/images/. $(BUILD_DIR)/img
