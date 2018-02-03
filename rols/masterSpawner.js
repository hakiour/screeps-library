module.exports = {
	createNewCreep: function(spawner, role) {
		let parts = "";
		//TO DO
			//Crear un array génerico que los porcentajes para cada rol, después iterar sobre cada item.

		//We save the % of parts that the creep contains on these variables (Ex: harvesters 50% work, 50% carry) and the individual cost of each part
		let percentWorkPart = 0; //Percent of this part: EX: on harvesters we spend 75% on move parts
		let workEnergyCost = 100; //Cost for each part
		let totalWorkParts = 0;

		let percentCarryPart = 0;
		let carryEnergyCost = 50;
		let totalCarryParts = 0;

		let percentMovePart = 0;
		let moveEnergyCost = 50;	
		let totalMoveParts = 0;

		let percentAttackPart = 0;
		let attackEnergyCost = 80;
		let totalAttackParts = 0;

		let percentHealPart = 0;
		let healEnergyCost = 250;
		let totalHealParts = 0;

		let percentToughPart = 0;
		let toughEnergyCost = 10;
		let totalToughParts = 0;

		//Get the energy avaiable from near extensions that have energy
		var energyAvaiable = spawner.room.find(FIND_STRUCTURES, {
			filter: (structure) => (structure.structureType == STRUCTURE_EXTENSION && structure.energy == structure.energyCapacity)
		}).length * 50;
		//Get the energy from Spawner
		energyAvaiable += spawner.energy;
		console.log(spawner.name + " has " + energyAvaiable + " energy on his room");
		switch(role) {
            case 'harvester':
				workPart = 75; //Percent dedicated to this part
				carryPart = 25;
				//We calculate how much parts we need by rule of three (and rounding to floor with ~~)
				totalWorkParts = ~~((energyAvaiable*workPart/100)/workEnergyCost);
				totalCarryParts = ~~((energyAvaiable*carryPart/100)/carryEnergyCost);
				//We make the string with the parts: EX: "WORK,WORK,WORK,CARRY,CARRY"
				parts = this.makeStringParts(totalWorkParts, "WORK");
				parts += "," + this.makeStringParts(carryPart, "CARRY");
				console.log(parts);
                break;
            case 'upgrader':
 
                break;
            case 'builder':
 
                break;
            case 'farmer':
 
                break;
            case 'repairman':
 
                break;
            case 'miner':
 
                break;
            case 'transporter':
 
                break;
            case 'claimer':
 
                break;
            case 'unit_assault':
 
                break;
            case 'unit_healer':
 
                break;
            case 'tester':
 
                break;
            case 'remoteWorker':
 
            	break;
	    }

	},
	makeStringParts: function(numberOfParts, nameOfPart){
		console.log("a");
		var result = "";
			for (var i = numberOfParts; i > 0; i--) {
				result += nameOfPart + ",";
			}
		
		return result.substring(0, result.length -1);
	}
};