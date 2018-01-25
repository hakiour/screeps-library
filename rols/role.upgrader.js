var roleUpgrader = {

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

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {       
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('⚡ MV-To-Controller');
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            pickUpNearSource(creep);
        }
    }
};

module.exports = roleUpgrader;