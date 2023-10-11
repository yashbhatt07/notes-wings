import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { noteContext } from "../NotesList/NotesList";
import { deleteNote } from "../../../../API/NotesAPI";
import {
  showErrorToast,
  successMessage,
} from "../../../../Components/ToastMessages/ToastMessages";

export const DeleteNote = () => {
  const data = useContext(noteContext);
  const {
    showDeleteNoteModal,
    deleteNoteHandleClose,
    currentNoteId,
    getUsers,
  } = data;

  const handleDeleteBoard = async () => {
    try {
      const response = await deleteNote(currentNoteId);

      if (response.status === 200) {
        successMessage("Note Deleted");

        deleteNoteHandleClose();
        getUsers();
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      showErrorToast("Somethings is wrong");
    }
  };

  return (
    <div>
      <Modal show={showDeleteNoteModal} onHide={deleteNoteHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DeleteBoard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Do you want to delete the board?</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteNoteHandleClose}>
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
