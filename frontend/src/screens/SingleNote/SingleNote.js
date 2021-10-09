import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleNote({ match, history }) {
  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState();
  const [source, setSource] = useState();
  const [pubYear, setPubYear] = useState();
  const [doi, setDoi] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setTitle(data.title);
      setAuthors(data.authors);
      setSource(data.source);
      setPubYear(data.pubYear);
      setDoi(data.doi);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setAuthors("");
    setSource("");
    setPubYear("");
    setDoi("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateNoteAction(match.params.id, title, authors, source, pubYear, doi)
    );
    if (!title || !authors || !source || !pubYear || !doi) return;

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="authors">
              <Form.Label>authors</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the authors"
                rows={4}
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="source">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="source"
                placeholder="Enter the Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="pubYear">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="pubYear"
                placeholder="Enter the PubYear"
                value={pubYear}
                onChange={(e) => setPubYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="doi">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="doi"
                placeholder="Enter the Doi"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
