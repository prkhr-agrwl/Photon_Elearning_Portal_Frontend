import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { Collapse, CardHeader, Card } from "reactstrap";

const PageList = () => {
  const [newTitle, setNewTitle] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [delId, setdelId] = useState("");
  const [valid, setValid] = useState(0);
  const [page, setPage] = useState([
    {
      id: 0,
      collapse: false,
      title: "page1"
    },
    {
      id: 1,
      collapse: false,
      title: "page2"
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...page];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setPage(newArray);
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
      const newArray = [...page];
      newArray[page.length] = {
        id: page[page.length - 1].id + 1,
        collapse: false,
        title: newTitle
      };
      setPage(newArray);
      setNewTitle("");
      setValid(0);
      // console.log(newArray);
    }
  };
  const handleDelete = delId => {
    setDeleteAlert(!deleteAlert);
    console.log(delId);
    const newArray = page.filter(obj => {
      return obj.id !== delId;
    });
    console.log(newArray);
    setPage(newArray);
    console.log(page);
    setdelId("");
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
              onClick={() => toggleCollapse(page.id)}
            >
              <i className="fa fa-book fa-2x f-s-8 mr-2 text-teal"></i>{" "}
              <Link>{page.title}</Link>
              <div className="btn-group btn-group-justified pull-right">
                <Link
                  className="btn btn-xs btn-primary"
                  to="/knowledgeDomains/chapterName/topicName/pageName/edit"
                >
                  Edit
                </Link>
                <button
                  onClick={e => {
                    setdelId(page.id);
                    setDeleteAlert(!deleteAlert);
                  }}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
                {deleteAlert && (
                  <SweetAlert
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={e => handleDelete(delId)}
                    onCancel={e => {
                      setDeleteAlert(!deleteAlert);
                    }}
                  >
                    You will not be able to undo this action.
                  </SweetAlert>
                )}
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
                valid === 1 ? "is-valid" : valid === -1 ? "is-invalid" : ""
              }`}
              type="text"
              value={newTitle}
              placeholder="Enter New Page Name."
              onChange={e => onChange(e)}
            />
            <div className="invalid-feedback">This field can't be empty.</div>
          </div>
          <div className="col-6">
            <button
              onClick={e => handleAdd(newTitle)}
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
