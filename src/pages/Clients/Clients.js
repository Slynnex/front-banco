import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Fab from '@material-ui/core/Fab'

//alerts toastify
import 'react-toastify/dist/ReactToastify.css';


//Loader
import Loader from '../../assets/Loader'

//icons
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

//Modal
import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'
import Show_info from '../../components/show_info/Show_info'
import TabsClients from './TabsClients'

import { Context } from '../../context/Clients/ClientsContext'
import TableClient from './TableClient'
import ModalClients from './ModalClients'

import server from '../../config/bdApi';
import Accounts from '../Accounts/Accounts';

import {FormControl, TextField} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';

const initialClientForm = {
        name: "",
        lastname: "",
        gender: "-",
        street: "",
        number_ext: "",
        colony: "",
        postalcode: "",
        city: "",
        municipality: "",
        state: "",
        celphone: "",
        landline: "",
        curp: "",
        rfc: "",
        no_ine: "",
        email: "",
        id:null,
}

const initialShowClient = {
    name: "",
    lastname: "",
    gender: 0,
    street: "",
    number_ext: 0,
    colony: "",
    postalcode: 0,
    city: "",
    municipality: "",
    state: "",
    celphone: "",
    landline: "",
    curp: "",
    rfc: "",
    no_ine: "",
    email: "",
    Accounts:[]
}

const initialBeneficiarieForm ={
    name:"",
    lastname: "",
    relation: "",
    percentage: "",
    birth_date: "",
    phone: "",
    email: ""
}

const initialDocuments = [
    {document_url: '', type: 'ine'},{document_url: '', type: 'address'},{document_url: '', type: 'income'}
]

const initialMortgage = {
    solicited_amount: "",
    solicited_date: "",
    InterestId: ""
}

const initialProperties= [
    {   
        url:"",
        value:""
    }
]

const initialGuarantees = [
    {
        name:"",
        lastname: "",
        address: "",
        telephone: ""
    }

]

