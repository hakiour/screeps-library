var roleHarvester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ UP-Boss');
        }

        if(creep.memory.upgrading) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                Game.flags[creep.memory.onFlag].memory.bussy = false;
                creep.memory.onFlag = "";
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                } 
            }else{     
                if(creep.memory.onFlag != ""){
                for(var thisFlag in Game.flags) {       
                    var name = Game.flags[thisFlag].name;
                    if (name.startsWith("reposeFlag") && Game.flags[thisFlag].memory.bussy == false){
                        creep.memory.onFlag = name;
                        Game.flags[thisFlag].memory.bussy == true;
                        creep.moveTo(Game.flags[thisFlag], {visualizePathStyle: {stroke: '#ffaa00'}});
                        console.log(creep.name + " moving to " + name);
                    }
            }}else{
                creep.moveTo(Game.flags[creep.memory.onFlag], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        }
        else {
            var nearSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES_ACTIVE));
            if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleHarvester;