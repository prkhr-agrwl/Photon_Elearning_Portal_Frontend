import React, { Fragment, useState, useEffect } from "react";
import { Collapse, CardHeader, CardBody, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SubjectComponent from "./SubjectComponent";
import Axios from "axios";

const CourseComponent = () => {
  const [course, setCourse] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getCourses = async () => {
    // const res = await Axios.get(
    //   "https://frozen-temple-25034.herokuapp.com/admin/courses"
    // );
    // const newArray = res.data;
    // setCourse(newArray);
  };

  const addCourse = async title => {
    // const res = await Axios.post(
    //   "https://frozen-temple-25034.herokuapp.com/admin/addCourse",
    //   {
    //     courseTitle: title,
    //     courseDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getCourses();
  };

  const deleteCourse = async id => {
    // const res = await Axios.delete(
    //   `https://frozen-temple-25034.herokuapp.com/admin/course/${id}`
    // );
    // alert(res.data);
    // getCourses();
  };

  const renameCourse = async (title, id) => {
    // const res = await Axios.put(
    //   `https://frozen-temple-25034.herokuapp.com/admin/course/${id}`,
    //   {
    //     courseTitle: title,
    //     courseDescription: ""
    //   }
    // );
    // alert(res.data.message);
    // getCourses();
  };

  useEffect(() => {
    // getCourses();
  }, []);

  useEffect(() => {
    const withCollapse = [...course];
    withCollapse.map(obj => {
      obj.collapse = false;
    });
    setCourse(withCollapse);
  }, [course.length]);

  const toggleCollapse = index => {
    const newArray = [...course];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setCourse(newArray);
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
      addCourse(title);
      setNewTitle({ value: "", valid: 0 });
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteCourse(id);
  };

  const handleEdit = () => {
    if (renameTitle.value === "") {
      setRenameTitle({ ...renameTitle, valid: -1 });
    } else {
      renameCourse(renameTitle.value, renameTitle.id);
      setRenameTitle({ value: "", valid: 0 });
      setModal(!modal);
    }
  };

  return (
    <Fragment>
      <div id="accordion" className="accordion">
        {course.map((course, i) => (
          <Card className="bg-dark text-white" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!course.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <a>{course.course_title}</a>
              <div className="btn-group btn-group-justified pull-right">
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: course._id });
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
                        placeholder="Enter New course Name."
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
                  onClick={e => handleDelete(e, course._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <Collapse isOpen={course.collapse}>
              <CardBody>
                <SubjectComponent
                  course_id={course._id}
                  course_title={course.course_title}
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
              placeholder="Enter New course Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-tooltip">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add course
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseComponent;
