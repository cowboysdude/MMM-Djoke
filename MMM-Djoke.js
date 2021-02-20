/* Magic Mirror
 * Module: MMM-Djoke
 *
 * By cowboysdude
 *
 */
Module.register("MMM-Djoke", {

    defaults: {
        updateInterval:  5 * 60 * 1000,
        animationSpeed: 1000,
        initialLoadDelay: 875,
        token: ''		
    },

    getStyles: function() {
        return ["MMM-Djoke.css"];
    }, 

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.config.lang = this.config.lang || config.language;
		this.sendSocketNotification("CONFIG", this.config);

        // Set locale.
        this.today = "";
        this.scheduleUpdate();
    },


    getDom: function() { 

        var wrapper = document.createElement("div");
        wrapper.className = "description"; 
        wrapper.innerHTML = this.joke; 
        return wrapper;

    },

    processJoke: function(data) {
        this.joke = data.text;
console.log(this.joke);		
        this.updateDom(this.config.animationSpeed);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getJoke();
        }, this.config.updateInterval);
        this.getJoke(this.config.initialLoadDelay);
    },

    getJoke: function() {
        this.sendSocketNotification('GET_JOKE');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "JOKE_RESULT") {
            this.processJoke(payload);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
