const https = require('https');


module.exports = function(RED) {
    function tealiumCollect(config) {
        RED.nodes.createNode(this,config);
        var node = this;
       
        /**
         * Account and Profile values required, Datasource optional
         */

        // node.log(JSON.stringify(config));
        this.tealiumAccount = config.inputAccount.toString();
        this.tealiumProfile = config.inputProfile.toString();
        this.tealiumDatasource = config.inputDatasource.toString();
        this.nodeRedVersion = RED.version();
        node.log('Account: ' + this.tealiumAccount + ', Profile: ' + 
                  this.tealiumProfile + ', Datasource: ' +
                  this.tealiumDatasource);

        node.on('input', function(msg) {
            var req,
                data,
                httpsConfig,
                payload = msg.payload;

            payload.tealium_account = this.tealiumAccount;
            payload.tealium_profile = this.tealiumProfile;
            payload.tealium_datasource = this.tealiumDatasource;
 
            // Default tealium_event value if not already specified
            payload.tealium_event = payload.tealium_event || "node_red";
            payload.node_red_id = this.id;
            payload.node_red_version = this.nodeRedVersion;
            // node.debug(payload);
            
            data = JSON.stringify(payload);
            httpsConfig = {
                hostname: 'collect.tealiumiq.com',
                port: 443,
                method: 'POST',
                path: '/event',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            }
      
            req = https.request(httpsConfig, (res) => {
                if (res.statusCode !== 200) {
                    node.warn('Tealium Collect endpoint responded with status: ' + res.statusCode)
                }

                res.on('data', (d) => {
                    process.stdout.write(d);
                })
              });

            req.on('error', (error) => {
                node.warn(error);
            });

            req.write(data);
            req.end();
            // If we make it this far, we'll update status
            this.status({fill:"blue",shape:"dot",text:"data sent"});
        });

    }
    RED.nodes.registerType('tealium-collect',tealiumCollect);
}
