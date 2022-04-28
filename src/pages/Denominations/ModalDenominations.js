
import React from 'react'
import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
// import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField';
//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
// import FormHelperText from '@material-ui/core/FormHelperText';


const ModalDenominations = ({ form, handleChange, handleClose, open, handleReset, setLoader, saveData, action, validate }) => {
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
    // console.log(form.id)
    // console.log(validate.id)
    if (form.id.length >= 1 && form.name.length >= 1 && !(isNaN(form.value))) {
      saveData({ form, id: form.id, setLoader, handleReset, action })
    } else {
      // validate({ id: false, name: false, value: false })
      validate.id = validate.name = validate.value = false
      // handleChange()
      // console.log("validate")
    }
  }

  // const blurHandler = () => {
  //   console.log("blur")
  //   // handleChange()
  // }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${action} Denomination`}
        </Typography>
        {action === 'Create' ?
          <FormControl fullWidth={true}>
            {/* <InputLabel variant="standard" required={true}>ID</InputLabel> */}
            <TextField id="id" name="id" label="Identifier *" aria-describedby="id" autoComplete='off' onChange={handleChange} value={form.id} error={!validate.id} helperText={validate.id ? "" : "Identifier is required"} />
            {/* <FormHelperText>{errors.id ? errors.id.message : ""}</FormHelperText> */}
            {/* <FormHelperText>{!validate.id ? "Id is required" : ""}</FormHelperText> */}
          </FormControl>
          : <></>
        }

        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Name</InputLabel> */}
          <TextField id="name" name="name" label="Name *" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} error={!validate.name} helperText={validate.name ? "" : "Name is require"} />
        </FormControl>


        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>value</InputLabel> */}
          <TextField id="value" name="value" label="Value *" aria-describedby="value" autoComplete='off' onChange={handleChange} value={form.value} error={!validate.value} helperText={validate.value ? "" : "Value is required only decimal numbers"} />
        </FormControl>

        <Grid>
          {form.id.length >= 1 && form.name.length >= 1 && !(isNaN(form.value)) && form.value.length >= 1 ?
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

export default ModalDenominations