const express = require('express')
const body_parser = require('body-parser')
const utilities = require('lib-utilities')

const mapping_1d_array_to_csv = require('./utilities.js').mapping_1d_array_to_csv
const csv_to_file = require('./utilities.js').csv_to_file

const app = express()

const run = (object_config) => {

	app.use(express.static('public'))

	app.use(body_parser.json())

	app.get('/schema', (req, res)=>{
		res.json(object_config.schema)
	})

	app.post('/items', (req, res) =>{
		let array_src = req.body

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
				}
			})
			array_src_0.push(item_0)
		}

		/* pipeline middle */
		config.pipeline_middle(array_src_0)
		.then(
			array=>{
				config.pipeline_destination(array)
				res.end()
			}, 
			err=>{
				console.log('config.pipeline_middle err', err)
				res.end()
			}
		)
	})

	app.listen(object_config.service.manual.port, object_config.service.manual.host, ()=>{
		console.log(`http://${object_config.service.manual.host}:${object_config.service.manual.port}`)
	})
}

module.exports = {
	run
}