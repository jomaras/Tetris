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
	
	tetromino.position.y -= Tetromino.squareHeight;
};

Tetromino.translateDown = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateDown();
	});
	
	tetromino.position.y += Tetromino.squareHeight;
};

Tetromino.translateLeft = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateLeft();
	});
	
	tetromino.position.x -= Tetromino.squareWidth;
};

Tetromino.translateRight = function(tetromino)
{
	tetromino.squares.forEach(function(square)
	{
		square.translateRight();
	});
	
	tetromino.position.x += Tetromino.squareWidth;
};

function TetrominoT(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
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
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = true, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = true; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = true;
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = true, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createNormalSetting();
}

function TetrominoI(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
	this.rotateLeft = function() { this.rotate(); };
	this.rotateRight = function() { this.rotate(); };
	
	this.rotate = function()
	{
		if(this.isFacingHorizontal) { this.createVerticalSetting(); }
		else if (this.isFacingVertical) { this.createHorizontalSetting(); }
	};
	
	this.isFacingHorizontal = false, this.isFacingVertical = false;
	
	this.createHorizontalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + 2*Tetromino.squareHeight));
		
		this.isFacingHorizontal = true, this.isFacingVertical = false;
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + 2*Tetromino.squareWidth, this.position.y));
		
		this.isFacingHorizontal = false, this.isFacingVertical = true;
		
		this.draw();
	};
	
	this.createHorizontalSetting();
}

function TetrominoJ(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
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
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = true, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		
		this.isFacingNormal = false, this.isFacingLeft = true; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = true;
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		this.squares = [];
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y - Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = true, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createNormalSetting();
}

function TetrominoL(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
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
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingNormal = true, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		
		this.isFacingNormal = false, this.isFacingLeft = true; 
		this.isFacingReverse = false, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y - Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = false, this.isFacingRight = true;
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y - Tetromino.squareHeight));
		
		this.isFacingNormal = false, this.isFacingLeft = false; 
		this.isFacingReverse = true, this.isFacingRight = false;
		
		this.draw();
	};
	
	this.createNormalSetting();
}

function TetrominoS(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
	this.rotateLeft = function() { this.rotate(); };
	this.rotateRight = function() { this.rotate(); };
	
	this.rotate = function()
	{
		if(this.isFacingHorizontal) { this.createVerticalSetting(); }
		else if (this.isFacingVertical) { this.createHorizontalSetting(); }
	};
	
	this.isFacingHorizontal = false, this.isFacingVertical = false; 
	
	this.createHorizontalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		
		this.isFacingHorizontal = true, this.isFacingVertical = false; 
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingHorizontal = false, this.isFacingVertical = true; 
		
		this.draw();
	};
	
	this.createHorizontalSetting();
}

function TetrominoZ(position)
{
	this.squares = [];
	this.position = position;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
	this.rotateLeft = function() { this.rotate(); };
	this.rotateRight = function() { this.rotate(); };
	
	this.rotate = function()
	{
		if(this.isFacingHorizontal) { this.createVerticalSetting(); }
		else if (this.isFacingVertical) { this.createHorizontalSetting(); }
	};
	
	this.isFacingHorizontal = false, this.isFacingVertical = false; 
	
	this.createHorizontalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		
		this.isFacingHorizontal = true, this.isFacingVertical = false; 
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		this.squares = [];
		
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight));
		this.squares.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y));
		this.squares.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight));
		
		this.isFacingHorizontal = false, this.isFacingVertical = true; 
		
		this.draw();
	};
	
	this.createHorizontalSetting();
}