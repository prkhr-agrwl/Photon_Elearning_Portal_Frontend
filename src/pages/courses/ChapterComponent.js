import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import TopicComponent from './TopicComponent.js';
import { Link } from 'react-router-dom';

const ChapterComponent = () => {
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
  const handleAdd = () => {
    const text = prompt('');
    const newArray = [...chapter];
    newArray[chapter.length] = {
      id: chapter.length,
      collapse: false,
      title: text
    };
    setChapter(newArray);
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
              <i className='fa fa-circle f-s-8 mr-2 text-indigo'></i>{' '}
              <Link>{chapter.title}</Link>
            </CardHeader>
            <Collapse isOpen={chapter.collapse}>
              <CardBody>
                <TopicComponent />
              </CardBody>
            </Collapse>
          </Card>
        ))}
        <hr />
        <button
          onClick={e => handleAdd()}
          className='btn btn-primary btn-block m-b-5'
        >
          Create Chapter
        </button>
      </div>
    </Fragment>
  );
};

export default ChapterComponent;
