//var casper = require('casper').create();

var casper = require('casper').create({   
    verbose: true, 
    pageSettings: {
         loadImages:  true,         // The WebPage instance used by Casper will
         loadPlugins: true,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var links = [];

var url1 = 'http://www.gdfsuez-dolcevita.fr';
var url2 = 'https://www.gdfsuez-dolcevita.fr/portailClients/appmanager/portail/clients?_nfpb=true&_pageLabel=page_identification';
var formId = 'stopanim';
var loginName ='portlet_login_simple_5{pageFlow.mForm.login}';
var passwordName = 'portlet_login_simple_5{pageFlow.mForm.password}';
var formSelect = 'form#stopanim';

casper.start(url1, function() {
    this.echo(this.getTitle());
	nbLinks = this.evaluate(function() {
        return __utils__.findAll('form#stopanim').length;
    });/*
	var links = document.querySelector('form[name="symConnexionForm"]');*/
    this.echo(nbLinks + ' form found ');
	this.click('a[rel~="v_tab_1"]');
	this.capture('test.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 1024
    });

});
/*
casper.then(function() {
    this.evaluateOrDie(function() {
        return /message sent/.test(document.body.innerText);
    }, 'sending message failed');
});*/
casper.then(function() {
		 this.fill(formSelect, {
        'portlet_login_simple_5{pageFlow.mForm.login}':    login,
        'portlet_login_simple_5{pageFlow.mForm.password}':    password
    }, true);


	this.capture('test2.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 1024
    });

    this.echo("login ok");
    
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
	this.clickLabel('Valider', 'button');
    // now search for 'phantomjs' by filling the form again
	
    
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
	
    this.capture('testlogged.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 1024
    });
	
    // now search for 'phantomjs' by filling the form again
	
    
});
/*
casper.thenOpen('https://www.gdfsuez-dolcevita.fr/portailClients/client/p/page_historique_de_mes_factures?_nfpb=true', function() {
var links = document.querySelectorAll('.consulte_facture');
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});*/

casper.run();
