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
import { toast } from 'react-toastify'

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    border:'none'
  }));
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

const ModalClients = ({form,handleChange,action,saveData,handleClose,open,handleReset,setLoader}) => {
    const [block, setBlock] = React.useState(true);

        const handleBlur = (e)=>{
            if(form.name.lengt === 0 || form.lastname.length === 0 || form.gender === 0 || form.street.length === 0 || form.number_ext === 0 || form.colony.length === 0 || form.postalcode === 0 || form.city.length === 0 || form.municipality.length === 0 || form.email.length === 0 || form.state.length === 0 || form.celphone.length === 0 || form.landline.length === 0 || form.curp.length === 0 || form.rfc.length === 0 || form.no_ine.length === 0){
                toast.error('Complete all the fields');
                setBlock(true);
            }else{
                setBlock(false);
            }
            if(e.target.name === 'no_ine'){
                if(e.target.value.length !== 18){
                    toast.error('INE number has to be 18 items long');
                    setBlock(true);
                }
                
            }
            if(e.target.name === 'curp'){
                if(e.target.value.length !== 18 ){
                    toast.error('CURP has to be 18 items long');
                    setBlock(true);
                }
            }
            if(e.target.name === 'rfc'){
                if(e.target.value.length < 12 || e.target.value.length > 13 ){
                    toast.error('RFC has to be between 12 and 13 items long');
                    setBlock(true);
                }
            }
            if(e.target.name === 'landline' || e.target.name === 'celphone' || e.target.name === 'postalcode' || e.target.name === 'number_ext'){
                if(isNaN(parseInt(e.target.value))){
                    toast.error('Write only numbers in this field');
                    setBlock(true);
                }
            } 

        }
        const actions = ()=>{
            saveData({form,id:form.id,setLoader,handleReset,action})
        }
        const initialClientForm = {
            name: "",
            lastname: "",
            gender: 0,
            street: "",
            number_ext: 0,
            colony: "",
            postalcode: 0,
            city: "",
            municipality: "",
            state: "",
            celphone: "",
            landline: "",
            curp: "",
            rfc: "",
            no_ine: "",
            email: "",
            id:null,
    }
    //React.useEffect
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${action} Client`}
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
                        <Input type="email" id="email" name="email" aria-describedby="email" autoComplete='off' onChange={handleChange} value={form.email} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>              
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Street</InputLabel>
                        <Input type="text" id="street" name="street" aria-describedby="street" autoComplete='off' onChange={handleChange} value={form.street} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Number ext</InputLabel>
                        <Input type="text" id="number_ext" name="number_ext" aria-describedby="number_ext" autoComplete='off'  onChange={handleChange} value={form.number_ext} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Colony</InputLabel>
                        <Input type="text" id="colony" name="colony" aria-describedby="colony" autoComplete='off'  onChange={handleChange} value={form.colony} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Postal Code</InputLabel>
                        <Input type="text" id="postalcode" name="postalcode" aria-describedby="postalcode" autoComplete='off'  onChange={handleChange} value={form.postalcode} onBlur={handleBlur}/> 
                        </FormControl>
                       
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>City</InputLabel>
                        <Input type="text" id="city" name="city" aria-describedby="city" autoComplete='off'  onChange={handleChange} value={form.city} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>State</InputLabel>
                        <Input type="text" id="state" name="state" aria-describedby="state" autoComplete='off'  onChange={handleChange} value={form.state} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Cellphone</InputLabel>
                        <Input type="text" id="celphone" name="celphone" aria-describedby="celphone" autoComplete='off'  onChange={handleChange} value={form.celphone} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>Landline</InputLabel>
                        <Input type="text" id="landline" name="landline" aria-describedby="b200p" autoComplete='off'  onChange={handleChange} value={form.landline} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>CURP</InputLabel>
                        <Input type="text" id="curp" name="curp" aria-describedby="curp" autoComplete='off'  onChange={handleChange} value={form.curp} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>RFC</InputLabel>
                        <Input type="text" id="rfc" name="rfc" aria-describedby="rfc" autoComplete='off'  onChange={handleChange} value={form.rfc} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>No INE</InputLabel>
                        <Input type="text" id="no_ine" name="no_ine" aria-describedby="no_ine" autoComplete='off'  onChange={handleChange} value={form.no_ine} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={12}>
                </Grid>    
            </Grid>
            <Grid>
                <Fab  onClick={actions} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
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