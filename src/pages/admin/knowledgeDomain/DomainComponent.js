import React, { Fragment, useState, useEffect } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import ChapterComponent from './ChapterComponent';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const DomainComponent = () => {
  const [newTitle, setNewTitle] = useState('');
  const [domain, setDomain] = useState([
    {
      id: 0,
      collapse: false,
      title: 'Physics'
    },
    {
      id: 1,
      collapse: false,
      title: 'Chemistry'
    },
    {
      id: 2,
      collapse: false,
      title: 'Maths'
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...domain];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setDomain(newArray);
  };
  const onChange = e => {
    setNewTitle(e.target.value);
  };
  const handleAdd = newTitle => {
    const newArray = [...domain];
    newArray[domain.length] = {
      id: domain.length,
      collapse: false,
      title: newTitle
    };
    setDomain(newArray);
    setNewTitle('');
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {domain.map((domain, i) => (
          <Card className='bg-dark text-white' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!domain.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(domain.id)}
            >
              <i className='fa fa-book fa-2x f-s-8 mr-2 text-teal'></i>{' '}
              <Link>{domain.title}</Link>
              <div className='btn-group btn-group-justified pull-right'>
                <Link className='btn btn-xs btn-primary'>Edit</Link>
                <Link className='btn btn-xs btn-danger'>Delete</Link>
              </div>
            </CardHeader>
            <Collapse isOpen={domain.collapse}>
              <CardBody>
                <ChapterComponent />
                {/* we need to pass a prop here to tell the child components which kd it is */}
              </CardBody>
            </Collapse>
          </Card>
        ))}
        <hr />
        <div className='row'>
          <div className='col-6'>
            <input
              className='form-control'
              required
              type='text'
              value={newTitle}
              placeholder='Enter New Domain Name.'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='col-6'>
            <button
              onClick={e => handleAdd(newTitle)}
              className='btn btn-primary btn-block m-b-5'
            >
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DomainComponent;
