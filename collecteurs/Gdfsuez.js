//
//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Gdfsuez


var links = [];

var urlFactures = 'https://particuliers.engie.fr/espace-client/factures-et-paiements.html';
var urlConnexion = "https://particuliers.engie.fr/content/dolce-vita/particuliers/login-page.html";
var baseDocUrlStart = "https://particuliers.engie.fr/cel-ws/api/private/document/mobile/";
var baseDocUrlEnd = "/SAE/04022015-N%C2%B0527507005737.pdf";
var formId = 'stopanim';
var emailId ='get_email';
var passwordId = 'get_password';
var formSelect = 'form[name="formConnexion"]';
var folder = baseFolder+"/"+"Gdfsuez";

casper.thenOpen(urlConnexion, function openWebsite() {

	/*this.capture('1.png');*/
	mylog("connexion");
	this.fill(formSelect, {
        'email' :    login,
		'motdepasse' : password,
    }, false);
    capture(collector,'login.png');
});

casper.then(function logIn() {
mylog("Login");
		this.click('a#a_login_bouton_mode_non_connecte');
		this.click('#a_login_bouton_mode_non_connecte');
		this.click('.btn-action');
		casper.waitForSelector('#deconnexion', function(){
			capture(collector,"Login_ok.png");
		},function timeout(){
			capture(collector,"Login_nok.png");
		},15000);

});

var badwords = ["\t","</td>","\n","  ",">"];
var i=-1;

casper.thenOpen(urlFactures,function openFileList() {

mylog("URL Factures");
	casper.waitForSelector('#box-factures', function(){

		var facturesData = this.getElementsInfo('#tableFact td');
		var facturesLines = this.getElementsInfo('#tableFact tr');
		var facturesUrl = this.getElementsInfo('#tableFact a.lien-telechargement');
		var dates = [];
		var data = "";
		mylog("facture data " + facturesData.length);
		mylog("facture lines " + facturesLines.length);
		mylog("facture Url " + facturesUrl.length);
		var index = 0;

		for(var d=0; d<facturesData.length-1;d++)
		{
			data = facturesData[d].html;
			if((data.match(/\//g)|| []).length == 2 && data.match(/</g) == null)
			{
				mylog(data + " " + dates.length);
				dates[dates.length] = formatDate(filter(badwords,data));
				
			}
		}

		mylog("DL Factures "+facturesLines.length);
		for(var i=0; i<facturesLines.length-1; i++){
			/*date = facturesData[1+(3*i)].html;
			mylog("date : "+ date);
			date = formatDate(filter(badwords,date));*/
			console.log("display "+ facturesLines[i].attributes.style);
			if(typeof facturesLines[i].attributes.style == "undefined" || facturesLines[i].attributes.style == "")
			{
				if(index > 4)
					break;

				date = dates[index];
				mylog("formated date " + date);
				mylog("INDEX " + index);
				url = facturesUrl[index].attributes.id;
				mylog("url " + decodeURIComponent(url));
				year = date.substr(date.length - 4);
				//recuperation du docid
				/*var docId = url.match(/(docId=)[^\&>]+/)[0] + "";
		        docId = (docId.split("="))[1];*/
		        //url = baseDocUrlStart + docId + baseDocUrlEnd;
		        // %3 -> %253 , %2 -> %252, >> -> /SAE/2015undefinedundefined-N%C2%B0 , + .pdf
		        //https://particuliers.engie.fr/cel-ws/api/private/document/mobile/http%253A%252F%252Fassap-archivage.gdfsuez.net%253A8081%252F%252Fassap%252Farchivelink%252Fprdpagnr%253Fget%2526pVersion%253D0046%2526contRep%253DP3%2526docId%253Dc43bef2b-dcf7-4561-a0f1-fe9600f25c0f/SAE/2015undefinedundefined-N%C2%B0518758128084.pdf
		        //https://particuliers.engie.fr/cel-ws/api/private/document/mobile/http%253A%252F%252Fassap-archivage.gdfsuez.net%253A8081%252F%252Fassap%252Farchivelink%252Fprdpagnr%253Fget%2526pVersion%253D0046%2526contRep%253DP3%2526docId%253Dc43bef2b-dcf7-4561-a0f1-fe9600f25c0f/SAE/2015undefinedundefined-N%C2%B0518758128084
		        String.prototype.replaceAll = function(search, replacement) {
	    				var target = this;
	    				return target.replace(new RegExp(search, 'g'), replacement);
				};
				url = url.replaceAll("%2","%252").replaceAll("%3","%253").replace(">>","/SAE/"+year+"undefinedundefined-N%C2%B0");
		        url = baseDocUrlStart + url + ".pdf";
				mylog("final url " + url);
				//require('utils').dump(url);
				this.download(url, folder+'/'+"GDF-Facture_"+date+".pdf");
				index++;
				this.wait(3000);
			}
		}
	
	
	},null,15000);
	
});