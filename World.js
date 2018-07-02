var World = function()
{

	this.year = 0; //"Year" counter
	this.agents = []; //Array for holding the agents once they are spawned
	this.numAgents = 0; //Universal counter of the number of agents for generating ID 
	this.birthCycleRate = 10; //World controller of the birth rate, 35-50 seems to be best
	//this.generateMap(); //This is function for giving every space random values
	this.populateMap();
	/*var bestSpot = this.finder();
	spaces[bestSpot.x][bestSpot.y].terrain = 8;
	var agent = new Agent(bestSpot.x, bestSpot.y, this.numAgents, 0)*/
	var agent = new Agent(10,15, this.numAgents, 0);
	this.agents.push(new Agent(10,15, this.numAgents, 0));
	this.agents.push(new Agent(10,45, this.numAgents, 0));
	this.agents.push(new Agent(80,15, this.numAgents, 0));
	this.agents.push(new Agent(80,45, this.numAgents, 0));
	this.numAgents++;

	//Calls the function which runs the simulation loop
	this.runSim();
	//Draws the map after the simulation is completed
	this.drawMap();
	/*for(var i=0; i<this.agents.length; i++)
	{
		//resourcesUsed += this.agents[i].totalFoodConsumed;
		document.write("My ID: " + this.agents[i].id + " Born: " + this.agents[i].yearSpawned + " Dead?: " + this.agents[i].status + " Food consumed: " + this.agents[i].totalFoodConsumed + " Food Left: " + this.agents[i].food + "<br>");
	}*/
	document.write("Year: " + this.year +"<br>");
	document.write("Global Resources Left: " + globalResources + "<br>");
	document.write("Resources Used: " + resourcesUsed +"<br> Spawned Total: "+ globalSpawned + "<br> Death Total: " + globalDead + "<br> Survivors: " + (globalSpawned - globalDead) + "<br>");
	document.write("Total Agents: " + this.agents.length + "<br><br>");


	
}


World.prototype.runSim = function()
{


	//Simulation Loop
	for(var i =0; i< 1000; i++)
	{
		for(var j=0; j <this.agents.length; j++)
		{
			var x = this.agents[j].x;
			var y = this.agents[j].y;
			if(this.agents[j].status == 0 && this.agents[j].food > 0)
			{
				this.agents[j].gather();
				this.agents[j].eat();
				//this.agents[j].live();
				if(this.agents[j].birthCycle == this.birthCycleRate)// && this.agents[j].food > 1)
				{
					var bestSpot = this.finder();
					this.spawn(this.agents[j], bestSpot);
					//this.agents.push(new Agent(bestSpot.x, bestSpot.y, this.numAgents, this.year));
					globalSpawned++;
					this.numAgents++;
					this.agents[j].birthCycle = 0;
					this.agents[j].food -= 1;
				}
				this.agents[j].birthCycle++;
			}
			else
			{
				this.agents[j].status == 1
				globalDead++;
				this.agents.splice(j,1);
				spaces[x][y].terrain = 10;
				spaces[x][y].agentPresent = 0;
			}


		}
		if(this.agents.length == 0)
			break;
		else if (globalResources <= 0)
		{
			console.log("THE WOLRD HAS BEEN DEPLETED");
			break;
		}
		this.year++;
	}
	
}

World.prototype.drawMap = function()
{

	var bodies = 0;
	for(var i =0; i < spaces.length; i++)
	{
		for(var j =0; j < spaces[i].length; j++)
		{
			/*if(spaces[i][j].terrain == 0) //Generic tiles
			{
				spaces[i][j].draw(0x310c0c);
				
			}
			else if(spaces[i][j].terrain == 1) //Plains tiles
			{
				
				spaces[i][j].draw(0x838B8B);
			}
			else if(spaces[i][j].terrain == 2)
			{
				spaces[i][j].draw(0x01a05f);
				//spaces[i][j].draw(0x310c0c);
			}
			else if(spaces[i][j].terrain == 3)
			{
				spaces[i][j].draw(0x01a05f);
				//spaces[i][j].draw(0x2cabe2);
			}
			else if(spaces[i][j].terrain == 4)
			{spaces[i][j].draw(0x01a05f);
				//spaces[i][j].draw(0x838B8B);
			}
			else if(spaces[i][j].terrain == 9) //Tiles that have been gathered from by an agent
			{
				spaces[i][j].draw(0x0000ff);
			}
			else if(spaces[i][j].terrain == 11) //Tiles where an agent currently is
			{
				spaces[i][j].draw(0xff0000);
				bodies++;
			}*/
			/*if(spaces[i][j].agentPresent != 1)
			{*/
				if(spaces[i][j].resources == 0)
				{
					spaces[i][j].draw(0xb3ffb3);
				}
				else if(spaces[i][j].resources > 0 && spaces[i][j].resources <= 15)
				{
					spaces[i][j].draw(0x80ff80);
				}
				else if(spaces[i][j].resources > 15 && spaces[i][j].resources <= 30)
				{
					spaces[i][j].draw(0x4dff4d);
				}
				else if(spaces[i][j].resources > 30 && spaces[i][j].resources <= 45)
				{
					spaces[i][j].draw(0x1aff1a);
				}
				else if(spaces[i][j].resources > 45 && spaces[i][j].resources <= 60)
				{
					spaces[i][j].draw(0x00e600);
				}
				else if(spaces[i][j].resources > 60 && spaces[i][j].resources <= 75)
				{
					spaces[i][j].draw(0x00b300);
				}
				else if(spaces[i][j].resources > 75) // && spaces[i][j].resources <= 60)
				{
					spaces[i][j].draw(0x008000);
				}
			//}
			//else
			if(spaces[i][j].agentPresent == 1)
			{
				spaces[i][j].draw(0xff0000);
				bodies++;
			}
			

			/*if(spaces[i][j].terrain == 11) //Tiles where an agent currently is
			{
				spaces[i][j].draw(0xff0000);
				bodies++;
			}*/

		}
	}

	renderer.render(stage);
	document.write("<br>")
	document.write("Bodies: " + bodies + "<br>");
}


