# Prerequisites
* node & npm

# Setup
* ```git clone https://github.com/danavation/tool-esl-data```
* ```npm i & npm update```
* ```node index.js {custom_config}.js```

# Run it as windows service
* ```npm link node-windows```
* ```node windows-service.js```
* !important: mount it as window service, application would use default config.js

# Example of config.schema
```
// !important: no white space allowed on 'as' field
{
    'upc': { type:'string', placeholder: '', hint_img_src: '', as: '', display: true},
    'price': { type:'float', placeholder: '', hint_img_src: '', as: '', display: true},
    'count': { type:'int', placeholder: '', hint_img_src: '', as: '', display: true},
    'date': { type:'timestamp', placeholder: '', hint_img_src: '', as: '', display: true},
    'onsale': { type:'boolean', placeholder: true, hint_img_src: '', as: '', display: true},
}
```