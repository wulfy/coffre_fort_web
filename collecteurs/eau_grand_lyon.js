var urlConnexionInscription = 'https://agence.eaudugrandlyon.com/inscription.aspx';
var urlFactures = "https://agence.eaudugrandlyon.com/mon-espace-compte-consulter-facture.aspx";
var folder = files_path+"/"+"eau_grand_lyon";
var formConnect = 'form#connexionForm';
var base = "https://agence.eaudugrandlyon.com/";

casper.thenOpen(urlConnexionInscription, function openWebsite() {
	casper.waitForSelector("form input[name='valider-inscription']", function() {
		/*this.capture('1.png');*/
		casper.echo("connexion");
		capture(collector,'connexion.png');
		this.fill(formConnect, {
	        'login' :    login,
			'pass' : password,
	    }, true);
	   casper.echo("identifiants");
	});
});


casper.then(function logedIn() {
	casper.waitForSelector("#fast-action", function() {
			casper.echo("fast actions");
	});
});

casper.thenOpen(urlFactures, function openWebsite() {

	casper.waitForSelector("table.responsive", function() {
			var facturesUrl = this.getElementsInfo('table.responsive td a.facture-access');
			var facturesDate = this.getElementsInfo('table.responsive td.grey');
			var date = "";
			var url = "";
			casper.echo("downloading");
			for(var d=0; d<=facturesDate.length-1;d++)
			{
				
				date = facturesDate[d].html;
				String.prototype.replaceAll = function(search, replacement) {
	    				var target = this;
	    				return target.replace(new RegExp(search, 'g'), replacement);
				};

				date = date.replaceAll("\/","_");
				url = facturesUrl[d].attributes.href;
				require('utils').dump(url);
				this.download(base+url, folder+'/'+"eau_grand_lyon_"+date+".pdf");
			}
			
	});

});



/*
casper.run();*/