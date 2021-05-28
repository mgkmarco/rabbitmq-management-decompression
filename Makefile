PROJECT = rabbitmq_management_decompression
PROJECT_DESCRIPTION = Decompression of Messages

define PROJECT_APP_EXTRA_KEYS
	{
		broker_version_requirements, []
	}
endef

DEPS = rabbit_common rabbit rabbitmq_management

DEP_EARLY_PLUGINS = rabbit_common/mk/rabbitmq-early-plugin.mk
DEP_PLUGINS = rabbit_common/mk/rabbitmq-plugin.mk

ERLANG_MK_REPO = https://github.com/rabbitmq/erlang.mk.git
ERLANG_MK_COMMIT = rabbitmq-tmp

include rabbitmq-components.mk
include erlang.mk