import React,{ useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import LogItem from './LogItem'

const App = () => {
	const [logs,setLogs]=useState([
		{
			id:1,
			text:'This is log one',
			priority:'low',
			user:'Brad',
			created:new Date().toString(),
		},
		{
			id:2,
			text:'This is log Two',
			priority:'moderate',
			user:'Kate',
			created:new Date().toString(),
		},{
			id:3,
			text:'This is log Three',
			priority:'high',
			user:'John',
			created:new Date().toString(),
		}
	])
	return (
		<Container className='app'>
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ logs.map((log,index)=>
						<LogItem key={index} />
					)}
				</tbody>
			</Table>
		</Container>
	)
}

export default App
