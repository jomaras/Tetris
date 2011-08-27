var Tetris = 
{
	/**
	 * @param initialPosition - point (usually (0,0))
	 * @param width
	 * @param height
	 * @param squareSize
	 */
	init: function(initialPosition, width, height, squareSize)
	{
		this.initialPosition = initialPosition || new Point(0,0);
		this.width = width;
		this.height = height;
		this.squareSize = squareSize;
		
		if(height % squareSize != 0) { alert("There is a discrepancy between canvas height and square size!"); }
		if(width % squareSize != 0) { alert("There is a discrepancy between canvas width and square size!"); }
		
		this.numberOfRows = height / squareSize;
		this.numberOfColumns = width / squareSize;
		
		this.grid = [];
		
		for(var i = 0; i < this.numberOfColumns; i++)
		{
			this.grid[i] = []; 
			
			for(var j = 0; j < this.numberOfRows; j++)
			{
				this.grid[i][j] = 
				{ 
					isTaken: false, 
					point : new Point(i * this.squareSize, j * this.squareSize) 
				};
			}
		}
	},
	
	isPositionChangeAllowed: function(tetromino, newPosition)
	{
		for(var i = 0; i < newPosition.length; i++)
		{
			var currentSquare = newPosition[i];
			
			if(!this.isPositionAvailable(currentSquare))
			{
				return false;
			}
		}
		
		return true;
	},
	
	isPositionAvailable: function(square)
	{
		if(square.point.x < 0 || square.point.x >= this.width) { return false; }
		if(square.point.y < 0 || square.point.y >= this.height){ return false; }
		
		try
		{
			var columnIndex = square.point.x / square.width;
			var rowIndex = square.point.y / square.height;
		}
		catch(e)
		{
			var a = 3;
			a++;
		}
		
		var gridPoint = this.grid[columnIndex][rowIndex];
		
		if(gridPoint.point.x != square.point.x
		|| gridPoint.point.y != square.point.y)
		{
			alert("There is a mismatch between positions");
		}
		
		return !gridPoint.isTaken;
	},
	timerId : null
};

window.onload = function()
{
	var canvas = document.getElementById("canvas");
	CanvasDrawer.setCanvas(canvas);
	
	Tetris.init(new Point(0,0), canvas.width, canvas.height, Tetromino.squareHeight);
	
	var tetra = new TetrominoO(new Point(100, 20), Tetris);
	
	function restartTimer()
	{
		if(Tetris.timerId != null) { window.clearTimeout(Tetris.timerId); }
		
		Tetris.timerId = window.setTimeout(function() { moveDown(); restartTimer(); }, 500);
	}
	
	function moveDown()
	{
		//restartTimer();
		CanvasDrawer.clearCanvas();
		tetra.translateDown();
	}
	
	KeyboardHandler.handleKeyPress(KeyboardHandler.KEY_DOWN, moveDown);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_UP, 
		function()
		{
			//restartTimer();
			CanvasDrawer.clearCanvas();
			tetra.rotateRight();
		}
	);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_LEFT, 
		function()
		{
			//restartTimer();
			CanvasDrawer.clearCanvas();
			tetra.translateLeft();
		}
	);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_RIGHT, 
		function()
		{
			//restartTimer();
			CanvasDrawer.clearCanvas();
			tetra.translateRight();
		}
	);
	
	restartTimer();
};