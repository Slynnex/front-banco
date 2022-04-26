import React from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select, Button} from '@material-ui/core'

const TabDocuments = () => {
  return (
    <div>
        <div className='row'>
            <label>INE</label>
            <div className='item'>
                <input type="file"/>
            </div>
        </div>
        <div className='row'>
            <label>Proof Address</label>
            <div className='item'>
                <input type="file"/>
            </div>
        </div>
        <div className='row'>
            <label>Proof Income</label>
            <div className='item'>
                <input type="file"/>
            </div>
        </div>
    </div>
  )
}

export default TabDocuments