import React, { useContext, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { context } from "../BoardList/BoardList";
import Items from "../../../Components/Items/Items";
import { useForm } from "react-hook-form";
import { Notes } from "../../../Schema/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNotes, updateNote } from "../../../API/NotesAPI";
import moment from "moment";

export const AddNote = () => {
  const data = useContext(context);
  const getUser = JSON.parse(localStorage.getItem("user"));

  const {
    addNoteHandleClose,
    showAddNoteModal,
    totalBoards,
    isEditing,
    noteToEdit,
    setIsEditing,
    getUsers,
    addNoteHandleShow,
    // setNoteToEdit,
    // setIsEditing
  } = data;
  console.log("🚀 ~ file: AddNote.js:26 ~ AddNote ~ isEditing:", isEditing);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Notes),
  });

  const priority = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];
  const board_value = totalBoards?.map((board) => board.title);
  const getNotesData = () => {
    if (noteToEdit && isEditing) {
      console.log(
        "🚀 ~ file: AddNote.js:45 ~ getNotesData ~ noteToEdit:",
        noteToEdit
      );
      setValue("title", noteToEdit?.title);
      setValue("content", noteToEdit?.content);
      setValue(
        "priority",
        priority.find((s) => s.value === noteToEdit.priority.value) ||
          priority[0]
      );
      setValue(
        "boards",
        board_value.find((s) => s.value === noteToEdit.boards.value) || ""
      );
    }
  };

  useEffect(() => {
    if (!isEditing) {
      console.log(
        "🚀 ~ file: AddNote.js:65 ~ useEffect ~ isEditing:",
        isEditing
      );
      // setValue("title", "");
      // setValue("content", "");
      reset();
    } else {
      getNotesData();
    }
  }, [noteToEdit, isEditing]);

  const titles = totalBoards?.map((board) => board.title);
  const close_reset = () => {
    addNoteHandleClose();
    setIsEditing(false);
  };
  const submit = async (data) => {
    try {
      const selectedBoardTitle = data.boards;
      const selectedBoard = totalBoards.find(
        (board) => board.title === selectedBoardTitle
      );
      const boardId = selectedBoard ? selectedBoard.id : null;
      const boardUUID = selectedBoard ? selectedBoard.uuid : null;

      const postData = {
        u_i_d: getUser.u_i_d,
        ...data,
        boardId: boardId,
        time: new Date(),
        boardUUID: boardUUID,
      };

      if (isEditing) {
        postData.id = noteToEdit.id;
        console.log(postData);
        await updateNote(noteToEdit.id, postData)
          .then((response) => {
            console.log("Note updated successfully:", response);
            reset();
            setIsEditing(false);
            addNoteHandleClose();
            getUsers();
          })
          .catch((err) => {
            console.error("Error updating note:", err);
          });
      } else {
        setIsEditing(false);
        await addNotes(postData)
          .then((response) => {
            console.log("Note added successfully:", response);
            reset();
            addNoteHandleClose();
            getUsers();
          })
          .catch((err) => {
            console.error("Error adding note:", err);
          });
      }
    } catch (err) {
      console.log("🚀 ~ file: AddNote.js:55 ~ submit ~ err:", err);
    }
  };

  return (
    <div>
      <Form>
        <Modal show={showAddNoteModal} onHide={close_reset}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Note" : "Add Note"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                {...register("title")}
              />
              <span className="text-danger ms-1">{errors?.title?.message}</span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none" }}
                {...register("content")}
              />
              <span className="text-danger ms-1">
                {errors?.content?.message}
              </span>
            </Form.Group>
            <Row>
              <Col>
                <div>
                  <Form.Label>Priority*</Form.Label>
                  <Items
                    style={{
                      width: "200px",
                    }}
                    control={control}
                    options={priority}
                    name="priority"
                    {...register("priority")}
                    searchable={false}
                    className="fixed-w"
                  />{" "}
                  <span className="text-danger ms-1">
                    {errors?.priority?.value?.message}
                  </span>
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label>Boards</Form.Label>
                  <Items
                    style={{
                      width: "200px",
                    }}
                    control={control}
                    options={titles}
                    name="boards"
                    {...register("boards")}
                    searchable={false}
                    className="fixed-w"
                  />{" "}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close_reset}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit(submit)}
            >
              {isEditing ? "Save Changes" : "Add Note"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};
