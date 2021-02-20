/* Magic Mirror
 * Module: MMM-Djoke
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
const request = require('request'); 

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);
    },


  getArt: function() {
     request({    
				 //'content-type': 'application/json',
				  url: 'https://icanhazdadjoke.com/slack', 
				  method: 'GET',
				  
    	        }, (error, response, body) => { 
            if (!error && response.statusCode === 200) {
                        var result = JSON.parse(body);
	console.log();					
                         this.sendSocketNotification("JOKE_RESULT", result.attachments[0]);
            }
       });
     
},

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
        } else if (notification === 'GET_JOKE') {
            this.getArt();
        }
    }
});
