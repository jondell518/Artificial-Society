var spaces = [];
var globalResources =0;
var resourcesUsed = 0;
var globalSpawned = 4;
var globalDead = 0;


var height = 75;
var width = 100;
var squareDim = 10;
var squareOffset = 2;
var stage = new PIXI.Stage(0x000000, true);
var renderer = new PIXI.CanvasRenderer(1200, 900);
var graphics = new PIXI.Graphics();
document.body.appendChild(renderer.view);
stage.addChild(graphics);




var space = function(x,y,type, resources)
{
	this.x =x;
	this.y =y;
	this.terrain = type;
	this.resources = resources;
	this.agentPresent = 0;
	this.locked = 0; //Represents the cell being locked for purposes of seeding a map
	

	this.calcAdj = function()
	{

		var s1,s2,s3,s4;
			if(this.y>0)
			{
				//Space above center space
				s1 = spaces[this.x][this.y-1].resources;
			}
			else s1=0;
			
			if(this.y<height-1)
			{
				//Space below center space
				s2 = spaces[this.x][this.y+1].resources;
			}
			else s2=0;

			if(this.x<width-1)
			{
				//Space right of center space
				s3 = spaces[this.x+1][this.y].resources;
			}
			else s3 =0;
			
			if(this.x>0)
			{
				//Space left of center space
				s4 = spaces[this.x-1][this.y].resources;
			}
			else s4 =0;
			
			var resourceCost = s1+s2+s3+s4+this.resources;
			return resourceCost;
	}

	this.draw = function(color)
	{
		graphics.beginFill(color)
		var posX = this.x*(squareDim+squareOffset);
        var posY = this.y*(squareDim+squareOffset);
        graphics.drawRect(posX,posY,squareDim, squareDim);
	}
}





var world = new World();
//var world2 = new World();

