import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup,
  Alert
} from 'reactstrap';

import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter
} from '../../components/panel/panel.jsx';

const PageComponent = () => {
  return (
    <Fragment>
      <h1 className='page-header'>PageName</h1>
      <Panel theme='inverse' className='bg-success'>
        <PanelHeader>SECTIONS</PanelHeader>
        <PanelBody>
          <Panel>
            <PanelHeader noButton={true}>
              <i className='fa fa-book bg-inverse'></i> TextSection #1
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
            <PanelBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                autem, distinctio quo quam rerum voluptatem maxime modi nisi
                temporibus quis fugiat. Libero quibusdam obcaecati quod commodi
                ipsum consectetur eos similique?
              </p>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader noButton={true}>
              <i className='fa fa-video bg-inverse'></i> VideoSection #1
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
            <PanelBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                autem, distinctio quo quam rerum voluptatem maxime modi nisi
                temporibus quis fugiat. Libero quibusdam obcaecati quod commodi
                ipsum consectetur eos similique?
              </p>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader noButton={true}>
              <i className='fa fa-image bg-inverse'></i> ImageSection #1
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
            <PanelBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                autem, distinctio quo quam rerum voluptatem maxime modi nisi
                temporibus quis fugiat. Libero quibusdam obcaecati quod commodi
                ipsum consectetur eos similique?
              </p>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader noButton={true}>
              <i className='fa fa-edit bg-inverse'></i> Assigment #1
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
            <PanelBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                autem, distinctio quo quam rerum voluptatem maxime modi nisi
                temporibus quis fugiat. Libero quibusdam obcaecati quod commodi
                ipsum consectetur eos similique?
              </p>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader noButton={true}>
              <i className='fa fa-question bg-inverse'></i> Quiz #1
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
            <PanelBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                autem, distinctio quo quam rerum voluptatem maxime modi nisi
                temporibus quis fugiat. Libero quibusdam obcaecati quod commodi
                ipsum consectetur eos similique?
              </p>
            </PanelBody>
          </Panel>
        </PanelBody>
        <PanelFooter>
          <div className='row'>
            <div className='col-4'>
              <select className='form-control'>
                <option>Select New Section Type</option>
                <option>Text</option>
                <option>Video</option>
                <option>Image</option>
                <option>Assigment</option>
                <option>Quiz</option>
              </select>
            </div>

            <div className='col-4'>
              <input
                className='form-control'
                required
                type='text'
                // value={newTitle}
                placeholder='Enter New Section Name.'
                // onChange={e => onChange(e)}
              />
            </div>
            <div className='col-4'>
              <button
                // onClick={e => handleAdd(newTitle)}
                className='btn btn-primary btn-block m-b-5'
              >
                Add Section
              </button>
            </div>
          </div>
        </PanelFooter>
      </Panel>
    </Fragment>
  );
};

export default PageComponent;
