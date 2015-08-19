//casperjs --ignore-ssl-errors=yes --web-security=no collectors.js

var casper = require('casper').create({   
    verbose: true, 
	logLevel: "debug",
    pageSettings: {
         loadImages:  true,         // The WebPage instance used by Casper will
         loadPlugins: true,        // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    },
	 viewportSize: {
        width: 1400,
        height: 768
    },
    onWaitTimeout: function() {
        logConsole('Wait TimeOut Occured');
        this.capture('xWait_timeout.png');
        this.exit();
    },
    onStepTimeout: function() {
        logConsole('Step TimeOut Occured');
        this.capture('xStepTimeout.png');
        this.exit();
    }
});
phantom.injectJs('../custom/utils.js');
var collectors = ['../custom/Aviva.js','../custom/Orange.js'];
var json = require('config.json');
require('utils').dump(json);


casper.echo('RUNNING COLLECTORS-----------------------');
function runCollectors (index){
	if(index<collectors.length)
	{
		casper.echo('RUNNING COLLECTOR :' + index);
		casper.start();
		phantom.injectJs(collectors[index]);
		casper.run(function() {
		index++;
		runCollectors(index);
			}
		);
	}else
	{
	casper.echo('END OF JOB, ' + index + " collectors executed");
	casper.exit();
	}
}

runCollectors(0);
