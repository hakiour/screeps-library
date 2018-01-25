var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFarmer = require('role.farmer');
var roleRepairman = require('role.repairman');
require('prototype.tower');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var farmers = _.filter(Game.creeps, (creep) => creep.memory.role == 'farmer');
    var repairman = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');

    if(farmers.length < 2) {
        var newName = 'Farmer-' + Game.time;
        console.log('Spawning new farmer: ' + newName);
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'farmer'}});
    }else if(harvesters.length < 4) {
        var newName = 'Harvester-' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['boss'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }else if(upgraders.length < 3) {
        var newName = 'Upgrader-' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }else if(repairman.length < 2) {
        var newName = 'Repairman-' + Game.time;
        console.log('Spawning new repairman: ' + newName);
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'repairman'}});
    }else if(builders.length < 1) {
        var newName = 'Builder-' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
     console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length  + ' Farmers: ' + farmers.length + ' Repairman: ' + repairman.length );

    //------------
    if(Game.spawns['boss'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['boss'].spawning.name];
        Game.spawns['boss'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['boss'].pos.x + 1, 
            Game.spawns['boss'].pos.y, 
            {align: 'left', opacity: 0.8});
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
                roleFarmer.run(creep);
                break;
            case 'repairman':
                roleRepairman.run(creep);
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