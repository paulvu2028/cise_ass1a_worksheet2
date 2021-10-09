import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState("");
  const [doi, setDoi] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setAuthors("");
    setSource("");
    setPubYear("");
    setDoi("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, authors, source, pubYear, doi));
    if (!title || !authors || !source || !pubYear || !doi) return;

    resetHandler();
    history.push("/mynotes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Submit a new article">
      <Card>
        <Card.Header>Fill out details to submit a new article</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="authors">
              <Form.Label>Authors</Form.Label>
              <Form.Control
                as="textarea"
                value={authors}
                placeholder="Enter the Authors"
                onChange={(e) => setAuthors(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="source">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="source"
                value={source}
                placeholder="Enter the Source"
                onChange={(e) => setSource(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="pubYear">
              <Form.Label>PubYear</Form.Label>
              <Form.Control
                type="pubYear"
                value={pubYear}
                placeholder="Enter the PubYear"
                onChange={(e) => setPubYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="doi">
              <Form.Label>Doi</Form.Label>
              <Form.Control
                type="doi"
                value={doi}
                placeholder="Enter the Doi"
                onChange={(e) => setDoi(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
