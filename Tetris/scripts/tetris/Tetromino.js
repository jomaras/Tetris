function Tetromino(position){ }

Tetromino.squareWidth = 20;
Tetromino.squareHeight = 20;
Tetromino.createSquare = function(xPos, yPos)
{
	return new Square(new Point(xPos, yPos), Tetromino.squareWidth, Tetromino.squareHeight);
};
Tetromino.draw = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.draw();
	});
};

Tetromino.translateUp = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateUp();
	});
};

Tetromino.translateDown = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateDown();
	});
};

Tetromino.translateLeft = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateLeft();
	});
};

Tetromino.translateRight = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateRight();
	});
};

function TetrominoT(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { this.position.y -= Tetromino.squareHeight; Tetromino.translateUp(this); };
	this.translateDown = function() { this.position.y += Tetromino.squareHeight; Tetromino.translateDown(this); };
	this.translateLeft = function() { this.position.x -= Tetromino.squareWidth; Tetromino.translateLeft(this); };
	this.translateRight = function() { this.position.x += Tetromino.squareWidth; Tetromino.translateRight(this); };
	
	this.rotateLeft = function() 
	{
		if(this.isFacingNormal) { this.createLeftSetting(); }
		else if (this.isFacingLeft) { this.createReverseSetting(); }
		else if (this.isFacingReverse) { this.createRightSetting(); }
		else if (this.isFacingRight) { this.createNormalSetting(); }
	};
	
	this.rotateRight = function() 
	{
		if(this.isFacingNormal) { this.createRightSetting(); }
		else if (this.isFacingRight) { this.createReverseSetting(); }
		else if (this.isFacingReverse) { this.createLeftSetting(); }
		else if (this.isFacingLeft) { this.createNormalSetting(); }
	};
	
	this.isFacingNormal = false, this.isFacingLeft = false; 
	this.isFacingReverse = false, this.isFacingRight = false;
	
	this.createNormalSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + 2*Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = true, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + 2*Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = true; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + 2*Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = true;
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + 2*Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = true, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createNormalSetting();
}