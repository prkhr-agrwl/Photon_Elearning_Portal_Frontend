import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
import SubjectComponent from './SubjectComponent';
import { Link } from 'react-router-dom';

const CourseComponent = () => {
  const [course, setCourse] = useState([
    {
      id: 0,
      collapse: false,
      title: 'JEE Main'
    },
    {
      id: 1,
      collapse: false,
      title: 'JEE Advanced'
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...course];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setCourse(newArray);
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {course.map((course, i) => (
          <Card className='bg-dark text-white' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!course.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(course.id)}
            >
              <i className='fa fa-circle f-s-8 mr-2 text-indigo'></i>{' '}
              <Link>{course.title}</Link>
            </CardHeader>
            <Collapse isOpen={course.collapse}>
              <CardBody>
                <SubjectComponent />
                {/* we need to pass a prop here to tell the child components which course it is */}
                <button className='btn btn-primary btn-block m-b-5'>
                  Add Subject
                </button>
              </CardBody>
            </Collapse>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default CourseComponent;
