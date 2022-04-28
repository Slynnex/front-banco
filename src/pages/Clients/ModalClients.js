import React from 'react'
import { styled } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    border:'none'
  }));

const ModalClients = ({form,handleChange,action,saveData,handleClose,open,handleReset,setLoader}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #cecece',
        borderRadius:10,
        boxShadow: '10px 5px 5px',
        p: 4,
        };
    
  return (

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${action} Cuts`}
            </Typography>
            <Grid container>
                <Grid item md={4}>
                    <div>
                    <FormControl>
                        <InputLabel variant="standard" required={true}>Name</InputLabel>
                        <Input type="text" id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                    <FormControl>
                        <InputLabel variant="standard" required={true}>Lastname</InputLabel>
                        <Input type="text" id="lastname" name="lastname" aria-describedby="lastname" autoComplete='off' onChange={handleChange} value={form.lastname}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl style={{width:'100%'}}>
                            <div>&nbsp;</div>
                            <Select id="gender" name="gender" style={{width:'180px'}} onChange={handleChange} value={form.gender}>
                                <MenuItem key={200002} value={0}>Male</MenuItem>
                                <MenuItem key={200001} value={1}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Email</InputLabel>
                        <Input type="email" id="email" name="email" aria-describedby="email" autoComplete='off' onChange={handleChange} value={form.email}/> 
                        </FormControl>
                    </div>              
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Street</InputLabel>
                        <Input type="street" id="street" name="street" aria-describedby="street" autoComplete='off' onChange={handleChange} value={form.street}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Number ext</InputLabel>
                        <Input type="number" id="number_ext" name="number_ext" aria-describedby="number_ext" autoComplete='off'  onChange={handleChange} value={form.number_ext}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Colony</InputLabel>
                        <Input type="text" id="colony" name="colony" aria-describedby="colony" autoComplete='off'  onChange={handleChange} value={form.colony}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Postal Code</InputLabel>
                        <Input type="number" id="postalcode" name="postalcode" aria-describedby="postalcode" autoComplete='off'  onChange={handleChange} value={form.postalcode}/> 
                        </FormControl>
                       
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>City</InputLabel>
                        <Input type="text" id="city" name="city" aria-describedby="city" autoComplete='off'  onChange={handleChange} value={form.city}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Municipality</InputLabel>
                        <Input type="text" id="municipality" name="municipality" aria-describedby="municipality" autoComplete='off'  onChange={handleChange} value={form.municipality}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>State</InputLabel>
                        <Input type="text" id="state" name="state" aria-describedby="state" autoComplete='off'  onChange={handleChange} value={form.state}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Celphone</InputLabel>
                        <Input type="text" id="celphone" name="celphone" aria-describedby="celphone" autoComplete='off'  onChange={handleChange} value={form.celphone}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Landline</InputLabel>
                        <Input type="number" id="landline" name="landline" aria-describedby="landline" autoComplete='off'  onChange={handleChange} value={form.landline}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Landline</InputLabel>
                        <Input type="text" id="landline" name="landline" aria-describedby="b200p" autoComplete='off'  onChange={handleChange} value={form.landline}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>CURP</InputLabel>
                        <Input type="text" id="curp" name="curp" aria-describedby="curp" autoComplete='off'  onChange={handleChange} value={form.curp}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>RFC</InputLabel>
                        <Input type="text" id="rfc" name="rfc" aria-describedby="rfc" autoComplete='off'  onChange={handleChange} value={form.rfc}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>No INE</InputLabel>
                        <Input type="number" id="no_ine" name="no_ine" aria-describedby="no_ine" autoComplete='off'  onChange={handleChange} value={form.no_ine}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={12}>
                    {/* <div style={{marginTop:'20px'}}>
                        <span style={{color:'red'}}>The total system outcome is :</span> <span><b>{total_system}</b></span>
                    </div> */}
                </Grid>    
            </Grid>
            <Grid>
                <Fab onClick={() => saveData({form,id:form.id,setLoader,handleReset,action})} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                    <SaveIcon />
                </Fab>
                <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                    <CancelIcon />
                </Fab>
            </Grid>
        </Box>
    </Modal>
  )
}

export default ModalClients