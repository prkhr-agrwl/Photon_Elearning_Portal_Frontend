import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import ChapterComponent from './ChapterComponent';
import { Link } from 'react-router-dom';

const DomainComponent = () => {
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
  const handleAdd = () => {
    const text = prompt('');
    const newArray = [...domain];
    newArray[domain.length] = {
      id: domain.length,
      collapse: false,
      title: text
    };
    setDomain(newArray);
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
              <i className='fa fa-circle f-s-8 mr-2 text-indigo'></i>{' '}
              <Link>{domain.title}</Link>
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
        <button
          onClick={e => handleAdd()}
          className='btn btn-primary btn-block m-b-5'
        >
          Add Domain
        </button>
      </div>
    </Fragment>
  );
};

export default DomainComponent;
