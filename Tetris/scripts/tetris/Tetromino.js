function Tetromino(position){ }

Tetromino.squareWidth = 20;
Tetromino.squareHeight = 20;
Tetromino.createSquare = function(xPos, yPos, color)
{
	return new Square(new Point(xPos, yPos), Tetromino.squareWidth, Tetromino.squareHeight, color);
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
	var newPosition = [];
	
	tetromino.squares.forEach(function(square)
	{
		newPosition.push(square.createTranslatedUpSquare());
	});
	
	if(tetromino.manager.isPositionChangeAllowed(tetromino, newPosition))
	{
		tetromino.squares = newPosition;
		tetromino.position.y -= Tetromino.squareHeight;
	}
	
	tetromino.draw();
};

Tetromino.translateDown = function(tetromino)
{
	var newPosition = [];
	
	tetromino.squares.forEach(function(square)
	{
		newPosition.push(square.createTranslatedDownSquare());
	});
	
	if(tetromino.manager.isPositionChangeAllowed(tetromino, newPosition))
	{
		tetromino.squares = newPosition;
		tetromino.position.y += Tetromino.squareHeight;
	}
	
	tetromino.draw();
};

Tetromino.translateLeft = function(tetromino)
{
	var newPosition = [];
	
	tetromino.squares.forEach(function(square)
	{
		newPosition.push(square.createTranslatedLeftSquare());
	});
	
	if(tetromino.manager.isPositionChangeAllowed(tetromino, newPosition))
	{
		tetromino.squares = newPosition;
		tetromino.position.x -= Tetromino.squareWidth;
	}
	
	tetromino.draw();
};

Tetromino.translateRight = function(tetromino)
{
	var newPosition = [];
	
	tetromino.squares.forEach(function(square)
	{
		newPosition.push(square.createTranslatedRightSquare());
	});
	
	if(tetromino.manager.isPositionChangeAllowed(tetromino, newPosition))
	{
		tetromino.squares = newPosition;
		tetromino.position.x += Tetromino.squareWidth;
	}
	
	tetromino.draw();
};

Tetromino.createRandomTetromino = function(position, manager)
{
	//T-4 pos; I-2 pos; J-4 pos; L-4 pos; S-2 pos; Z-2 pos; O-1 pos
	var numberOfTetrominoTypes = 7; 
	
	switch(RandomNumberGenerator.getRandomNumber(numberOfTetrominoTypes))
	{
		case 0: return new TetrominoT(position, manager, RandomNumberGenerator.getRandomNumber(4));
		case 1: return new TetrominoI(position, manager, RandomNumberGenerator.getRandomNumber(2));
		case 2: return new TetrominoJ(position, manager, RandomNumberGenerator.getRandomNumber(4));
		case 3: return new TetrominoL(position, manager, RandomNumberGenerator.getRandomNumber(4));
		case 4: return new TetrominoS(position, manager, RandomNumberGenerator.getRandomNumber(2));
		case 5: return new TetrominoZ(position, manager, RandomNumberGenerator.getRandomNumber(2));
		case 6: return new TetrominoO(position, manager);
		default: alert("unknown tetromino type"); return null;
	}
};

Tetromino.normalizeOrientation = function(orientation, orintationCount)
{
	return orientation == null || orientation >= orintationCount || orientation < 0 ? 0 : orientation;
};
	
function TetrominoT(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.squareColor = CanvasDrawer.COLOR_LIGHT_GREEN;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 4);
	
	this.draw = function(){ Tetromino.draw(this); };
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = true, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = true; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = true, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createNormalSetting(); break;
		case 1: this.createLeftSetting(); break;
		case 2: this.createRightSetting(); break;
		case 3: this.createReverseSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoI(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.squareColor = CanvasDrawer.COLOR_TEAL;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 2);
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + 2*Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = true, this.isFacingVertical = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + 2*Tetromino.squareWidth, this.position.y, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = false, this.isFacingVertical = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createHorizontalSetting(); break;
		case 1: this.createVerticalSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoJ(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 4);
	
	this.squareColor = CanvasDrawer.COLOR_RED;
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = true, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = true; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y - Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = true, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createNormalSetting(); break;
		case 1: this.createLeftSetting(); break;
		case 2: this.createRightSetting(); break;
		case 3: this.createReverseSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoL(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 4);
	
	this.squareColor = CanvasDrawer.COLOR_DARK_ORANGE;
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = true, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createLeftSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = true; 
			this.isFacingReverse = false, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createRightSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y - Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = false, this.isFacingRight = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createReverseSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y - Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingNormal = false, this.isFacingLeft = false; 
			this.isFacingReverse = true, this.isFacingRight = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createNormalSetting(); break;
		case 1: this.createLeftSetting(); break;
		case 2: this.createRightSetting(); break;
		case 3: this.createReverseSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoS(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 2);
	
	this.squareColor = CanvasDrawer.COLOR_LIGHT_GREEN;
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = true, this.isFacingVertical = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = false, this.isFacingVertical = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createHorizontalSetting(); break;
		case 1: this.createVerticalSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoZ(position, manager, orientation)
{
	this.squares = [];
	this.position = position;
	this.manager = manager;
	this.orientation = Tetromino.normalizeOrientation(orientation, 2);
	
	this.squareColor = CanvasDrawer.COLOR_BLUE;
	
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
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = true, this.isFacingVertical = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.createVerticalSetting = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x - Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y - Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = false, this.isFacingVertical = true;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	switch(this.orientation)
	{
		case 0: this.createHorizontalSetting(); break;
		case 1: this.createVerticalSetting(); break;
		default: alert("Unknown orientation"); break;
	};
}

function TetrominoO(position, manager)
{
	this.squares = [];
	this.position = position;
	this.manager = manager;
	
	this.squareColor = CanvasDrawer.COLOR_YELLOW;
	
	this.draw = function(){ Tetromino.draw(this);};
	
	this.translateUp = function() { Tetromino.translateUp(this); };
	this.translateDown = function() { Tetromino.translateDown(this); };
	this.translateLeft = function() { Tetromino.translateLeft(this); };
	this.translateRight = function() { Tetromino.translateRight(this); };
	
	this.rotateLeft = function() { this.draw(); };
	this.rotateRight = function() { this.draw(); };
	
	this.create = function() 
	{
		var newPosition = [];
		
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x, this.position.y + Tetromino.squareHeight, this.squareColor));
		newPosition.push(Tetromino.createSquare(this.position.x + Tetromino.squareWidth, this.position.y + Tetromino.squareHeight, this.squareColor));
		
		if(this.manager.isPositionChangeAllowed(this, newPosition))
		{
			this.isFacingHorizontal = true, this.isFacingVertical = false;
			
			this.squares = newPosition;
		}
		
		this.draw();
	};
	
	this.create();
}