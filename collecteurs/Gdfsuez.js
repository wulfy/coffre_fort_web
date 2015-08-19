//
//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Gdfsuez


var links = [];

var urlFactures = 'https://www.gdfsuez-dolcevita.fr/espace-client/authentification.html?TYPE_COMPOSANTE=CEL&URL_CIBLE=%2Fespace-client%2Ffactures-et-paiements.html';
var urlConnexion = "https://www.gdfsuez-dolcevita.fr/login-page.html";
var baseDocUrlStart = "https://www.gdfsuez-dolcevita.fr/cel-ws/api/private/document/lireDocumentMobile/http:22XA222XA2assap-archivage.gdfsuez.net:808122XA222XA2assap22XA2archivelink22XA2prdpagnr77BG7get&pVersion=0046&contRep=P3&docId=";
var baseDocUrlEnd = "/SAE/04022015-N%C2%B0527507005737.pdf";
var formId = 'stopanim';
var emailId ='get_email';
var passwordId = 'get_password';
var formSelect = 'form[name="formConnexion"]';
var folder = baseFolder+"/"+"Gdfsuez";

casper.thenOpen(urlConnexion, function openWebsite() {

	/*this.capture('1.png');*/
	this.echo("connexion");
	this.fill(formSelect, {
        'email' :    login,
		'motdepasse' : password,
    }, false);
    
});

casper.then(function logIn() {
this.echo("Login");
		this.click('a#a_login_bouton_mode_non_connecte');
});

var badwords = ["\t","</td>","\n","  ",">"];
var i=-1;

casper.thenOpen(urlFactures,function openFileList() {

this.echo("URL Factures");
	casper.waitForSelector('#box-factures', function(){

		var facturesData = this.getElementsInfo('#tableFact td');
		var facturesLines = this.getElementsInfo('#tableFact tr');
		var facturesUrl = this.getElementsInfo('#tableFact a.lien-telechargement');

		this.echo("DL Factures");
		for(var i=0; i<facturesLines.length-1; i++){
			date = facturesData[i*4].html;
			date = formatDate(filter(badwords,date));
			url = facturesUrl[i].attributes.id;
			
			//recuperation du docid
			var docId = url.match(/(docId=)[^\&>]+/)[0] + "";
	        docId = (docId.split("="))[1];
	        url = baseDocUrlStart + docId + baseDocUrlEnd;

			//require('utils').dump(url);
			this.download(url, folder+'/'+"GDF-Facture_"+date+".pdf");
		}
	
	
	},5000);
	
});