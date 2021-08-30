const schema = {
	'upc':    {type:'string',    placeholder: '',   hint_img_src: '', as: '', display: true},
	'price':  {type:'float',     placeholder: '',   hint_img_src: '', as: '', display: true},
	'count':  {type:'int',       placeholder: '',   hint_img_src: '', as: '', display: true},
	'date':   {type:'timestamp', placeholder: '',   hint_img_src: '', as: '', display: true},
	'onsale': {type:'boolean',   placeholder: true, hint_img_src: '', as: '', display: true},
}

module.exports = {

	/*  
     * pipeline source
     * handle task to fetch data into json array
	 */
	pipeline_source: () => new Promise((resolve, reject)=>resolve([])),

	/* 
     * pipeline middle 
     * handle tasks customize json array
     */
	pipeline_middle: (array_json) => new Promise((resolve, reject)=>resolve(array_json)),

	/* 
	 * pipeline destination 
     * parse json array to destination data format and send it to destination
     * @paramter array_json // json array 
	 */
	pipeline_destination: (array_json)=>{},

	schema,

	slack: { path: '', label: '' },

	service: {
		
		automatic: { enable: false, interval: 0 },

		manual: { enable: true, host: '0.0.0.0', port: 80 }
	},
}