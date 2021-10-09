import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Row,
  Form,
  FormControl,
  Nav,
  table,
} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
// import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import "./MyNotes.css";
import BootstrapTable from "react-bootstrap-table-next";

import "./sortfunc.js"



function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  //
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/mynotes");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  //this function is for deleting articles is called from the button
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  //notes can only be seen if user is logged in
  return (
    
    <MainScreen title={`Welcome to SERPER`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Submit a new article
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}

      {/**Table html testing */}
      <table class="table" id = "myTable">
        <thead>
          <tr>
            <th onClick = {() => sortTable(notes, 0)} class="th-sm">Title</th>
            <th onClick = {() => sortTable(notes, 1)} class="th-sm">Authors</th>
            <th onClick = {() => sortTable(notes, 2)} class="th-sm">Source</th>
            <th onClick = {() => sortTable(notes, 3)} class="th-sm">PubYear</th>
            <th onClick = {() => sortTable(notes, 4)} class="th-sm">Doi</th>
          </tr>
        </thead>
        {notes &&
        notes
            .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
        .map((note) => (
          <tbody >
            <tr>
              <td>{note.title}</td>
              <td>{note.authors}</td>
              <td>{note.source}</td>
              <td>{note.pubYear}</td>
              <td>{note.doi}</td>
            </tr>
          </tbody>))}
      </table>
      <script src = "sortfunc.js"></script>
    </MainScreen>
  );
  function sortTable(array, prop) {
    console.log(notes)
    array.sort(function(a,b){
      switch (prop)
      {
        case 0:
          var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
          break;
        case 1:
          var nameA=a.authors.toLowerCase(), nameB=b.authors.toLowerCase()
          break;
        case 2:
          var nameA=a.source.toLowerCase(), nameB=b.source.toLowerCase()
          break;
        case 3:
          var nameA=a.pubYear.toLowerCase(), nameB=b.pubYear.toLowerCase()
          break;
        case 4:
          var nameA=a.doi.toLowerCase(), nameB=b.doi.toLowerCase()
          break;
      }
      if (nameA < nameB) //sort string ascending
        return -1 
      if (nameA > nameB)
          return 1
      return 0
    })
    {deployTable(array)}
  }
  function deployTable(array)
  {
    for (let i = 0; i < notes.length; i++)
    {
      let temp = array[i]
      document.getElementById("myTable").rows[i+1].innerHTML =    "<td>" + temp.title + "</td>" 
                                                                + "<td>" + temp.authors + "</td>" 
                                                                + "<td>" + temp.source + "</td>" 
                                                                + "<td>" + temp.pubYear + "</td>" 
                                                                + "<td>" + temp.doi + "</td>"
    }
    console.log(notes)
  }
}


export default MyNotes;
