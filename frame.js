/**
The MIT License (MIT)

Copyright (c) 2013 Tolo Palmer

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

Frame = {


	//Defaults
	config : { 
		//Classes that points the elements
		'ajax-marker'    : 'ajax',
		'modal-marker'   : 'modalist',
		'confirm-marker' : 'confirm',

		'history-update' : true,

		//Ids for main and mainloader
		'ajax-frame'     : 'main',
		'ajax-loader'    : 'mainloader',
		'modal-frame'    : 'theModal',
	},

	__reloaded__ : true,

	/**
	*	Init the Frame, includes ajax link loader
	*/
	init : function ( config ) {

        //Merge configs, it avoids wrongs configs
        $.extend( Frame.config, config );

		Frame.bind();

		/*
			On backbutton event, reload url, cos pushState doesnt refresh, and 
			page is loaded by ajax and never is cached
		*/
		window.addEventListener('popstate', function(event) {
			event.stopPropagation();
			if ( ! Frame.__reloaded__ ) {
				window.location.reload(true);	
				Frame.__reloaded__ = true;
			};
		});

		// append modal into body
		$('body').append('<div id="'+Frame.config["modal-frame"]+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="The modal" aria-hidden="false" ><div class="modal-dialog"><div id="theModalContent" class="modal-content"></div></div></div>');

	},

	/**
	*	Binds the event onclick to an ajax loader 
	*/
	bind : function (){

		$('.' + Frame.config['ajax-marker']).unbind();
		$('.' + Frame.config['ajax-marker']).click(function(event){
        	event.preventDefault();
            Frame.loadPage( $(this).attr('href'), this );
        }); 

		$('.' + Frame.config['modal-marker']).unbind();
		$('.' + Frame.config['modal-marker']).click(function(event){
        	event.preventDefault();
            Frame.loadPageModal( $(this).attr('href'), this );
        }); 

        $('.' + Frame.config['confirm-marker']).unbind();
		$('.' + Frame.config['confirm-marker']).click(function(event){
			event.preventDefault();
			if ( confirm($(this).attr("confirm-message") ) )
			{
				if ( $(this).hasClass(Frame.config['ajax-marker']) ) {
					Frame.loadPage( $(this).attr('href'), this );
				}
				else if ( $(this).hasClass(Frame.config['modal-marker']) ) {
					Frame.loadPageModal( $(this).attr('href'), this );
				}
				else { 
					window.location = $(this).attr('href'); 
				}	
			}
        }); 
	},

	/**
	*	Ajax url loader
	*/
	loadPage : function (routing)
	{

		// ---------------- CHECK FOR HISTORY UPDATE
		//add the url to the browser history, back button are there! 
		if (Frame.config["history-update"] == true ) {
			history.pushState({}, "", routing);
		};
		

		//set u can reload
		Frame.__reloaded__ = false;

		$('#' + Frame.config["ajax-loader"]).show();

		$.ajax({
			type: "GET",
			url: routing,
			data :jQuery.param({"ajax" : true}),
			dataType: "html",
			success: function(data) {
				Frame.loadMain(data);
				Frame.bind(); //rebind all page ajax links, cos there are some news
				$('#' + Frame.config["ajax-loader"]).hide();
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("Error, no se ha podido crear");
				$('#' + Frame.config["ajax-loader"]).hide();
			}
		});
	},

	/**
	*	Modal ajax url loader
	*/
	loadPageModal : function (routing)
	{
		$.ajax({
			type: "GET",
			url: routing,
			data :jQuery.param({"modal" : true}),
			dataType: "html",
			success: function(data) {
				Frame.loadModal(data);
				Frame.bind(); //rebind all page ajax links, cos there are some news
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("Error, no se ha podido crear");
			}
		});
	},


	/**
	*	loads some html at main
	*/
	loadMain : function (data){

		var test = $(data).find('#' + Frame.config["ajax-frame"]);
		if ( test ) {
			$('#' + Frame.config["ajax-frame"]).replaceWith(test);
		}
		else {
			$('#' + Frame.config["ajax-frame"]).html(data);	
		}

	},

	/**
	*	loads data into the only modal
	*/
	loadModal : function (data){
		$("#theModalContent").html(data);
		$('#' + Frame.config["modal-frame"]).modal('toggle');
	},

	/**
	* closes de modal
	*/
	closeModal : function(){
		$('#' + Frame.config["modal-frame"]).modal('close');
	},
}

