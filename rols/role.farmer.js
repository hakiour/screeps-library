var roleHarvester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
            var nearSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    }
};

module.exports = roleHarvester;