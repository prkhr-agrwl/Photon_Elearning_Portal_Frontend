import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TopicComponent from "./TopicComponent.js";
import Axios from "axios";

const ChapterComponent = ({ subject_id, subject_title, course_id, course_title }) => {
  const [chapter, setChapter] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getChapters = async () => {
    // const res = await Axios.get(
    //   `https://frozen-temple-25034.herokuapp.com/admin/chapters/${subject_id}`
    // );
    // const newArray = res.data;
    // setChapter(newArray);
  };

  const addChapter = async title => {
    // const res = await Axios.post(
    //   `https://frozen-temple-25034.herokuapp.com/admin/addchapters/${subject_id}`,
    //   {
    //     subjectId: subject_id,
    //     subjectTitle: subject_title,
    //     chapterTitle: title,
    //     chapterDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getChapters();
  };

  const deleteChapter = async id => {
    // const res = await Axios.delete(
    //   `https://frozen-temple-25034.herokuapp.com/admin/chapter/${id}`
    // );
    // alert(res.data);
    // getChapters();
  };

  const renameChapter = async (title, id) => {
    // const res = await Axios.put(
    //   `https://frozen-temple-25034.herokuapp.com/admin/chapter/${id}`,
    //   {
    //     chapterTitle: title,
    //     chapterDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getChapters();
  };

  useEffect(() => {
    // getChapters();
  }, []);

  useEffect(() => {
    const withCollapse = [...chapter];
    withCollapse.map(obj => (obj.collapse = false));
    setChapter(withCollapse);
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
    setNewTitle({ valid: 1, value: e.target.value });
  };

  const onModalChange = e => {
    setRenameTitle({ ...renameTitle, valid: 1, value: e.target.value });
  };

  const handleAdd = title => {
    if (!title) {
      setNewTitle({ ...newTitle, valid: -1 });
    } else {
      addChapter(title);
      setNewTitle({ value: "", valid: 0 });
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteChapter(id);
  };

  const handleEdit = () => {
    if (renameTitle.value === "") {
      setRenameTitle({ ...renameTitle, valid: -1 });
    } else {
      renameChapter(renameTitle.value, renameTitle.id);
      setRenameTitle({ value: "", valid: 0 });
      setModal(!modal);
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
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: chapter._id });
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
                        placeholder="Enter New Chapter Name."
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
                  onClick={e => handleDelete(e, chapter._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <Collapse isOpen={chapter.collapse}>
              <CardBody>
                <TopicComponent
                  course_id={course_id}
                  course_title={course_title}
                  subject_id={subject_id}
                  subject_title={subject_title}
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
                newTitle.valid === 1
                  ? "is-valid"
                  : newTitle.valid === -1
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              value={newTitle.value}
              placeholder="Enter New Chapter Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
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
