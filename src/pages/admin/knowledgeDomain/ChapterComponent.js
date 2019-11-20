import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import TopicComponent from "./TopicComponent.js";
import { Link } from "react-router-dom";
import Axios from "axios";

const ChapterComponent = ({ subject_id, subject_title }) => {
  const [newTitle, setNewTitle] = useState("");
  const [valid, setValid] = useState(0);
  const [chapter, setChapter] = useState([]);
  const getChapters = async () => {
    const res = await Axios.get(
      `https://frozen-temple-25034.herokuapp.com/admin/chapters/${subject_id}`
    );
    console.log(res.data);
    const newArray = res.data;
    setChapter(newArray);
  };
  const addChapter = async title => {
    const res = await Axios.post(
      `https://frozen-temple-25034.herokuapp.com/admin/addchapters/${subject_id}`,
      {
        subjectId: subject_id,
        subjectTitle: subject_title,
        chapterTitle: title,
        chapterDescription: ""
      }
    );
    console.log(res.data);
    alert(res.data.message);
    getChapters();
  };
  const deleteChapter = async id => {
    const res = await Axios.delete(
      `https://frozen-temple-25034.herokuapp.com/admin/chapter/${id}`
    );
    console.log(res.data);
    alert(res.data);
    getChapters();
  };
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    deleteChapter(id);
  };
  useEffect(() => {
    getChapters();
  }, []);
  useEffect(() => {
    const withCollapse = [...chapter];
    withCollapse.map(obj => (obj.collapse = false));
    setChapter(withCollapse);
    console.log(chapter);
  }, [chapter.length]);
  const toggleCollapse = index => {
    const newArray = [...chapter];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setChapter(newArray);
  };
  const onChange = e => {
    setNewTitle(e.target.value);
    if (newTitle) {
      setValid(1);
    }
  };
  const handleAdd = newTitle => {
    if (newTitle === "") {
      setValid(-1);
    } else {
      addChapter(newTitle);
      setNewTitle("");
      setValid(0);
    }
  };
  return (
    <Fragment>
      <div id="accordion" className="accordion">
        {chapter.map((chapter, i) => (
          <Card className="bg-dark text-white" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!chapter.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <a>{chapter.chapterTitle}</a>
              <div className="btn-group btn-group-justified pull-right">
                <Link className="btn btn-xs btn-primary">Rename</Link>
                <Link
                  onClick={e => handleDelete(e, chapter._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </Link>
              </div>
            </CardHeader>
            <Collapse isOpen={chapter.collapse}>
              <CardBody>
                <TopicComponent
                  subject_id={subject_id}
                  chapter_id={chapter._id}
                  chapter_title={chapter.chapterTitle}
                />
              </CardBody>
            </Collapse>
          </Card>
        ))}
        <hr />
        <div className="row">
          <div className="col-6">
            <input
              className={`form-control ${
                valid === 1 ? "is-valid" : valid === -1 ? "is-invalid" : ""
              }`}
              type="text"
              value={newTitle}
              placeholder="Enter New Chapter Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add Chapter
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChapterComponent;
