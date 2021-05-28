-module(rabbit_compression).

-behaviour(rabbit_mgmt_extension).

-export([dispatcher/0, web_ui/0]).

-import(rabbit_misc, [pget/2]).

-include_lib("rabbitmq_management_agent/include/rabbit_mgmt_records.hrl").

dispatcher() -> [].
web_ui()     -> [{javascript, <<"compression.js">>}].