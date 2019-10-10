import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';

const TopicComponent = () => {
  const [topic, setTopic] = useState([
    {
      id: 0,
      collapse: false,
      title: 'topic1'
    },
    {
      id: 1,
      collapse: false,
      title: 'topic2'
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...topic];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setTopic(newArray);
    // console.log(newArray);
  };
  const handleAdd = () => {
    const text = prompt('');
    const newArray = [...topic];
    newArray[topic.length] = {
      id: topic.length,
      collapse: false,
      title: text
    };
    setTopic(newArray);
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {topic.map((topic, i) => (
          <Card className='bg-dark text-white' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!topic.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(topic.id)}
            >
              <i className='fa fa-circle f-s-8 mr-2 text-indigo'></i>{' '}
              <Link>{topic.title}</Link>
              <Link className='pull-right'>Add Page</Link>
            </CardHeader>
            <Collapse isOpen={topic.collapse}></Collapse>
          </Card>
        ))}
        <hr />
        <button
          onClick={e => handleAdd()} //a prop has to be passed in here to tell which chapter this topic has to be added to
          className='btn btn-primary btn-block m-b-5'
        >
          Add Topic
        </button>
      </div>
    </Fragment>
  );
};

export default TopicComponent;
