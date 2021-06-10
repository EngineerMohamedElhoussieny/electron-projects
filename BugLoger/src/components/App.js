import React,{ useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import LogItem from './LogItem'
import AddLogItem from './AddLogItem'

const App = () => {
	const [logs,setLogs]=useState([
		{
			_id:1,
			text:'This is log one',
			priority:'low',
			user:'Brad',
			created:new Date().toString(),
		},
		{
			_id:2,
			text:'This is log Two',
			priority:'moderate',
			user:'Kate',
			created:new Date().toString(),
		},{
			_id:3,
			text:'This is log Three',
			priority:'high',
			user:'John',
			created:new Date().toString(),
		}
	])
	return (
		<Container>
			<AddLogItem />
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
					{ logs.map((log)=>
						<LogItem log={log} key={log._id} />
					)}
				</tbody>
			</Table>
		</Container>
	)
}

export default App