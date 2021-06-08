# rabbitmq-management-decompression
## _A modest & un-obtrusive plugin to decompress payloads from rabbitmq management_

## Features
- Un/Install like and other official or community based plugin  
- **Decompress Payload** button will only be available for messages with header **_z-compression-type_**
- Pretty-print JSON payloads

### Demo 

![HighLevel](/resources/demo.gif)

## Compression Algorithms Support

The plugin currently supports decompression for the following algorithm/s:  

| Algorithm | Header | Support | Link |
| ------ | ------ | ------ | ------ | 
| Brotli | z-compression-type=Brotli | - [x] | https://brotli.org/ |
| Gzip | z-compression-type=Gzip | _coming soon_ | https://www.gzip.org/ |
| Deflate | z-compression-type=Deflate |  _coming soon_ | https://www.w3.org/Graphics/PNG/RFC-1951 |

## Installing

The _.EZ_ distribution could be installed as follows: 

Linux Distro   

```sh
#assuming rabbitmq_management_decompression-<version>.ez resides in the current path 
cp rabbitmq_management_decompression-<version>.ez <path-to-rabbitmq_server>/plugins
rabbitmq-plugins enable rabbitmq_management_decompression

#to verify successfull installation 
rabbitmq-plugins list
```

Windows

```sh
#assuming rabbitmq_management_decompression-<version>.ez resides in the plugins path of the server
cd <path-to-rabbitmq_server>\sbin
rabbitmq-plugins enable rabbitmq_management_decompression

#to verify successfull installation 
rabbitmq-plugins list
```

Docker Container

```sh
#assuming rabbitmq_management_decompression-<version>.ez resides in the current path
docker container start <container-id>
docker cp rabbitmq_management_decompression-<version>.ez <container-id>:/plugins
docker container exec -it <container-id> /bin/bash
cd /plugins
rabbitmq-plugins enable rabbitmq_management_decompression

#to verify successfull installation 
rabbitmq-plugins list
```

## Building from Source

You can build and install it like any other plugin. See: 

- [Plugin Development Basics](https://www.rabbitmq.com/plugin-development.html)

Make sure to have all the required pre-requisites: 

- [Required Libraries and Tools](https://www.rabbitmq.com/build-server.html#prerequisites) 

If on linux, one might need to install [asdf](https://github.com/asdf-vm/asdf) to manage different versions.

Other useful links:

- [Erlang](https://erlang.mk/guide/installation.html)
- [rebar3](https://rebar3.readme.io/docs/getting-started )
- [GnuWin32 for MAKE on windows](http://gnuwin32.sourceforge.net/packages/make.htm)