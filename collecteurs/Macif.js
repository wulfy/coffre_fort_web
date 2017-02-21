
var urlFactures = "https://www.macif.fr/assurance/particuliers/vos-espaces-macif/espace-assurance/factures--avis-decheance";
var jsonFacturesUrl = "https://ssm.macif.fr/internet-espaceclient-rest/personnes/19603156937/document/avisecheance";
var folder = files_path+"/"+"Macif";
var formConnect = 'form#loginForm';
var token = "";

String.prototype.replaceAll = function(search, replacement) {
	    				var target = this;
	    				return target.replace(new RegExp(search, 'g'), replacement);
				};


casper.thenOpen(urlFactures, function openWebsite() {
	casper.waitForSelector("#loginButton", function() {
		/*this.capture('1.png');*/
		casper.echo("connexion");
		
		this.fill(formConnect, {
	        'login' :    login,
			'password' : password,
	    }, true);
	   casper.echo("identifiants");
	});


});

casper.wait(2000);

casper.thenOpen(urlFactures,function setTokenHeader(){

	console.log("set token header");

	this.currentResponse.headers.forEach(function(header){
		var cookie = "";
		var start = 0;
		var stop = 0;
		var tokenString = "";
		if(header.name === 'Set-Cookie')
		{
			cookie = header.value;
			start = cookie.indexOf("=") +1;
			stop = cookie.indexOf(";");
			tokenString = cookie.substring(start,stop);
			token = tokenString.replaceAll('"','');
		}
	    
	  });

	casper.page.customHeaders = {
	        "X-Auth-Token": token
	    };
});

casper.thenOpen(jsonFacturesUrl,function dlFactures() {
    
    casper.wait(2000);

	var jsonFactures = JSON.parse(this.getPageContent());
	var data = jsonFactures.data;
	var url = "";

	console.log("downloading");

	data.forEach(function(facture) {
      url = jsonFacturesUrl+'/'+ facture.znRefPublicDocElec + '?token='+encodeURIComponent(token);

      try{
	  		casper.download(url, folder+'/'+"Macif_"+facture.znAnnee+".pdf");
		}catch(e)
		{
			require('utils').dump(e);
		}

	});


});



/*
casper.run();*/