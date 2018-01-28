var genericFunctions = require('genericFunctions');
var roleMiner = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
			if(!creep.memory.onFlag || creep.memory.onFlag == undefined){
                for(var thisFlag of _.sortBy(Game.flags, flag => creep.pos.findPathTo(flag.pos))) {  
                    var name = thisFlag.name;
                    if (name.startsWith("EnergyFlag") && (thisFlag.memory.bussy == false || thisFlag.memory.bussy == undefined)){
                        thisFlag.memory.bussy = true;
                        creep.memory.onFlag = name;
                        creep.moveTo(Game.flags[thisFlag]);
                        break;
                    }
                }
                /*for(var thisFlag in Game.flags) {       
                    var name = Game.flags[thisFlag].name;      
                    if (name.startsWith("EnergyFlag") && (Game.flags[thisFlag].memory.bussy == false || Game.flags[thisFlag].memory.bussy == undefined)){
                        Game.flags[thisFlag].memory.bussy = true;
                        creep.memory.onFlag = name;
                        creep.moveTo(Game.flags[thisFlag]);
                        break;
                    }
                }*/
            }else{

                if(creep.ticksToLive < 5){
                    Game.flags[creep.memory.onFlag].memory.bussy = false;
                    creep.suicide();
                } else if(creep.pos.getRangeTo(Game.flags[creep.memory.onFlag]) <= 1){
						genericFunctions.harvestNearSource(creep);   
            	}
            	else{
            		 creep.moveTo(Game.flags[creep.memory.onFlag]);
            	}
            }
	    
	}
   
};

module.exports = roleMiner;