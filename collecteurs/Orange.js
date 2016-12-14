phantom.injectJs(collectorsPath+'orange_sosh.js');
casper.echo("Orange.js");
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




/*
casper.run();*/