import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList({
  toDoList,
  setToDoList,
  handleClickSnackbar,
  lastDeletedItem,
  setLastDeletedItem,
}) {
  const classes = useStyles();

  function toggleChecked(i) {
    setToDoList((prevList) => {
      let tempList = [...prevList];
      tempList[i].checked = !tempList[i].checked;
      return tempList;
    });
  }

  function DeleteToDo(i) {
    setToDoList((prevList) => {
      let tempList = [...prevList];
      const deletedItem = tempList.splice(i, 1)[0];
      setLastDeletedItem({ item: deletedItem, index: i });
      return tempList;
    });
    handleClickSnackbar();
  }

  return (
    <List className={classes.root} style={{ maxWidth: "100%" }}>
      {toDoList.length > 0 ? (
        toDoList.map((toDoItem, index) => {
          return (
            <ListItem key={index} className="bg-info rounded m-3">
              <ListItemAvatar className="mx-2">
                <Button
                  onClick={() => {
                    toggleChecked(index);
                  }}
                >
                  {toDoItem.checked ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </Button>
              </ListItemAvatar>
              <ListItemText
                style={{
                  textDecoration: toDoItem.checked ? "line-through" : "",
                }}
                primary={toDoItem.todo}
              />
              <ListItemAvatar className="mx-2">
                <Button>
                  <DeleteIcon
                    onClick={() => {
                      DeleteToDo(index);
                    }}
                  />
                </Button>
              </ListItemAvatar>
            </ListItem>
          );
        })
      ) : (
        <ListItem className="bg-info rounded m-3">
          <ListItemText
            primary='Add your to do tasks!'
          />
        </ListItem>
      )}
    </List>
  );
}
