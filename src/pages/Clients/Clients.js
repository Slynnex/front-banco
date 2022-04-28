import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
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
import TabsClients from './TabsClients'

import { Context } from '../../context/Clients/ClientsContext'
import TableClient from './TableClient'


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
        email: ""
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
    const [type, setType] = useState("debit");

    const {save, get} = useContext(Context);

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

    const handleMortgage = (e) => {
        setFormMortgage({
            ...formMortgage, [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        setDialog(false);
    }

    const saveData = () => {
        console.log(type)
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
            console.log(form)
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

  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div style={{padding:'5px'}}>
            <span style={{fontSize:'20px'}}>Clients</span>
            <Fab color="primary" aria-label="add" size="small" style={{float:'right',marginBottom:'20px'}} onClick={()=>{handleCreate();}}>
            <AddIcon />
            </Fab>
        </div>
        {show
            ?<TableClient/>
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
                    handleMortgage={handleMortgage}
                    formMortgage={formMortgage}
                    updateFieldGuarantees={updateFieldGuarantees}
                    formGuarantees={formGuarantees}
                    updateFieldProperties={updateFieldProperties}
                    formProperties={formProperties}
                  />
                :null
        }
        <Alert_Dialog
            openD={dialog}
            handleCloseD={handleClose}
            name={`${formClient.name} ${formClient.lastname}`}
            deleteData={saveData}
            description={"You want to create: "}
            title={"Create client"}
        />
    </>
  )
}

export default Clients