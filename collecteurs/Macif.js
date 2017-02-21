
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
		capture(collector,'connexion.png');
		this.fill(formConnect, {
	        'login' :    login,
			'password' : password,
	    }, true);
	   casper.echo("identifiants");
	});


});

casper.wait(5000);

casper.thenOpen(urlFactures,function setTokenHeader(){

	this.currentResponse.headers.forEach(function(header){
		console.log(header.name +  " => " + header.value + "<br/> \r\n")
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

	console.log(token);
	casper.page.customHeaders = {
	        "X-Auth-Token": token
	    };
});

casper.thenOpen(jsonFacturesUrl,function dlFactures() {

	/*this.open(jsonFactures, {
        method: 'get',
        headers: {
            'token': token
        }
    });*/


    casper.wait(5000);
capture(collector,'dlFactures.png');
//console.log(this.getPageContent());
var jsonFactures = JSON.parse(this.getPageContent());
console.log("dump");
//require('utils').dump(jsonFactures.data);
var data = jsonFactures.data;

var url = "";

	data.forEach(function(facture) {
      url = jsonFacturesUrl+'/'+ facture.znRefPublicDocElec + '?token='+encodeURIComponent(token);
      console.log(folder+'/'+"Macif_"+facture.znAnnee+".pdf");
      console.log(url);
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