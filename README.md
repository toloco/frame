FRAME:
===============================================================================


Ajax load into a main div and updates browser history
Ajax load modal


Requeriments:
===============================================================================
jquery >= 1.8
bootstrap >= 3.0 (only if you plan to use modals)



Configuration:
===============================================================================

```javascript
	$(document).ready(function (){
    	// bind ajax class for link ajax loaaaaders
        Frame.init('.ajax', '.modalist'); 
	});
```