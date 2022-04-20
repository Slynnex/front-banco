import React, { useState, useEffect } from "react";
// import "./styles.css";
import { Grid, TextField, Button, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import axios from "axios";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const Concepts = (props) => {
    const classes = useStyles();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7ImlkIjoxLCJuYW1lIjoiTWFudWVsIEFsZWphbmRvIEJhcmJhIEdvbnphbGV6Iiwicm9sIjoibWFuYWdlciJ9LCJpYXQiOjE2NTAzODU4NzksImV4cCI6MTY1MDQxNDY3OX0.lDzECtGlsUSfx6gBLM9xMLQOMCbBmjH3SbV5SAY3zPM';
    const [concepts, setConcepts] = useState([]);
    const [concept, setConcept] = useState({
        name: "",
        id: "",
    });


    useEffect(() => {
        //fetch with authorization token
        axios.get("http://localhost:9000/api/v1/concepts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if(res.data.data != null){
                    setConcepts(res.data);
                    console.log("Fetch succesful!");
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching with auth token.")
                console.log(err);
            });
    }, []);
    
    const handleChange = (e) => {
        setConcept({
            ...concept,
            [e.target.name]: e.target.value,
        });
        console.log(concept);
        console.log(concepts);
    };


    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        
        if (concept.id) {
            axios.put(`http://localhost:9000/api/v1/concepts/${concept.id}`, concept, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios.post(`http://localhost:9000/api/v1/concepts`, {"name":concept.name}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log(res);
                    setConcept({
                        name: "",
                        id: "",
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

    const handleEdit = (a) => {
        
        console.log(concept.name);
        
        axios.put(`http://localhost:9000/api/v1/concepts/${a.id}`,{"name":concept.name},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //use axios to delete an area and a token to authorize
    const handleDelete = (id) => {
       
        axios.delete(`http://localhost:9000/api/v1/concepts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "2em" }}
        >
            <Grid item >
                <Typography variant="h4" align="center">
                    Concepts
                </Typography>
                <Divider spacing={5} />
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                fullWidth
                                name="name"
                                value={concept.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "2em" }}
                            >
                            Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
               {concepts.length === 0 ?   ( <Typography variant="h5" align="center">No Concepts Available</Typography>  
                 ) : 
                 <TableContainer component={Paper}>
                     <Table className={classes.table} aria-label="simple table">

                         <TableHead>
                             <TableRow>
                                 <TableCell>Name</TableCell>
                                 <TableCell align="right">Actions</TableCell>
                             </TableRow>
                         </TableHead>

                         <TableBody>
                         {Object.values(concepts.data).map((concept) => (
                                 <TableRow key={concept.id}>
                                     <TableCell component="th" scope="row">
                                         {concept.name}
                                     </TableCell>
                                   
                                     <TableCell align="right">
                                         <Button
                                             id={concept.id}
                                             variant="contained"
                                             color='primary'
                                                onClick={()=>handleEdit(concept)}
                                         >Update  
                                         </Button>

                                         <Button
                                             id={concept.id}
                                             variant="contained"
                                             color='default'
                                                onClick={()=>handleDelete(concept.id)} 
                                         >Delete
                                         </Button>

                                     </TableCell>
                                 </TableRow>
                             ))}
                         </TableBody>
                     </Table>
                 </TableContainer>}
            
            </Grid>
        </Grid>
    );
};


export default Concepts;