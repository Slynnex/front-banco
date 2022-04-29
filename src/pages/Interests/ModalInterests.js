import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const ModalInterests = ({ form, handleChange, action, saveData, handleClose, open, handleReset, setLoader, validate }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #cecece',
    borderRadius: 10,
    boxShadow: '10px 5px 5px',
    p: 4,
  };

  //   console.log(form.debterms)
  const validation = () => {
    if (form.name.length >= 1 && form.debterms.length > 1 && form.interests.length > 1 && form.extra_charge.length > 1 && !(isNaN(form.debterms))) {
      //   saveData({ form, id: form.id, setLoader, handleReset })
      // saveData({ form, id: form.id, setLoader, handleReset })
      console.log("I'm sending")
    } else {
      validate.name = validate.debterms = validate.interests = validate.extra_charge = false
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
          {`${action} Executive`}
        </Typography>
        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>Name</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} />
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>Debterms</InputLabel>
          <Input id="debterms" name="debterms" aria-describedby="debterms" autoComplete='off' onChange={handleChange} value={form.debterms} />
        </FormControl>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Interest</InputLabel>
          <Input id="interest" name="interest" aria-describedby="interest" autoComplete='off' onChange={handleChange} value={form.interest} /> */}
          <TextField id="interest" name="interest" label="Interest *" aria-describedby="interest" autoComplete='off' onChange={handleChange} value={form.interest} />
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel variant="standard" required={true}>extra_charge</InputLabel>
          <Input id="extra_chargue" name="extra_charge" aria-describedby="extra_charge" autoComplete='off' onChange={handleChange} value={form.extra_charge} />
        </FormControl>
        <Grid>
          {form.name.length >= 1 && form.debterms.length > 1 && form.interests.length > 1 && form.extra_charge.length > 1 ?
            <Fab onClick={validation} color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
              <SaveIcon />
            </Fab>
            :
            <Fab onClick={validation} disabled color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
              <SaveIcon />
            </Fab>
          }
          <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <CancelIcon />
          </Fab>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalInterests