import React from 'react'
import {Button,Badge} from 'react-bootstrap'

const LogItem = ({log:{_id,priority,user,text,created}}) => {
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
            <td>{created}</td> 
            <td>
                <Button variant="danger" size='sm'>
                    x
                </Button>
            </td> 
        </tr>
    )
}

export default LogItem
