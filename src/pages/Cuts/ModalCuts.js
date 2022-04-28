import React from 'react'
import { styled } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { TextField} from '@material-ui/core'
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

const ModalCuts = ({form,handleChange,action,saveData,handleClose,open,handleReset,setLoader,cashboxes,total_system}) => {
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
                        <FormControl style={{width:'100%'}}>
                            <div>&nbsp;</div>
                            <Select id="CashboxId" name="CashboxId" style={{width:'180px'}} onChange={handleChange} value={form.CashboxId}>
                                {cashboxes.map((cashbox,index)=>{
                                return <MenuItem key={index} value={cashbox.id}>{cashbox.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl style={{width:'100%'}}>
                            <div>&nbsp;</div>
                            <Select id="type" name="type" style={{width:'180px'}} onChange={handleChange} value={form.type}>
                                <MenuItem key={200002} value={'initial'}>inital</MenuItem>
                                <MenuItem key={200001} value={'final'}>final</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>10c coin</InputLabel>
                        <Input type="number" id="m10c" name="m10c" aria-describedby="m10c" autoComplete='off' onChange={handleChange} value={form.denominations.m10c}/> 
                        </FormControl>
                    </div>              
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>50c coin</InputLabel>
                        <Input type="number" id="m50c" name="m50c" aria-describedby="debterms" autoComplete='off' onChange={handleChange} value={form.denominations.m50c}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>1p coin</InputLabel>
                        <Input type="number" id="m1p" name="m1p" aria-describedby="m1p" autoComplete='off'  onChange={handleChange} value={form.denominations.m1p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>2p coin</InputLabel>
                        <Input type="number" id="m2p" name="m2p" aria-describedby="m2p" autoComplete='off'  onChange={handleChange} value={form.denominations.m2p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>5p coin</InputLabel>
                        <Input type="number" id="m5p" name="m5p" aria-describedby="m5p" autoComplete='off'  onChange={handleChange} value={form.denominations.m5p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>10p coin</InputLabel>
                        <Input type="number" id="m10p" name="m10p" aria-describedby="m10p" autoComplete='off'  onChange={handleChange} value={form.denominations.m10p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>20p coin</InputLabel>
                        <Input type="number" id="m20p" name="m20p" aria-describedby="m20p" autoComplete='off'  onChange={handleChange} value={form.denominations.m20p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 20p</InputLabel>
                        <Input type="number" id="b20p" name="b20p" aria-describedby="b20p" autoComplete='off'  onChange={handleChange} value={form.denominations.b20p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 50p</InputLabel>
                        <Input type="number" id="b50p" name="b50p" aria-describedby="b50p" autoComplete='off'  onChange={handleChange} value={form.denominations.b50p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 100p</InputLabel>
                        <Input type="number" id="b100p" name="b100p" aria-describedby="b100p" autoComplete='off'  onChange={handleChange} value={form.denominations.b100p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 200p</InputLabel>
                        <Input type="number" id="b200p" name="b200p" aria-describedby="b200p" autoComplete='off'  onChange={handleChange} value={form.denominations.b200p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 500p</InputLabel>
                        <Input type="number" id="b500p" name="b500p" aria-describedby="b500p" autoComplete='off'  onChange={handleChange} value={form.denominations.b500p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 1000p</InputLabel>
                        <Input type="number" id="b1000p" name="b1000p" aria-describedby="b1000p" autoComplete='off'  onChange={handleChange} value={form.denominations.b1000p}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>total cut</InputLabel>
                        <Input type="number" id="total_cut" name="total_cut" aria-describedby="total_cut" autoComplete='off'  onChange={handleChange} value={form.total_cut}/> 
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

export default ModalCuts