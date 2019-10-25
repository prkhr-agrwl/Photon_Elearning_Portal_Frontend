import React, { Fragment } from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody
} from '../../../components/panel/panel.jsx';
import CourseComponent from './CourseComponent.js';

const Courses = () => {
  return (
    <Fragment>
      <div>
        <h1 className='page-header'>
          Courses <small></small>
        </h1>
        <Panel theme='inverse' className='bg-success'>
          <PanelHeader>COURSES</PanelHeader>
          <PanelBody>
            <CourseComponent />
          </PanelBody>
        </Panel>
      </div>
    </Fragment>
  );
};

export default Courses;
