import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { updateNewrow, addnewRow } from '../slices/viewTable';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import {urlServer} from'../url';

import 'react-toastify/dist/ReactToastify.css';
const styleToast = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}
// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];


function Rowtable(props) {
  const e = props.e;
  const keys = Object.keys(e);
  const handelClickrow = (event, i) => {
    console.log('Click', i, e._id);
  }

  const eKey = keys.map(i => e[i]);
  if (keys.length !== 0)
    return (
      <tr>
        {eKey.map((e, i) => keys[i] !== '_id' && keys[i] !== '__v' ? <td key={i} onClick={(e) => handelClickrow(e, i)}>{e}</td> : null)}
        <td><Form.Check id={e._id} aria-label="option 1" /></td>
      </tr>
    )
  else {
    return (<></>)
  }
}
function TableCpn(props) {
  const data = props.data.map(e=> ({...e, id:e._id}));
  data.map(e => {delete e._id});
  data.map(e => {delete e.__v});
  const heading = props.heading;
  const columns: GridColDef[] = [];
  const fieldCol = props.fieldCol.map( (e,i) => columns.push({ field: e, headerName: heading[i] ,editable: true, width: 250 }))
  const rows: GridRowsProp = data;
  console.log(rows[0])
  return (
    <>
      <h2>{props.title}</h2>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            {heading ? heading.map((head, i) => <th key={i}>{head}</th>) : null}
          </tr>
        </thead>
        <tbody>
          {data ? data.map((d, i) => <Rowtable e={d} key={i} />) : <Rowtable e={[]} />
          }
        </tbody>
      </Table> */}
      {/* */}
      <div style={{  width: '100%' }}>
      <DataGrid autoHeight ={true} checkboxSelection = {true} rows={rows} columns={columns} />
    </div>

    </>
  )
}


function BasicExample() {
  const tableData = useSelector((state) => state.viewTable);
  const title = tableData.data ? tableData.data.heading : [];
  const data = tableData.data ? tableData.data.data : [];
  const nameTable = tableData.data ? tableData.data.name : "";
  const fieldCol  =  tableData.data? tableData.data.colName: "";
  if (title) {
    return (
      <><TableCpn heading={title} data={data} title={nameTable} fieldCol={fieldCol}  ></TableCpn> {/* cần thêm form */}
        
        <FormAddrow></FormAddrow>
      </>

    );
  }
  else {
    <></>
  }
}
const FormAddrow = () => {
  const tableData = useSelector((state) => state.viewTable.data);
  const idTable = tableData.idTbale;
  const heading = tableData.heading;
  const newRow = useSelector((state) => state.viewTable.newRow);
  const colName = tableData.colName;
  const lengthCol = colName.length;
  let fillLayout = [];
  if (lengthCol > 3) {
    const efill = lengthCol % 3;
    fillLayout = [...Array(efill).fill()];
  }

  const dispatch = useDispatch();
  const getDataValue = (event, i) => {
    const newState = { ...newRow, [event.target.name]: event.target.value };
    dispatch(updateNewrow(newState));
  }
  const handleSendData = () => {
    const body = {
      idTable: idTable,
      data: newRow,
      colName: colName
    }
    axios.post(urlServer+'/postNewrow', body)
      .then(function (response) {
        if (response.data.done) {
          //window.location.reload();
          toast.success('Thêm dữ liệu thành công', styleToast)
          onClose();
          dispatch(addnewRow(response.data.data));
          dispatch(updateNewrow({}));

        }
        else {
          toast.error(
            'Thêm dữ liệu không thành công'
            , styleToast);
        }
      })
      .catch(function (error) {
        toast.error('Error', styleToast)
      });

  }
  const [isOpenColModal, setIsOpenColModal] = useState(false);
  const onClose = () => {
    setIsOpenColModal(false);
  }
  const isOpen = () => {
    setIsOpenColModal(true);
  }
  return (
    <div className="mt-4">
      <Button variant="outline-primary" onClick={isOpen}>Add new row</Button>{' '}
      <Modal show={isOpenColModal} onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title> Thêm data vào bảng {tableData.name || "name table"}  ({idTable})  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row className="justify-content-md-center">
                {colName ? colName.map((e, i) =>
                  <Col xs="12" sm="4" key={i}>
                    <Form.Group controlId={i}>
                      <Form.Label>{heading[i]}</Form.Label>
                      <Form.Control
                        type="text"
                        name={colName[i]}
                        placeholder={'Nhập data'}
                        onChange={(event) => getDataValue(event, i)}
                        value={newRow[colName[i]] || ''}
                      />
                      <Form.Text className="text-muted">
                        vui lòng nhập
                      </Form.Text>
                    </Form.Group>
                  </Col>
                ) : <></>}
                {fillLayout.map((e, i) => <Col sm="4" key={i}></Col>)}
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>)
}
export default BasicExample;