var genericFunctions = require('genericFunctions');
var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        /*if(creep.memory.building) {
            var nearConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(nearConstruction != undefined){
                if(creep.build(nearConstruction) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearConstruction, {visualizePathStyle: {stroke: '#ffffff'}});  
                }
            }else{
                //var thisFlag = genericFunctions.findThisFlag("EnergyFlag_006");
                //if(thisFlag){
                //    creep.say(creep.moveTo(Game.flags[thisFlag], {visualizePathStyle: {stroke: '#ffffff'}}));
                //}

                roleUpgrader.run(creep);
            }
        }
        else {
            //var nearestSafeZone = genericFunctions.getNearestSafeZone(creep);
            //if(creep.room != Game.flags[nearestSafeZone].room){
            //    creep.moveTo(Game.flags[nearestSafeZone], {visualizePathStyle: {stroke: '#ffaa00'}});
            //    console.log(creep.name + " moving to a safezone: " + nearestSafeZone);
            //}else{
            //    genericFunctions.pickUpNearSource(creep);    
            //}
            var takeEnergy = creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            if(takeEnergy == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }else if(takeEnergy != OK){
                genericFunctions.pickUpNearSource(creep);
            }
        }*/

        if(creep.memory.building) {     
            var nearConstruction;
            if(creep.memory.buildingThis){
                nearConstruction = Game.getObjectById(creep.memory.buildingThis);
            }else{
                var nearConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);              
                if(nearConstruction){
                    creep.memory.buildingThis = nearConstruction.id;
                }
            }
            
            if (nearConstruction){
                var resultConstruction = creep.build(nearConstruction);
                if(resultConstruction == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearConstruction);
                }else if (resultConstruction != OK){
                    creep.memory.buildingThis = false;
                }
            }else{
                creep.memory.buildingThis = false;
                roleUpgrader.run(creep);
            }
        }
        else {
            var takeEnergy = creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            if(takeEnergy == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }else if(takeEnergy != OK){
                genericFunctions.pickUpNearSource(creep);
            }
        }
    }
};

module.exports = roleBuilder;