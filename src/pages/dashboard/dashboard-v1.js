import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Youtube from 'react-youtube';
// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Panel,
  PanelHeader,
  PanelBody
  //   PanelFooter
} from './../../components/panel/panel.jsx';
// import { Line } from 'react-chartjs-2';
// import GoogleMapReact from 'google-map-react';
// import classnames from 'classnames';
// import Calendar from 'react-calendar';
// import Sparkline from '@rowno/sparkline';

const DashboardV1 = () => {
  const onPlayerReady = event => {
    event.target.pauseVideo();
  };
  return (
    <div>
      <ol className='breadcrumb pull-right'>
        <li className='breadcrumb-item'>
          <Link to='/dashboard/v1'>Home</Link>
        </li>
        <li className='breadcrumb-item active'>Dashboard</li>
      </ol>
      <h1 className='page-header'>
        Dashboard <small> {/*put something relevant*/} </small>
      </h1>

      <div className='row'>
        <div className='col-lg-12 col-md-6'>
          <div className='widget widget-stats bg-red'>
            <div className='stats-icon'>
              <i className='fa fa-desktop'></i>
            </div>
            <div className='stats-info'>
              <h4>Learn Theory:</h4>
              <p>Constraint Motion</p>
            </div>
            <div className='stats-link'>
              <Link className='pull-left' to='/dashboard/v1'>
                Previous Section <i className='fa fa-arrow-alt-circle-left'></i>
              </Link>
              <Link className='pull-right' to='/dashboard/v1'>
                Next Section <i className='fa fa-arrow-alt-circle-right'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {/* map through all the videos here */}
        <div className='col-lg-12'>
          <Panel>
            <PanelHeader>Lecture 1</PanelHeader>
            <PanelBody className='video-container'>
              <iframe
                src='https://player.vimeo.com/video/132328313'
                frameborder='0'
                allow='autoplay; fullscreen'
                allowfullscreen
              />
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader>Lecture 2</PanelHeader>
            <PanelBody className='video-container'>
              <iframe
                src='https://player.vimeo.com/video/132328313'
                frameborder='0'
                allow='autoplay; fullscreen'
                allowfullscreen
              />
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default DashboardV1;
