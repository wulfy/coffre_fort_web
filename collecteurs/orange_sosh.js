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
var folder = files_path+"/"+'Orange';
var formSelect = 'form[id="AuthentForm"]';
var waitTimeout = 1000;
var autologged = false;

casper.echo("starting");

casper.thenOpen(url, function openWebsite() {
	//capture(collector,'start.png');

	this.waitForSelector("#o-nav-item-login-container", function then(){
		casper.echo("NEED LOGIN");
		autologged = false;
	}, function timeout(){
		casper.echo("AUTO LOGGED");
		autologged = true;
		//mouse.click('.btn-ident.o_r_identifier'); 
	},2000);
	//capture(collector,'Orange_hp.png');
	
});


//fill form of login page
if(!autologged)
casper.thenOpen(loginform, function fillForm() {
//capture(collector,'form.png');
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
				//capture(collector,'formposted.png');
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
