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
    	let creepsOnTheRoom = spawner.room.find(FIND_CREEPS);
    	//Basics rols, every room has his owns
	    var harvesters = _.filter(creepsOnTheRoom, (creep) => creep.memory.role == 'harvester');
	    var builders = _.filter(creepsOnTheRoom, (creep) => creep.memory.role == 'builder');
	    var upgraders = _.filter(creepsOnTheRoom, (creep) => creep.memory.role == 'upgrader');
	    var farmers = _.filter(creepsOnTheRoom, (creep) => creep.memory.role == 'farmer');
	    var repairman = _.filter(creepsOnTheRoom, (creep) => creep.memory.role == 'repairman');
	    //Generic rols, all rooms share this units
	    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
	    var assault = _.filter(Game.creeps, (creep) => creep.memory.role == 'unit_assault');
	    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'unit_healer');
	    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
	    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
	    var testers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tester');
	    //If the total of creeps is less than the minimum, spawn a new creep with the suitable rol&parts
	    if(assault.length < spawner.memory.minUnitAssault){
	        var newName = 'Unit-Assault-' + Game.time;
	        spawner.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], newName, 
	            {memory: {role: 'unit_assault', onFlag: false}});
	    }else if(healers.length < spawner.memory.minUnitHealer ){
	        var newName = 'Unit-Healer-' + Game.time;
	        spawner.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL], newName, 
	            {memory: {role: 'unit_healer'}});
	    }else if(testers.length < spawner.memory.minTesters){
	        var newName = 'Tester-' + Game.time;
	        spawner.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], newName, 
	            {memory: {role: 'tester'}});
	    }else if(harvesters.length < 1) { //If whe don't have harvesters, spawn one with the minimn of parts
	        var newName = 'Harvester-' + Game.time;
	        spawner.spawnCreep([CARRY,MOVE], newName, 
	            {memory: {role: 'harvester'}});
	    }else if(harvesters.length < spawner.memory.minHarvesters) {
	        var newName = 'Harvester-' + Game.time;
	        spawner.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'harvester'}});
	    }else if(farmers.length < spawner.memory.minFarmers) {
	        var newName = 'Farmer-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
	            {memory: {role: 'farmer'}});
	    }else if(upgraders.length < spawner.memory.minUpgraders) {
	        var newName = 'Upgrader-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'upgrader', upgrading: false}});
	    }else if(repairman.length < spawner.memory.minRepairman) {
	        var newName = 'Repairman-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'repairman', reparing: false}});
	    }else if(claimers.length < spawner.memory.minClaimer ){
	        var newName = 'Claimer-' + Game.time;
	        spawner.spawnCreep([MOVE,CLAIM], newName, 
	            {memory: {role: 'claimer'}});
	    }else if(builders.length < spawner.memory.minBuilders) {
	        var newName = 'Builder-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'builder', building: false}});
	    }else if(miners.length < spawner.memory.minMiners){
	        var newName = 'Miner-' + Game.time;
	        spawner.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'miner', onFlag: false}});
	    }else if(transporters.length < spawner.memory.minTransporters){
	        var newName = 'Transporter-' + Game.time;
	        spawner.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
	            {memory: {role: 'transporter', onFlag: false}});
	    }
	    
	    console.log("-------------------------");
	  	console.log("SPAWNER: " + spawnerName);
	    console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length  + ' Farmers: ' + farmers.length + ' Repairman: ' + repairman.length + ' Miners: ' + miners.length+ ' Transporter: ' + transporters.length + ' Claimers: ' + claimers.length);
	    console.log('ARMY -- ASSAULT: ' + assault.length + ' HEALERS: ' + healers.length);
	    console.log('TESTER: ' + testers.length);
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
    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }
}