import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Card, CardHeader, Collapse, CardBody } from 'reactstrap';
import {
  Panel,
  PanelHeader,
  PanelBody
  //   PanelFooter
} from './../../components/panel/panel.jsx';

const DashboardV1 = () => {
  const onPlayerReady = event => {
    event.target.pauseVideo();
  };
  const [collapse, setCollapse] = useState([
    { id: 1, collapse: true, ansCollapse: false },
    { id: 2, collapse: false, ansCollapse: false },
    { id: 3, collapse: false, ansCollapse: false },
    { id: 4, collapse: false, ansCollapse: false },
    { id: 5, collapse: false, ansCollapse: false },
    { id: 6, collapse: false, ansCollapse: false },
    { id: 7, collapse: false, ansCollapse: false }
  ]);
  const toggleQuesCollapse = index => {
    var newArray = [];
    for (let collapseObj of collapse) {
      if (collapseObj.id === index) {
        collapseObj.collapse = !collapseObj.collapse;
      } else {
        collapseObj.collapse = false;
      }
      newArray.push(collapseObj);
    }

    setCollapse(newArray);
  };
  const toggleAnsCollapse = index => {
    var newArray = [];
    for (let collapseObj of collapse) {
      if (collapseObj.id === index) {
        collapseObj.ansCollapse = !collapseObj.ansCollapse;
      } else {
        collapseObj.ansCollapse = false;
      }
      newArray.push(collapseObj);
    }

    setCollapse(newArray);
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
          <div className='col-lg-12 col-md-6'>
            <div className='widget widget-stats bg-red'>
              <div className='stats-icon'>
                <i className='fa fa-desktop'></i>
              </div>
              <div className='stats-info'>
                <h4>Learn Theory:</h4>
                <p>NM | P05. NLM, Friction and Circular Motion Dynamics</p>
              </div>
              <div className='stats-link'>
                <Link className='pull-left' to='/dashboard/v1'>
                  Previous Section{' '}
                  <i className='fa fa-arrow-alt-circle-left'></i>
                </Link>
                <Link className='pull-right' to='/dashboard/v1'>
                  Next Section <i className='fa fa-arrow-alt-circle-right'></i>
                </Link>
              </div>
            </div>
          </div>

          <Card className='card bg-gradient-teal text-center'>
            <CardBody>
              <div id='accordion' className='card-accordion'>
                {collapse.map((value, i) => (
                  <Card key={i}>
                    <CardHeader
                      className={
                        'card-header bg-gradient-black text-white pointer-cursor ' +
                        (!value.collapse ? 'collapsed ' : '')
                      }
                      onClick={() => toggleQuesCollapse(value.id)}
                    >
                      Question #{value.id}
                    </CardHeader>
                    <Collapse isOpen={value.collapse}>
                      <CardBody>
                        Anim pariatur cliche reprehenderit, enim eiusmod high
                        life accusamus terry richardson ad squid. 3 wolf moon
                        officia aute, non cupidatat skateboard dolor brunch.
                        Food truck
                        <Card>
                          <CardHeader
                            className={
                              'card-header bg-gradient-black text-white pointer-cursor ' +
                              (!value.ansCollapse ? 'collapsed ' : '')
                            }
                            onClick={() => toggleAnsCollapse(value.id)}
                          >
                            Answer #{value.id}
                          </CardHeader>
                          <Collapse isOpen={value.ansCollapse}>
                            <CardBody>
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid. 3
                              wolf moon officia aute, non cupidatat skateboard
                              dolor brunch. Food truck
                            </CardBody>
                          </Collapse>
                        </Card>
                      </CardBody>
                    </Collapse>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardV1;
