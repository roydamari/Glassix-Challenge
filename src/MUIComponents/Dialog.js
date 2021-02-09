import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({open, handleClose, setToDoList}) {

    const [textValue, setTextValue] = useState('');

    function addToDo(){
        setToDoList(prevList => [...prevList, {todo: textValue, checked: false}])
        setTextValue('');
        handleClose();
    }

    function closeDialog(){
        setTextValue('');
        handleClose()
    }
    
  

  return (
    <div>
      <Dialog fullWidth open={open} onClose={closeDialog} aria-labelledby="form-dialog-title" style={{width: '100%'}}>
        <DialogTitle id="form-dialog-title">Add To Do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="To Do"
            type="email"
            fullWidth
            value={textValue}
            onChange={(e)=>{setTextValue(e.currentTarget.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={addToDo} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
