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
import { toast } from 'react-toastify';
//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import { object } from 'yup'

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

const ModalCuts = ({form,handleChange,action,saveData,handleClose,open,handleReset,setLoader,cashboxes,total_system, state, setForm}) => {
    const [errors, setErrors] = React.useState('');
    const [block, setBlock] = React.useState(true);

    

    React.useEffect(()=>{
        setErrors(state.errors.message);
    },[state]);

    React.useEffect(()=>{
        if(typeof errors === 'string'){
            if(errors.length > 0){
                let upperError = errors[0].toUpperCase() + errors.slice(1);
                toast.error(upperError);
            }
        }
    },[errors])

    const actions = () =>{
        if((form.total_cut === 0 || form.type.length === 0 || form.CashboxId.length === 0) || (form.denominations.m10c === 0 && form.denominations.m50c === 0 && form.denominations.m1p === 0 && form.denominations.m2p === 0 && form.denominations.m5p === 0 && form.denominations.m10p === 0 && form.denominations.m20p === 0 && form.denominations.b20p === 0 && form.denominations.b50p === 0 && form.denominations.b100p === 0 && form.denominations.b200p === 0 && form.denominations.b500p === 0 && form.denominations.b1000p === 0)){
            toast.error('Complete all the required fields');
        }else{
            saveData({form,id:form.id,setLoader,handleReset,action});
            setErrors('');
        }
    }

    const handleBlur = (e) =>{
        if((form.total_cut === 0 || form.type.length === 0 || form.CashboxId.length === 0) || (form.denominations.m10c === 0 && form.denominations.m50c === 0 && form.denominations.m1p === 0 && form.denominations.m2p === 0 && form.denominations.m5p === 0 && form.denominations.m10p === 0 && form.denominations.m20p === 0 && form.denominations.b20p === 0 && form.denominations.b50p === 0 && form.denominations.b100p === 0 && form.denominations.b200p === 0 && form.denominations.b500p === 0 && form.denominations.b1000p === 0)){
            setBlock(true);
        }else{
            setBlock(false);
        }
        let total = 0;

        if(isNaN(parseInt(e.target.value))){
            toast.error('Write just numbers');
            setBlock(true);
        }else{
            let numberArr = []
            let arr = Object.values(form.denominations);
            let arrDenomination = [0.1, 0.5, 1, 2, 5, 10, 20, 20, 50, 100, 200, 500, 1000];

            for(let i = 0; i<arr.length; i++){
                if(arr[i] === ""){
                    numberArr.push(0);
                }else{
                    numberArr.push(parseInt(arr[i]));
                }
            }
            for(let i = 0; i<numberArr.length; i++){
                total = total + numberArr[i] * arrDenomination[i];
            }

            let denominations = form.denominations
            setForm({
                ...form, total_cut: total, denominations:denominations
              })
        }
    }


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
                            <Select id="type" name="type" style={{width:'180px'}} onChange={handleChange} value={form.type}>
                                <MenuItem key={200002} value={'initial'}>inital</MenuItem>
                                <MenuItem key={200001} value={'final'}>final</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl style={{width:'100%'}}>
                            <div>&nbsp;</div>
                            <Select id="CashboxId" name="CashboxId" style={{width:'180px'}} onChange={handleChange} value={form.CashboxId}>
                                {cashboxes && cashboxes.map((cashbox,index)=>{
                                    console.log(cashbox.Cuts.length)
                                    if(cashbox.Cuts.length===0){
                                        return <MenuItem key={index} value={cashbox.id}>{cashbox.name}</MenuItem>
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>10c coin</InputLabel>
                        <Input type="text" id="m10c" name="m10c" aria-describedby="m10c" autoComplete='off' onChange={handleChange} value={form.denominations.m10c} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>              
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>50c coin</InputLabel>
                        <Input type="text" id="m50c" name="m50c" aria-describedby="debterms" autoComplete='off' onChange={handleChange} value={form.denominations.m50c} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>1p coin</InputLabel>
                        <Input type="text" id="m1p" name="m1p" aria-describedby="m1p" autoComplete='off'  onChange={handleChange} value={form.denominations.m1p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>2p coin</InputLabel>
                        <Input type="text" id="m2p" name="m2p" aria-describedby="m2p" autoComplete='off'  onChange={handleChange} value={form.denominations.m2p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>5p coin</InputLabel>
                        <Input type="text" id="m5p" name="m5p" aria-describedby="m5p" autoComplete='off'  onChange={handleChange} value={form.denominations.m5p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>10p coin</InputLabel>
                        <Input type="text" id="m10p" name="m10p" aria-describedby="m10p" autoComplete='off'  onChange={handleChange} value={form.denominations.m10p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>20p coin</InputLabel>
                        <Input type="text" id="m20p" name="m20p" aria-describedby="m20p" autoComplete='off'  onChange={handleChange} value={form.denominations.m20p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 20p</InputLabel>
                        <Input type="text" id="b20p" name="b20p" aria-describedby="b20p" autoComplete='off'  onChange={handleChange} value={form.denominations.b20p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 50p</InputLabel>
                        <Input type="text" id="b50p" name="b50p" aria-describedby="b50p" autoComplete='off'  onChange={handleChange} value={form.denominations.b50p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 100p</InputLabel>
                        <Input type="text" id="b100p" name="b100p" aria-describedby="b100p" autoComplete='off'  onChange={handleChange} value={form.denominations.b100p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 200p</InputLabel>
                        <Input type="text" id="b200p" name="b200p" aria-describedby="b200p" autoComplete='off'  onChange={handleChange} value={form.denominations.b200p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 500p</InputLabel>
                        <Input type="text" id="b500p" name="b500p" aria-describedby="b500p" autoComplete='off'  onChange={handleChange} value={form.denominations.b500p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>bill 1000p</InputLabel>
                        <Input type="text" id="b1000p" name="b1000p" aria-describedby="b1000p" autoComplete='off'  onChange={handleChange} value={form.denominations.b1000p} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <FormControl>
                        <InputLabel variant="standard" required={true}>total cut</InputLabel>
                        <Input type="text" id="total_cut" name="total_cut" aria-describedby="total_cut" autoComplete='off'  onChange={handleChange} value={form.total_cut} onBlur={handleBlur}/> 
                        </FormControl>
                    </div>
                </Grid>
                <Grid item md={12}>
 
                </Grid>    
            </Grid>
            <Grid>
                <Fab onClick={actions} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}} disabled={block}>
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