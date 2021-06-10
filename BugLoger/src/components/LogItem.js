import React from 'react'
import {Button,Badge} from 'react-bootstrap'
import Moment from 'react-moment'

const LogItem = ({
    deleteItem,
    log:{_id,priority,user,text,created}}) => {
    const setVariant=()=>{
        console.log(priority);
        if(priority === 'high'){
            return 'danger'
        }else if (priority === 'moderate'){
            return 'warning'
        }else {
            return 'success'
        }
    }

    return (
        <tr>
            <td><Button variant={setVariant()}>{priority}</Button></td> 
            <td>{text}</td> 
            <td>{user}</td> 
            <td><Moment format='MMMM Do YYYY,h:mm:ss a'>{new Date(created)}</Moment></td> 
            <td>
                <Button variant="danger" size='sm' onClick={()=>deleteItem(_id)}>
                    x
                </Button>
            </td> 
        </tr>
    )
}

export default LogItem
