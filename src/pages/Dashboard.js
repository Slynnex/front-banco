import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import server from "../config/bdApi";
import Grid from '@material-ui/core/Grid'

export default function Dashboard() {
  const [account, setAccount] = useState({});
  const [transaction, setTransaction] = useState({});
  const [debtor, setDebtor] = useState({});
  const [replacement, setReplacement] = useState({});

  useEffect(() => {
    const getData = async () => {
      let acounts = await server.get("/reports/accounts");
      let transactions = await server.get("/reports/transactions");
      let debtors = await server.get("/reports/debtors");
      let replacements = await server.get("/reports/repositions");

      let acountInfo = { credit: 0, debit: 0, mortgage: 0 };
      let transactionInfo = { withdrawl: 0, deposti: 0, payment: 0 };
      let debtorInfo = {
        credit: debtors.data.data[0],
        mortgage: debtors.data.data[1],
      };
      setReplacement(replacements.data.data);

      if (acounts.data.data !== null) {
        acounts.data.data.forEach((el, index) => {
          if (el.type === "credit") {
            acountInfo.credit = el.count;
          } else if (el.type === "debit") {
            acountInfo.debit = el.count;
          } else if (el.type === "mortgage") {
            acountInfo.mortgage = el.count;
          }
        });
      }

      if (transactions.data.data !== null) {
        transactions.data.data.forEach((el, index) => {
          if (el.ConceptId === 1) {
            transactionInfo.withdrawl = el.count;
          } else if (el.ConceptId === 2) {
            transactionInfo.deposit = el.count;
          } else if (el.ConceptId === 3) {
            transactionInfo.payment = el.count;
          } else if (el.ConceptId === 4) {
            transactionInfo.opening = el.count;
          }
        });
      }

      setAccount(acountInfo);
      setTransaction(transactionInfo);
      setDebtor(debtorInfo);
    };
    getData();
  }, []);

  const data = [
    ["", "", { role: "style" }],
    ["Debit", account.debit, "blue"],
    ["Credit", account.credit, "red"],
    ["Mortgage", account.mortgage, "green"],
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
    ["", "", { role: "style" }],
    ["Withdrawls", transaction.withdrawl, "red"],
    ["Deposits", transaction.deposit, "blue"],
    ["Payments", transaction.payment, "green"],
    ["Opening", transaction.opening, "blue"],
  ];

  const options2 = {
    title: "Today's Transactions",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "types of transactions",
    },
  };

  const data3 = [
    ["", ""],
    ["credit", debtor.credit],
    ["mortgage", debtor.mortgage],
  ];

  const options3 = {
    title: "Debtors by type of accounts",
    is3D: true,
    pieSliceText: "value",
  };

  const data4 = [
    ["", "", { role: "style" }],
    ["replacment", replacement, "red"],
  ];

  const options4 = {
    title: "Today's Accounts",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Replacements",
      minValue: 0,
    },
    vAxis: {
      title: "Type",
    },
  };

  return (
    <Grid container spacing={6}>
      <Grid item md={6}> 
      <div style={{boxShadow:"2px 2px 5px black"}}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="320px"
          data={data}
          options={options}
        />
        </div>
      </Grid>
      <Grid item md={6}>
        <div style={{boxShadow:"2px 2px 5px black"}}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="320px"
          data={data2}
          options={options2}
        />
        </div>
      </Grid>
      <Grid item md={6}>
        <div style={{boxShadow:"2px 2px 5px black"}}>
        <Chart
          chartType="PieChart"
          data={data3}
          options={options3}
          width="100%"
          height="320px"
        />
        </div>
      </Grid>
      <Grid item md={6}>
        <div style={{boxShadow:"2px 2px 5px black"}}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="320px"
          data={data4}
          options={options4}
        />
        </div>
      </Grid>
    </Grid>
  );
}
