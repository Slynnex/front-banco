import React,{useState,useEffect,useContext} from 'react'
import Fab from '@material-ui/core/Fab'

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
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


const initialClientForm = {
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
    const {state} = useContext(Context)
    //Formulario de clientes
    const [formClient,setFormClient] = useState(initialClientForm)
    const [formBeneficiarie, setFormBeneficiarie] = useState(initialBeneficiarieForm)
    const [formDocuments, setFormDocuments] = useState(initialDocuments)
    const [formMortgage, setFormMortgage] = useState(initialMortgage);
    const [fromProperties, setFormProperties] = useState(initialProperties);
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
     //loading state
    const [loader, setLoader] = useState('none')

    const {save, get} = useContext(Context);
    const handleOpenM = () => setOpen(true)
    const handleOpenS = () => setOpenS(true)
    const handleCloseS = () => setOpenS(false)
    const handleCloseM = () => setOpen(false)

    const handleReset = (e)=>{
        handleOpenM()
        handleCloseM()
        formClient(initialClientForm)
      }

    useEffect(() => {
        get();
    },[])
    
    const handleCreate = () => {
        setShow(false)
        setCreate(true)
    }

    const handleClient = (e) => {
        setFormClient({
            ...formClient,[e.target.name]:e.target.value
        })
    }

    const handleBeneficiarie = (e) => {
        setFormBeneficiarie({
            ...formBeneficiarie,[e.target.name]:e.target.value
        })
    }

    const handleClose = () => {
        setDialog(false);
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
            get()
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
            get()
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
          console.log(creditDetail)
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

        }
    }

    const updateFieldChanged = (index,document )=> {
        let newDocuments = [...formDocuments];
        newDocuments[index].document_url = document;
        setFormDocuments(newDocuments);
    }

  return (
    <>
        <ToastContainer autoClose={2000}/>
        <Loader display={loader}/>
        <div style={{padding:'5px'}}>
            <span style={{fontSize:'20px'}}>Clients</span>
            <Fab color="primary" aria-label="add" size="small" style={{float:'right',marginBottom:'20px'}} onClick={()=>{handleCreate();}}>
            <AddIcon />
            </Fab>
        </div>
        {show
            ?<TableClient editData={editData} showData={showData}/>
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
                  />
                :null
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