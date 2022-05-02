import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

function ModalMortgages({ form, handleChange, action, saveData, handleClose, open, handleReset, setLoader }) {
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

  // console.log(form.aproved_amount)

  const validation = () => {
    if (form.aproved_amount >= 1 && !(isNaN(form.aproved_amount)) && (form.aproved_amount <= form.solicited_amount)) {
      form.aproved_amount = parseFloat(form.aproved_amount);
      saveData({ form, id: form.id, setLoader, handleReset })
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
          Write the amount to accept
        </Typography>

        <FormControl fullWidth={true}>
          <TextField id="aproved_amount" name="aproved_amount" label="Solicited Amount *" aria-describedby="name" autoComplete='off' onChange={handleChange} defaultValue={form.aproved_amount} helperText="Remember the amount can't be more than solicited" />
        </FormControl>

        <Grid>
          <Fab onClick={validation} color="primary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <SaveIcon />
          </Fab>

          <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{ float: 'right', marginTop: '20px', marginRight: '10px' }}>
            <CancelIcon />
          </Fab>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalMortgages