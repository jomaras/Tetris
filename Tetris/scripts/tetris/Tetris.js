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
					point : new Point(i * this.squareSize, j * this.squareSize),
					columnIndex: i,
					rowIndex: j
				};
			}
		}
		
		this.currentTetromino = this.getRandomTetromino();
	},
	
	currentTetromino: null,
	getRandomTetromino: function()
	{
		return Tetromino.createRandomTetromino(new Point(120, 30), this);
	},
	
	isPositionChangeAllowed: function(tetromino, newPosition)
	{
		for(var i = 0; i < newPosition.length; i++)
		{
			var oldSquare = tetromino.squares[i];
			var currentSquare = newPosition[i];
			
			if(!this.isWithinBounds(currentSquare)
			|| this.hasReachedAnchoringPosition(currentSquare))
			{
				if(this.isBoundFromBelow(oldSquare))
				{
					this.mergeTetromino(tetromino);
				}
				
				return false;
			}
		}
		
		return true;
	},
	
	isHorizontallyWithinBounds: function(square)
	{
		return square.point.x >= 0 && square.point.x < this.width;
	},
	
	isVerticallyWithinBounds: function(square)
	{
		return square.point.y >= 0 && square.point.y < this.height;
	},
	
	isWithinBounds: function(square)
	{
		return this.isHorizontallyWithinBounds(square)
			&& this.isVerticallyWithinBounds(square);
	},
	
	isBoundFromBelow: function(square)
	{
		var gridPoint = this.getGridPoint(square);
		
		if(gridPoint == null) { return true; }
		
		var pointBellow = this.grid[gridPoint.columnIndex][gridPoint.rowIndex + 1];
		
		return pointBellow == null || pointBellow.isTaken;
	},
	
	hasReachedAnchoringPosition: function(square)
	{
		return this.getGridPoint(square).isTaken;
	},
	
	getGridPoint: function(square)
	{
		if(square == null) { return null; }
		
		var columnIndex = square.point.x / square.width;
		var rowIndex = square.point.y / square.height;
		
		var gridPoint = this.grid[columnIndex][rowIndex];
		
		if(gridPoint == null) { return gridPoint; }
		
		if(gridPoint.point.x != square.point.x
		|| gridPoint.point.y != square.point.y)
		{
			alert("There is a mismatch between positions");
		}
		
		return gridPoint;
	},
	
	mergeTetromino: function(tetromino)
	{
		tetromino.squares.forEach(function(square)
		{
			var gridPoint = Tetris.getGridPoint(square); 
			
			gridPoint.square = square;
			gridPoint.isTaken = true;
		});
		
		this.checkRows();
		
		this.currentTetromino = this.getRandomTetromino();
	},
	
	redrawCanvas: function()
	{
		CanvasDrawer.clearCanvas();
		
		this.redrawGrid();
	},
	
	redrawGrid: function()
	{
		this.grid.forEach(function(gridColumn)
		{
			gridColumn.forEach(function(gridPoint)
			{
				if(gridPoint.square != null)
				{
					gridPoint.square.draw();
				}
			});
		});
	},
	
	checkRows: function()
	{
		var columnsCount = this.grid.length;
		var rowsCount = this.grid[0].length;
		
		var clearedRowsIndexes = [];
		
		for(var rowCounter = rowsCount - 1; rowCounter >= 0; rowCounter--)
		{
			if(this.isRowFilled(rowCounter))
			{
				this.clearRow(rowCounter);
				clearedRowsIndexes.push(rowCounter);
			}
		}
		
		if(clearedRowsIndexes.length == 0) { return; }
		else { this.handleRowsDestroyed(clearedRowsIndexes.length); }
		
		var maxClearedRow = clearedRowsIndexes[0];
		
		for(var columnCounter = 0; columnCounter < columnsCount; columnCounter++)
		{
			this.shiftDownFilledCells(columnCounter, maxClearedRow);
		}
		
		this.redrawCanvas();
	},
	
	isRowFilled: function(rowIndex)
	{
		var columnsCount = this.grid.length;
		
		var isRowFilled = true;
		
		for(var columnCounter = 0; columnCounter < columnsCount; columnCounter++)
		{
			isRowFilled = isRowFilled && this.grid[columnCounter][rowIndex].isTaken;
			
			if(!isRowFilled) { return false;}
		}
		
		return isRowFilled;
	},
	
	clearRow: function(rowIndex)
	{
		var columnsCount = this.grid.length;
		
		for(var columnCounter = 0; columnCounter < columnsCount; columnCounter++)
		{
			this.grid[columnCounter][rowIndex].isTaken = false;
			this.grid[columnCounter][rowIndex].square = null;
		}
	},
	
	handleRowsDestroyed: function(numberOfClearedRows)
	{
		
	},
	
	shiftDownFilledCells: function(columnIndex, maxClearedRow)
	{
		var filledRowIndexes = [];
		for(var i = 0; i <= maxClearedRow; i++)
		{
			if(this.grid[columnIndex][i].isTaken) { filledRowIndexes.push(i); }
		}
		
		for(var i = maxClearedRow; i >= 0; i--)
		{
			var currentPoint = this.grid[columnIndex][i]; 
			
			if(filledRowIndexes.length > 0)
			{
				var lastFilledRowIndex = filledRowIndexes.pop();
				
				var pointToMove = this.grid[columnIndex][lastFilledRowIndex];
				
				currentPoint.isTaken = true;
				currentPoint.square = pointToMove.square.createTranslatedDownBy(i - lastFilledRowIndex);
			}
			else
			{
				currentPoint.isTaken = false;
				currentPoint.square = null;
			}
		}
	},
	
	timerId : null
};

window.onload = function()
{
	var canvas = document.getElementById("canvas");
	CanvasDrawer.setCanvas(canvas);
	
	Tetris.init(new Point(0,0), canvas.width, canvas.height, Tetromino.squareHeight);
	
	function restartTimer()
	{
		if(Tetris.timerId != null) { window.clearTimeout(Tetris.timerId); }
		
		Tetris.timerId = window.setTimeout(function() { moveDown(); restartTimer(); }, 500);
	}
	
	function moveDown()
	{
		Tetris.redrawCanvas();
		Tetris.currentTetromino.translateDown();
	}
	
	KeyboardHandler.handleKeyPress(KeyboardHandler.KEY_DOWN, moveDown);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_UP, 
		function()
		{
			Tetris.redrawCanvas();
			Tetris.currentTetromino.rotateRight();
		}
	);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_LEFT, 
		function()
		{
			Tetris.redrawCanvas();
			Tetris.currentTetromino.translateLeft();
		}
	);
	
	KeyboardHandler.handleKeyPress
	(
		KeyboardHandler.KEY_RIGHT, 
		function()
		{
			Tetris.redrawCanvas();
			Tetris.currentTetromino.translateRight();
		}
	);
	
	restartTimer();
};