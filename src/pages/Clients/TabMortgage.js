import React from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'

const TabMortage = () => {
  return (
    <div>
      <div className='row'>
            <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Solicited amount</InputLabel>
                    <Input id="solicited_amount" name="solicited_amount" aria-describedby="solicited_amount" autoComplete='off'/> 
                </FormControl>
            </div>
            <div className='item'>
              <FormControl className='item gender'>
                  <InputLabel variant="standard" required={true}>Interest</InputLabel>
                  <Select id="interest" name="interest">
                      <MenuItem value={0}>Male</MenuItem>
                      <MenuItem value={1}>Female</MenuItem>
                  </Select>
              </FormControl>
            </div>
        </div>
    </div>
  )
}

export default TabMortage