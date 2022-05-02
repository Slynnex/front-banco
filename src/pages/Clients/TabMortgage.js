import React, {useContext, useEffect} from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select, TextField} from '@material-ui/core'
import { Context } from '../../context/Interests/InterestsContext'

const TabMortage = ({handleMortgage,formMortgage,updateFieldGuarantees,formGuarantees,updateFieldProperties,formProperties}) => {
  const {getInterests,state} = useContext(Context);

  useEffect(() => {
    const setLoader = () => {};
    getInterests({setLoader});
  },[])

  return (
    <div>
      <div className='row'>
            <div>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Solicited amount</InputLabel>
                    <Input id="solicited_amount" name="solicited_amount" aria-describedby="solicited_amount" autoComplete='off' type='number' value={formMortgage.solicited_amount} onChange={handleMortgage}/> 
                    <Input id="solicited_amount" name="solicited_amount" aria-describedby="solicited_amount" autoComplete='off' value={formMortgage.solicited_amount} onChange={handleMortgage}/> 
                </FormControl>
            </div>
            <div className='item'>
              <FormControl className='item gender'>
                  <InputLabel variant="standard" required={true}>Interest</InputLabel>
                  <Select id="interest" name="InterestId" value={formMortgage.InterestId} onChange={handleMortgage}>
                    {state.interests.map((interest)=>{
                       return <MenuItem key={interest.id} value={interest.id}>{interest.name}</MenuItem>
                    })}
                  </Select>
              </FormControl>
            </div>
            <div className='item'>
                <TextField
                    id="date"
                    label="Solicited date"
                    type="date"
                    name='solicited_date'
                    value={formMortgage.solicited_date} 
                    onChange={handleMortgage}
                />
             </div>
      </div>
      <div className='row'>
          <div>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Name</InputLabel>
                    <Input id="name" name="name" aria-describedby="name" autoComplete='off' value={formGuarantees[0].name} onChange={e => updateFieldGuarantees(0,e)}/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Last name</InputLabel>
                    <Input id="lastname" name="lastname" aria-describedby="lastname" autoComplete='off' value={formGuarantees[0].lastname} onChange={e => updateFieldGuarantees(0,e)}/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Address</InputLabel>
                    <Input id="address" name="address" aria-describedby="address" autoComplete='off' value={formGuarantees[0].address} onChange={e => updateFieldGuarantees(0,e)}/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Telephone</InputLabel>
                    <Input id="telephone" name="telephone" aria-describedby="telephone" autoComplete='off' type='number' value={formGuarantees[0].telephone} onChange={e => updateFieldGuarantees(0,e)}/> 

                </FormControl>
          </div>
        </div>
        <div className='row'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Value</InputLabel>
                    <Input id="value" name="value" aria-describedby="value" autoComplete='off' type='number' value={formProperties[0].value} onChange={e => updateFieldProperties(0,e)}/> 

                </FormControl>
                <div className='item'>
                  <input type="file" id="url" name="url" onChange={e => updateFieldProperties(0,e)}/>
                </div>
        </div>
    </div>
  )
}

export default TabMortage