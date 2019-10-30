import React, { Fragment, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody
} from '../../../components/panel/panel.jsx';
import DomainComponent from './DomainComponent.js';
import Axios from 'axios';

const KnowledgeDomain = () => {
  const loginAdmin = async () => {
    const res = await Axios.post(
      'https://frozen-temple-25034.herokuapp.com/admin/login',
      {
        email: 'test1@gmail.com',
        password: 'prkhr@123'
      }
    );
    console.log(res.data);
  };
  const getSubjects = async () => {
    const res = await Axios.get(
      'https://frozen-temple-25034.herokuapp.com/admin/subjects'
    );
    console.log(res.data);
  };
  const addSubject = async () => {
    const res = await Axios.post(
      'https://frozen-temple-25034.herokuapp.com/admin/addSubject'
    );
  };
  loginAdmin();
  getSubjects();
  addSubject({
    subjectTitle: 'sijdf',
    subjectDescription: 'sjaaaaaaaaaaaaaaaaaadncaisc'
  });
  return (
    <Fragment>
      <div>
        <h1 className='page-header'>
          Knowledge Domains <small></small>
        </h1>
        <Panel theme='inverse' className='bg-success'>
          <PanelHeader>DOMAINS</PanelHeader>
          <PanelBody>
            <DomainComponent />
          </PanelBody>
        </Panel>
      </div>
    </Fragment>
  );
};

export default KnowledgeDomain;
