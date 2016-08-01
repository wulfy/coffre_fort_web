//
//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Gdfsuez


var links = [];

var urlFactures = 'https://monagencepart.edf.fr/ASPFront/appmanager/ASPFront/front?_nfls=false&origine=acces_secondaire&privee=true&_pageLabel=page_mes_factures&accord=004017921734&_nfpb=true&numAcc=004017921734&portletInstance2=portlet_suivi_consommation_2&page_redirect=page_mes_factures&service=page_mes_factures&redirect=true';
var urlSite = "https://particulier.edf.fr/fr/accueil.html";
var formSelect = 'form[id="formLogin__login_plain"]';
var folder = baseFolder+"/"+"Edf";

casper.thenOpen(urlFactures, function openWebsite() {

	casper.waitForSelector('.login-anonymous', function(){

		capture(collector,'edf1.png');
		mylog("connexion");
		//this.click('.isAnonymous');
		//this.wait(1000);
		capture(collector,'openform.png');
		
		this.fill(formSelect, {
	        'login' :    login,
			'motdepasse' : password,
	    }, false);

		capture(collector,'filled.png');

	},null,5000);
    
});

casper.then(function logIn() {

	mylog("Login");

	this.waitForSelector('.login_connectButton', function(){
		capture(collector,'login1.png');
		//this.clickLabel("Me connecter","div");
		this.click(".login_connectButton");
		capture(collector,'login.png');
		mylog("clicked");
	},null,15000);

	this.waitForSelector('.isAuthentified.show', function(){
		mylog("loginok");
		capture(collector,'loginok.png');
	},null,20000);


});

var badwords = ["\t","</td>","\n","  ",">"];
var i=-1;

casper.thenOpen("https://particulier.edf.fr/fr/accueil/espace-client/tableau-de-bord.html",function () {
	this.wait(5000);
capture(collector,'test-log.png');
});

casper.then(function openFileList() {
capture(collector,'openfactures.png');
mylog("URL Factures");
	//casper.waitForSelector('.factures', function(){
capture(collector,'factures.png');

	var urlZip = "https://monagencepart.edf.fr/ASPFront/com/edf/asp/portlets/historiquefactures/telechargerZip.do";
		this.download(urlZip, folder+'/'+"Edf-factures.zip");

		mylog("unziping");
		var childProcess;
	  try {
	    childProcess = require("child_process");
	  } catch (e) {
	    mylog(e + " error");
	  }
	  if (childProcess) {
	  	mylog("processing : " + " unzip "+folder+'/'+"Edf-factures.zip -d "+folder);
	    childProcess.execFile("/usr/bin/unzip", [folder+'/'+"Edf-factures.zip","-d",folder], function (err, stdout, stderr) {
	      mylog("execFileSTDOUT:"+ JSON.stringify(stdout)+ ' debug');
	      mylog("execFileSTDERR:"+ JSON.stringify(stderr)+ ' debug');
	    });
	    childProcess.execFile("chmod", ["744",folder+'/*'], null, function (err, stdout, stderr) {
	      mylog("execFileSTDOUT:"+ JSON.stringify(stdout)+ ' debug');
	      mylog("execFileSTDERR:"+ JSON.stringify(stderr)+ ' debug');
	    });
	    mylog("Done");
	  } else {
	    mylog("Unable to require child process, warning");
	  }

	
	
	//},null,5000);
	
});
/*
casper.run();*/