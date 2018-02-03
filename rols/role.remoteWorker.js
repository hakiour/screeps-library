var genericFunctions = require('genericFunctions');
var roleBuilder = require('role.builder');
var roleRemoteWorker = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
    	
        if(creep.memory.testing && creep.carry.energy == 0) {
            creep.memory.testing = false;
        }
        if(!creep.memory.testing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.testing = true;
        }

    	if (creep.memory.testing){
    		var thisFlag = genericFunctions.findThisFlag("remoteWorkers");
            if(creep.room != Game.flags[thisFlag].room){
                creep.moveTo(Game.flags[thisFlag]);
            }else{
                roleBuilder.run(creep);
            }
    	}else{
            genericFunctions.pickUpNearSource(creep);   	
    	}   
    }
};

module.exports = roleRemoteWorker;