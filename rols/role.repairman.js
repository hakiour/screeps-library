var genericFunctions = require('genericFunctions');
var roleUpgrader = require('role.upgrader');
var maxStructureHitsWalls = 1000000;
var roleRepairman = {

    /** @param {Creep} creep **/
    run: function(creep) {

        function goToBase(creep){
            var nearestSafeZone = genericFunctions.getNearestSafeZone(creep);
            if(creep.room != Game.flags[nearestSafeZone].room){
                creep.moveTo(Game.flags[nearestSafeZone], {visualizePathStyle: {stroke: '#ffaa00'}});
                console.log(creep.name + " moving to a safezone: " + nearestSafeZone);
            }else{
                 genericFunctions.pickUpNearSource(creep);    
            }
        }

        if(creep.memory.reparing && creep.carry.energy == 0) {
            creep.memory.reparing = false;
        }
        if(!creep.memory.reparing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.reparing = true;
        }

        if(creep.memory.reparing) {     

            var nearStructure;
            if(creep.memory.reparingThis){
                nearStructure = Game.getObjectById(creep.memory.reparingThis);
            }else{
                nearStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (((structure.hits < structure.hitsMax/2) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || (structure.hits < maxStructureHitsWalls && (structure.hits + 1000) < structure.hitsMax))
                // && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
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
        		/*var thisFlag = genericFunctions.findThisFlag("EnergyFlag_003");
                if(creep.room != Game.flags[thisFlag].room){
                    creep.moveTo(Game.flags[thisFlag]);
                }else{
                    goToBase(creep);
                }*/
        	}
        }
        else {
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            //goToBase(creep);
        }
    }
};

module.exports = roleRepairman;