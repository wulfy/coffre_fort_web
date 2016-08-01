//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=<<collector name>> --ssl-protocol=any [--log-level='debug']

/*var tempCasper = require('casper').create();*/




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
        //logConsole('Wait TimeOut Occured');
        casper.capture('./data/screens/xWait_timeout.png');
        casper.echo("wait timeout");
        casper.exit();
    },
    onStepTimeout: function() {
        //logConsole('Step TimeOut Occured');
        casper.echo("step timeout");
        casper.capture('xStepTimeout.png');
        casper.exit();
    }
});

function capture(collectorname,screenname){
	if(debug)
		casper.echo("capturing " + screenname);
	casper.capture("./data/screens/"+collectorname+"/"+screenname);
}	

var collectors = ['Aviva','Orange','Gdfsuez','Edf'];
//var baseFolder = '../docs';
var baseFolder = './data/docs';
var fullPath = "";
var collectorsPath = "";
var fs = require('fs');

var currentFile = require('system').args[3];
var curFilePath = currentFile.substring(0, currentFile.lastIndexOf('/'));//fs.absolute(currentFile);

collectorsPath = curFilePath+"/";
//baseFolder = collectorsPath+'../docs';

if(casper.cli.has("fullpath"))
{
	fullPath = casper.cli.get("fullpath");
	baseFolder = fullPath+'/docs';
	collectorsPath = fullPath+"/collecteurs/";
}

if(casper.cli.has("collector"))
{
	if(collectors.indexOf(casper.cli.get("collector")) > -1)
		collectors = [''+casper.cli.get("collector")]
}
/**************************************
	include libraries
***************************************/
phantom.injectJs(collectorsPath+'utils.js');
/********************************************/

var logLvl = "";
var debug=true;

if(casper.cli.has("log-level"))
	logLvl = casper.cli.get("log-level");

//if(stristr(logLvl,'debug'))
//	debug = true;

casper.echo('CURFILEPATH :' + curFilePath);	
casper.echo('CONFIG BASEFOLDER :' + baseFolder);
casper.echo('CONFIG COLLECTORS PATH :' + collectorsPath);
var collector = casper.cli.get("collector");

var fs = require('fs')
var jsondata = fs.read(collectorsPath+'config.json');

//var json = require('collector.json');
var json = JSON.parse(jsondata);

//require('utils').dump(json);

if (typeof collector != 'undefined' && null !=collector)
{
	collectors = [''+collector];
	casper.echo('RUNNING 1 COLLECTOR (COMMAND FORCED)-----------------------');
	var login = json.passwords[collector].login;
	var password = json.passwords[collector].password;

}else
{
	casper.echo('RUNNING ALL COLLECTORS-----------------------');
}

function mylog(log){
	if (debug) {
		casper.echo(log);
	};
}

function runCollectors (index){
	if(index<collectors.length)
	{
		collector = collectors[index];
		casper.echo('RUNNING COLLECTOR :' + collector);
		var start = new Date().getTime();
		casper.start();
		phantom.injectJs(collectorsPath+collector+'.js');
		casper.echo('RUNNING COLLECTOR PATH ' + collectorsPath+collector+'.js');
		var end = new Date().getTime();
		var time = end - start;


		casper.run(function() {
			casper.echo('COLLECTOR ' + collector + ' ENDED SUCCESSFULLY AFTER ' + time + ' seconds');
			index++;
			runCollectors(index);
		});
	}else
	{
	casper.echo('END OF JOB, ' + index + " collectors executed");
	casper.exit();
	}
}

runCollectors(0);
