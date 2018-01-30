var genericFunctions = require('genericFunctions');
var roleHarvester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
            genericFunctions.harvestNearSource(creep);
    }

    /*
    var roleUpgrader = require('role.upgrader');
	var roleRecolector = {
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES,{
            filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION  || structure.structureType == STRUCTURE_SPAWN) && structure.energy != structure.energyCapacity }
        }); 
   
        if(creep.carry.energy == creep.carryCapacity) {
                       var resultado = creep.pickup(sources);

            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(targets[0]);
            } else if(resultado != OK){
                roleUpgrader.run(creep);

            }
        }else{
           var sources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,{
            filter: (energy) => {return (energy.amount > 40  && energy.resourceType == RESOURCE_ENERGY)}
            });
            if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }    
    }
};

module.exports = roleRecolector;
    */
};

module.exports = roleHarvester;