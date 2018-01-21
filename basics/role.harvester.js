var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
           
            if(creep.memory.mining == false)//If we are not mining
            {
                for(let sourcesToHarvest of creep.room.find(FIND_SOURCES)) {//Fin an avaiable resource 
                    var sourceToHarvest_ID = sourcesToHarvest.id;
                    if(Memory.sourceToHarvest_ID == false && creep.harvest(sourcesToHarvest) == ERR_NOT_IN_RANGE) {
                        creep.memory.mining = sourceToHarvest_ID; 
                        Memory.sourceToHarvest_ID = true;
                        creep.moveTo(sourcesToHarvest, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
            }
            }{//we still mining.
                 var sources = creep.room.find(FIND_SOURCES);
                  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {//we are full on carry capacity
            var sourceHarvested = Game.getObjectById(creep.memory.mining);
            Memory.sourceHarvested = false;
            creep.memory.mining = false;
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity || structure.structureType == STRUCTURE_SPAWN;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
