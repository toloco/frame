FRAME.js
===============================================================================
Ajax and modals pattern with pushState update, enjoy the power of google+ like navigation

Ajax load into a main div and updates browser history with pushState
Ajax load modal
Open in new tab will work if you take care


Requeriments:
------------------------------------------------------
* Jquery >= 1.8
* Bootstrap >= 3.0 (only if you plan to use modals)



Configuration:
------------------------------------------------------
Add this javascript on your html code ( after jquery definition )
```javascript
    $(document).ready(function (){
        Frame.init();
    });
```

Or the full config (just overiding default)
```javascript
    $(document).ready(function (){
        Frame.init(
        	{
        		//Classes that points the elements
        		'ajax-marker'    : 'ajax',
        		'modal-marker'   : 'modalist',
        		'confirm-marker' : 'confirm',

        		'history-update' : true,

        		//Ids for main and mainloader
        		'ajax-frame'     : 'main',
        		'ajax-loader'    : 'mainloader',
        		'modal-frame'    : 'theModal',
        	}
        );
    });
```


Use:
------------------------------------------------------
#### Ajax links into a container:

Easy just add the **ajax-marker** class (or default value ajax), frame.js wil catch the click event and load into ajax-frame

```html
	<a class="btn **ajax**" href="test2.html">
```

Or if you do not need browser history for the link add the attribute **history="false"**

```html
	<a class="btn **ajax**" href="test2.html" **history="false"** >
```

##### Bonus
Add a loader, design a nice loader and add the id **mainLoader** or define it at **ajax-loader**
```html
	<div id="mainloader"><img src='loading.gif' alt='' /></div>
	<div id="main"></div>
```

#### Modal links:
It is very add the **modal-marker** class (or default value modalist), frame.js wil catch the click event and show the url in a modal box

```html
	<a class="btn **modalist**" href="ajax-center.html">
```

Programatically close the modal
```javascript
	Frame.closeModal();
```
Or use bootstrap way inside the modal
```html
	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
```
##### New, full size pictures
Add pictures links very easy with a full size modal view
```html
    <a class="modalist" href="path/to/fullsize.png">
        <img src="path/to/thumbnail.png">
        <label> Click me to enlarge</label>
    </a>
```

#### Confirm links:
Add a confirm message (like alerts, I know they are ugly but I promise making them nicer) and still having the ajax and modal behavior.


As usual in frame.js ;), add the class **confirm** or the **confirm-marker** if you overide it, set the message with the attribute **confirm-message="MESAGE"**

###### Confirm and redirect
```html
	<a class="btn confirm" href="test2.html" confirm-message="Sure X ?">
```
###### Confirm and load ajax
```html
	<a class="btn confirm ajax" href="test2.html" confirm-message="Sure X ?" >
```
###### Confirm and load, forgetting the history
```html
	<a class="btn confirm ajax" href="test2.html" confirm-message="Sure X ?" history="false" >
```
###### Confirm and show modal
```html
	<a class="btn confirm modalist" href="ajax-center.html" confirm-message="Sure X ?">
```


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/24c929b54abb9c96fc971da17c63a0fc "githalytics.com")](http://githalytics.com/toloco/frame)
