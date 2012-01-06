document.observe('dom:loaded', function (){

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab(tab) {
		var activeTab = tab.up('dl').down('a.active'),
				contentLocation = tab.readAttribute("href").split('#').last() + 'Tab';

		//Make Tab Active
		activeTab.removeClassName('active');
		tab.addClassName('active');

    	//Show Tab Content
		$(contentLocation).up('.tabs-content').select('li').
			invoke('hide').
			invoke('removeClassName','active');
		$(contentLocation).addClassName('active').show();
	}

	$$('dl.tabs').each(function(elm){
		//Get all tabs
		$(elm).select('dd > a').invoke('observe', 'click', function(evt){
			activateTab(this)
		});
	});

	if (window.location.hash) {
		var elm;
		if(elm = $$('a[href="' + window.location.hash + '"]').first())
			activateTab(elm);
	}

	/* ALERT BOXES ------------ */
	$$('.alert-box a.close').invoke('observe', 'click', function(evt) {
	    evt.stop();
		  evt.element().up(".alert-box").fade({duration:0.4});
		});
	


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and prototype.placeholder.js if you don't need :) */

	//$$('input, textarea').addPlaceholder();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$$('.block-grid.two-up>li:nth-child(2n+1)').setStyle({clear: 'left'});
//	$$('.block-grid.three-up>li:nth-child(3n+1)').setStyle({clear: 'left'});
//	$$('.block-grid.four-up>li:nth-child(4n+1)').setStyle({clear: 'left'});
//	$$('.block-grid.five-up>li:nth-child(5n+1)').setStyle({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var currentFoundationDropdown = null;
	$$('.nav-bar li a').each(function(elm) {
		elm.store('clicks', 0);
	});
	$$('.nav-bar li a').invoke('observe', 'click', function(evt) {
		evt.stop();
		var elm = evt.element();
		if (currentFoundationDropdown !== elm || currentFoundationDropdown === null) {
			$(this).store('clicks', 0);
			currentFoundationDropdown = elm;
		}
		elm.store('clicks', ($(this).retrieve('clicks') + 1));
		var f = elm.siblings('.flyout');
		if (!f.visible() && elm.ancestors().select('.has-flyout').length > 1) {
			$$('.nav-bar li .flyout').invoke('hide');
			f.show();
		} else if ((elm.retrieve('clicks') > 1) || (elm.ancestors().select('.has-flyout').length < 1)) {
			window.location = elm.readAttribute('href');
		}
	});
	$$('.nav-bar').invoke('observe', 'click', function(evt) {
		evt.stop();
		if (evt.element().ancestors().select('.flyout').length > 0 || evt.element().hasClassName('.flyout')) {
			evt.stop();
		}
	});

	// $('body').bind('touchend', function(e) {
	// 	if (!$(e.target).parents().is('.nav-bar') || !$(e.target).is('.nav-bar')) {
	// 		$('.nav-bar li .flyout').is(':visible').hide();
	// 	}
	// });

	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */

});
