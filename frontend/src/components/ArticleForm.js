import React, { Component } from "react";
import axios from "axios";

function ArticleForm() {
  const handleUpload = (e) => {
    e.preventDefault();

    const url = "/articles";
    axios
      .post(url, {
        author: document.getElementById("author-text-area").value,
        title: document.getElementById("title-text-area").value,
        publisher: document.getElementById("publisher-text-area").value,
        year: document.getElementById("year-text-area").value,
        month: document.getElementById("month-text-area").value,
        journal: document.getElementById("journal-text-area").value,
      })
      .then((response) => {
        //handle response latter
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("author-text-area").value = "";
    document.getElementById("title-text-area").value = "";
    document.getElementById("publisher-text-area").value = "";
    document.getElementById("year-text-area").value = "";
    document.getElementById("month-text-area").value = "";
    document.getElementById("journal-text-area").value = "";
  };
  return (
    <React.Fragment>
      <form>
        <div className="form-group">
          <label>Author</label>
          <textarea
            className="form-control"
            id="author-text-area"
            rows="3"
            defaultValue={this.props.author}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Title</label>
          <textarea
            className="form-control"
            id="title-text-area"
            rows="1"
            defaultValue={this.props.title}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Publisher</label>
          <textarea
            className="form-control"
            id="publisher-text-area"
            rows="1"
            defaultValue={this.props.publisher}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Year</label>
          <textarea
            className="form-control"
            id="year-text-area"
            rows="1"
            defaultValue={this.props.year}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Month</label>
          <textarea
            className="form-control"
            id="month-text-area"
            rows="1"
            defaultValue={this.props.month}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Journal</label>
          <textarea
            className="form-control"
            id="journal-text-area"
            rows="1"
            defaultValue={this.props.journal}
          ></textarea>
        </div>
        <button onClick={(e) => this.handleUpload(e)}>submit</button>
      </form>
    </React.Fragment>
  );
}

export default ArticleForm;
