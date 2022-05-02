import React from 'react'
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, TextField, MenuItem, Select} from '@material-ui/core'

const TabBeneficiaries = ({form,handleForm}) => {

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
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    name='birth_date'
                    value={form.birth_date} 
                    onChange={handleForm}
                />
             </div>
         </div>
         <div className='row'>

            <FormControl className='item gender'>
                <InputLabel variant="standard" required={true}>Relation</InputLabel>
                <Select id="relation" name="relation"  onChange={handleForm} value={form.relation}>
                    <MenuItem value={"Father"}>Father</MenuItem>
                    <MenuItem value={"Mother"}>Mother</MenuItem>
                    <MenuItem value={"Brother"}>Brother</MenuItem>
                    <MenuItem value={"Grandfather"}>Grandfather</MenuItem>
                    <MenuItem value={"Cousin"}>Cousin</MenuItem>
                    <MenuItem value={"Uncle"}>Uncle</MenuItem>
                    <MenuItem value={"Friend"}>Friend</MenuItem>
                </Select>
            </FormControl>

            <div className='item'>
            <FormControl className='item'>
                <InputLabel variant="standard" required={true}>Percentage</InputLabel>
                <Input id="percentage" name="percentage" aria-describedby="percentage" autoComplete='off' type='number' value={form.percentage} onChange={handleForm} /> 
            </FormControl>
          </div>
         </div>
         <div className='row'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Phone</InputLabel>
                <Input id="phone" name="phone" aria-describedby="phone" autoComplete='off' type='number' value={form.phone} onChange={handleForm}/> 
            </FormControl>
            <div className='item'>
            <FormControl className='item'>
                <InputLabel variant="standard" required={true}>Email</InputLabel>
                <Input id="email" name="email" aria-describedby="email" autoComplete='off' value={form.email} onChange={handleForm}/> 
            </FormControl>
          </div>
         </div>
    </div>
  )
}

export default TabBeneficiaries