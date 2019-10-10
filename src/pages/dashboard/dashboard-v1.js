import React from 'react';
import { Link } from 'react-router-dom';
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter
} from './../../components/panel/panel.jsx';

class DashboardV1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ol className='breadcrumb float-xl-right'>
          <li className='breadcrumb-item'>
            <Link to='/dashboard/v1'>Home</Link>
          </li>
          <li className='breadcrumb-item active'>Dashboard</li>
        </ol>
        <h1 className='page-header'>
          Dashboard <small>header small text goes here...</small>
        </h1>

        <Panel>
          <PanelHeader>Panel</PanelHeader>
        </Panel>
      </div>
    );
  }
}

export default DashboardV1;
