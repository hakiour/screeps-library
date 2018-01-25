var roleBuilder = require('role.builder');
var roleRepairman = {

    /** @param {Creep} creep **/
    run: function(creep) {

        function pickUpNearSource(creep){
           	var minimumEnergy = 70;
            var nearSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,{
                filter: (energy) => {return (energy.amount > minimumEnergy && energy.resourceType == RESOURCE_ENERGY)}
            });
            if(nearSource != undefined){
                if(creep.pickup(nearSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                nearSource = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > minimumEnergy)}
                });
                if(creep.withdraw(nearSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }   
        }

        if(creep.memory.reparing && creep.carry.energy == 0) {
            creep.memory.reparing = false;
            creep.say('🔄 RP-Harvest');
        }
        if(!creep.memory.reparing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.reparing = true;
            creep.say('⚡ repaaair!');
        }

        if(creep.memory.reparing) {     
	        var nearStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            	filter: (structure) => (((structure.hits < structure.hitsMax/2) && structure.structureType != STRUCTURE_WALL) || (structure.hits < 251003 && (structure.hits + 1000) < structure.hitsMax))
            	// && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
			});
        	if (nearStructure != undefined){
        		if(creep.repair(nearStructure) == ERR_NOT_IN_RANGE) {
               		creep.moveTo(nearStructure, {visualizePathStyle: {stroke: '#ffaa00'}});
        		}

        	}else{
        		roleBuilder.run(creep);
        	}
        }
        else {
            pickUpNearSource(creep);
        }
    }
};

module.exports = roleRepairman;