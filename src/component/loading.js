import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { Modal } from 'react-bootstrap';

const Loading = ({ type, color }) => {
    const stateList = useSelector((state) => state.listTable);

    if (stateList.data === '') {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body>
                    <div style={{ margin: "auto", textAlign: "center" }}>
                        <ReactLoading type={type} color="#000" style={{ margin: "auto", textAlign: "center", height: "5%", width: "5%" }} />
                    </div>
                </Modal.Body>

            </Modal>

        )
    }
    else {
        return (
            <></>
        )

    }

}
export default Loading