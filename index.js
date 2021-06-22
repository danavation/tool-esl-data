const config_path = process.argv.length === 3 ? process.argv[2] : './config.js' 
const config = require(config_path)

if(config.service.automatic.enable){
	const service_automatic = require('./service_automatic.js')
	service_automatic.run(config_path, config)
	if(config.service.automatic.interval > 0)
		setInterval(_=> service_automatic.run(config_path, config), config.service.automatic.interval)	
}

if(config.service.manual.enable){
	require('./service_manual.js').run(config)
}