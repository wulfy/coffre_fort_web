phantom.injectJs(collectorsPath+'orange_sosh.js');

//switch to sosh
var soshfolder = files_path+"/"+'Sosh';
var soshfilePrefix = "Sosh_";


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