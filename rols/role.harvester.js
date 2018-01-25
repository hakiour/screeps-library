var roleUpgrader = require('role.upgrader');
var roleHarvester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {

        function pickUpNearSource(creep){ //Find the near droped energy, if there is no dropped energy, loock for the near container
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

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ UP-Boss');
        }

        if(creep.memory.upgrading) {//Fill the main energy structures
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
            }else{//If spawner(boss) is full, but we not, let's pick up some energy
                if(creep.carry.energy < creep.carryCapacity){
                    pickUpNearSource(creep);
                }else{
                    creep.say("TR to Storage");
                    var nearStorage = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                        filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}
                    });
                    if(creep.transfer(nearStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                   /* for(var thisFlag in Game.flags) {       
                        var name = Game.flags[thisFlag].name;
                        if (name.startsWith("reposeFlagHarvesters")){
                            creep.moveTo(Game.flags[thisFlag], {visualizePathStyle: {stroke: '#ffaa00'}});
                            console.log(creep.name + " moving to " + name);
                        }
                    }*/
                    
                }      
            }
        }
        else {
            pickUpNearSource(creep);
        }
    }
};

module.exports = roleHarvester;