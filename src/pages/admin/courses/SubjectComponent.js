import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChapterComponent from "./ChapterComponent.js";
import Axios from "axios";

const SubjectComponent = ({ course_id, course_title }) => {
  const [subject, setSubject] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getSubjects = async () => {
    // const res = await Axios.get(
    //   `https://frozen-temple-25034.herokuapp.com/admin/subjects/${course_id}`
    // );
    // const newArray = res.data;
    // setSubject(newArray);
  };

  const addSubject = async title => {
    // const res = await Axios.post(
    //   `https://frozen-temple-25034.herokuapp.com/admin/addSubjects/${course_id}`,
    //   {
    //     subjectId: course_id,
    //     subjectTitle: course_title,
    //     subjectTitle: title,
    //     subjectDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getSubjects();
  };

  const deleteSubject = async id => {
    // const res = await Axios.delete(
    //   `https://frozen-temple-25034.herokuapp.com/admin/subject/${id}`
    // );
    // alert(res.data);
    // getSubjects();
  };

  const renameSubject = async (title, id) => {
    // const res = await Axios.put(
    //   `https://frozen-temple-25034.herokuapp.com/admin/subject/${id}`,
    //   {
    //     subjectTitle: title,
    //     subjectDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getSubjects();
  };

  useEffect(() => {
    // getSubjects();
  }, []);

  useEffect(() => {
    const withCollapse = [...subject];
    withCollapse.map(obj => (obj.collapse = false));
    setSubject(withCollapse);
  }, [subject.length]);

  const toggleCollapse = index => {
    const newArray = [...subject];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setSubject(newArray);
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
      addSubject(title);
      setNewTitle({ value: "", valid: 0 });
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteSubject(id);
  };

  const handleEdit = () => {
    if (renameTitle.value === "") {
      setRenameTitle({ ...renameTitle, valid: -1 });
    } else {
      renameSubject(renameTitle.value, renameTitle.id);
      setRenameTitle({ value: "", valid: 0 });
      setModal(!modal);
    }
  };

  return (
    <Fragment>
      <div id="accordion" className="accordion">
        {subject.map((subject, i) => (
          <Card className="bg-dark text-white" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!subject.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <a>{subject.subjectTitle}</a>
              <div className="btn-group btn-group-justified pull-right">
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: subject._id });
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
                        placeholder="Enter New subject Name."
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
                  onClick={e => handleDelete(e, subject._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <Collapse isOpen={subject.collapse}>
              <CardBody>
                <ChapterComponent
                  course_id={course_id}
                  course_title={course_title}
                  subject_id={subject._id}
                  subject_title={subject.subjectTitle}
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
              placeholder="Enter New subject Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add subject
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubjectComponent;
