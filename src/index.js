import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { xhr } from 'lib-utilities'
import { version } from '../package.json'
import { Row, Col, Card, Divider, Input, Layout, Button, message, Tooltip, Select, Space  } from 'antd'

const { Header, Footer, Content } = Layout
const { Option } = Select

import { InfoCircleOutlined } from '@ant-design/icons'

import 'antd/dist/antd.min.css'
import './index.css'

const default_value = (str_type) => {
	switch(str_type) {
		case 'int':
		case 'float':
		return 0
		case 'boolean':
		return false
		default:
		return ''
	}
}

let schema = {}

const Index = (props) => {

	const row_default = {}
	Object.entries(schema).map((v, k)=>{
		row_default[v[0]] = default_value(v[1]['type'])
	})

	const [code, set_code] = useState('')
    const [rows, set_rows] = useState([])
    const [row, set_row] = useState({...row_default})

    const download = (blob, filename) => {
	    if (window.navigator.msSaveBlob){
	        return navigator.msSaveOrOpenBlob(blob, filename)
		}else{
		    const a = document.createElement('a')
		    document.body.appendChild(a)
		    const url = window.URL.createObjectURL(blob)
		    a.href = url
		    a.download = filename
		    a.click()
		    setTimeout(() => {
		      	window.URL.revokeObjectURL(url)
		      	document.body.removeChild(a)
		    }, 0)
	    }
    }

    return ( 
    	<>
    		{
    			code === '' ? // 12345678
    			<Layout>
					<Header>
						<img style={{height:'40px',marginTop:'10px'}} src='logo_350x88.png' />
					</Header>
					<Content>
						<Button type="primary" danger style={{borderRadius:0, width:'100%'}}
				        	onClick={e=>{
				        		let xhr = new XMLHttpRequest()
								xhr.open("POST", '/items', true)
								xhr.setRequestHeader("Content-Type", "application/json")
								xhr.onreadystatechange = function() { 
								    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
								        message.info(`Saved`)
								    }
								}
								xhr.send(JSON.stringify(rows))
				        	}}
				        >Click to Submit Saved Items</Button>
						<Row>
							<Col xs={24} sm={24} md={12} lg={8} xl={8}>
								<Card title="New Item" actions={[
									<Button type="primary" danger onClick={e=>{
	        							rows.push(row)
	        							set_rows([...rows])
	        							set_row({...row_default})
									}}>Save Item {rows.length + 1}</Button>
	        					]}>
									{
										Object.entries(row).map((v, k)=>{
											return (
												schema[v[0]].display === true ? 
												<div key={k} style={{padding: '5px 0'}}>
													{
														schema[v[0]].type === 'boolean' ? 
														<Space size={0}>
															<span className="ant-input-group-addon" style={{
																height: '32px',
    															borderLeft: '1px solid #d9d9d9'
															}}>
																{
																	schema[v[0]].hint_img_src !== '' ? 
																	<Tooltip placement="right" title={
																		<img async src={schema[v[0]].hint_img_src} />
																	}>
																		{v[0]}&nbsp;
																		<InfoCircleOutlined />
																	</Tooltip> : <>{v[0]}</>	
																}
															</span>
															<Select value={v[1]} 
																onChange={e=>{
																	row[v[0]] = e
																	set_row({...row})
																}}
															>
																<Option value={true}>TRUE</Option>
																<Option value={false}>FALSE</Option>
															</Select>
														</Space> 
														: 
														<Input addonBefore={
															schema[v[0]].hint_img_src !== '' ? 
															<Tooltip placement="right" title={
																<img async src={schema[v[0]].hint_img_src} />
															}>
																{v[0]}&nbsp;
																<InfoCircleOutlined />
															</Tooltip> : <>{v[0]}</>
														} value={v[1]}
															placeholder={schema[v[0]].placeholder}
															onChange={e=>{
																row[v[0]] = e.target.value
																set_row({...row})
															}}
														/>
													} 
												</div> : null
											)
										})
									}
								</Card>
							</Col>
							{
				        		rows.map((v, k)=>{
				        			return (
				        				<Col key={k} xs={24} sm={24} md={12} lg={8} xl={8}>
						        			<Card title={'Item ' + (k + 1)}
						        				actions={[
													<Button type="primary" danger onClick={e=>{
					        							rows.splice(k, 1)
					        							set_rows([...rows])
													}}>Remove Saved Item</Button>
					        					]}
				        					>
					        					{
					        						Object.entries(v).map((vv, kk)=>{
					        							return (
					        								schema[vv[0]].display === true ? 
					        								<div key={kk} style={{padding: '5px 0'}}>
					        									<Input addonBefore={vv[0]} value={vv[1]} disabled />
					        								</div> : null
				        								)
					        						})
					        					}	
						        			</Card>
					        			</Col>
				        			)
				        		})
				        	}
						</Row>
					</Content>
				</Layout> 
		        :
		        <div style={{width: '300px', margin:'60px auto', padding: '10px 0 20px 0'}}>
    				<div style={{padding: '10px',textAlign: 'center',fontSize: '26px',color: 'rgb(203, 24, 8)'}}>Danavation</div>
    				<div style={{padding: '5px 0 20px 0',textAlign: 'center',fontSize: '14px',color: 'rgb(203, 24, 8)'}}>{version}</div>
    				<div style={{textAlign: 'center',marginTop: '20px'}}>
	    				<input style={{border: 0,height: '24px',lineHeight: '24px',width: '200px',outline: 0,borderBottom: '1px solid #1f497d'}}
	    					type="password" value={code} onChange={e=>{
	    					set_code(e.target.value)
	    				}} />
    				</div>
    			</div>
    		}
        </>
    )   
}

xhr.send('GET', '/schema', '', {})
.then(json=>{
    schema = json
    ReactDom.render(<Index />,document.getElementById('app'))
},err=>console.log(err))