import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import TopicComponent from './TopicComponent.js';
import { Link } from 'react-router-dom';

const ChapterComponent = () => {
  const [newTitle, setNewTitle] = useState('');
  const [chapter, setChapter] = useState([
    {
      id: 0,
      collapse: false,
      title: 'ch1'
    },
    {
      id: 1,
      collapse: false,
      title: 'ch2'
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...chapter];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setChapter(newArray);
    // console.log(newArray);
  };
  const onChange = e => {
    setNewTitle(e.target.value);
  };
  const handleAdd = newTitle => {
    const newArray = [...chapter];
    newArray[chapter.length] = {
      id: chapter.length,
      collapse: false,
      title: newTitle
    };
    setChapter(newArray);
    setNewTitle('');
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {chapter.map((chapter, i) => (
          <Card className='bg-dark text-white' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!chapter.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(chapter.id)}
            >
              <i className='fa fa-book fa-2x f-s-8 mr-2 text-teal'></i>{' '}
              <Link>{chapter.title}</Link>
              <div className='btn-group btn-group-justified pull-right'>
                <Link className='btn btn-xs btn-primary'>Edit</Link>
                <Link className='btn btn-xs btn-danger'>Delete</Link>
              </div>
            </CardHeader>
            <Collapse isOpen={chapter.collapse}>
              <CardBody>
                <TopicComponent />
                {/* we need to pass a prop here to tell the child components which chapter it is */}
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
              placeholder='Enter New Chapter Name.'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='col-6'>
            <button
              onClick={e => handleAdd(newTitle)}
              className='btn btn-primary btn-block m-b-5'
            >
              Add Chapter
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChapterComponent;
