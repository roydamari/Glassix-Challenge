import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar({open, handleClose, lastDeletedItem, setToDoList}) {
  
    function undoDelete() {
        setToDoList(prevList=>{
            let tempList = [...prevList];
            tempList.splice(lastDeletedItem.index, 0, lastDeletedItem.item);
            return tempList;
        })
        handleClose();
    }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Deleted To Do Item"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={undoDelete} >
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}