import React,{useState,useEffect} from 'react'
import { Chart } from "react-google-charts";
import server from '../config/bdApi';

export default function Dashboard() {

  const [account, setAccount] = useState({})
  const [transaction, setTransaction] = useState({})

  useEffect(() => {
    
    const getData = async () =>{
      let acounts = await server.get('/reports/accounts') 
      let transactions = await server.get('/reports/transactions')

      let acountInfo = {credit:0,debit:0,mortgage:0}
      let transactionInfo = {withdrawl:0,deposti:0,payment:0}

      if(acounts.data.data!==null){
        acounts.data.data.forEach((el,index)=>{
          if(el.type==='credit'){
            acountInfo.credit=el.count
          }else if(el.type==='debit'){
            acountInfo.debit=el.count
          }else if(el.type==='mortgage'){
            acountInfo.mortgage=el.count
          }
        })
      }
        
      if(transactions.data.data!==null){
        transactions.data.data.forEach((el,index)=>{
          if(el.ConceptId===1){
            transactionInfo.withdrawl=el.count
          }else if(el.ConceptId===2){
            transactionInfo.deposit=el.count
          }else if(el.ConceptId===3){
            transactionInfo.payment=el.count
          }else if(el.ConceptId===4){
            transactionInfo.opening=el.count
          }
        })
      }
      
      setAccount(acountInfo)
      setTransaction(transactionInfo)

    }
    getData()

  }, [])

  const data = [
    ["Type","Today's Accounts"],
    ["Debit", account.debit],
    ["Credit", account.credit],
    ["Mortgage", account.mortgage],
  ];
  
  const options = {
    title: "Today's Accounts",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Accounts",
      minValue: 0,
    },
    vAxis: {
      title: "Type",
    },
  };
  
  const data2 = [
    ["Type", "Transactions"],
    ["Withdrawls", transaction.withdrawl],
    ["Deposits", transaction.deposit],
    ["Payments", transaction.payment],
    ["Opening", transaction.opening]
  ];
  
  const options2 = {
    chart: {
      title: "Today's Transactions",
    },
  };

  return (
    <>
    {console.log(account)}
    <div style={{borderRadius:"10px",boxShadow:"5px 5px 10px black",width:"100%"}}>
      <Chart
      chartType="BarChart"
      width="100%"
      height="320px"
      data={data}
      options={options}
    />
    </div>
    
    <div style={{borderRadius:"10px",boxShadow:"5px 5px 10px black",padding:"10px",width:"100%"}}>
      <Chart
        style={{marginTop:'20px'}}
        chartType="Bar"
        width="100%"
        height="320px"
        data={data2}
        options={options2}
      />
    </div>
    
    </>
    
  )
}
