import React,{useState,useEffect,useContext} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
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


const initialClientForm = {
        name: "",
        lastname: "",
        gender: null,
        street: "",
        number_ext: null,
        colony: "",
        postalcode: null,
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


const Clients = () => {
    //Formulario de clientes
    const [formClient,setFormClient] = useState(initialClientForm)
    const [formBeneficiarie, setFormBeneficiarie] = useState(initialBeneficiarieForm)
    const [nip, setNip] = useState('')
    const [amount,setAmount] = useState('');
    const [show,setShow] = useState(true)
    const [create, setCreate] = useState(false);
    
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
            ?null
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
                  />
                :null
        }
    </>
  )
}

export default Clients