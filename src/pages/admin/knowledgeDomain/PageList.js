import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, CardHeader, Card } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";

const PageList = ({ subject_id, chapter_id, topic_id, topic_title }) => {
  const [page, setPage] = useState([]);
  const [newTitle, setNewTitle] = useState({ value: "", valid: 0 });
  const [renameTitle, setRenameTitle] = useState({
    value: "",
    valid: 0,
    id: ""
  });
  const [modal, setModal] = useState(false);

  const getPages = async () => {
    const res = await Axios.get(
      `https://frozen-temple-25034.herokuapp.com/admin/pages/${topic_id}`
    );
    const newArray = res.data;
    setPage(newArray);
  };

  const addPage = async title => {
    const res = await Axios.post(
      `https://frozen-temple-25034.herokuapp.com/admin/addpages/${topic_id}`,
      {
        topic_id: topic_id,
        page_title: title,
        topicTitle: topic_title,
        page_type: ""
      }
    );
    alert(res.data.message);
    getPages();
  };

  const deletePage = async id => {
    const res = await Axios.delete(
      `https://frozen-temple-25034.herokuapp.com/admin/page/${id}`
    );
    console.log(res.data);
    alert(res.data);
    getPages();
  };

  const renamePage = async (title, id) => {
    const res = await Axios.put(
      `https://frozen-temple-25034.herokuapp.com/admin/page/${id}`,
      {
        page_title: title,
        page_type: ""
      }
    );
    alert(res.data.message);
    getPages();
  };

  useEffect(() => {
    getPages();
  }, []);

  useEffect(() => {
    const withCollapse = [...page];
    withCollapse.map(obj => (obj.collapse = false));
    setPage(withCollapse);
    console.log(page);
  }, [page.length]);

  const toggleCollapse = index => {
    const newArray = [...page];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setPage(newArray);
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
      addPage(newTitle);
      setNewTitle({ value: "", valid: 0 });
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    deletePage(id);
  };

  const handleEdit = () => {
    if (renameTitle.value === "") {
      setRenameTitle({ ...renameTitle, valid: -1 });
    } else {
      renamePage(renameTitle.value, renameTitle.id);
      setRenameTitle({ value: "", valid: 0 });
      setModal(!modal);
    }
  };

  return (
    <Fragment>
      <div id="accordion" className="accordion">
        {page.map((page, i) => (
          <Card className="bg-dark text-inverse" key={i}>
            <CardHeader
              className={
                "card-header bg-dark-darker text-white pointer-cursor " +
                (!page.collapse ? "collapsed " : "")
              }
              onClick={() => toggleCollapse(i)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <Link
                to={`/knowledgeDomains/${subject_id}/${chapter_id}/${topic_id}/${page._id}/edit`}
              >
                {page.page_title}
              </Link>
              <div className="btn-group btn-group-justified pull-right">
                <Link
                  className="btn btn-xs btn-warningZ"
                  to={`/knowledgeDomains/${subject_id}/${chapter_id}/${topic_id}/${page._id}/edit`}
                >
                  Edit
                </Link>
                <button
                  onClick={e => {
                    setModal(!modal);
                    setRenameTitle({ ...renameTitle, id: page._id });
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
                        placeholder="Enter New Page Name."
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
                  onClick={e => handleDelete(e, page._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <Collapse isOpen={page.collapse}></Collapse>
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
              placeholder="Enter New Page Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle.value)}
              className="btn btn-primary btn-block m-b-5"
            >
              Add Page
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageList;
