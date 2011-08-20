var CanvasDrawer = 
{
	canvas: null,
	setCanvas: function(canvas)
	{
		this.canvas = canvas;
	},
	
	drawSquare: function(point, width, height)
	{
		if(this.canvas == null) { alert("canvas is not initialized!"); return; }
		
		var canvasContext = this.canvas.getContext('2d');
		
		canvasContext.fillRect(point.x, point.y, width, height);
	},
	
	clearCanvas: function()
	{
		if(this.canvas == null) { alert("canvas is not initialized!"); return; }
		
		var canvasContext = this.canvas.getContext('2d');
		
		canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};