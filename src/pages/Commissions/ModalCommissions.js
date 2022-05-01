import React from 'react';
import { FormControl, InputLabel, Input, MenuItem, Select, Box, Grid, Typography, Modal, TextField } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const ModalComissions = ({ form, handleChange, action, saveData, handleClose, open, handleReset, setLoader, validate }) => {
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
    if (form.name.length >= 1 && !(isNaN(form.amount))) {
      saveData({ form, id: form.id, setLoader, handleReset })
    } else {
      validate.name = validate.amount = false
    }
  }

  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/*
        const initialForm = {
    name:'',
    amount:0,
    date_init:new Date(),
    id:null
}*/}
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${action} Commission`}
        </Typography>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Name</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} /> */}
          <TextField id="name" name="name" label="Name *" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} error={!validate.name} helperText={validate.name ? "" : "Name is require"} />
        </FormControl>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Amount</InputLabel>
          <Input id="amount" name="amount" aria-describedby="amount" autoComplete='off' onChange={handleChange} value={form.amount} /> */}
          <TextField id="amount" name="amount" label="Amount *" aria-describedby="amount" autoComplete='off' onChange={handleChange} value={form.amount} error={!validate.amount} helperText={validate.amount ? "" : "Value is required only decimal numbers"} />
        </FormControl>
        <Grid>
          {form.name.length >= 1 && !(isNaN(form.amount)) && form.amount.length >= 1 ?
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

export default ModalComissions;