import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../../styles/clients.css'
import { FormControl, InputLabel, Input, MenuItem, Select} from '@material-ui/core'

const TabPersonalInfo = ({form,handleForm}) => {
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [colonies, setColonies] = useState([])
  const token = '37363a69-39fa-4609-a4fe-48986af8a616';

  useEffect(() => {
    const estados = async() => {
      const response = await axios(`https://api.copomex.com/query/get_estados?token=${token}`);
      setStates(response.data.response.estado);
    }
    estados();
  },[])

  const handleState = async(e) => {
    handleForm(e);
    const response = await axios(`https://api.copomex.com/query/get_municipio_por_estado/${e.target.value}?token=${token}`);
    setCities(response.data.response.municipios);
  }

  const handleCity = async(e) => {
    handleForm(e);
    const response = await axios(`https://api.copomex.com/query/get_colonia_por_municipio/${e.target.value}?token=${token}`);
    setColonies(response.data.response.colonia);
  }

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
      <FormControl className='item gender'>
          <InputLabel variant="standard" required={true}>State</InputLabel>
          <Select id="state" name="state"  onChange={handleState} value={form.state}>
              {states.map((state,index) => (
                <MenuItem value={state} key={index}>{state}</MenuItem>
              ))}
          </Select>
      </FormControl>
      <div className='item'>
        <FormControl className='item gender'>
            <InputLabel variant="standard" required={true}>City</InputLabel>
            <Select id="city" name="city"  onChange={handleCity} value={form.city}>
              {cities.map((city,index) => (
                <MenuItem value={city} key={index}>{city}</MenuItem>
              ))}
            </Select>
        </FormControl>
      </div>
      <div className='item'>
        <FormControl className='item gender'>
            <InputLabel variant="standard" required={true}>Colony</InputLabel>
            <Select id="colony" name="colony"  onChange={handleForm} value={form.colony}>
              {colonies.map((colony,index) => (
                <MenuItem value={colony} key={index}>{colony}</MenuItem>
              ))}
            </Select>
        </FormControl>
      </div>
      <div className='item'>
          <FormControl>
              <InputLabel variant="standard" required={true}>Street</InputLabel>
              <Input id="street" name="street" aria-describedby="street" autoComplete='off' onChange={handleForm} value={form.street} /> 
          </FormControl>
      </div>
          <div className='item'>
            <FormControl>
                <InputLabel variant="standard" required={true}>Number ext</InputLabel>
                <Input id="number_ext" name="number_ext" aria-describedby="number_ext" autoComplete='off' onChange={handleForm} value={form.number_ext}/> 
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
                <InputLabel variant="standard" required={true}>Municipality</InputLabel>
                <Input id="municipality" name="municipality" aria-describedby="municipality" autoComplete='off' onChange={handleForm} value={form.municipality}/> 
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