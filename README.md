## Tealium Collect for Node-RED

This node publishes a payload of data (JSON Object) to Tealium's HTTP API.

Detailed documentation on Tealium Collect HTTP API can be found here: https://community.tealiumiq.com/t5/Universal-Data-Hub/Tealium-Collect-HTTP-API/ta-p/16893

## Installation

The easiest way to install is through the Node-RED Palette Manager that can be found in the menu on the top right hand corner of the Node-RED ui.

## Installation

(1) Edit the node and set Tealium Account, Profile, and Datasource values.
(2) Connect a JSON message node to the 'tealium-collect' node (*see note)
(3) Deploy
(4) Validate the incoming data in Tealium's EventStream Live Events monitor.

*Note: The outgoing message from a node (such as MQTT) may not be a JSON string.  Use JavaScript function node or other utility nodes to 
create or format a JSON object before sending to tealium-collect node.

### Manual install with npm

```sh
cd ~./node-red
npm install node-red-contrib-tealium-collect
```

### Install from source
From github:
Navigate to the your home directory ~/.node-red/node-modules
```sh
git clone https://github.com/Tealium/tealium-node-red.git
```
```sh
cd tealium-node-red
npm install
```

