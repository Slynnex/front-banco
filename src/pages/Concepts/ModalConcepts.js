import React from 'react'
import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField'


//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const ModalConcepts = ({ form, handleChange, action, saveData, handleClose, open, handleReset, setLoader, validate }) => {
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

  const validation = () => {
    if (form.name.length >= 1) {
      // console.log("saveData")
      saveData({ form, id: form.id, setLoader, handleReset })
    } else {
      validate.name = false
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
          {`${action} Concept`}
        </Typography>

        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Concept</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} /> */}

          <TextField id="name" name="name" label="Concept *" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} error={!validate.name} helperText={validate.name ? "" : "Concept must be greater than 4 characters"} />
        </FormControl>

        <Grid>
          {form.name.length >= 4 ?
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

export default ModalConcepts