import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import PageList from "./PageList";
import Axios from "axios";

const TopicComponent = ({ subject_id, chapter_id, chapter_title }) => {
  const [newTitle, setNewTitle] = useState("");
  const [valid, setValid] = useState(0);
  const [topic, setTopic] = useState([]);
  const getTopics = async () => {
    const res = await Axios.get(
      `https://frozen-temple-25034.herokuapp.com/admin/topics/${chapter_id}`
    );
    console.log(res.data);
    const newArray = res.data;
    setTopic(newArray);
  };
  const addTopic = async title => {
    const res = await Axios.post(
      `https://frozen-temple-25034.herokuapp.com/admin/addtopics/${chapter_id}`,
      {
        chapter_id: chapter_id,
        topicTitle: title,
        chapterTitle: chapter_title,
        topicDescription: ""
      }
    );
    console.log(res.data);
    alert(res.data.message);
    getTopics();
  };
  const deleteTopic = async id => {
    const res = await Axios.delete(
      `https://frozen-temple-25034.herokuapp.com/admin/topic/${id}`
    );
    console.log(res.data);
    alert(res.data);
    getTopics();
  };
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    deleteTopic(id);
  };
  useEffect(() => {
    getTopics();
  }, []);
  useEffect(() => {
    const withCollapse = [...topic];
    withCollapse.map(obj => (obj.collapse = false));
    setTopic(withCollapse);
    console.log(topic);
  }, [topic.length]);
  const toggleCollapse = index => {
    const newArray = [...topic];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setTopic(newArray);
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
      addTopic(newTitle);
      setNewTitle("");
      setValid(0);
    }
  };
  return (
    <Fragment>
      <div id="accordion" className="accordion">
        {topic.map((topic, i) => (
          <Card className="bg-dark text-white" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!topic.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <Link>{topic.topic_title}</Link>
              <div className="btn-group btn-group-justified pull-right">
                <Link className="btn btn-xs btn-primary">Rename</Link>
                <Link
                  onClick={e => handleDelete(e, topic._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </Link>
              </div>
            </CardHeader>
            <Collapse isOpen={topic.collapse}>
              <CardBody>
                <PageList
                  subject_id={subject_id}
                  chapter_id={chapter_id}
                  topic_id={topic._id}
                  topic_title={topic.topic_title}
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
              required
              type="text"
              value={newTitle}
              placeholder="Enter New Topic Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add Topic
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopicComponent;
