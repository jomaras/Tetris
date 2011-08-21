var CanvasDrawer = 
{
	canvas: null,
	setCanvas: function(canvas)
	{
		this.canvas = canvas;
	},
	
	drawSquare: function(point, width, height, color)
	{
		if(this.canvas == null) { alert("canvas is not initialized!"); return; }
		
		color = color || "rgb(0,0,0)";
		
		var canvasContext = this.canvas.getContext('2d');
		
		canvasContext.fillStyle = color;
		canvasContext.fillRect(point.x, point.y, width, height);
	},
	
	clearCanvas: function()
	{
		if(this.canvas == null) { alert("canvas is not initialized!"); return; }
		
		var canvasContext = this.canvas.getContext('2d');
		
		canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	COLOR_RED: "rgb(255, 0, 0)",
	COLOR_DARK_RED: "rgb(160, 0, 0)",
	COLOR_GREEN: "rgb(0, 255, 0)",
	COLOR_BLUE: "rgb(0, 0, 255)",
	COLOR_TEAL: "rgb(68, 255, 255)",
	COLOR_DARK_ORANGE:"rgb(255, 136, 0)",
	COLOR_LIGHT_GREEN:"rgb(68, 255, 68)",
	COLOR_VIOLET:"rgb(255, 68, 255)",
	COLOR_YELLOW:"rgb(255, 255, 68)",
};