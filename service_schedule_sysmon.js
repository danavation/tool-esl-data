const config = require('./config.js').service_sysmon
const exec = require('child_process').exec
const si = require('systeminformation')

const slack = (text) => {
	if(config.slack !== ''){
    	let cmd = 
    		'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#devops-notifications\\", \\"username\\": \\"tool-esl-sysmon\\", \\"text\\": \\"' + 
    		text + 
    		'\\"}" ' + 
    		config.slack
		
	    exec(cmd, function (error, stdout, stderr) {
	      	console.log('[tool-esl-sysmon]', '[slack]', '[stdout]', stdout);
	      	console.log('[tool-esl-sysmon]', '[slack]', '[stderr]', stderr);
	      	if (error !== null) {
	        	console.log('[tool-esl-sysmon]', '[slack]', '[error]', error);
	      	}
	    })
    }
}

const run = () => {

	valueObject = {
		currentLoad: 'currentload, cpus',
		fsSize: 'use',
		mem: 'total , free, used, active'
	}

	cpuLoad = 0;
	diskUse = 0;
	memUse = 0;

	si.get(valueObject).then(data => {
		cpuLoad = data.currentLoad.currentload;
		if(cpuLoad<10){
			cpuLoad = cpuLoad.toFixed(2);
		} else{
			cpuLoad = cpuLoad.toFixed(0); 
		}
		console.log("CPU usage: "+cpuLoad+"%");

		for(var key in data.fsSize){
			diskUse+=data.fsSize[key].use;
		}
		diskUse = diskUse/data.fsSize.length;
		diskUse = diskUse.toFixed(0);
		console.log("Disk usage: "+diskUse+"%");

		memUse = data.mem.used/data.mem.total*100;
		if(memUse<10){
			memUse = memUse.toFixed(2);
		} else{
			memUse = memUse.toFixed(0);
		}
		console.log("Memory usage: "+memUse+"%");

		if(cpuLoad > config.limit_cpu ||
			diskUse > config.limit_disk ||
			memUse > config.limit_ram) {

			currentTime = new Date();
			slack(
						currentTime +
						'[label: ' + config.slack_label + '] ' +
						'[cpuLoad: ' + cpuLoad + '%] ' +
						'[diskUse: ' + diskUse + '%] ' +		
						'[memUse: ' + memUse + '%] ')	
		}
	});
}

module.exports = {
	run
}

