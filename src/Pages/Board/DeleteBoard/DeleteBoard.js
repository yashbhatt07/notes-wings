import React, {useContext} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { context } from "../BoardList/BoardList";
import { deleteBoard } from "../../../API/BoardAPI";

export const DeleteBoard = ({
  showDeleteModal,
  handleCloseDeleteModal,
  selectedBoardId,
  setShowDeleteModal,
}) => {

  const data = useContext(context);
  const {getUsers } =
    data;
  console.log(
    "🚀 ~ file: DeleteBoard.jsx:6 ~ DeleteBoard ~ selectedBoardId:",
    selectedBoardId
  );

  const handleDeleteBoard = async () => {
    try {
      const response = await deleteBoard(selectedBoardId);
      if(response.data){
        getUsers();
        handleCloseDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      {" "}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>DeleteBoard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Do you want to delete the board?</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleDeleteBoard}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
