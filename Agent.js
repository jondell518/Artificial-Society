//This is the model agent with several variables
//x = the x location of the agent on the map
//y = the y location of the agent on the map
//id allows it to be identified
//these are set initially to the spot with the highest resources
//food = the amount of resources the agent has collected (2 per turn)
//metab = the amount of food required per turn
//spaceResources = this is the amount of resources that were on the space when the agent moved there
//surviveNum = the amount of food the agent needs to survive (1 per turn)
//status = 0 is alive, 1 is dead
//birthcycle controls population addition
//age is self explanatory
var Agent = function(x,y, id, year)
{


	this.x =x;
	this.y =y;
	this.id = id;
	this.food = 10;
	this.metab = 1;
	this.spaceResources = 0;
	this.surviveNum = 1;
	this.totalFoodConsumed =0;
	this.status = 0;
	this.birthCycle = 0;
	this.age = 0;
	this.yearSpawned =year;
	
	this.gather = function()
	{

			spaces[this.x][this.y].agentPresent =1;
			if(spaces[this.x][this.y].resources >= 2)// && this.food < 15)
			{
				this.food += 2;
				spaces[this.x][this.y].resources -= 2;
			}
			else if(spaces[this.x][this.y].resources == 1)// && this.food < 15)
			{
				this.food += 1;
				spaces[this.x][this.y].resources -= 1;
			}
			else if(spaces[this.x][this.y].resources == 0)
			{
				if(this.food <= 10)
					this.move(this.findBestAdj());
				else
				{
					this.food -= 2;
					spaces[this.x][this.y].resources += 2;
				}
			}
		
		
		
	}

	this.eat = function()
	{
		if(this.food > 0)
		{
			this.food -= this.metab;
			globalResources -= this.metab;
			resourcesUsed += this.metab;
			this.totalFoodConsumed += this.metab;
		//	document.write("Food left here: " + spaces[this.x][this.y].resources + "<br>")
		//	document.write("I have this much food: " + this.food + "<br><br>")
		}
	}
	
	this.findBestAdj = function()
	{
		var newSpot = function(x,y,cost)
		{
			this.x =x;
			this.y=y;
			this.cost=cost;
		}

		var up = new newSpot(0,0,0);
		var down= new newSpot(0,0,0);
		var left= new newSpot(0,0,0);
		var right = new newSpot(0,0,0);
			

			//Space above center space
			if(this.y > 0)
			{
				
				up.cost=spaces[this.x][this.y-1].calcAdj();
				up.x = this.x;
				up.y = this.y-1;
			}
			else 
			{
					up.cost=0;
					up.x = 0;
					up.y = 0;
			}
			
			//Space below center space
			if(this.y<height-1)
			{	
				down.cost = spaces[this.x][this.y+1].calcAdj()
				down.x = this.x;
				down.y = this.y+1;
			}
			else
			{
				down.cost=0;
				down.x = 0;
				down.y = 0;
			} 

			//Space right of center space
			if(this.x<width-1)
			{
				right.cost = spaces[this.x+1][this.y].calcAdj();
				right.x =this.x+1;
				right.y = this.y;
			}
			else
			{
				right.cost =0;
				right.x =0;
				right.y = 0;
			} 
			
			//Space left of center space
			if(this.x > 0)
			{
				left.cost = spaces[this.x-1][this.y].calcAdj();
				left.x = this.x-1;
				left.y = this.y;
			}
			else
			{
				left.cost =0;
				left.x = 0;
				left.y = 0;

			} 
	
			//This array contains all the adjacent squares, and then sorts them based on the cost
			var costs = [up, down, left, right];
			costs.sort(function(b, a) {return b.cost-a.cost;});

			return costs;
	}
	//Finds the best adjacent spot based on resource cost and then moves the agent there
	this.move = function(costs)
	{
		

			for(var i =0; i<costs.length; i++)
			{
				var x = costs[i].x;
				var y = costs[i].y;

				if(spaces[x][y].agentPresent == 0)
				{
					spaces[this.x][this.y].agentPresent = 0;
					spaces[this.x][this.y].terrain = 10;
					this.x = x;
					this.y = y;
					this.spaceResources = spaces[x][y].resources;
					spaces[this.x][this.y].agentPresent = 1;
					//spaces[this.x][this.y].draw(0xff0000);
					spaces[this.x][this.y].terrain = 11;
					return;
				}
			}

				/*if(newSpot.cost == up.cost)
				{
					newSpot.x = up.x;
					newSpot.y = up.y;
				}
				else if(newSpot.cost == down.cost)
				{
					newSpot.x = down.x;
					newSpot.y = down.y;
				}
				else if(newSpot.cost == right.cost)
				{
					newSpot.x = right.x;
					newSpot.y = right.y;
				}
				else if(newSpot.cost == left.cost)
				{
					newSpot.x = left.x;
					newSpot.y = left.y;
				}
				else
					document.write("SOMETHING WENT HORRIBLY WRONG <br><br>");
			
			if(spaces[newSpot.x][newSpot.y].agentPresent == 0)
			{
				spaces[this.x][this.y].agentPresent = 0;
				spaces[this.x][this.y].terrain = 10;
				this.x = newSpot.x;
				this.y = newSpot.y;
				this.spaceResources = spaces[newSpot.x][newSpot.y].resources;
				spaces[this.x][this.y].agentPresent = 1;
				spaces[this.x][this.y].draw(0xff0000);
				spaces[this.x][this.y].terrain = 11;
			}*/
			
	}

	this.live = function()
	{
		//Less than 100 results in basically a dead simulation, unsure why
		if(this.age == 100)
		{
			this.status = 1;
			spaces[this.x][this.y].resources += this.food;
			spaces[this.x][this.y].agentPresent = 0;
			spaces[this.x][this.y].terrain = 10;
		}
		else
			this.age++;
	}


}