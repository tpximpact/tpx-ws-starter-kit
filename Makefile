.PHONY: help list

# You can choose to use Docker for local development by specifying the
# USE_DOCKER=1 environment variable in your project .env file.
USE_DOCKER ?= 0

INCLUDE_ENV_FILE=true
ifeq (help, $(firstword $(MAKECMDGOALS)))
	INCLUDE_ENV_FILE=false
else ifeq (list, $(firstword $(MAKECMDGOALS)))
	INCLUDE_ENV_FILE=false
endif

## Optionally includes a `.env.local` file.
ifeq ($(INCLUDE_ENV_FILE), true)
-include .env.local
endif

npm=npm
ifeq ("${USE_DOCKER}","1")
npm=ddev npm
endif

# tpx_sk_sitename variables.
site=tpx_sk_sitename_snake ## Default site.
siteDir=default ## Default site directory.
theme=tpx-sk-sitename-kebab ## Default theme.
env=dev ## Default Acquia environment.

# tpx_sk_subsitename variables.
ifeq ($(strip $(site)), tpx_sk_subsitename_snake)
siteDir=$(site)
theme=tpx-sk-subsitename-kebab
endif

help: ## Lists all documented Make targets.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m\make %-30s\033[0m %s\n", $$1, $$2}'
list: help

docker-up:
	ddev start

docker-rm: ## Removes this projects containers.
	ddev stop
	ddev remove

docker-destroy: ## Destroy this projects containers & delete the database.
	ddev delete -O

start: ## Start the project containers.
	make docker-up
up: start ## Alias of `make start`

restart: ## Restart the project containers.
	ddev restart

stop: ## Stop the project containers.
	ddev stop
down: stop ## Alias of `make stop`

clean: ## Remove the project web-root & re-install dependencies.
	[ -d docroot ] && chmod -R 777 docroot
	rm -rf docroot vendor
	ddev composer install

install: ## Initialise project containers & install Drupal.
	make env
	make up
	make drupal-site-install
	make local-settings
	ddev restart

uninstall: ## Remove containers & uninstall Drupal.
	make docker-destroy
	rm -rf vendor

cr: ## Rebuild Drupal caches.
	ddev drush cr -l $(site)
cc: ## Alias of `make cr`
	make cr site=$(site)

cex: ## Export Drupal configuration.
	ddev drush cex -y -l $(site)

cim: ## Import Drupal configuration.
	ddev drush cim -y  -l $(site)

uli: ## Generate a one-time login link.
	ddev drush @local.$(siteDir) uli

env: ## Create a local environment variables file.
	cp .env.example .env.local

drupal-site-install: ## Install Drupal from existing site config.
	ddev composer install
	[ -d docroot/wingsuit/$(theme) ] || make build-theme theme=$(theme)
	ddev drush si --sites-subdir=$(siteDir) --existing-config -y -l $(site)
	make uli site=$(site)

local-settings: ## Add local Drupal development settings.
	cp docroot/sites/example.settings.local.php src/settings/settings.local.php
	echo "Created \`src/settings/settings.local.php\` from \`docroot/sites/example.settings.local.php\`"

mysql:
	ddev exec mysql -u db -pdb db

seed-db: ## Pull & import a database from an Acquia environment.
	ddev auth ssh
	ddev drush sql-sync -y -l $(site) @tpx_sk_acquia_sitename.$(env) @self --create-db --structure-tables-list=cache_bootstrap,cache_config,cache_container,cache_data,cache_default,cache_discovery,cache_dynamic_page_cache,cache_entity,cache_file_mdm,cache_menu,cache_page,cache_render,cache_toolbar,cachetags,sessions,watchdog
	ddev drush cim -y -l $(site)
	ddev drush cr -l $(site)
	ddev drush uli -l $(site)

seed-db-dev: ## Pull & import the `dev` environment database.
	make seed-db site=$(site) env=dev

seed-db-test: ## Pull & import the `test` environment database.
	make seed-db site=$(site) env=test

seed-db-prod: ## Pull & import the `prod` environment database.
	make seed-db site=$(site) env=prod

tests: coding-standards

phpunit:
	ddev exec 'SIMPLETEST_DB=$$(drush php:eval "print \Drupal\Core\Database\Database::getConnectionInfoAsUrl()") SIMPLETEST_BASE_URL=http://localhost bash -c "../vendor/bin/phpunit -c core modules/custom"'

coding-standards: ## Runs PHP code sniffer for custom modules.
	ddev composer phpcs

generate-component: ## Generate a Wingsuit component for the tpx_sk_sitename design system.
	$(npm) run prestart
	$(npm) run ws generate-component

watch-storybook:
	$(npm) run prestart
	$(npm) run dev:storybook:$(theme)

watch-storybook-tpx-sk-sitename-kebab: ## Watch & build changes for the tpx_sk_sitename Storybook design system.
	make watch-storybook theme=tpx-sk-sitename-kebab

watch-storybook-tpx-sk-subsitename-kebab: ## Watch & build changes for the tpx_sk_subsitename Storybook design system.
	make watch-storybook theme=tpx-sk-subsitename-kebab

watch-theme:
	$(npm) run prestart
	$(npm) run dev:drupal:$(theme)

watch-theme-tpx-sk-sitename-kebab: ## Watch & build changes for the tpx_sk_sitename Drupal theme.
	make watch-theme theme=tpx-sk-sitename-kebab

watch-theme-tpx-sk-subsitename-kebab: ## Watch & build changes for the tpx_sk_subsitename Drupal theme.
	make watch-theme theme=tpx-sk-subsitename-kebab

build-storybook:
	$(npm) run prestart
	$(npm) run build:storybook:$(theme)

build-storybook-tpx-sk-sitename-kebab: ## Build the tpx_sk_sitename Storybook/design system.
	make build-storybook theme=tpx-sk-sitename-kebab

build-storybook-tpx-sk-subsitename-kebab: ## Build the tpx_sk_subsitename Storybook/design system.
	make build-storybook theme=tpx-sk-subsitename-kebab

build-theme:
	$(npm) run prestart
	$(npm) run build:drupal:$(theme)

build-theme-tpx-sk-sitename-kebab: ## Build the tpx_sk_sitename Drupal theme.
	make build-theme theme=tpx-sk-sitename-kebab

build-theme-tpx-sk-subsitename-kebab: ## Build the tpx_sk_subsitename Drupal theme.
	make build-theme theme=tpx-sk-subsitename-kebab

lint-js: ## Lints JS for all design systems & Drupal themes and attempts to fix any errors.
	$(npm) run fmt:js
