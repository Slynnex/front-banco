import axios  from 'axios';
import React from 'react'
import '../../styles/clients.css'

const TabDocuments = ({updateFieldChanged}) => {
  
   const uploadImage = (index) => async(e) => {
       const files = e.target.files;
       const data = new FormData();
       data.append("file", files[0]);
       data.append("upload_preset", "lccyzc02");
       try{
        const res = await axios.post('https://api.cloudinary.com/v1_1/dnesdnfxy/image/upload',data);
        updateFieldChanged(index,res.data.url);
        }
       catch(error){
           console.log(error.response)
       }
   }

  return (
    <div>
        <div className='row'>
            <label>INE</label>
            <div className='item'>
                <input type="file" onChange={uploadImage(0)}/>
            </div>
        </div>
        <div className='row'>
            <label>Proof Address</label>
            <div className='item'>
                <input type="file" onChange={uploadImage(1)}/>
            </div>
        </div>
        <div className='row'>
            <label>Proof Income</label>
            <div className='item'>
                <input type="file" onChange={uploadImage(2)}/>
            </div>
        </div>
    </div>
  )
}

export default TabDocuments