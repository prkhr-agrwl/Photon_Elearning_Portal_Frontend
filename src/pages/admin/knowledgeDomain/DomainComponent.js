import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ChapterComponent from "./ChapterComponent";
import Axios from "axios";

const DomainComponent = () => {
  const [domain, setDomain] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getSubjects = async () => {
    const res = await Axios.get(
      "https://frozen-temple-25034.herokuapp.com/admin/subjects"
    );
    const newArray = res.data;
    setDomain(newArray);
  };

  const addSubject = async title => {
    const res = await Axios.post(
      "https://frozen-temple-25034.herokuapp.com/admin/addSubject",
      {
        subjectTitle: title,
        subjectDescription: ""
      }
    );
    alert(res.data.message);
    getSubjects();
  };

  const deleteSubject = async id => {
    const res = await Axios.delete(
      `https://frozen-temple-25034.herokuapp.com/admin/subject/${id}`
    );
    alert(res.data);
    getSubjects();
  };

  const renameSubject = async (title, id) => {
    const res = await Axios.put(
      `https://frozen-temple-25034.herokuapp.com/admin/subject/${id}`,
      {
        subjectTitle: title,
        subjectDescription: ""
      }
    );
    alert(res.data.message);
    getSubjects();
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    const withCollapse = [...domain];
    withCollapse.map(obj => {
      obj.collapse = false;
    });
    setDomain(withCollapse);
  }, [domain.length]);

  const toggleCollapse = index => {
    const newArray = [...domain];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setDomain(newArray);
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
      addSubject(newTitle);
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
        {domain.map((domain, i) => (
          <Card className="bg-dark text-white" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!domain.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <a>{domain.subject_title}</a>
              <div className="btn-group btn-group-justified pull-right">
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: domain._id });
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
                        placeholder="Enter New Domain Name."
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
                  onClick={e => handleDelete(e, domain._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <Collapse isOpen={domain.collapse}>
              <CardBody>
                <ChapterComponent
                  subject_id={domain._id}
                  subject_title={domain.subject_title}
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
              placeholder="Enter New Domain Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-tooltip">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DomainComponent;
