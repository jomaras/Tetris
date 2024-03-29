function Square(point, width, height, color)
{
	this.point = point;
	this.width = width;
	this.height = height;
	this.color = color;
	this.outlineColor = CanvasDrawer.COLOR_BLACK;
	
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
	
	this.createTranslatedUpSquare = function()
	{
		return new Square
		(
			new Point(this.point.x, this.point.y - this.height),
			this.width,
			this.height,
			this.color
		);
	};
	
	this.createTranslatedDownSquare = function()
	{
		return new Square
		(
			new Point(this.point.x, this.point.y + this.height),
			this.width,
			this.height,
			this.color
		);
	};
	
	this.createTranslatedLeftSquare = function()
	{
		return new Square
		(
			new Point(this.point.x - this.width, this.point.y),
			this.width,
			this.height,
			this.color
		);
	};
	
	this.createTranslatedDownBy = function(offset)
	{
		return new Square
		(
			new Point(this.point.x, this.point.y + offset*this.height),
			this.width,
			this.height,
			this.color
		);
	};
	
	this.createTranslatedRightSquare = function()
	{
		return new Square
		(
			new Point(this.point.x + this.width, this.point.y),
			this.width,
			this.height,
			this.color
		);
	};
}