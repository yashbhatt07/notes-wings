import React, { createContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAllNotes } from "../../../../API/NotesAPI";
import edit from "../../../../../src/assets/edit.png";
import deleteNotes from ".././../../../assets/table-trash.svg";
import { DeleteNote } from "../DeleteNote/DeleteNote";
import { useParams } from "react-router-dom";

export const noteContext = createContext();

export const NotesList = ({ handleEditNote, reloadFlag }) => {
  const [totalNotes, SetTotalNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [totalLength, setTotalLength] = useState([]);

  const deleteNoteHandleClose = () => setShowDeleteNoteModal(false);
  const deleteNoteHandleShow = (id) => {
    setCurrentNoteId(id);
    setShowDeleteNoteModal(true);
  };
  const getUser = JSON.parse(localStorage.getItem("user"));
  const getUsers = async () => {
    try {
      const displayGameData = await getAllNotes();

      if (displayGameData.status === 200) {
        const userNotes = displayGameData.data.filter((note) => {
          return note.u_i_d === getUser.u_i_d;
        });
        SetTotalNotes(userNotes);
      }
    } catch (err) {
      console.log("🚀 ~ file: BoardList.js:44 ~ getUsers ~ err:", err);
    }
  };

  useEffect(() => {
    if (reloadFlag) {
      getUsers();
    }
  }, [reloadFlag]);

  const { id } = useParams();
  console.log("🚀 ~ file: NotesList.js:44 ~ NotesList ~ id:", id);
  const matchingNotes = totalNotes.filter((note) => note.boardUUID === id);
  console.log(
    "🚀 ~ file: NotesList.js:46 ~ NotesList ~ matchingNotes:",
    matchingNotes
  );
  const noteTomap = matchingNotes.length > 0 ? matchingNotes : totalNotes;
  const filteredNotes = noteTomap.filter((note) => {
    const matchesSearchPriority =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (priorityFilter === "All") {
      return matchesSearchPriority;
    } else {
      return matchesSearchPriority && note.priority?.value === priorityFilter;
    }
  });
  const priorityCounts = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  filteredNotes.forEach((note) => {
    if (note.priority?.value === "High") {
      priorityCounts.High++;
    } else if (note.priority?.value === "Medium") {
      priorityCounts.Medium++;
    } else if (note.priority?.value === "Low") {
      priorityCounts.Low++;
    }
  });

  return (
    <div className="d-flex ">
      <div className="w-100">
        <div className="search_bar justify-content-between w-100">
          <div className="d-flex">
            <div>Total Notes ({filteredNotes.length})</div> &nbsp;
            <span>/</span>
            <div className="priority-counts ms-2">
              <span className="high_text">High </span> :{priorityCounts.High}
              {priorityCounts.Medium} &nbsp;{" "}
              <span className="low_text">Low</span> : {priorityCounts.Low}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="filter_note">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Notes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap">
          <noteContext.Provider
            value={{
              showDeleteNoteModal,
              deleteNoteHandleClose,
              currentNoteId,
              getUsers,
            }}
          >
            <DeleteNote />
          </noteContext.Provider>
          {filteredNotes?.map((note) => (
            <Card
              key={note.id}
              style={{ width: "14rem", marginBottom: "10px" }}
              className={
                note?.priority?.value === "High"
                  ? "high"
                  : note?.priority?.value === "Medium"
                  ? "medium"
                  : note?.priority?.value === "Low"
                  ? "low"
                  : ""
              }
            >
              <Card.Body>
                <Card.Title>{note?.title}</Card.Title>
                <Card.Text style={{ overflow: "auto" }}>
                  {note?.content}
                </Card.Text>
                <Card.Text>
                  Priority: <span>{note?.priority?.value}</span>
                </Card.Text>
                {note && note?.board?.value && (
                  <Card.Text>Board: {note?.board?.value}</Card.Text>
                )}
              </Card.Body>

              <div className="icon d-flex justify-content-end me-1 mb-1">
                <div className="me-1" onClick={() => handleEditNote(note)}>
                  <img src={edit} width={12} alt="edit" />
                </div>
                <div
                  className="me-1"
                  onClick={() => deleteNoteHandleShow(note.id)}
                >
                  <img src={deleteNotes} width={12} alt="delete" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
