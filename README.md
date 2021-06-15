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

Linux Distro Installation

```sh
#assuming rabbitmq_management_decompression-<version>.ez resides in the current path 
cp rabbitmq_management_decompression-<version>.ez <path-to-rabbitmq_server>/plugins
rabbitmq-plugins enable rabbitmq_management_decompression

#to verify successfull installation 
rabbitmq-plugins list
```

Windows Installation

```sh
#assuming rabbitmq_management_decompression-<version>.ez resides in the plugins path of the server
cd <path-to-rabbitmq_server>\sbin
rabbitmq-plugins enable rabbitmq_management_decompression

#to verify successfull installation 
rabbitmq-plugins list
```

Installing on an Existing Docker Container

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

If on linux, one might need to install [asdf](https://github.com/asdf-vm/asdf) to manage different versions of the OTP.

Run usual MAKE commands (```make clean/distclean/dist/run-broker```). To generate ```*.EZ``` execute ```make dist DIST_AS_EZS=1``` 

Other useful links:

- [Erlang](https://erlang.mk/guide/installation.html)
- [rebar3](https://rebar3.readme.io/docs/getting-started )
- [GnuWin32 for MAKE on windows](http://gnuwin32.sourceforge.net/packages/make.htm)

## Docker Image & Container Build

All the required resources to build and run the container are found here: [Image folder](/image)

### Broker Definitions as Parameter 

When building the container, it is possible to pass a broker definitions file such as [_definitions.json_](/image/_definitions.json). The broker definitions will spawn an instance of the broker with any usernames and passwords, v-hosts, shovels, exchanges, queues, etc... It is extremely useful to mimic already existing environments. 

To pass your own definitions.json, there are two possible ways (_definitions can be anything, as long as it is a valid json): 
1. Via docker compose, such as: ```docker-compose build --build-arg definitions=_definitions.json```
2. Or when building the image manually, such as: ```docker build --build-arg definitions=_definitions.json -t rabbit_consistent:1.0 .```

Once the container is started, the definitions.json is copied over to ```/etc/rabbitmq```. If you need to alter it vi or whatever tool you use once inside the container, i.e. ```docker container exec -it <container-name/id> /bin/bash``` and then ```cd /etc/rabbitmq``` 

The script ```passhash.sh``` should be used to generate a SHA256 of the password for the definitions file. To generate the password has just execute as ```sh passhash.sh "thisismypassword"```. For the record, the script is also copied over in the container image location ```/usr/local/bin/``` for any future needs. 

If no broker definitions are passed, default behaviour is applied. 

### Create and Run from Image

Usual process (remember to expose ports): ```docker run -d -p 5672:5672 -p 15672:15672 --name <container-name> <image-id/name:tag>```
