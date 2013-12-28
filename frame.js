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

	selector : ".ajax",
	modal_selector : ".modalist",
	confirm_selector : ".confirm",

	__reloaded__ : true,

	/**
		Init the Frame, includes ajax link loader
	*/
	init : function (selector, modal) {
		Frame.selector = selector;
		Frame.modal_container = modal;
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


		// ----------------- APPEND modal
		// ----------------- APPEND loading
		// ----------------- UPDATE OR NOT HISTORY

	},

	/**
		Binds the event onclick to an ajax loader 
	*/
	bind : function (){

		$(Frame.selector).unbind();
		$(Frame.selector).click(function(event){
        	event.preventDefault();
            Frame.loadPage( $(this).attr('href') );
        }); 

		$(Frame.modal_selector).unbind();
		$(Frame.modal_selector).click(function(event){
        	event.preventDefault();
            Frame.loadPageModal( $(this).attr('href') );
        }); 

        $(Frame.confirm_selector).unbind();
		$(Frame.confirm_selector).click(function(event){
			event.preventDefault();
			if ( ! confirm($(this).attr("confirm-message") ) )
			{
            	window.location = $(this).attr('href');
			}
        	
        }); 
	},

	/**
		Ajax url loader
	*/
	loadPage : function (routing)
	{
		//add the url to the browser history, back button are there!
		history.pushState({}, "", routing);

		//set u can reload
		Frame.__reloaded__ = false;

		$('.mainloader').show();

		$.ajax({
			type: "GET",
			url: routing,
			data :jQuery.param({"ajax" : true}),
			dataType: "html",
			success: function(data) {
				Frame.loadMain(data);
				Frame.bind(); //rebind all page ajax links, cos there are some news
				$('.mainloader').hide();
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("Error, no se ha podido crear");
				$('.mainloader').hide();
			}
		});
	},

	/**
		Modal ajax url loader
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
		loads some html at main
	*/
	loadMain : function (data){
		$("#main").html(data);

		// ---------------- CHECK for MAIN and remove if necessary
	},

	/**
		loads data into the only modal
	*/
	loadModal : function (data){
		$("#theModalContent").html(data);
		$('#theModal').modal('show')	
	},


	closeModal : function(){
		$('#theModal').modal('close');
	},
}

