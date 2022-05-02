import React, {useContext, useEffect} from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'
import { Context } from '../../context/CreditDetails/CreditDetailsContext'

const TabAccount = ({type, nip, amount, setAmount, setNip,setCreditDetail,creditDetail}) => {

    const {getCreditDetails,state} = useContext(Context)

    useEffect(() => {
        const setLoader = () => {};
        getCreditDetails({setLoader});
    },[])

    useEffect(() => {
        console.log(state)
    },[state])

  return (
    <div>
        <div className='row'>
            <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Amount</InputLabel>
                    <Input id="amount" name="amount" aria-describedby="amount" autoComplete='off' type='number' onChange={(e) => setAmount(e.target.value)} value={amount}/> 
                </FormControl>
            </div>
            {type === 'debit'
                ?<div className='item'>
                    <FormControl>
                        <InputLabel variant="standard" required={true}>NIP</InputLabel>
                        <Input id="nip" name="nip" aria-describedby="nip" autoComplete='off' type='number' onChange={(e) => setNip(e.target.value)} value={nip}/> 
                    </FormControl>
                </div>
                :null
            }
            {type === 'credit'
                ?<div className='item'>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" required={true} >Credit Detail</InputLabel>
                            <Select id="PositionId" name="PositionId" className='gender' onChange={e => setCreditDetail(e.target.value)} value={creditDetail}>
                                {state.creditDetails.map((creditDetail)=>{
                                    return <MenuItem key={creditDetail.id} value={creditDetail.id}>{creditDetail.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                :null
            }
        </div>
    </div>
  )
}

export default TabAccount