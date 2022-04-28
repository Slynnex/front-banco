import React from 'react';
import {Box, Grid, Typography, Modal, Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';


const ModalInfo = ({form,saveData,handleClose,open,handleReset,setLoader,Client,state,onAction}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #cecece',
        borderRadius:10,
        boxShadow: '10px 5px 5px',
        p: 4,
        };
        React.useEffect(()=>{
            console.log('errors');
            if(!state.errors){
                onAction(1)
            }else{
                onAction(2);
            }
        },[state.errors])

        function action (){
            if(!state.errors){
                console.log('No hay errores');
                saveData({form,id:form.id,setLoader,handleReset});
                handleClose();
            }
        }

  return (
    <>
        <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h6">
                    Does the information coincide with that shown in the INE? 
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle1" component="h6">
                    Name: {Client.name} {Client.lastname}
                </Typography>
                <Typography id="modal-modal-title" variant="subtitle1" component="h6">
                    CURP: {Client.curp}
                </Typography>
                <Grid>
                <Fab onClick={action} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                    <SaveIcon />
                </Fab>
                <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                    <CancelIcon />
                </Fab>
                </Grid>
            </Box>
        </Modal>
    </>

  )
}

export default ModalInfo;