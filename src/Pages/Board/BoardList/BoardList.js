import { createContext, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { NewBoard } from "../NewBoard/NewBoard";
import { getAllBoards } from "../../../API/BoardAPI";
import { useForm } from "react-hook-form";
import SideBar from "../../SideBar/SideBar";
import { AddNote } from "../Notes/AddNote";
import { NotesList } from "../Notes/NotesList/NotesList";
export const context = createContext();

export const BoardList = () => {
  const [reloadFlag, setReloadFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const addNoteHandleClose = () => setShowAddNoteModal(false);
  const [isEditing, setIsEditing] = useState(false);

  const addNoteHandleShow = () => {
    setShowAddNoteModal(true);
  };
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const editNoteHandleClose = () => setShowEditNoteModal(false);
  const editNoteHandleShow = () => setShowEditNoteModal(true);
  const [value, setValue] = useState({ label: "", value: "" });
  const [noteToEdit, setNoteToEdit] = useState(null);
  const handleEditNote = (note) => {
    setIsEditing(true);
    setNoteToEdit(note);
    addNoteHandleShow();
  };

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [boards, setBoards] = useState({
    u_i_d: getUser.u_i_d,
    title: "",
  });
  const [totalBoards, setTotalBoards] = useState([]);
  console.log(
    "🚀 ~ file: BoardList.js:24 ~ BoardList ~ totalBoards:",
    totalBoards
  );

  const getUsers = async () => {
    setReloadFlag(true);
    try {
      const displayGameData = await getAllBoards();

      if (displayGameData.status === 200) {
        const userNotes = displayGameData.data.filter(
          (board) => board.u_i_d === getUser.u_i_d
        );
        setTotalBoards(userNotes);
        setReloadFlag(false);
        console.log(1);
      }
    } catch (err) {
      console.log("🚀 ~ file: BoardList.js:44 ~ getUsers ~ err:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  // const titles = totalBoards?.map((board) => board.title);

  return (
    <div>
      <context.Provider
        value={{
          show,
          handleClose,
          setBoards,
          boards,
          handleShow,
          value,
          setValue,
          totalBoards,
          getUsers,
          addNoteHandleClose,
          showAddNoteModal,
          showEditNoteModal,
          editNoteHandleClose,
          addNoteHandleShow,
          noteToEdit,
          isEditing,
          setIsEditing,
          setNoteToEdit,
          // editNoteHandleShow,
        }}
      >
        <SideBar />
        <NewBoard />
        <AddNote />
        <div className="d-flex justify-content-end mt-2 ">
          <button
            className="btn btn-outline-primary me-2"
            onClick={addNoteHandleShow}
            type="button"
          >
            Add Note
          </button>
        </div>
        <div style={{ margin: "0 0 0 213px" }}>
          <NotesList handleEditNote={handleEditNote} reloadFlag={reloadFlag} />
        </div>
      </context.Provider>
    </div>
  );
};
