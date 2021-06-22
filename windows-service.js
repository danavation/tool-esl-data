const Service = require('node-windows').Service;
 
const svc = new Service({
	name:'tool-esl-data',
	description: 'A node js project parse remote api or local file(excel or csv), create mapping and sync to destination.',
	script: 'index.js',
	nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	]
})
svc.on('install', ()=>{
  	svc.start()
})
svc.install()