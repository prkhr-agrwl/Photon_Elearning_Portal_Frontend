import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentType from './AssignmentType';
import TextType from './TextType';
import QuizType from './QuizType';
import ImageType from './ImageType';
import VideoType from './VideoType';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter
} from '../../components/panel/panel.jsx';

const PageComponent = () => {
  const [newTitle, setNewTitle] = useState('');
  const [secType, setSecType] = useState('');
  const [sections, setSections] = useState([
    { id: 0, type: 'txt', title: 'textSec#1', icon: 'paragraph' },
    { id: 1, type: 'img', title: 'imageSec#1', icon: 'image' },
    { id: 2, type: 'vid', title: 'videoSec#1', icon: 'video' },
    { id: 3, type: 'asgn', title: 'assgnSec#1', icon: 'edit' },
    { id: 4, type: 'quiz', title: 'quizSec#1', icon: 'question' }
  ]);
  const onTitleChange = e => {
    setNewTitle(e.target.value);
  };
  const onTypeChange = e => {
    setSecType(e.target.value);
  };
  const handleAdd = (newTitle, secType) => {
    const newArray = [...sections];
    newArray[sections.length] = {
      id: sections.length,
      icon: secType, //add a switch case to assign icons acc to types
      title: newTitle,
      type: secType
    };
    setSections(newArray);
    setNewTitle('');
    console.log(newArray);
  };
  const renderContent = type => {
    switch (type) {
      case 'txt':
        return <TextType />;
      case 'img':
        return <ImageType />;
      case 'vid':
        return <VideoType />;
      case 'asgn':
        return <AssignmentType />;
      case 'quiz':
        return <QuizType />;
      default:
        return 'Please select the section type to see content adding options.';
    }
  };
  return (
    <Fragment>
      <h1 className='page-header'>PageName</h1>
      <Panel theme='inverse' className='bg-info'>
        <PanelHeader>ADD NEW SECTION</PanelHeader>
        <PanelBody>{renderContent(secType)}</PanelBody>
        <PanelFooter>
          <div className='row'>
            <div className='col-4'>
              <form className='form-horizontal'>
                <div className='form-group row'>
                  <label className='col-lg-4 col-form-label'>
                    Section Type
                  </label>
                  <div className='col-lg-8'>
                    <select
                      required
                      onChange={e => onTypeChange(e)}
                      name='type'
                      className='form-control'
                    >
                      <option value=''>Select Type</option>
                      <option value='txt'>Text</option>
                      <option value='img'>Image</option>
                      <option value='vid'>Video</option>
                      <option value='asgn'>Assigment</option>
                      <option value='quiz'>Quiz</option>
                    </select>
                    {/* <Select options={this.selectOptions} /> */}
                  </div>
                </div>
              </form>
            </div>

            <div className='col-4'>
              <input
                className='form-control'
                required
                type='text'
                value={newTitle}
                placeholder='Enter New Section Name.'
                onChange={e => onTitleChange(e)}
              />
            </div>
            <div className='col-4'>
              <button
                onClick={e => handleAdd(newTitle, secType)}
                className='btn btn-primary btn-block m-b-5'
              >
                Add Section
              </button>
            </div>
          </div>
        </PanelFooter>
      </Panel>
      <hr />
      {sections.map((section, key) => (
        <Panel key={key} theme='inverse' className='bg-success'>
          <PanelHeader noButton={true}>
            <i className={`fa fa-${section.icon} text-teal`}></i>{' '}
            {`${section.title}`}
            {/* add switch case to show sectype */}
            <UncontrolledDropdown className='pull-right'>
              <DropdownToggle caret className='btn-xs btn-success'>
                Options
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Rename</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </PanelHeader>
          <PanelBody>{renderContent(section.type)}</PanelBody>
        </Panel>
      ))}
    </Fragment>
  );
};

export default PageComponent;