const Clients = () => {
    //Formulario de clientes
    const [formClient,setFormClient] = useState(initialClientForm)
    const [formBeneficiarie, setFormBeneficiarie] = useState(initialBeneficiarieForm)
    const [formDocuments, setFormDocuments] = useState(initialDocuments)
    const [formMortgage, setFormMortgage] = useState(initialMortgage);
    const [formProperties, setFormProperties] = useState(initialProperties);
    const [formGuarantees, setFormGuarantees] = useState(initialGuarantees); 
    const [nip, setNip] = useState('')
    const [amount,setAmount] = useState('');
    const [creditDetail,setCreditDetail] = useState('')
    const [show,setShow] = useState(true)
    const [create, setCreate] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [open, setOpen] = useState(false)
    const [openS, setOpenS] = useState(false)
    const [dataClient, setDataClient] = useState(initialShowClient)
    const [type, setType] = useState("debit");
    const [validate,setValidate] = useState(false);
    const [selectId, setSelectId] = useState(0);
     //loading state
    const [loader, setLoader] = useState('none')

    const {save, get, state} = useContext(Context);
    const handleOpenM = () => setOpen(true)
    const handleOpenS = () => setOpenS(true)
    const handleCloseS = () => setOpenS(false)
    const handleCloseM = () => setOpen(false)

    useEffect(() => {
        if(state.errors.length > 0){
            state.errors.map((error) => (
                toast.error(`${error.msg} -  ${error.param.split('.')[0]} - ${error.param.split('.')[1]}`)
            ))
        }
    },[state])

    const handleReset = (e)=>{
        handleOpenM()
        handleCloseM()
        formClient(initialClientForm)
      }
    
    const handleCreate = () => {
        setShow(false)
        setCreate(true)
        setFormClient(initialClientForm);
        setFormBeneficiarie(initialBeneficiarieForm);
        setFormDocuments(initialDocuments);
        setFormMortgage(initialMortgage);
        setFormProperties(initialProperties);
        setFormGuarantees(initialGuarantees);
        setNip('');
        setAmount('');
        setCreditDetail('');

    }

    const handleClient = (e) => {
        if(e.target.name === 'postalcode' || e.target.name === 'number_ext'){
            if(e.target.value === ''){
                return setFormClient({
                    ...formClient,[e.target.name]:e.target.value
                })
            }
            return setFormClient({
                ...formClient,[e.target.name]:parseInt(e.target.value)
            })
        }
        setFormClient({
            ...formClient,[e.target.name]:e.target.value
        })
    }

    const handleBeneficiarie = (e) => {
        setFormBeneficiarie({
            ...formBeneficiarie,[e.target.name]:e.target.value
        })
    }

    const handleMortgage = (e) => {
        setFormMortgage({
            ...formMortgage, [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        setDialog(false);
        setShow(true);
        setCreate(false);
    }

    const editData = (id) => {
        let [clients] = state.clients.filter(el => el.id === id)
        let initialClientFormToUpdate = {
            name:clients.name,
            lastname:clients.lastname,
            gender:clients.gender,
            street:clients.street,
            number_ext:clients.number_ext,
            colony:clients.colony,
            postalcode:clients.postalcode,
            city:clients.city,
            municipality:clients.municipality,
            state:clients.state,
            celphone:clients.celphone,
            landline:clients.landline,
            curp:clients.curp,
            rfc:clients.rfc,
            no_ine:clients.no_ine,
            email:clients.email,
            id:clients.id,
        }
        setFormClient(clients)
        handleOpenM()
      }

    //salvar el cliente
    const saveDataModal = async ()=>{
        try{
            setLoader('flex')
            let clientS = await server.put(`/clients/${formClient.id}`,formClient)
            if(search===''){
                setSearch('inicial')
            }else{
              get(search);  
            }
            setLoader('none')
            handleCloseM()
        }catch(error){
            console.log(error)
            setLoader('none')
            handleCloseM()
        }
       
    }
    //mostrar datos del cliente en un modal
    const showData = async (id)=>{
        try{
            setLoader('flex')
            let clientS = await server.get(`/clients/${id}`)
            setDataClient(clientS.data.data)
            handleOpenS()
            setLoader('none')
        }catch(error){
            console.log(error)
            setLoader('none')
            handleCloseM()
        }
       
    }


    const saveData = () => {
        switch(type){
        case "debit":{
            const form = {
                client: formClient,
                account: {
                    amount
                },
                beneficiaries: [
                    formBeneficiarie
                ],
                documents: formDocuments,
                card: {
                    nip
                }
            }
            save({form,setCreate,setDialog,setShow,type});
            break;
            }
        case "credit":{
            const form = {
                client: formClient,
                account: {
                    amount
                },
                documents: formDocuments,
                creditdetail: {
                    CreditdetailId: creditDetail
                }
            }
            save({form,setCreate,setDialog,setShow,type});
            break;
        }
        case "mortgages":{
            const form = {
                client: formClient,
                account: {
                    amount
                },
                documents: formDocuments,
                mortgage: formMortgage,
                guarantees: formGuarantees,
                properties: formProperties
            }

            save({form,setCreate,setDialog,setShow,type});
            break;
        }}
    }

    //Update documents from client
    const updateFieldChanged = (index,document )=> {
        let newDocuments = [...formDocuments];
        newDocuments[index].document_url = document;
        setFormDocuments(newDocuments);
    }


    //Change state to create account
    const createAccount = (id) => {
        setSelectId(id);
        setShow(false);
    }

    const updateFieldGuarantees = (index, e) => {
        let newGuarantees = [...formGuarantees];
        newGuarantees[index][e.target.name] = e.target.value;
        setFormGuarantees(newGuarantees);
    }

    const updateFieldProperties = async(index, e) => {
        if(e.target.name === 'value'){
            let newProperties = [...formProperties];
            newProperties[index][e.target.name] = e.target.value;
            setFormProperties(newProperties);
        }else{
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "lccyzc02");
            try{
                const res = await axios.post('https://api.cloudinary.com/v1_1/dnesdnfxy/image/upload',data);
                let newProperties = [...formProperties];
                newProperties[index][e.target.name] = res.data.url;
                setFormProperties(newProperties);
            }
            catch(error){
                console.log(error)
            }
        }
    }


    const [search, setSearch] = React.useState('inicial');

    useEffect(() => {
        if(search===''){
            setSearch('inicial')
        }else{
          get(search);  
        }
    },[search])


    useEffect(() => {
        let resultAmount = false;
        let resultNip = false;
        let resultCreditDetail = false;
        let resultDocuments = true;
        let resultPropertie = true;
        let resultGuarantees = true;
        const resultClient = Object.values(formClient).every((value) => value !== ''); //Validate if is not empty the form client
        formDocuments.forEach((document) =>{                                           //Validate if is not empty the documents
            if(!Object.values(document).every((value) => value !== '')){
                resultDocuments = false;
            }
        })

        const resultBeneficiaries = Object.values(formBeneficiarie).every((value) => value !== '')//Validate if is not empty the form Beneficiaries
        const resultMortgage = Object.values(formMortgage).every((value) => value !== '');  //Validate if is not empty the form Mortgage
        formProperties.forEach((property) =>{                                           //Validate if is not empty the form Properties
            if(!Object.values(property).every((value) => value !== '')){
                resultPropertie = false;
            }
        })

        formGuarantees.forEach((guarante) =>{                                           //Validate if is not empty the form Properties
            if(!Object.values(guarante).every((value) => value !== '')){
                resultGuarantees = false;
            }
        })

        if(amount !== ''){
            resultAmount = true;}
        if(nip !== '')
            resultNip = true;
        if(creditDetail !== '')
            resultCreditDetail = true;
        
        if(type === 'debit'){
            if(resultClient && resultNip && resultAmount && resultDocuments && resultBeneficiaries){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }else if(type === 'credit'){
            if(resultClient && resultAmount && resultCreditDetail && resultDocuments){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }else if(type === 'mortgages'){
            if(resultClient && resultMortgage && resultDocuments && resultPropertie && resultGuarantees){
                setValidate(true);
            }else{
                setValidate(false);
            }
        }
    },[type,formClient,formDocuments,formBeneficiarie,amount,nip,creditDetail,formMortgage,formProperties,formGuarantees])


  return (
    <>
        <ToastContainer autoClose={2000}/>
        <Loader display={loader}/>
        <div style={{padding:'5px'}}>
            <span style={{fontSize:'20px'}}>Clients</span>
            {show
                ?<FormControl fullWidth={true} style={{marginTop:'10px',marginBottom:'20px'}}>
                        <TextField autoComplete='off'
                        label="Type the name of any client"
                        name="search"
                        onChange={e => setSearch(e.target.value)} 
                        />
                </FormControl>
                :null
            }
            {show
                ?<Fab color="primary" aria-label="add" size="small" style={{float:'right',marginBottom:'20px'}} onClick={()=>{handleCreate();}}>
                    <AddIcon />
                </Fab>
                :null
            }
        </div>
        {show
            ? <TableClient editData={editData} showData={showData} createAccount={createAccount} toast={toast}/>
            :create
                ?<TabsClients
                    handleClient={handleClient}
                    formClient={formClient}
                    nip={nip}
                    amount={amount}
                    setAmount={setAmount}
                    setNip={setNip}
                    formBeneficiarie={formBeneficiarie}
                    handleBeneficiarie={handleBeneficiarie}
                    setDialog={setDialog}
                    setCreate={setCreate}
                    updateFieldChanged={updateFieldChanged}
                    setCreditDetail={setCreditDetail}
                    creditDetail={creditDetail}
                    type={type}
                    setType={setType}
                    handleClose={handleClose}
                    handleMortgage={handleMortgage}
                    formMortgage={formMortgage}
                    updateFieldGuarantees={updateFieldGuarantees}
                    formGuarantees={formGuarantees}
                    updateFieldProperties={updateFieldProperties}
                    formProperties={formProperties}
                    validate={validate}
                  />
                :<Accounts
                    dialog={dialog}
                    setDialog={setDialog}
                    handleClose={handleClose}
                    id={selectId}
                    toast={toast}
                />
        }
        <ModalClients
          form={formClient}
          saveData={saveDataModal}
          handleChange = {handleClient}
          action={'Update'}
          handleClose={handleCloseM}
          handleReset={handleReset}
          setLoader = {setLoader}
          open={open}
        />

        <Alert_Dialog
            openD={dialog}
            handleCloseD={handleClose}
            name={`${formClient.name} ${formClient.lastname}`}
            deleteData={saveData}
            description={"You want to create: "}
            title={"Create client"}
        />

        <Show_info
            openS={openS}
            handleCloseS={handleCloseS}
            data={dataClient}
            showData={showData}
        />

    </>
  )
}

export default Clients