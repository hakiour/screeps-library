var genericFunctions = require('genericFunctions');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFarmer = require('role.farmer');
var roleRepairman = require('role.repairman');
var roleMiner = require('role.miner');
var roleAssault = require('role.assault');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleTransporter = require('role.transporter');
var roleTester = require('role.tester');
require('prototype.tower');

module.exports.loop = function () {
    
    genericFunctions.clearMemoryOfDeadCreeps();

    for(let spawnerName in Game.spawns){
    	let spawner = Game.spawns[spawnerName];
    	let countByRole = _.countBy(spawner.room.find(FIND_MY_CREEPS), 'memory.role');
		let globalCountByRole = _.countBy(Game.creeps, 'memory.role');
    	//Basics rols, every room has his owns
	    var harvesters = countByRole['harvester'] || 0;
	    var builders = countByRole['builder'] || 0;
	    var upgraders = countByRole['upgrader'] || 0;
	    var farmers = countByRole['farmer'] || 0;
	    var repairman = countByRole['repairman'] || 0;
	    //Generic rols, all rooms share this units
	    var miners = globalCountByRole['miner'] || 0;
	    var assault = globalCountByRole['assault'] || 0;
	    var healers = globalCountByRole['healer'] || 0;
	    var claimers = globalCountByRole['claimer'] || 0;
	    var transporters = globalCountByRole['transporter'] || 0;
	    var testers = globalCountByRole['tester'] || 0;

	    //If the total of creeps is less than the minimum, spawn a new creep with the suitable rol&parts
	    if(assault < spawner.memory.minUnitAssault){
	        var newName = 'Unit-Assault-' + Game.time;
	        spawner.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], newName, 
	            {memory: {role: 'unit_assault', onFlag: false}});
	    }else if(healers < spawner.memory.minUnitHealer ){
	        var newName = 'Unit-Healer-' + Game.time;
	        spawner.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL], newName, 
	            {memory: {role: 'unit_healer'}});
	    }else if(harvesters < spawner.memory.minHarvesters) {
	        var newName = 'Harvester-' + Game.time;
	        spawner.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'harvester'}});
	    }else if(farmers < spawner.memory.minFarmers) {
	        var newName = 'Farmer-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
	            {memory: {role: 'farmer'}});
	    }else if(upgraders < spawner.memory.minUpgraders) {
	        var newName = 'Upgrader-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'upgrader', upgrading: false}});
	    }else if(repairman < spawner.memory.minRepairman) {
	        var newName = 'Repairman-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'repairman', reparing: false}});
	    }else if(claimers < spawner.memory.minClaimer ){
	        var newName = 'Claimer-' + Game.time;
	        spawner.spawnCreep([MOVE,CLAIM], newName, 
	            {memory: {role: 'claimer'}});
	    }else if(builders < spawner.memory.minBuilders) {
	        var newName = 'Builder-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'builder', building: false}});
	    }else if(miners < spawner.memory.minMiners){
	        var newName = 'Miner-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'miner', onFlag: false}});
	    }else if(transporters < spawner.memory.minTransporters){
	        var newName = 'Transporter-' + Game.time;
	        spawner.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'transporter', onFlag: false}});
	    }else if(testers < spawner.memory.minTesters){
	        var newName = 'Tester-' + Game.time;
	        spawner.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], newName, 
	            {memory: {role: 'tester'}});
	    }
	    
	    console.log("-------------------------");
	  	console.log("SPAWNER: " + spawnerName);
	    console.log('Harvesters: ' + harvesters + ' Builders: ' + builders + ' Upgraders: ' + upgraders  + ' Farmers: ' + farmers + ' Repairman: ' + repairman + ' Miners: ' + miners+ ' Transporter: ' + transporters + ' Claimers: ' + claimers);
	    console.log('ARMY -- ASSAULT: ' + assault + ' HEALERS: ' + healers);
	    console.log('TESTER: ' + testers);
	    console.log("-------------------------");

	    //Draw a message with the crep role
	    if(spawner.spawning) { 
	        var spawningCreep = Game.creeps[spawner.spawning.name];
	        spawner.room.visual.text(
	            '🛠️' + spawningCreep.memory.role,
	            spawner.pos.x + 1, 
	            spawner.pos.y, 
	            {align: 'left', opacity: 0.8});
	    }  



	}
    //find all towers
    var towers = _.filter(Game.structures, Tower => Tower.structureType == STRUCTURE_TOWER);
    //for each tower
    for (let tower of towers) {
        // find closes hostile creep
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);	
        if (target) {//If we found it, kill it
            tower.attack(target);
        }else{
        	//Repair near structures
        	/*if (tower.energy > 600){
        		target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (((structure.hits < structure.hitsMax/2) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || (structure.hits < 10000 && (structure.hits + 1000) < structure.hitsMax))
            // && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
            });
            
            if(target){
            	console.log(tower.repair(target));
            }
        	}*/
        }
    }

    //Find all creeps and call for theyr methods
	for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'farmer':
                genericFunctions.harvestNearSource(creep);
                break;
            case 'repairman':
                roleRepairman.run(creep);
                break;
            case 'miner':
                roleMiner.run(creep);
                break;
            case 'transporter':
                roleTransporter.run(creep);
                break;
            case 'claimer':
                roleClaimer.run(creep);
                break;
            case 'unit_assault':
                roleAssault.run(creep);
                break;
            case 'unit_healer':
                roleHealer.run(creep);
                break;
            case 'tester':
                roleTester.run(creep);
                break;
	        }
	    }
}