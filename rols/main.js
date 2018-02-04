var genericFunctions = require('genericFunctions');
var masterSpawner = require('masterSpawner');
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
var roleRemoteWorker = require('role.remoteWorker');
require('prototype.tower');

module.exports.loop = function () {
    
    genericFunctions.clearMemoryOfDeadCreeps();

    for(let spawnerName in Game.spawns){
    	let spawner = Game.spawns[spawnerName];
    	let countByRole = _.countBy(spawner.room.find(FIND_MY_CREEPS), 'memory.role');
		let globalCountByRole = _.countBy(Game.creeps, 'memory.role');
		
		// TO DO
		/*

		 `_.groupBy(Game.creeps, c => c.pos.roomName + '_' + c.memory.role)` and then check for groups like:
		`let miners = creepsByRole['E59S39_Miner']` or something. Let's once pass group by room and role.

		let creepsByRole = _.groupBy(Game.creeps, 'memory.role');
		let miners = creepsByRole['miner'] || [];

		Actually it's a lot lighter because that way you process each structure once, while with a bunch of filters each creep goes over all structures several times until they find a match

		It's also more efficient in general because with the "basic" system, all creeps are basically "racing" each other. They all try to go to the spawn, then they all try to fill the tower, etc, so there will be a lot of wasted pathfinding.
		If there are three creeps bringing energy somewhere while you need only one, two creeps have wasted cpu on pathfinding and wasted time (and thus life) on going somewhere they didn't need to go.

		With Tigga's system you can send your creeps to different targets


		hakiour [12:47 AM]
		all se the point, for do this, i need to save all on memory, no?

		Because it's the only way i know for store the list of structures

		because if i save it on a variable

		when the creeps attentd to acces to it they need to read the variable

		I know i explain myself like shit hahaha, sry

		My english sucks


		Keenathar [12:49 AM]
		I guess the easiest implementation would be to store the target in creep memory, and to store the job (creep X is bringing Y energy to target Z) in memory.
		Each tick when going over room.structures you can ignore the ones that are already being handled.

		For jobs you can just create a new memory location such as Memory.logisticJobs or something.

		I think that should be enough to start trying yourself :wink:
		*/
    	
	    	//Basics rols, every room has his owns
		    var harvesters = countByRole['harvester'] || 0;
		    var builders = countByRole['builder'] || 0;
		    var upgraders = countByRole['upgrader'] || 0;
		    var farmers = countByRole['farmer'] || 0;
		    var repairman = countByRole['repairman'] || 0;
		    //Generic rols, all rooms share this units
		    var miners = globalCountByRole['miner'] || 0;
		    var assault = globalCountByRole['unit_assault'] || 0;
		    var healers = globalCountByRole['unit_healer'] || 0;
		    var claimers = globalCountByRole['claimer'] || 0;
		    var transporters = globalCountByRole['transporter'] || 0;
		    var testers = globalCountByRole['tester'] || 0;
		    var remoteWorkers = globalCountByRole['remoteWorker'] || 0;

		if (!spawner.spawning){
		    //If the total of creeps is less than the minimum, spawn a new creep with the suitable rol&parts
		    if(assault < spawner.memory.minUnitAssault){
		        masterSpawner.createNewCreep(spawner, "unit_assault");
		    }else if(healers < spawner.memory.minUnitHealer ){
		        masterSpawner.createNewCreep(spawner, "unit_healer");
		    }else if(harvesters < spawner.memory.minHarvesters) {
		        masterSpawner.createNewCreep(spawner, "harvester");
		    }else if(farmers < spawner.memory.minFarmers) {
		        masterSpawner.createNewCreep(spawner, "farmer");
		    }else if(upgraders < spawner.memory.minUpgraders) {
		        masterSpawner.createNewCreep(spawner, "upgrader");
		    }else if(repairman < spawner.memory.minRepairman) {
		        masterSpawner.createNewCreep(spawner, "repairman");
		    }else if(claimers < spawner.memory.minClaimer ){
		        masterSpawner.createNewCreep(spawner, "claimer");
		    }else if(builders < spawner.memory.minBuilders) {
		        masterSpawner.createNewCreep(spawner, "builder");
		    }else if(testers < spawner.memory.minTesters){
		        masterSpawner.createNewCreep(spawner, "tester");
		    }else if(remoteWorkers < spawner.memory.minRemoteWorkers){
		        masterSpawner.createNewCreep(spawner, "remoteWorker");
		    }else if(miners < spawner.memory.minMiners){
		        masterSpawner.createNewCreep(spawner, "miner");
		    }else if(transporters < spawner.memory.minTransporters){
		        masterSpawner.createNewCreep(spawner, "transporter");
		    }
		}
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
        	//Heal near creeps
        	target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (thisCreep) => (thisCreep.hits < thisCreep.hitsMax)
            // && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
            });
            
            if(target){
            	console.log(tower.heal(target));
            }
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
            case 'remoteWorker':
            roleRemoteWorker.run(creep);
            	break;
	        }
	    }
}