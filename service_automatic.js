const fs = require('fs')
const exec = require('child_process').exec
const utilities = require('js-utilities')
const constants = require('./constants.js')

const slack = (path, text) => {
	let cmd = 
		'curl -X POST --data-urlencode "payload={\\"channel\\": \\"#devops-notifications\\", \\"username\\": \\"tool-esl-data\\", \\"text\\": \\"' + 
		text + 
		'\\"}" ' + 
		path
	
    exec(cmd, function (error, stdout, stderr) {
      	if (error !== null) console.log('err', error)
    })
}

let hash = ''

const run = (
	config_path, 
	config
) => {

	/* pipeline source */
	config.pipeline_source()
	.then(array_src=>{

		/* filter and parse */
		let array_src_0 = [] 
		for(let i = 0, m = array_src.length; i < m; i++){
			let item = array_src[i]
			let item_0 = {}
			Object.keys(config.schema).forEach(k=>{
				switch(config.schema[k].type){
					case 'string': item_0[k] = utilities.parse.to_string(item[k], ['']); break;
					case 'float': item_0[k] = item[k] !== '' ? utilities.parse.to_float(item[k]) : 0.0; break;
					case 'int': item_0[k] = item[k] !== '' ? utilities.parse.to_int(item[k]) : 0; break;
					case 'timestamp': item_0[k] = utilities.parse.to_timestamp(item[k]); break;
					case 'boolean': item_0[k] = utilities.parse.to_boolean(item[k]); break;
					case 'object': item_0[k] = item[k]; break;
				}
			})
			array_src_0.push(item_0)
		}
		
		/* pipeline middle */
		config.pipeline_middle(array_src_0)
		.then(
			array=>config.pipeline_destination(array), 
			err=>console.log('config.pipeline_middle err', err)
		)
	}, err=>console.log('config.pipeline_source err', err))
}

module.exports = {
	run
}