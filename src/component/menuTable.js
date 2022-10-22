import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DatasetIcon from '@mui/icons-material/Dataset';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Divider from '@mui/material/Divider';
import Addtable from './addTabe';
function ItemList(props) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <List disablePadding>
        <ListItemButton onClick={handleClick} style={{backgroundColor:"#3f51b5", color: "#ffffff" }}>
          <ListItemIcon style={{color:"#ffffff"}}>
            <FolderOpenIcon/>
          </ListItemIcon>{" "}
          <ListItemText primary={props.name}  />{" "}
          {open ? <ExpandLess /> : <ExpandMore />}{" "}
        </ListItemButton>{" "}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DatasetIcon />
              </ListItemIcon>{" "}
              <ListItemText primary="Starred" />
            </ListItemButton>{" "}
          </List>{" "}
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>{" "}
              <ListItemText primary="Starred" />
            </ListItemButton>{" "}
          </List>{" "}
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>{" "}
              <ListItemText primary="Starred" />
            </ListItemButton>{" "}
          </List>{" "}
        </Collapse>
        <Divider></Divider>
      </List>
      
    );
  }
  

  export default function MenuTable(props) {
    const listTypeCol = props.listTypeCol;
    const prAddtb = {
        heading: 'Nhóm bảng 1',
        nameTable: 'tb_1',
        nameTableview: 'new tb',
        numOfcol: 5
    }
    const groupTable = props.group;
    const listTabe = props.listTabe; // Array [] => 
    return ( 
      <List sx = {
            { width: '100%', maxWidth: 300, bgcolor: 'background.paper' }
        }
        component = "nav"
        aria-labelledby = "nested-list-subheader"
        subheader = { 
          <ListSubheader component = "div"
            id = "nested-list-subheader" >
            Danh Mục Bảng Ghi 
            </ListSubheader>
        }> 
        {groupTable.map((e, i) => <ItemList name = { e }
                key = { i }
                listTabe = {
                    []
                }></ItemList>)} 
        <Addtable addTable={prAddtb} typeOfcol={listTypeCol}  ></Addtable>
                </List >
                );
            }