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
		console.log('object_config', object_config)
		let array = req.body
		object_config.pipeline_middle(object_config, array)
		object_config.pipeline_destination(object_config, array)
		res.end()
	})

	app.listen(object_config.service.manual.port, object_config.service.manual.host, ()=>{
		console.log(`http://${object_config.service.manual.host}:${object_config.service.manual.port}`)
	})
}

module.exports = {
	run
}