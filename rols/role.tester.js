var genericFunctions = require('genericFunctions');
var roleUpgrader = require('role.upgrader');
var roleTester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
    	creep.say("TESTER");
    	if (creep.carryCapacity > creep.energy){
    		genericFunctions.pickUpNearSource(creep);	
    	}else{
    		var thisFlag = genericFunctions.findThisFlag("EnergyFlag_006");
            if(creep.room != Game.flags[thisFlag].room){
                creep.moveTo(Game.flags[thisFlag]);
            }else{
                roleUpgrader.run(creep);
            }
    	}   
    }
};

module.exports = roleTester;