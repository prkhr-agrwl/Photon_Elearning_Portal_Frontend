import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import PageList from "./PageList";

const TopicComponent = () => {
  const [newTitle, setNewTitle] = useState("");
  const [valid, setValid] = useState(0);
  const [topic, setTopic] = useState([
    {
      id: 0,
      collapse: false,
      title: "topic1"
    },
    {
      id: 1,
      collapse: false,
      title: "topic2"
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...topic];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setTopic(newArray);
    // console.log(newArray);
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
      const newArray = [...topic];
      newArray[topic.length] = {
        id: topic.length,
        collapse: false,
        title: newTitle
      };
      setTopic(newArray);
      setNewTitle("");
      setValid(0);
    }
    // console.log(newArray);
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
              onClick={() => toggleCollapse(topic.id)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <Link>{topic.title}</Link>
              <div className="btn-group btn-group-justified pull-right">
                <Link className="btn btn-xs btn-primary">Edit</Link>
                <Link className="btn btn-xs btn-danger">Delete</Link>
              </div>
            </CardHeader>
            <Collapse isOpen={topic.collapse}>
              <CardBody>
                <PageList />
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
