//
//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Gdfsuez


var links = [];
					https://monagencepart.edf.fr/ASPFront/appmanager/ASPFront/front?_nfpb=true&_pageLabel=page_mes_factures&_nfls=false&numAcc=004017921734&portletInstance2=portlet_suivi_consommation_2&origine=acces_secondaire&accord=004017921734&page_redirect=page_mes_factures&service=page_mes_factures&service=page_mes_factures&redirect=true&privee=true
var urlFactures = 'https://monagencepart.edf.fr/ASPFront/appmanager/ASPFront/front?_nfls=false&origine=acces_secondaire&privee=true&_pageLabel=page_mes_factures&accord=004017921734&_nfpb=true&numAcc=004017921734&portletInstance2=portlet_suivi_consommation_2&page_redirect=page_mes_factures&service=page_mes_factures';
var urlSite = "https://particulier.edf.fr/fr/accueil.html";
var urlConnect = "https://particulier.edf.fr/fr/accueil/connexion/mon-espace-client.html";
var urlTableauDeBord = "https://particulier.edf.fr/fr/accueil/espace-client/tableau-de-bord.html";
var formSelect = 'form[id="formLogin__login_plain"]';
var folder = baseFolder+"/"+"Edf";

casper.thenOpen(urlConnect, function openWebsite() {

	casper.waitForSelector('.login-anonymous', function(){

		capture(collector,'edf1.png');
		this.echo("connexion");
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

	this.echo("Login");

	this.waitForSelector('.login_connectButton', function(){
		capture(collector,'login1.png');
		//this.clickLabel("Me connecter","div");
		this.click(".login_connectButton");
		capture(collector,'login.png');
		this.echo("clicked");
	},null,15000);

	this.waitForSelector('.isAuthentified.show', function(){
		this.echo("loginok");
		capture(collector,'loginok.png');
	},null,15000);


});

var badwords = ["\t","</td>","\n","  ",">"];
var i=-1;

casper.thenOpen(urlTableauDeBord,function openFileList() {
	casper.click('a[data-id="Toutes les factures"]');
capture(collector,'openfactures.png');
this.echo("URL Factures");
	casper.waitForSelector('.factures', function(){
capture(collector,'factures.png');
	var urlZip = "https://monagencepart.edf.fr/ASPFront/appmanager/ASPFront/front?_nfls=false&_nfpb=true&_pageLabel=private/page_mes_factures&zip=1";
		this.download(urlZip, folder+'/'+"Edf-factures.zip");

		this.echo("unziping");
		var childProcess;
	  try {
	    childProcess = require("child_process");
	  } catch (e) {
	    this.echo(e + " error");
	  }
	  if (childProcess) {
	  	this.echo("processing : " + " unzip "+folder+'/'+"Edf-factures.zip -d "+folder);
	    childProcess.execFile("/usr/bin/unzip", [folder+'/'+"Edf-factures.zip","-d",folder], null, function (err, stdout, stderr) {
	      this.echo("execFileSTDOUT:"+ JSON.stringify(stdout)+ ' debug');
	      this.echo("execFileSTDERR:"+ JSON.stringify(stderr)+ ' debug');
	    });
	    childProcess.execFile("chmod", ["744",folder+'/*'], null, function (err, stdout, stderr) {
	      this.echo("execFileSTDOUT:"+ JSON.stringify(stdout)+ ' debug');
	      this.echo("execFileSTDERR:"+ JSON.stringify(stderr)+ ' debug');
	    });
	    this.echo("Done");
	  } else {
	    this.echo("Unable to require child process, warning");
	  }

	
	
	},null,15000);
	
});
/*
casper.run();*/