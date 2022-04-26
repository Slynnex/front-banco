import React from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'

const TabAccount = ({type, nip, amount, setAmount, setNip}) => {
  return (
    <div>
        <div className='row'>
            <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Amount</InputLabel>
                    <Input id="amount" name="amount" aria-describedby="amount" autoComplete='off' onChange={(e) => setAmount(e.target.value)} value={amount}/> 
                </FormControl>
            </div>
            <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>NIP</InputLabel>
                    <Input id="nip" name="nip" aria-describedby="nip" autoComplete='off' onChange={(e) => setNip(e.target.value)} value={nip}/> 
                </FormControl>
            </div>
        </div>
        {type === 'credit'
            ?<div className='row'>
                <div className='item'>
                    <FormControl>
                        <InputLabel variant="standard" required={true}>Cedit Detail</InputLabel>
                        <Input id="creditdetail" name="creditdetail" aria-describedby="creditdetail" autoComplete='off'/> 
                    </FormControl>
                </div>
            </div>
            :null
        }
    </div>
  )
}

export default TabAccount