var roleHarvester = {
    /*Don't use this script, is deprecated*/
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.memory.mining == false)//If we are not mining
            {
                for(let sourcesToHarvest of creep.room.find(FIND_SOURCES)) {//Find an avaiable resource 
                    
                    var sourceToHarvest_ID = sourcesToHarvest.id;
                    Memory.sourceToHarvest_ID = false;
                    //creep.say(Memory.sourceToHarvest_ID);
                    if(Memory.sourceToHarvest_ID == false) {
                        Memory.sourceToHarvest_ID = true;
                        creep.memory.mining = sourceToHarvest_ID; 
                    }
                }
            }else{//we still mining.
                 var sourcesToHarvest = Game.getObjectById(creep.memory.mining);
                 //creep.say(sourcesToHarvest.id);
                  if(creep.harvest(sourcesToHarvest) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sourcesToHarvest, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {//we are full on carry capacity
            //creep.say("I'm full");
            if(!creep.memory.mining == false){
                creep.say("Cleaning");
                var sourceHarvested = Game.getObjectById(creep.memory.mining);
                var sourceHarvested_ID = sourceHarvested.id;
                Memory.sourceHarvested_ID = false;
                creep.memory.mining = false;
            }
           
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
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