import React from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'

const TabPersonalInfo = ({form,handleForm}) => {

  return (
    <div>
      <div className='row'>
          <FormControl>
              <InputLabel variant="standard" required={true}>Name(s)</InputLabel>
              <Input id="name" name="name" aria-describedby="name" autoComplete='off' value={form.name} onChange={handleForm}/> 
          </FormControl>
          <div className='item'>
            <FormControl className='item'>
                <InputLabel variant="standard" required={true}>Last name(s)</InputLabel>
                <Input id="lastname" name="lastname" aria-describedby="lastname" autoComplete='off' value={form.lastname} onChange={handleForm}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl className='item gender'>
                <InputLabel variant="standard" required={true}>Gender</InputLabel>
                <Select id="gender" name="gender" onChange={handleForm} value={form.gender}>
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Email</InputLabel>
                <Input id="email" name="email" aria-describedby="email" autoComplete='off' onChange={handleForm} value={form.email}/> 
            </FormControl>
          </div>
      </div>
      <div className='row'>
          <FormControl>
              <InputLabel variant="standard" required={true}>Street</InputLabel>
              <Input id="street" name="street" aria-describedby="street" autoComplete='off' onChange={handleForm} value={form.street} /> 
          </FormControl>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Number ext</InputLabel>
                <Input id="number_ext" name="number_ext" aria-describedby="number_ext" autoComplete='off' onChange={handleForm} value={form.number_ext}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Colony</InputLabel>
                <Input id="colony" name="colony" aria-describedby="colony" autoComplete='off' onChange={handleForm} value={form.colony}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Postal Code</InputLabel>
                <Input id="postalcode" name="postalcode" aria-describedby="postalcode" autoComplete='off' onChange={handleForm} value={form.postalcode}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>City</InputLabel>
                <Input id="city" name="city" aria-describedby="city" autoComplete='off' onChange={handleForm} value={form.city}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Municipality</InputLabel>
                <Input id="municipality" name="municipality" aria-describedby="municipality" autoComplete='off' onChange={handleForm} value={form.municipality}/> 
            </FormControl>
          </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>State</InputLabel>
                <Input id="state" name="state" aria-describedby="state" autoComplete='off' onChange={handleForm} value={form.state}/> 
            </FormControl>
          </div>
      </div>
      <div className='row'>
          <FormControl>
              <InputLabel variant="standard" required={true}>Celphone</InputLabel>
              <Input id="celphone" name="celphone" aria-describedby="celphone" autoComplete='off' onChange={handleForm} value={form.celphone}/> 
          </FormControl>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Landline</InputLabel>
                <Input id="landline" name="landline" aria-describedby="landline" autoComplete='off' onChange={handleForm} value={form.landline}/> 
            </FormControl>
          </div>
      </div>
      <div className='row'>
          <FormControl>
              <InputLabel variant="standard" required={true}>Curp</InputLabel>
              <Input id="curp" name="curp" aria-describedby="curp" autoComplete='off' onChange={handleForm} value={form.curp}/> 
          </FormControl>
         <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>RFC</InputLabel>
                <Input id="rfc" name="rfc" aria-describedby="rfc" autoComplete='off' onChange={handleForm} value={form.rfc}/> 
            </FormControl>
          </div> 
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>No INE</InputLabel>
                <Input id="no_ine" name="no_ine" aria-describedby="no_ine" autoComplete='off' onChange={handleForm} value={form.no_ine}/> 
            </FormControl>
          </div>
      </div>
    </div>
  )
}

export default TabPersonalInfo