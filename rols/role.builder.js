var genericFunctions = require('genericFunctions');
var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
                var thisFlag = genericFunctions.findThisFlag("EnergyFlag_006");
                if(thisFlag){
                    creep.say(creep.moveTo(Game.flags[thisFlag], {visualizePathStyle: {stroke: '#ffffff'}}));
                }

                //roleUpgrader.run(creep);
            }
        }
        else {
            var nearestSafeZone = genericFunctions.getNearestSafeZone(creep);
            if(creep.room != Game.flags[nearestSafeZone].room){
                creep.moveTo(Game.flags[nearestSafeZone], {visualizePathStyle: {stroke: '#ffaa00'}});
                console.log(creep.name + " moving to a safezone: " + nearestSafeZone);
            }else{
                genericFunctions.pickUpNearSource(creep);    
            }
        }
    }
};

module.exports = roleBuilder;