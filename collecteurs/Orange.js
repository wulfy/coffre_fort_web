//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Orange
//casperjs --ignore-ssl-errors=yes --ssl-protocol=any --collector=Orange
var mouse = require("mouse").create(casper);
var links = [];
var filePrefix = "Orange-Internet_";
var url = 'http://www.orange.fr/portail';
var url1 = 'https://authweb.orange.fr/auth_user/bin/auth_user.cgi';
var loginform = 'https://id.orange.fr/auth_user/bin/auth_user.cgi?service=nextecare&return_url=https%3A%2F%2Fespaceclientv3.orange.fr%2Fmaf.php%3FurlOk%3Dhttps%25253A%25252F%25252Fm.espaceclientv3.orange.fr%25252F%25253Fpage%25253Dfactures-archives%26applicationUnivers%3Dn%2Fa%26sectionId%3DNEC-FPC-HISTORIQUE%26cd%3DU%26idContrat%3D%26lineNumber%3D%26bodyLineNumber%3D';
var urlfacture = "https://m.espaceclientv3.orange.fr/maf.php?urlOk=https%3A%2F%2Fm.espaceclientv3.orange.fr%2F%3Fpage%3Dfactures-archives&applicationUnivers=n/a&sectionId=NEC-FPC-HISTORIQUE&cd=U&idContrat=&lineNumber=&bodyLineNumber=";
var startDateIdentifier = "date=";
var endDateIdentifier = "&origin";
var folder = baseFolder+"/"+'Orange';
var formSelect = 'form[id="AuthentForm"]';
var waitTimeout = 1000;
var autologged = false;

casper.echo("starting");

casper.thenOpen(url, function openWebsite() {
	capture(collector,'start.png');

	this.waitForSelector("#o-logged", function then(){
		casper.echo("AUTO LOGGED");
		autologged = true;
	}, function timeout(){
		casper.echo("NEED LOGIN");
		//mouse.click('.btn-ident.o_r_identifier'); 
	},10000);
	
	
});


//fill form of login page
if(!autologged)
casper.thenOpen(loginform, function fillForm() {
capture(collector,'form.png');
this.echo("fillForm");
	this.waitForSelector(formSelect, function (){
		if(debug)
			casper.echo("FORM FOUND ");

		this.fill(formSelect, {
			'credential':    login,
			'password': password
		}, false);
		casper.echo("IN FORM FOUND ");
		//submit form
		casper.then(function submitForm() {
					this.click("input[value='s’identifier']");
					this.mouse.click("input[value='s’identifier']");
				capture(collector,'formposted.png');
				this.wait(1000);//attente semble t il necessaire pour laisser le temps a la page de se charger
		});
	},function (){
		casper.echo("NO FORM, CONTINUING CONNECTED MODE");
	},waitTimeout);
		
});


casper.echo("factures");
//open data oage
/*casper.thenOpen(urlfacture, function openWebsite() {
			if(debug)
				casper.echo("factures opened");
});*/


//select contract (sosh/internet)
casper.then(function openFilesPage() {
	capture(collector,'factures.png');
		casper.waitForSelector('input[id="9037277644"]', function() {
					this.click('input[id="9037277644"]');
					this.click('.maf_valider_enabled');
					casper.echo("contrat Internet selectionne");
			}, null, 3000);
		this.wait(2000);

		if(debug)
			casper.echo("suite");
});

//download files
casper.then(function dlFilesPage() {
	capture(collector,'Orange2.png');
	facturesUrl = this.getElementsInfo('ul.factures .telecharger a');
	facturesDate = this.getElementsInfo('ul.factures li span.date');

	var i = 0;
	this.each(facturesUrl, function(self,factureUrl) {
		filename = facturesDate[i].text;
		url = factureUrl.attributes.href;
		filename = formatDate(filename);
		casper.echo(url + " O->" + folder+'/'+filePrefix+filename+".pdf");
		this.download(url, folder+'/'+filePrefix+filename+".pdf");
		i++;
		
	});
	
});

//switch to sosh
var soshfolder = baseFolder+"/"+'Sosh';
var soshfilePrefix = "Sosh_";
casper.thenOpen(urlfacture, function openSoshWebsite() {
			if(debug)
				casper.echo("factures opened");
			
			
});

//select contract (sosh/internet)
casper.then(function openSoshFilesPage() {
		casper.waitForSelector('input[id="9002210886"]', function() {
					this.click('input[id="9002210886"]');
					this.click('.maf_valider_enabled');
					casper.echo("contrat sosh selectionne");
			},null,3000);
		

		if(debug)
			this.log("sosh");
});

//download data
casper.then(function dlSoshFilesPage() {
	capture(collector,'sosh.png');
	var soshfacturesUrl = this.getElementsInfo('ul.factures .telecharger a');
	var soshfacturesDate = this.getElementsInfo('ul.factures li span.date');
	var filename = "";
	var url = null;
	var i = 0;
	this.each(soshfacturesUrl, function(self,soshfactureUrl) {
		filename = soshfacturesDate[i].text;
		url = soshfactureUrl.attributes.href;
		filename = formatDate(filename);
		this.download(url, soshfolder+'/'+soshfilePrefix+filename+".pdf");
		i++;
		
	});
	
});



/*
casper.run();*/