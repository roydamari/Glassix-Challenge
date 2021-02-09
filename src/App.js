import React, { useEffect, useState } from "react";
import store from "store";
import { v4 as uuidV4 } from "uuid";
import FolderList from "./MUIComponents/List";
import FormDialog from "./MUIComponents/Dialog";
import { Container, Grid, Button } from "@material-ui/core";
import { Add as AddIcon } from '@material-ui/icons';
import SimpleSnackbar from './MUIComponents/Snackbar'
import axios from 'axios';

let userId = '';

function App() {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [lastDeletedItem, setLastDeletedItem] = useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);


  const handleClickSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleClickDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    //Checks for a userId, and sets one if there isn't any
    userId = store.get("userId");
    if (!userId) {
      userId = uuidV4();
      store.set("userId", userId);
    }

    //Get list form DB
    (async function getList(){
      let list = await axios.get(`https://kvdb.io/RqyRuHjZX8Z87JhBMhZZu6/${userId}`)
      setToDoList(list.data)
    })();
  }, []);


  useEffect(() => {
    //Update list on change
    (async function updateList(){
      if(toDoList.length > 0) {
        await axios.post(`https://kvdb.io/RqyRuHjZX8Z87JhBMhZZu6/${userId}`, toDoList)
      }
    })();
  }, [toDoList])


  return (
    <Container maxWidth='sm' className='my-3'>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className='mx-4'
      >
        <h1>To Do List</h1>
        <Button onClick={handleClickDialog} className='mt-auto mb-auto'><AddIcon /></Button>
      </Grid>
      <FolderList 
      toDoList={toDoList} 
      setToDoList={setToDoList} 
      handleClickSnackbar={handleClickSnackbar} 
      setLastDeletedItem={setLastDeletedItem} 
      lastDeletedItem={lastDeletedItem}/>
      <FormDialog 
      open={dialogOpen} 
      handleClose={handleCloseDialog} 
      setToDoList={setToDoList}
      />
      <SimpleSnackbar 
      open={snackbarOpen} 
      handleClose={handleCloseSnackbar} 
      setToDoList={setToDoList}
      lastDeletedItem={lastDeletedItem}
      />
    </Container>
  );
}

export default App;
