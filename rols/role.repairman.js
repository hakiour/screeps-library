var genericFunctions = require('genericFunctions');
var roleUpgrader = require('role.upgrader');
var roleRepairman = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let  maxStructureHitsWalls = 100000;
        //If the room has his own top repair (for example, new rooms can't afford 1.500.000 hp on walls)
        if(creep.room.memory.maxStructureHits){
            maxStructureHitsWalls = creep.room.memory.maxStructureHits;
        }

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {     

            var nearStructure;
            if(creep.memory.reparingThis){
                nearStructure = Game.getObjectById(creep.memory.reparingThis);
            }else{
                nearStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (((structure.hits < structure.hitsMax/2) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || (structure.hits < maxStructureHitsWalls && (structure.hits + 1000) < structure.hitsMax))
                });         
                if(nearStructure){
                    creep.memory.reparingThis = nearStructure.id;
                }
            }
	        
        	if (nearStructure != undefined){
        		if(creep.repair(nearStructure) == ERR_NOT_IN_RANGE) {
               		creep.moveTo(nearStructure, {visualizePathStyle: {stroke: '#ffaa00'}});
        		}
                if (nearStructure.hits == nearStructure.hitsMax || ((nearStructure.structureType == STRUCTURE_WALL || nearStructure.structureType == STRUCTURE_RAMPART ) && nearStructure.hits > maxStructureHitsWalls)){
                    creep.memory.reparingThis = false;
                }
        	}else{
                roleUpgrader.run(creep);
        	}
        }
        else {
            var nearSource = creep.room.storage;
            if (nearSource){
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                genericFunctions.pickUpNearSource(creep);
            }
        }
    }
};

module.exports = roleRepairman;