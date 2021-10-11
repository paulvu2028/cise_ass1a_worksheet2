import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import * as FormData from "form-data";
import ArticleForm from "../../components/ArticleForm";

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

  //----------------------------------------------------------------------------------------------------------------------------
  const state = {
    fileName: null,
    author: "",
    title: "",
    publisher: "",
    year: "",
    month: "",
    journal: "",
  };

  function isIncluded(result, text) {
    return result.includes(text);
  }

  const handleFile = (e) => {
    //read file and save into state
    let file = e.target.files[0];

    let formData = new FormData();
    formData.append("uploaded-file", file);
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    //read file data and extract data
    reader.onload = (e) => {
      //split the file line by line
      const lines = reader.result.split(/\r\n|\n/);
      var authorResult = "";
      var titleResult = "";
      var publisherResult = "";
      var yearResult = "";
      var monthResult = "";
      var journalResult = "";

      //check each line containes that key word
      for (var count = 0; count < lines.length; count++) {
        if (isIncluded(lines[count], "author")) {
          authorResult += lines[count];
        }
        if (isIncluded(lines[count], "title")) {
          titleResult += lines[count];
        }
        if (isIncluded(lines[count], "publisher")) {
          publisherResult += lines[count];
        }
        if (isIncluded(lines[count], "year")) {
          yearResult += lines[count];
        }
        if (isIncluded(lines[count], "month")) {
          monthResult += lines[count];
        }
        if (isIncluded(lines[count], "journal")) {
          journalResult += lines[count];
        }
      }

      //update state
      authorResult = authorResult.replaceAll("author = ", " ");
      authorResult = authorResult.replaceAll("{", " ");
      authorResult = authorResult.replaceAll("}", " ");

      titleResult = titleResult.replaceAll("title = ", " ");
      titleResult = titleResult.replaceAll("{", " ");
      titleResult = titleResult.replaceAll("}", " ");

      publisherResult = publisherResult.replaceAll("publisher = ", " ");
      publisherResult = publisherResult.replaceAll("{", " ");
      publisherResult = publisherResult.replaceAll("}", " ");

      yearResult = yearResult.replaceAll("year = ", " ");
      yearResult = yearResult.replaceAll("{", " ");
      yearResult = yearResult.replaceAll("}", " ");

      monthResult = monthResult.replaceAll("month = ", " ");

      journalResult = journalResult.replaceAll("journal = ", " ");
      journalResult = journalResult.replaceAll("{", " ");
      journalResult = journalResult.replaceAll("}", " ");

      this.setState({ author: authorResult });
      this.setState({ title: titleResult });
      this.setState({ publisher: publisherResult });
      this.setState({ year: yearResult });
      this.setState({ month: monthResult });
      this.setState({ journal: journalResult });
    };
  };
  //----------------------------------------------------------------------------------------------------------------------------

  return (
    <MainScreen title="Submit a new article">
      <Card>
        <Card.Header>Fill out details to submit a new article</Card.Header>
        <Card.Body>
          {/********************************************************* */}
          <form className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={(e) => this.handleFile(e)}
            />
            <label className="custom-file-label">choose a file</label>
          </form>
          <p>{state.fileName}</p>
          <br></br>
          <p>{state.fileResult}</p>
          {/*}
          <ArticleForm
            author={setAuthors(this.state.author)}
            title={setTitle(this.state.title)}
  ></ArticleForm>*/}
          {/********************************************************* */}
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
