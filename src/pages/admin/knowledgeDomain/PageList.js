import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, CardHeader, Card } from "reactstrap";
import Axios from "axios";

const PageList = ({ subject_id, chapter_id, topic_id, topic_title }) => {
  const [newTitle, setNewTitle] = useState("");
  const [valid, setValid] = useState(0);
  const [page, setPage] = useState([]);
  const getPages = async () => {
    const res = await Axios.get(
      `https://frozen-temple-25034.herokuapp.com/admin/pages/${topic_id}`
    );
    console.log(res.data);
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
    console.log(res.data);
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
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    deletePage(id);
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
    setNewTitle(e.target.value);
    if (newTitle) {
      setValid(1);
    }
  };
  const handleAdd = newTitle => {
    if (newTitle === "") {
      setValid(-1);
    } else {
      addPage(newTitle);
      setNewTitle("");
      setValid(0);
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
                  className="btn btn-xs btn-primary"
                  to={`/knowledgeDomains/${subject_id}/${chapter_id}/${topic_id}/${page._id}/edit`}
                >
                  Edit
                </Link>
                <Link
                  onClick={e => handleDelete(e, page._id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </Link>
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
