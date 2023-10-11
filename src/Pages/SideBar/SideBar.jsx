import React, { useState } from 'react'
import '../SideBar/SideBar.css'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { context } from '../Board/BoardList/BoardList'
import { useContext } from 'react'
import trash from '../../../src/assets/table-trash.svg'
import { DeleteBoard } from '../Board/DeleteBoard/DeleteBoard'

const SideBar = () => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const show = useContext(context);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBoardId, setSelectedBoardId] = useState("")
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (boardId) => {
        setSelectedBoardId(boardId)
        setShowDeleteModal(true)

    };
    const { id } = useParams()
    const goGoBoard = (userId) => {
        navigate(`/board/${userId}`)
    }
    const goGoHome = (userId) => {
        navigate(`/home/${getUser.u_i_d}`)
    }
    const { handleShow, totalBoards } = show
    return (
        <div className="sidebar ">
            <div
                style={{
                    height: '55px',
                    borderBottom: '1px solid rgba(255,255,255,0.3) ',
                    display: 'flex',
                    // justifyContent: 'center',
                }}
            >
                <Navbar.Brand className="ms-2 p-0  my-auto">
                    Notes
                </Navbar.Brand>
            </div>
            <Form>
                <button type='button' onClick={handleShow} className="btn btn-outline-primary mt-2 ms-2">Create A Board</button>

                <Nav className="flex-column mt-3">
                    <ui>
                        {totalBoards?.map((boards, index) => {
                            console.log("🚀 ~ file: SideBar.jsx:43 ~ {totalBoards?.map ~ boards:", boards)

                            return (
                                <li key={index} className='d-flex justify-content-between' style={{ backgroundColor: boards.uuid === id ? "#9cc5f5" : "" }}>
                                    <span onClick={() => goGoBoard(boards.uuid)}>{boards.title.value}</span>
                                    <span className='me-2' onClick={() => handleShowDeleteModal(boards.id)}>
                                        <img src={trash} alt="trash" width="13" />
                                    </span>
                                </li>
                            )
                        })}

                    </ui>
                </Nav>
            </Form>
            <DeleteBoard showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} selectedBoardId={selectedBoardId} />
        </div>
    )
}

export default SideBar
