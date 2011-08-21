function Square(point, width, height, color)
{
	this.point = point;
	this.width = width;
	this.height = height;
	this.color = color;
	
	this.draw = function()
	{
		CanvasDrawer.drawSquare(this.point, this.width, this.height, this.color);
	};
	
	this.translate = function(translateByPoint)
	{
		this.point.x += translateByPoint.x;
		this.point.y += translateByPoint.y;
		this.draw();
	};
	
	this.translateLeft = function()
	{
		this.translate(new Point(-this.width, 0));
	};
	
	this.translateRight = function()
	{
		this.translate(new Point(this.width, 0));
	};
	
	this.translateUp = function()
	{
		this.translate(new Point(0, -this.height));
	};
	
	this.translateDown = function()
	{
		this.translate(new Point(0, this.height));
	};
}