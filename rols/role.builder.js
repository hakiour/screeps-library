var roleUpgrader = require('role.upgrader');
var roleBuilder = {

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

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var nearConstruction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(nearConstruction != undefined){
                if(creep.build(nearConstruction) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearConstruction, {visualizePathStyle: {stroke: '#ffffff'}});  
                }
            }else{
                roleUpgrader.run(creep);
            }
        }
        else {
            pickUpNearSource(creep);
        }
    }
};

module.exports = roleBuilder;