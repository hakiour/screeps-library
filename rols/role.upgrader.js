var genericFunctions = require('genericFunctions');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {       
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
           	nearSource = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 70)}
            });

            if (nearSource){
               if(creep.withdraw(nearSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffffff'}});
                } 
            }else{
                genericFunctions.pickUpNearSource(creep);
            }
            
        }
    }
};

module.exports = roleUpgrader;