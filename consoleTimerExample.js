show: function(fields) {
        //get the ID of the app
        var id = this.$().attr('id'),
            // make some text label 
            allLabel = "Show all for " + id;
        //start the timer 
        console.time(allLabel);
        fields.forEach(function(field) {
          // make some text label 
          var label = "Show " + field + ' for ' + id;
          //start the timer 
          console.time(label);
          this.ticketFields(field).show();
          //stop the timer
          console.timeEnd(label);
        }, this);
        //stop the timer
        console.timeEnd(allLabel);
      },

      //https://developers.google.com/chrome-developer-tools/docs/console-api#consoleprofilelabel