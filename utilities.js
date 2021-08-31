const fs = require('fs')

/* [{... } ...] */
const mapping_1d_array_to_csv_0 = (char_delimiter, array_src) => {
	return new Promise((res, rej)=>{
		let csv = ''
		let keys = Object.keys(array_src[0])
		let cols = keys.length
		keys.forEach((v, i) => {
		  	csv += v + (i === (cols - 1) ? '\n' : char_delimiter)
		})	

		for(let i = 0, m = array_src.length; i < m; i++){
			keys.forEach((key, index) => {
				csv += array_src[i][key] + (index === (cols - 1) ? '\n' : char_delimiter)
			})
		}

		res(csv)
	})
}

/* [{... } ...] */
const mapping_1d_array_to_csv = (obj_schema, char_delimiter, array_src) => {
	return new Promise((res, rej)=>{
		let csv = ''
		let cols = Object.keys(obj_schema).length
		Object.entries(obj_schema).forEach((v, i) => {
		  	csv += (v[1]['as'] !== '' ? v[1]['as'] : v[0]) + (i === (cols - 1) ? '\n' : char_delimiter)
		})	
		for(let i = 0, m = array_src.length; i < m; i++){
			Object.keys(obj_schema).forEach((key, index) => {
				csv += array_src[i][key] + (index === (cols - 1) ? '\n' : char_delimiter)
			})
		}
		res(csv)
	})
}

/* array_excelsheet[0] key(cell no.): value(1d_array key) */
const excelsheet_array_to_1d_array = (array_excelsheet) => {
	return new Promise((res, rej)=>{
 
 		let len_array = array_excelsheet.length 
		if(len_array <= 2)
			rej('empty array_excelsheet')
		else {
			// rebuild 1d array
			let array_1d = []
			let keys_excelsheet = Object.keys(array_excelsheet)	

			for(let i = 1; i < len_array; i++){
				let element = {}

				for (const [key, value] of Object.entries(array_excelsheet[0])) {
				  	element[value.split(' ').join('-') + ''] = array_excelsheet[i][key] || ''
				}

				array_1d.push(element)
			}

			res(array_1d)
		}
	})
}

const buff_to_file = (str_path, buffer) => {
	return new Promise((res, rej)=>{
		fs.writeFile(str_path, buffer, err=>{
		    if(err) rej(err)
		    else res()
		})
	})
}

module.exports = {
	mapping_1d_array_to_csv,
	mapping_1d_array_to_csv_0,
	excelsheet_array_to_1d_array,
	buff_to_file,
}