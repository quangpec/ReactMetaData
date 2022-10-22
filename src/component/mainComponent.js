import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BasicExample from './exemple';
import GroupList from './groupMenu';
import Loading from './loading'
import axios from 'axios';
import {urlServer} from'../url'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTable } from '../slices/listTable';
import MenuTable from './menuTable';
import HeaderApp from './headerapp';
import Divider from '@mui/material/Divider';
function MainCpn() {
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                urlServer,
            );
             if(result.data.post){
            dispatch(updateTable(result.data.post))
             }
             else{console.log(result)}
        };
        fetchData();
    }, []);

    const dataIndex = useSelector((state) => state.listTable);
    const dispatch = useDispatch();
    const listTableValue = dataIndex ? dataIndex.data.table : [];
    const listTypeCol = dataIndex ? dataIndex.data.typeCol : [];
    const menuData = [
        {
            heading: listTableValue ? listTableValue[0].heading : '',//listTableValue? listTableValue[0].heading : "",
            list: listTableValue ? listTableValue.map(e => e.name_CollectionView) : [],// listTableValue
            name_Collection: listTableValue ? listTableValue.map(e => e.name_Collection) : [],
        }
    ]
    const nameTabe = listTableValue ? listTableValue[0].name_CollectionView : 'undefined';
    const [nameTb, setNametb] = useState(nameTabe);


    const changeTable = (keyTable) => {
        setNametb(keyTable)
    }
    return (
        <>
         <HeaderApp/>
         <hr/>
        <Container className="m-1">
            <MenuTable group ={["nhóm 1", "nhóm 2","nhóm 3"]}></MenuTable>
            <Row>
                <Col xs={12} md={4} lg={2} >
                    <GroupList changeTable={changeTable} menuData={menuData} listTypeCol ={listTypeCol}></GroupList>
                </Col>
                <Col xs={12} md={8} lg={10} className={"justify-content-md-center"}>
                    <BasicExample></BasicExample>
                </Col>
            </Row>
            </Container>
            <Loading type ={"spin"}></Loading>
        
        </>



    )
}


export default MainCpn;