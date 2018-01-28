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

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var farmers = _.filter(Game.creeps, (creep) => creep.memory.role == 'farmer');
    var repairman = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var assault = _.filter(Game.creeps, (creep) => creep.memory.role == 'unit_assault');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'unit_healer');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var testers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tester');


    if(testers.length < 3){
        var newName = 'Tester-' + Game.time;
        Game.spawns['boss'].spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY], newName, 
            {memory: {role: 'tester'}});
    }
    console.log('TESTER: ' + testers.length);

    if(harvesters.length < 1) { //If whe don't have harvesters, spawn one with the minimn of parts
        var newName = 'Harvester-' + Game.time;
        Game.spawns['boss'].spawnCreep([CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }else if(harvesters.length < 5) {
        var newName = 'Harvester-' + Game.time;
        Game.spawns['boss'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }else if(farmers.length < 2) {
        var newName = 'Farmer-' + Game.time;
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
            {memory: {role: 'farmer'}});
    }else if(upgraders.length < 3) {
        var newName = 'Upgrader-' + Game.time;
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader', upgrading: false}});
    }else if(repairman.length < 2) {
        var newName = 'Repairman-' + Game.time;
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'repairman', reparing: false}});
    }else if(claimers.length < 1 ){
        var newName = 'Claimer-' + Game.time;
        Game.spawns['boss'].spawnCreep([MOVE,CLAIM], newName, 
            {memory: {role: 'claimer'}});
    }else if(builders.length < 1) {
        var newName = 'Builder-' + Game.time;
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder', building: false}});
    }else if(miners.length < 6){
        var newName = 'Miner-' + Game.time;
        Game.spawns['boss'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE], newName, 
            {memory: {role: 'miner', onFlag: false}});
    }else if(transporters.length < 22){
        var newName = 'Transporter-' + Game.time;
        Game.spawns['boss'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'transporter', onFlag: false}});
    }else if(assault.length < 0){
        var newName = 'Unit-Assault-' + Game.time;
        Game.spawns['boss'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], newName, 
            {memory: {role: 'unit_assault', onFlag: false}});
    }else if(healers.length < 0 ){
        var newName = 'Unit-Healer-' + Game.time;
        Game.spawns['boss'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL], newName, 
            {memory: {role: 'unit_healer'}});
    }

  


     console.log('Harvesters: ' + harvesters.length + ' Builders: ' + builders.length + ' Upgraders: ' + upgraders.length  + ' Farmers: ' + farmers.length + ' Repairman: ' + repairman.length + ' Miners: ' + miners.length+ ' Transporter: ' + transporters.length + ' Claimers: ' + claimers.length);
     console.log('ARMY -- ASSAULT: ' + assault.length + ' HEALERS: ' + healers.length);

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