World.prototype.spawn = function(agent, bestSpot)
{
	//this.agents.push(new Agent(bestSpot.x, bestSpot.y, this.numAgents, this.year))
	//Takes the agent and gets the nearby spaces and their cost in resources
	var nearby = agent.findBestAdj();
	//console.log("Agent Spawned!");
		for(var i =0; i<nearby.length; i++)
			{
				var x = nearby[i].x;
				var y = nearby[i].y;

				if(spaces[x][y].agentPresent == 0)
				{
					this.agents.push(new Agent(x, y, this.numAgents, this.year));
					return;
				}
			}

}

World.prototype.calcResources = function()
{
	document.write("made it here<br>");
	var localResources = 0;
	for(var i=0; i<this.width;i++)
	{
		for(var j=0; j<this.height;j++)
		{
			localResources += spaces[i][j].resources;
		}
	}
	globalResources = localResources;
}

World.prototype.generateMap = function()
{
	for(var i=0; i<width;i++)
	{
		spaces[i] = [];
		for(var j=0; j<height;j++)
		{
			var randType = Math.floor(Math.random()*5);
			var randResources = Math.floor(Math.random()*100+1)
			globalResources = globalResources + randResources;
			spaces[i][j]= new space(i,j,randType, randResources);
			//document.write(spaces[i][j].terrain +" ");
		}
		//document.write("<br>");
	}
	//document.write("<br>");
}


World.prototype.populateMap = function()
{
	//Create base world
	for(var i=0; i<width;i++)
	{
		spaces[i] = [];
		for(var j=0; j< height; j++)
		{
			spaces[i][j] = new space(i,j,0, 30);
			globalResources += 30;
		}
	}
	//Create half of the tiles as plains
	var numTiles = (width*height)/2;

	for(var z=0; z<numTiles; z++)
	{
		//Randomize the positions of these tiles and initialize them to a new value
		var plainsX = Math.floor(Math.random()*width);
		var plainsY = Math.floor(Math.random()*height);
		spaces[plainsX][plainsY].terrain = 1;
		spaces[plainsX][plainsY].resources = 100;
		globalResources += 70;

	}

	//Create a quarter as rocky terrain
	for(var i =0; i< numTiles/2; i++)
	{
		var mountainsX = Math.floor(Math.random()*width);
		var mountainsY = Math.floor(Math.random()*height);
		spaces[mountainsX][mountainsY].terrain = 2;
		spaces[mountainsX][mountainsY].resources = 15;
		globalResources -= 15;
	}


}
//Function finds the spot with the best resources (it adds together the resources of the 4 spaces adjacent to it) and saves that value to each space
World.prototype.finder = function()
{
	var s1,s2,s3,s4;
	var bestSpot = function(x,y,type,cost)
	{

		this.x = x;
		this.y=y;
		this.terrain = type;
		this.cost =cost;

	}
	var spot = new bestSpot(0,0,0,0);
	for(var i=0; i<width;i++)
	{
		for(var j=0; j<height;j++)
		{
			if(j>0)
			{
				//Space above center space
				s1 = spaces[i][j-1].resources;
			}
			else s1=0;
			
			if(j<height-1)
			{
				//Space below center space
				s2 = spaces[i][j+1].resources;
			}
			else s2=0;

			if(i<width-1)
			{
				//Space right of center space
				s3 = spaces[i+1][j].resources;
			}
			else s3 =0;
			
			if(i>0)
			{
				//Space left of center space
				s4 = spaces[i-1][j].resources;
			}
			else s4 =0;
			
			var resourceCost = s1+s2+s3+s4+spaces[i][j].resources;
			spaces[i][j].adjCost = resourceCost;
			
			if(resourceCost > spot.cost)
			{
				spot.cost = resourceCost;
				spot.x=i;
				spot.y=j;
				spot.terrain = spaces[i][j].terrain;
			}
		}
	}

	return spot;
}

//Function prints the map represented by its terrain values [0-4]
World.prototype.printMap = function(type)
{
	function givemecolor(thecolor,thetext)
    {
    	return '<span style="color:'+thecolor+'>'+thetext+'</span>';
    }

	if(type == 1)
	{
		for(var i=0; i<width;i++)
		{
			for(var j=0; j<height;j++)
			{
				if(spaces[i][j].terrain == 9)
				{
					document.write("* ");
				}
				else
					document.write(spaces[i][j].terrain +" ");
			}
			document.write("<br>");
		}
		document.write("<br>");
	}
	else if(type == 2)
	{
		for(var i=0; i<width;i++)
		{
			for(var j=0; j<height;j++)
			{
				document.write(spaces[i][j].resources +"___");
			}
			document.write("<br>");
		}
		document.write("<br>");
		}
	
}