import React, { Fragment, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter
} from '../../components/panel/panel.jsx';
import CourseComponent from './CourseComponent.js';

const Courses = () => {
  return (
    <Fragment>
      <div>
        <h1 className='page-header'>
          Courses <small></small>
        </h1>
        <Panel>
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
