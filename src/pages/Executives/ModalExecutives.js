import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
// import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField';

//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const ModalExecutives = ({ form, handleChange, action, areas, saveData, handleClose, open, handleReset, setLoader, validate }) => {
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
    // console.log(validate)
    console.log(form)
    if (form.name.length >= 1 && form.lastname.length >= 1 && form.userid.length >= 5 && form.password.length >= 0) {
      saveData({ form, id: form.id, setLoader, handleReset })
    } else {
      validate.name = validate.lastname = validate.userid = validate.password = validate.AreaId = false
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
          {/* <InputLabel variant="standard" required={true}>Name</InputLabel>
          <Input id="name" name="name" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} /> */}
          <TextField id="name" name="name" label="Name *" aria-describedby="name" autoComplete='off' onChange={handleChange} value={form.name} error={!validate.name} helperText={validate.name ? "" : "Name is required"} />
        </FormControl>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Last Name</InputLabel>
          <Input id="lastname" name="lastname" aria-describedby="lastname" autoComplete='off' onChange={handleChange} value={form.lastname} /> */}
          <TextField id="lastname" name="lastname" label="Last Name *" aria-describedby="lastname" autoComplete='off' onChange={handleChange} value={form.lastname} error={!validate.lastname} helperText={validate.lastname ? "" : "Last Name is required"} />
        </FormControl>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>User</InputLabel>
          <Input id="userid" name="userid" aria-describedby="userid" autoComplete='off' onChange={handleChange} value={form.userid} /> */}
          <TextField id="userid" name="userid" label="User *" aria-describedby="userid" autoComplete='off' onChange={handleChange} value={form.userid} error={!validate.userid} helperText={validate.userid ? "" : "User can't have spaces and must be greater than 6 characters"} />
        </FormControl>
        <FormControl fullWidth={true}>
          {/* <InputLabel variant="standard" required={true}>Password</InputLabel>
            <Input id="password" type="password" name="password" aria-describedby="password" autoComplete='off' onChange={handleChange} value={form.password} /> */}
          {action === 'Create' ?
            <TextField id="password" type="password" label="Password *" name="password" aria-describedby="password" autoComplete='off' onChange={handleChange} value={form.password} error={!validate.password} helperText={validate.password ? "" : "Password is required"} />
            :
            <></>
            // <TextField disabled id="password" type="password" label="Password *" name="password" aria-describedby="password" autoComplete='off' onChange={handleChange} value={form.password} error={!validate.password} helperText={validate.password ? "" : "Password must be greater than 6 characters"} />
          }
        </FormControl>

        <FormControl fullWidth>
          <InputLabel variant="standard" required={true}>Area</InputLabel>
          <Select id="AreaId" name="AreaId" onChange={handleChange} value={form.AreaId}>
            {areas.map((area, index) => {
              return <MenuItem key={index} value={area.id}>{area.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <Grid>
          {form.name.length >= 1 && form.lastname.length >= 1 && form.userid.length >= 5 && form.password.length >= 0 && form.AreaId > 0 ?
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

export default ModalExecutives