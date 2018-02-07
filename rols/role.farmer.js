var genericFunctions = require('genericFunctions');
var roleFarmer = {
   
    /** @param {Creep} creep **/
    run: function(creep) {      
        var assignetToCreep = false;
        var idSource = "";
        if(!creep.memory.sourceId || creep.memory.sourceId == undefined ){
            //Find sources that aren't assigned to other farmers and assigne it to the actual farmer
                for(var source of creep.room.find(FIND_SOURCES)){
                    assignetToCreep = false;
                    for(var thisCreep of creep.room.find(FIND_MY_CREEPS,{
                        filter: (thisRole) => (thisRole.memory.role == 'farmer')
                    })){
                        if(creep.name != thisCreep.name){
                            idSource = source.id
                            if( thisCreep.memory.sourceId == idSource){
                                assignetToCreep = true;
                                break;
                            }
                        }
                    }
                    if (!assignetToCreep){
                        creep.memory.sourceId = idSource;
                        break;
                    }
                }               
        //TO DO
        //If we dosen't found some free source, get the minerals             
        }else{
            var sources = Game.getObjectById(creep.memory.sourceId);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleFarmer;