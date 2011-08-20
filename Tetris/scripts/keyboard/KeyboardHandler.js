var KeyboardHandler = 
{
	handleKeyPress: function(key, functionHandler)
	{
		this.addHandler(key, functionHandler);
		
		if(document.onkeydown != null) { return; }
		
		document.onkeydown = function(eventArgs)
		{
			var keyHandlers = KeyboardHandler.handlers[eventArgs.keyCode];
			
			if(keyHandlers == null || keyHandlers.length == 0) { return; }
			
			keyHandlers.forEach(function(handler, handlerIndex, array)
			{
				if(handler != null) { handler();}
			});
		};
	},
	
	stopHandlingKeyPress: function(key, functionHandler)
	{
		var allKeyHandlers = this.handlers[key];
		
		for(var i = 0; allKeyHandlers != null && i < allKeyHandlers.length; i++)
		{
			if(allKeyHandlers[i] == functionHandler)
			{
				allKeyHandlers[i] = null;
			}
		}
	},
	
	addHandler: function(key, functionHandler)
	{
		if(this.handlers[key] == null) { this.handlers[key] = []; }
		
		this.handlers[key].push(functionHandler);
	},
	
	handlers: [],
	
	//Constants
	KEY_LEFT: 37,
	KEY_UP: 38,
	KEY_RIGHT: 39,
	KEY_DOWN: 40
};