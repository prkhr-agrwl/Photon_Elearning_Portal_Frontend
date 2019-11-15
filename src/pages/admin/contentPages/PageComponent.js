import React, { Fragment, useState } from "react";
import AssignmentType from "./AssignmentType";
import TextType from "./TextType";
import QuizType from "./QuizType";
import ImageType from "./ImageType";
import VideoType from "./VideoType";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter
} from "../../../components/panel/panel.jsx";

const PageComponent = () => {
  const [newTitle, setNewTitle] = useState("");
  const [secType, setSecType] = useState("");
  const [valid, setValid] = useState(0);
  const [sections, setSections] = useState([
    {
      id: 0,
      type: "txt",
      title: "textSec#1",
      icon: "paragraph",
      data:
        "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis minus obcaecati cupiditate quia sint molestias, iusto accusamus magnam quasi illo et. Dolor aliquam quibusdam quam labore, est quo possimus!</p>"
    },
    { id: 1, type: "img", title: "imageSec#1", icon: "image", data: "" },
    { id: 2, type: "vid", title: "videoSec#1", icon: "video", data: "" },
    { id: 3, type: "asgn", title: "assgnSec#1", icon: "edit", data: "" },
    { id: 4, type: "quiz", title: "quizSec#1", icon: "question", data: "" }
  ]);
  const onTitleChange = e => {
    setNewTitle(e.target.value);
    if (newTitle) {
      setValid(1);
    }
  };
  const onTypeChange = e => {
    setSecType(e.target.value);
  };
  const onTextSave = (newText, id) => {
    const newArray = [...sections];
    newArray[id] = { ...newArray[id], data: newText };
    setSections(newArray);
    console.log(newArray);
  };
  const handleAdd = (newTitle, secType) => {
    if (newTitle === "") {
      setValid(-1);
    } else if (secType === "") {
      return;
    } else {
      const newArray = [
        ...sections,
        {
          id: sections.length,
          icon: assignIcon(secType), //add a switch case to assign icons acc to types
          title: newTitle,
          type: secType,
          data: ""
        }
      ];
      setSections(newArray);
      setNewTitle("");
      console.log(newArray);
    }
  };
  const renderContent = (section, type) => {
    switch (type) {
      case "txt":
        return (
          <TextType
            text={section.data || ""}
            isNew={section === "new"}
            onSave={newText => onTextSave(newText, section.id)}
          />
        );
      case "img":
        return <ImageType />;
      case "vid":
        return <VideoType />;
      case "asgn":
        return <AssignmentType />;
      case "quiz":
        return <QuizType />;
      default:
        return "Please select the section type to see content adding options.";
    }
  };
  const renderType = type => {
    switch (type) {
      case "txt":
        return "TextSection";
      case "img":
        return "ImageSection";
      case "vid":
        return "VideoSection";
      case "asgn":
        return "Assignment";
      case "quiz":
        return "Quiz";
      default:
        return "Please select the section type to see content adding options.";
    }
  };
  const assignIcon = type => {
    switch (type) {
      case "txt":
        return "paragraph";
      case "img":
        return "image";
      case "vid":
        return "video";
      case "asgn":
        return "edit";
      case "quiz":
        return "question";
      default:
        return "Please select the section type to see content adding options.";
    }
  };
  return (
    <Fragment>
      <h1 className="page-header">PageName</h1>
      <Panel theme="inverse" className="bg-info">
        <PanelHeader>ADD NEW SECTION</PanelHeader>
        <PanelBody>{renderContent("new", secType)}</PanelBody>
        <PanelFooter>
          <div className="row">
            <div className="col-4">
              <form className="form-horizontal">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">
                    Section Type
                  </label>
                  <div className="col-lg-8">
                    <select
                      onChange={e => onTypeChange(e)}
                      name="type"
                      className="form-control"
                    >
                      <option value="">Select Type</option>
                      <option value="txt">Text</option>
                      <option value="img">Image</option>
                      <option value="vid">Video</option>
                      <option value="asgn">Assigment</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-4">
              <input
                className={`form-control ${
                  valid === 1 ? "is-valid" : valid === -1 ? "is-invalid" : ""
                }`}
                required
                type="text"
                value={newTitle}
                placeholder="Enter New Section Name."
                onChange={e => onTitleChange(e)}
              />
            </div>
            <div className="col-4">
              <button
                onClick={e => handleAdd(newTitle, secType)}
                className="btn btn-primary btn-block m-b-5"
              >
                Add Section
              </button>
              <div className="invalid-tooltip">This field can't be empty.</div>
            </div>
          </div>
        </PanelFooter>
      </Panel>
      <hr />
      {sections.map((section, key) => (
        <Panel key={key} theme="inverse" className="bg-success">
          <PanelHeader noButton={true}>
            <i className={`fa fa-${section.icon} text-teal`}></i>{" "}
            {renderType(section.type)} - {`${section.title}`}
            <UncontrolledDropdown className="pull-right">
              <DropdownToggle caret className="btn-xs btn-success">
                Options
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Rename</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </PanelHeader>
          <PanelBody>{renderContent(section, section.type)}</PanelBody>
        </Panel>
      ))}
    </Fragment>
  );
};

export default PageComponent;
