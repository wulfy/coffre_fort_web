//
//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=Aviva


var links = [];

var url1 = 'https://www.aviva.fr/portail/front?controller=internetClient.Login';
var formId = 'stopanim';
var loginName ='portlet_login_simple_5{pageFlow.mForm.login}';
var passwordName = 'portlet_login_simple_5{pageFlow.mForm.password}';
var formSelect = 'form[name="internetClient_login"]';
var folder = baseFolder+"/"+"Aviva";

casper.thenOpen(url1, function openLoginPage() {
    this.echo(this.getTitle());
	nbLinks = this.evaluate(function() {
        return __utils__.findAll('internetClient_login').length;
    });
});

casper.then(function fillForm() {

this.fill(formSelect, {
        'username':    login,
    }, false);
    
});


casper.then(function submittingForm() {
	this.click('a[id="popup"]');
});

casper.then(function setPassword() {

for(var i=0; i<password.length; i++)
    this.clickLabel(password[i], 'span');

});

casper.then(function submittingPassword() {
this.click('input[name="Ok"]');
this.click('input[name="Ok"]');
});


var i=-1;
var links;
var pdfLinks;
casper.then(function listFiles() {

this.waitForSelector('td.EVENSROWS a.fontBlue',function()
{
	this.echo("premier selector");
links =this.getElementsInfo('td.EVENSROWS a.fontBlue');



		this.each(links, function filesDetails(self,link) {

		 i++;
		       this.then(function clickOnFile() {
					this.clickLabel(link.text);

		        });
				this.then(function getDetail() {

					this.waitForSelector('.EVENSROWS a',function()
					{this.echo("second  selector");
						var pdfsattr = this.getElementsAttribute('.EVENSROWS a', 'onclick');
						var j=-1;
						pdfLinks = this.getElementsInfo("#listeDetailContrat_Label a");
						pdfUrls = this.evaluate(getPdf);
						
						this.each(pdfsattr, function downloadingPdf(self,attr) {
						j++;
							start = attr.indexOf("(");
							end = attr.indexOf(")");
							end2 = attr.indexOf(",");
							if(end2 < end && end2 >0)
								end = end2;

							if(debug)
								this.echo("attr:" +attr);
							
							url = attr.substring(start+1, end);

							if(debug)
								this.echo("url1:" +url);
							
							var re = new RegExp('"', 'g');
							var re2 = new RegExp("'", 'g');
							url = url.replace(re,"").replace(re2,"");

							if(debug)
								this.echo("url2:" +url);
							
							if(url.indexOf("http") <0)
								url = "https://www.aviva.fr" + url;
							
							url_datas = url.split("/");
							

							if(debug)
								this.echo("url3:" +url);
							//require('utils').dump(url_datas);
							filename = url_datas[url_datas.length-1];
							filename = pdfLinks[j].text.replace(/\W/g, '')
							this.download(url, folder+'/'+filename+".pdf");
							
						});

					},3000);
				});

		    });

	},3000);

});
/*
casper.run();*/