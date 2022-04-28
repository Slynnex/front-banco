import React, {useContext, useEffect} from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'
import { Context } from '../../context/Interests/InterestsContext'

const TabMortage = () => {
  const {getInterests,state} = useContext(Context);

  useEffect(() => {
    const setLoader = () => {};
    getInterests({setLoader});
  },[])

  useEffect(() => {
    console.log(state)
  },[state])

  return (
    <div>
      <div className='row'>
            <div>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Solicited amount</InputLabel>
                    <Input id="solicited_amount" name="solicited_amount" aria-describedby="solicited_amount" autoComplete='off'/> 
                </FormControl>
            </div>
            <div className='item'>
              <FormControl className='item gender'>
                  <InputLabel variant="standard" required={true}>Interest</InputLabel>
                  <Select id="interest" name="interest">
                    {state.interests.map((interest)=>{
                       return <MenuItem key={interest.id} value={interest.id}>{interest.name}</MenuItem>
                    })}
                  </Select>
              </FormControl>
            </div>
      </div>
      <div className='row'>
          <div>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Name</InputLabel>
                    <Input id="name" name="name" aria-describedby="name" autoComplete='off'/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Last name</InputLabel>
                    <Input id="last_name" name="last_name" aria-describedby="last_name" autoComplete='off'/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Address</InputLabel>
                    <Input id="address" name="address" aria-describedby="address" autoComplete='off'/> 
                </FormControl>
          </div>
          <div className='item'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Telephone</InputLabel>
                    <Input id="telephone" name="telephone" aria-describedby="telephone" autoComplete='off'/> 
                </FormControl>
          </div>
        </div>
        <div className='row'>
                <FormControl>
                    <InputLabel variant="standard" required={true}>Value</InputLabel>
                    <Input id="value" name="value" aria-describedby="value" autoComplete='off'/> 
                </FormControl>
                <div className='item'>
                  <input type="file"/>
                </div>
        </div>
    </div>
  )
}

export default TabMortage