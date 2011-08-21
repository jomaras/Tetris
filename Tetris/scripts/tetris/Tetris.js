var Tetris = {};
Tetris.timerId;

window.onload = function()
{
	CanvasDrawer.setCanvas(document.getElementById("canvas"));
	
	var tetra = new TetrominoZ(new Point(100, 20));
	
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