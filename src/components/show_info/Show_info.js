import React,{useState,useEffect} from 'react'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import server from '../../config/bdApi';
//Icons
import CancelIcon from '@material-ui/icons/Cancel'
import EmailIcon from '@material-ui/icons/Email'



const Show_info = ({openS,handleCloseS,data,toast}) => {
    

      //Send Email About Account
      const sendEmail = async (id) => {
        try{
          await server.get(`/reports/amortizations/${id}`);
          toast.success("Email sended");
        }catch(error){
          console.log(error)
        }
      }
    

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

    return (
    <Modal
        open={openS}
        onClose={handleCloseS}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginTop:'20px'}}>
              Client name  <b>{`${data.name} ${data.lastname}`}</b>
          </Typography>
          <Grid>
            <div style={{margin:'10px',fontSize:'15px'}}>
              <b>Personal Information:</b>
            </div>
            
            <div style={{marginLeft:"20px"}}>
              <li>CURP: <b>{data.curp}</b></li>
              <li>RFC: <b>{data.rfc}</b></li>
              <li>INE: <b>{data.no_ine}</b></li>
              <li>Street: <b>{data.street} {data.number_ext}</b></li>
              <li>Colony: <b>{data.colony}</b></li>
              <li>State: <b>{data.state}</b></li>

            </div>
            
            <div style={{margin:'15px',fontSize:'15px'}}>
              <b>Accounts:</b>
            </div>
            {data.Accounts.map((el,index)=>(
              <div key={'tt'+index} style={{marginLeft:"20px"}}> 
              <div key={'t'+index}>
                 #{index+1}
              </div>
            
              <li key={'a'+index}>Account number: <b>{el.no_acc}</b></li>
              <li key={'b'+index}> Account type: <b>{el.type}</b></li>
              <li key={'c'+index}>Account amount: <b>{el.amount}</b></li>
              {el.type === 'credit' || el.type === 'mortgage'
                ?<IconButton aria-label="delete" size="small" onClick={() => {sendEmail(el.id)}}>
                  <EmailIcon />
                </IconButton>
                :null
              }
              {el.Cards.map((card,indexCard)=>(
                <div style={{marginTop:'10px'}}>
                  <div><b>Cards</b></div>
                  <li style={{marginLeft:"20px"}}>Card: <b>{card.card_number}</b></li>
                </div>
              ))}
              </div>
            ))}
            
            
            <Fab onClick={handleCloseS} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CancelIcon />
            </Fab>
          </Grid>
          
        </Box>
      
      </Modal>
  )
}

export default Show_info