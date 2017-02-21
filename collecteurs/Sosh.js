phantom.injectJs(collectorsPath+'orange_sosh.js');

//switch to sosh
var soshfolder = files_path+"/"+'Sosh';
var soshfilePrefix = "Sosh_";

casper.echo("Sosh.js");
//select contract (sosh/internet)
casper.then(function openSoshFilesPage() {

		casper.waitForSelector('.ec-panelAuthFrontMod-offerLabel', function() {
					this.clickLabel('Contrat Sosh', 'span');
					//this.click('.maf_valider_enabled');
					casper.echo("contrat sosh selectionne");
			},null,2000);
		
		if(debug)
			this.log("sosh");
});

//download data
casper.then(function dlSoshFilesPage() {
	console.log("start DL");
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