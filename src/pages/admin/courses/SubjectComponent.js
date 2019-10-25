import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import ChapterComponent from './ChapterComponent';
import { Link } from 'react-router-dom';

const SubjectComponent = () => {
  const [subject, setSubject] = useState([
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
    const newArray = [...subject];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setSubject(newArray);
    // console.log(newArray);
  };
  const handleAdd = () => {
    const text = prompt('');
    const newArray = [...subject];
    newArray[subject.length] = {
      id: subject.length,
      collapse: false,
      title: text
    };
    setSubject(newArray);
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {subject.map((subject, i) => (
          <Card className='bg-dark text-white' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!subject.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(subject.id)}
            >
              <i className='fa fa-book fa-2x f-s-8 mr-2 text-teal'></i>{' '}
              <Link>{subject.title}</Link>
              <div className='btn-group btn-group-justified pull-right'>
                <Link className='btn btn-xs btn-default'>Rename</Link>
                <Link className='btn btn-xs btn-primary'>Edit</Link>
                <Link className='btn btn-xs btn-danger'>Delete</Link>
              </div>
            </CardHeader>
            <Collapse isOpen={subject.collapse}>
              <CardBody>
                <ChapterComponent />
              </CardBody>
            </Collapse>
          </Card>
        ))}
        <hr />
        <button
          onClick={e => handleAdd()}
          className='btn btn-primary btn-block m-b-5'
        >
          Add Subject
        </button>
      </div>
    </Fragment>
  );
};

export default SubjectComponent;
