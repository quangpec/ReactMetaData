import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { showTable } from '../slices/viewTable';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {updateNewrow} from '../slices/viewTable';
import {urlServer} from'../url'
function Childmenu(props) {
  const name = props.name;
  const heading = props.heading;
  const list = props.list;
  const [show, setShow] = useState(false);
  const handledShow = () => {
    setShow(!show)
  }
  const handledTable = (e, i) => {
    dispatch(updateNewrow({}));
    const keyTable = name[i];
    //props.changeTable(e.target.innerHTML)
    const fetchData = async () => {
      const result = await axios(
        urlServer+'/viewtable/' + keyTable,
      );
      dispatch(showTable(result.data.post))
    };
    fetchData();
  }
  const dispatch = useDispatch();

  if (list && heading && name) {
    return (
      <>
        <ListGroup.Item as="li" active onClick={handledShow} style={{ textAlign: "left", borderBlockColor: "#fff" }}>
          {heading}
        </ListGroup.Item>
        {list.map((l, i) =>
          show ? <ListGroup.Item as="li" name={name[i]} key={i} onClick={(e) => handledTable(e, i)}>{l}   
        </ListGroup.Item> : null
        )}

      </>
    )
  }
  else {
    return (<></>)
  }
}

function GroupList(props) {
  const menuList = props.menuData;
  if (menuList) {
    return (
      <ListGroup as="ul">
        {menuList.map((e, i) => <Childmenu heading={e.heading} list={e.list} name={e.name_Collection} changeTable={props.changeTable} key={i}></Childmenu>,)}
      </ListGroup>
    );
  } else {
    return (<></>)
  }

}
export default GroupList;