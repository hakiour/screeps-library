var genericFunctions = require('genericFunctions');
var roleHealer = {
    
    heal: function(creep)
    	{
    		var needsHealing = [ ];
    
    		//this.keepAwayFromEnemies();
    
    		//Find my creeps that are hurt. If they're hurt, heal them.
    		//If there aren't any hurt, we're going to the basse
    		var target = creep.pos.findNearest(Game.MY_CREEPS, {
    			filter: function(t)
    			{
    				return t.hits < t.hitsMax
    			}
    		});
    
    		if(target)
    		{
    			creep.moveTo(target);
    			creep.heal(target);
    		}
    		else {
    			if(creep.pos.getRangeTo(Game.spawns['boss']) > 5){
	    		    creep.moveTo(Game.spawns['boss'], {visualizePathStyle: {stroke: '#ffaa00'}});
	    	    }
    		}
    }
};

module.exports = roleHealer;