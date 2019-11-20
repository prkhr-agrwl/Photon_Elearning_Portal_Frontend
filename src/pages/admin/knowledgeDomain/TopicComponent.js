import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PageList from "./PageList";
import Axios from "axios";

const TopicComponent = ({ subject_id, chapter_id, chapter_title }) => {
  const [topic, setTopic] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getTopics = async () => {
    const res = await Axios.get(
      `https://frozen-temple-25034.herokuapp.com/admin/topics/${chapter_id}`
    );
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
    alert(res.data.message);
    getTopics();
  };

  const deleteTopic = async id => {
    const res = await Axios.delete(
      `https://frozen-temple-25034.herokuapp.com/admin/topic/${id}`
    );
    alert(res.data);
    getTopics();
  };

  const renameTopic = async (title, id) => {
    const res = await Axios.put(
      `https://frozen-temple-25034.herokuapp.com/admin/topic/${id}`,
      {
        topicTitle: title,
        topicDescription: ""
      }
    );
    alert(res.data.message);
    getTopics();
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
    setNewTitle({ ...newTitle, value: e.target.value });
    if (newTitle.valid) {
      setNewTitle({ ...newTitle, valid: 1 });
    }
  };

  const onModalChange = e => {
    setRenameTitle({ ...renameTitle, value: e.target.value });
    if (renameTitle.valid) {
      setRenameTitle({ ...renameTitle, valid: 1 });
    }
  };

  const handleAdd = newTitle => {
    if (newTitle === "") {
      setNewTitle({ ...newTitle, valid: -1 });
    } else {
      addTopic(newTitle);
      setNewTitle({ value: "", valid: 0 });
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    deleteTopic(id);
  };

  const handleEdit = () => {
    if (renameTitle.value === "") {
      setRenameTitle({ ...renameTitle, valid: -1 });
    } else {
      renameTopic(renameTitle.value, renameTitle.id);
      setRenameTitle({ value: "", valid: 0 });
      setModal(!modal);
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
              <a>{topic.topic_title}</a>
              <div className="btn-group btn-group-justified pull-right">
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: topic._id });
                    e.stopPropagation();
                  }}
                  className="btn btn-xs btn-primary"
                >
                  Rename
                </button>

                <Modal isOpen={modal} toggle={e => setModal(!modal)}>
                  <ModalHeader toggle={e => setModal(!modal)}>
                    Rename
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <input
                        className={`form-control ${
                          renameTitle.valid === 1
                            ? "is-valid"
                            : renameTitle.valid === -1
                            ? "is-invalid"
                            : ""
                        }`}
                        type="text"
                        value={renameTitle.value}
                        placeholder="Enter New Topic Name."
                        onChange={e => onModalChange(e)}
                      />
                      <div className="invalid-tooltip">
                        This field can't be empty.
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-white"
                      onClick={e => setModal(!modal)}
                    >
                      Close
                    </button>
                    <button
                      onClick={e => handleEdit(e)}
                      className="btn btn-success"
                    >
                      Submit
                    </button>
                  </ModalFooter>
                </Modal>
                <button
                  onClick={e => handleDelete(e, topic._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
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
                newTitle.valid === 1
                  ? "is-valid"
                  : newTitle.valid === -1
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              value={newTitle.value}
              placeholder="Enter New Topic Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
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
