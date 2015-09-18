//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Orange
//casperjs --ignore-ssl-errors=yes --ssl-protocol=any --collector=Orange
var mouse = require("mouse").create(casper);
var links = [];
var filePrefix = "Orange-Internet_";
var url = 'http://www.orange.fr'
var url1 = 'https://authweb.orange.fr/auth_user/bin/auth_user.cgi';
var urlfacture = "https://m.espaceclientv3.orange.fr/maf.php?urlOk=https%3A%2F%2Fm.espaceclientv3.orange.fr%2F%3Fpage%3Dfactures-archives&applicationUnivers=n/a&sectionId=NEC-FPC-HISTORIQUE&cd=U&idContrat=&lineNumber=&bodyLineNumber=";
var startDateIdentifier = "date=";
var endDateIdentifier = "&origin";
var folder = baseFolder+"/"+'Orange';
var formSelect = 'form[id="AuthentForm"]';
debug = 1;

casper.thenOpen(url, function openWebsite() {
	capture(collector,'start.png');
	this.click('.btn-ident.o_r_identifier'); 
	
});

//fill form of login page
casper.then(function fillForm() {
capture(collector,'form.png');
	casper.waitForSelector(formSelect, function(){
		if(debug)
			this.echo("FORM FOUND ");

		this.fill(formSelect, {
			'credential':    login,
			'password': password
		}, false);

		//submit form
		casper.then(function submitForm() {
					this.click("input[value='s’identifier']");
					this.mouse.click("input[value='s’identifier']");
				capture(collector,'formposted.png');
				this.wait(1000);//attente semble t il necessaire pour laisser le temps a la page de se charger
		});
	});
		
});

//open data oage
casper.thenOpen(urlfacture, function openWebsite() {
			if(debug)
				this.echo("factures opened");
});


//select contract (sosh/internet)
casper.then(function openFilesPage() {
		casper.waitForSelector('input[id="32820313"]', function() {
					this.click('input[id="32820313"]');
					this.click('.maf_valider_enabled');
					this.echo("contrat Internet selectionne");
			}, null, 3000);
		this.wait(2000);

		if(debug)
			this.echo("suite");
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
		//this.echo(url + " O->" + folder+'/'+filePrefix+filename+".pdf");
		this.download(url, folder+'/'+filePrefix+filename+".pdf");
		i++;
		
	});
	
});

//switch to sosh
var soshfolder = baseFolder+"/"+'Sosh';
var soshfilePrefix = "Sosh_";
casper.thenOpen(urlfacture, function openSoshWebsite() {
			if(debug)
				this.echo("factures opened");
			
			
});

//select contract (sosh/internet)
casper.then(function openSoshFilesPage() {
		casper.waitForSelector('input[id="24195956"]', function() {
					this.click('input[id="24195956"]');
					this.click('.maf_valider_enabled');
					this.echo("contrat sosh selectionne");
			},null,3000);
		

		if(debug)
			this.log("sosh");
});

//download data
casper.then(function dlSoshFilesPage() {
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