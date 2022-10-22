import Button from 'react-bootstrap/Button';
import React, { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import { toast } from 'react-toastify';
import {urlServer} from'../url';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';

const styleToast ={
  position :"top-right",
  autoClose :1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }
function DefineCol({
    stateAddtb,
    isOpen,
    onClose,
    onOpen,
    typeOfcol

}) {
    const typeCol = typeOfcol;
    const numOfcol = Number(stateAddtb.numOfcol);
    const [dataArray, setDataArray] = useState([])
    const initData = (numOfcol) => {
        const initArray = [...Array(numOfcol).fill().map((e, i) => ({
            colName: `col_${i + 1}`,
            colView: `Cot ${i + 1}`,
            colStyle: "String"
        }))]
        setDataArray(initArray)
    }

    const handleSubmitForm = () => {
        const body = {
            ...stateAddtb,
            schema: dataArray,
        }

    axios.post( urlServer+'/newTable', body)
    .then(function (response) {
        if(response.data.done){
            toast.success('Bảng dữ liệu mới được tạo thành công',styleToast)
            onClose();
        }
       else {
        toast.error('Tên bảng mới bị trùng trong cơ sở dữ liệu',styleToast)
       }
    })
    .catch(function (error) {
        console.log(error.message)
        toast.error(error.message,styleToast)
    });


    }

    useEffect(() => {
        initData(numOfcol)
    }, [numOfcol])

    useEffect(() => {
        initData(numOfcol)
    }, [])

    const getDataValue = (event,i) => {
        const newState = [...dataArray];
        newState[event.target.id][event.target.name] = event.target.value; 
        setDataArray(newState); 
        
    }

    if (stateAddtb.nameTable.length === 0 || stateAddtb.nameTableview.length === 0) {
        return (<></>)
    }
    else {
        return (
            <>
                <ListItemButton  onClick={onOpen} style={{backgroundColor:"#3f51b5", color: "#ffffff"}}>
                    <ListItemIcon style={{color:"#ffffff"}}>
                        <AddIcon/>
                    </ListItemIcon>{" "}
                    <ListItemText primary="Thêm Thông tin bảng" />
                </ListItemButton>
                <Modal show={isOpen} onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin bảng {stateAddtb.nameTable} ({stateAddtb.nameTableview}) </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div>
                                {dataArray.map((e, i) =>
                                    <div className='row' key={i} style={{ borderBlockColor: "#000" }}>
                                        <Form.Group className="mb-3  col-md-4" controlId={i}>
                                            <Form.Label>Tên Cột {i+1}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="colName"
                                                placeholder={e.colName}
                                                onChange={(event) =>getDataValue(event,i)}
                                                value ={dataArray[i]['colName']||''}
                                            />
                                            <Form.Text className="text-muted">
                                                Tên được lưu trực tiếp trên cơ sở dữ liệu
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3  col-md-4" controlId={i}>
                                            <Form.Label>Tên Cột View</Form.Label>
                                            <Form.Control type="text" name="colView"   placeholder={e.colView} onChange={(event) =>getDataValue(event,i)}
                                            value ={dataArray[i]['colView']||''}
                                            />
                                            <Form.Text className="text-muted">
                                                Tên được hiển thị
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-md-4" controlId={i}>
                                            <Form.Label>Type Of Col</Form.Label>
                                            <Form.Select name="colStype"  onChange={(event) =>getDataValue(event,i)}
                                            value ={dataArray[i]['colStype']?dataArray[i]['colStype']:"" }
                                            > 
                                                {(typeCol?typeCol.map((ee, ii) => <option key={ii}>{ee.view}</option>):<option key={1}>undefined</option>)}
                                            </Form.Select>
                                            <Form.Text className="text-muted">
                                                Xác định kiểu dữ liệu được lưu
                                            </Form.Text>
                                        </Form.Group>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitForm}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

function Addtable(props) {
    const typeOfcol = props.typeOfcol;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [heading, setHeading] =useState(props.addTable.heading)
    const [nameTable, setNametable] = useState(props.addTable.nameTable + Math.floor(Math.random() * 10000000));
    const [nameTableview, setNametableview] = useState(props.addTable.nameTableview);
    const [numOfcol, setNumofcol] = useState(props.addTable.numOfcol);
    
    const [isOpenColModal, setIsOpenColModal] = useState(false);

    const onOpenColModal = () => {
        setIsOpenColModal(true);
    }

    const onCloseColModal = () => {
        setIsOpenColModal(false);
    }
    const onChangeHeading = (e) =>{
        setHeading(e.target.value)
    }
    const onChangename = (e) => {
        setNametable(e.target.value);
    }
    const onChangeNameview = (e) => {
        setNametableview(e.target.value)
    }
    const onChangeNumcol = (e) => {
        if (e.target.value < 1) {
            e.target.value = 1;
        }
        if (e.target.value > 20) {
            e.target.value = 20;
        }
        setNumofcol(e.target.value)
    }
    const handleForm = () => {
        
        if (nameTable.length === 0 || nameTableview.length === 0) {
            
            return
        }
        handleClose();
        onOpenColModal();
    }

    return (
        <>
            <ListItemButton  onClick={handleShow} style={{backgroundColor:"#3f51b5", color: "#ffffff"}}>
            <ListItemIcon style={{color:"#ffffff"}}>
                        <AddIcon/>
                    </ListItemIcon>{" "}
                    <ListItemText primary="Thêm Bảng dữ liệu" />
            </ListItemButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập thông tin bảng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên Nhóm Bảng</Form.Label>
                            <Form.Control type="text" placeholder="newTable" onChange={onChangeHeading} value={heading} />
                            <Form.Text className="text-muted">
                                
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên bảng</Form.Label>
                            <Form.Control type="text" placeholder="newTable" onChange={onChangename} value={nameTable} />
                            <Form.Text className="text-muted">
                                Tên được lưu trực tiếp trên cơ sở dữ liệu UX, nếu tên nhập vào bị trùng có thể tạo ra các lỗi không mong muốn, chức năng kiểm soát lỗi này vẫn đang cập nhật
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên hiển thị</Form.Label>
                            <Form.Control type="text" placeholder="Tên bảng mới" value={nameTableview} onChange={onChangeNameview} />
                            <Form.Text className="text-muted">
                                Tên được hiển thị ra UI, Nếu không nhập thông tin ở đây có thể tạo ra các lỗi không mong muốn, khuyến cáo tên view cần có độ dài lớn hơn 10 kí tự
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Số cột</Form.Label>
                            <Form.Control type="number" value={numOfcol}  min="1" max="20" placeholder="1,2,3..." onChange={onChangeNumcol} />
                            <Form.Text className="text-muted">
                                Chúng tôi còn nhiều hạn chế vì vậy số lượng cột tối đa là là 20 và tối thiểu là 1
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mô tả ngắn về bảng </Form.Label>
                            <Form.Control as="textarea" placeholder="Ex: Lưu trữ thông tin người dùng" />
                            <Form.Text className="text-muted">
                                Mô tả chức năng giúp người dùng có thể hiểu về data, ở đây việc này là không bắt buộc.
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Tên của từng cột </Form.Label>
                            <Form.Control type="text" placeholder="[col1, col2, ...]" />
                            <Form.Text className="text-muted">
                                Tên lưu, hãy nhập trong cặp dấu [...] 
                            </Form.Text>
                        </Form.Group> */}
                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Tên view của từng cột </Form.Label>
                            <Form.Control type="text" placeholder="[cột 1, cột 2, ...]" />
                            <Form.Text className="text-muted">
                                Tên view , hãy nhập trong cặp dấu [...] 
                            </Form.Text>
                        </Form.Group> */}
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        {/* <Button variant="primary" onClick={handleForm} >
                            Tiếp tục
                        </Button> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleForm}>
                        Next
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
            <DefineCol stateAddtb={{ nameTable, nameTableview, numOfcol }} showCal={true} isOpen={isOpenColModal}
            onOpen={onOpenColModal} onClose={onCloseColModal} typeOfcol = {typeOfcol}></DefineCol>
        </>
    );
}
export default Addtable;