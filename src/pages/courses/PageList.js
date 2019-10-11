import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, CardHeader, Card } from 'reactstrap';

const PageList = () => {
  const [page, setPage] = useState([
    {
      id: 0,
      collapse: false,
      title: 'page1'
    },
    {
      id: 1,
      collapse: false,
      title: 'page2'
    }
  ]);
  const toggleCollapse = index => {
    const newArray = [...page];
    newArray[index] = {
      ...newArray[index],
      collapse: !newArray[index].collapse
    };
    setPage(newArray);
    // console.log(newArray);
  };
  const handleAdd = () => {
    const text = prompt('');
    const newArray = [...page];
    newArray[page.length] = {
      id: page.length,
      collapse: false,
      title: text
    };
    setPage(newArray);
    // console.log(newArray);
  };
  return (
    <Fragment>
      <div id='accordion' className='accordion'>
        {page.map((page, i) => (
          <Card className='bg-dark text-inverse' key={i}>
            <CardHeader
              className={
                'card-header bg-dark-darker text-white pointer-cursor ' +
                (!page.collapse ? 'collapsed ' : '')
              }
              onClick={() => toggleCollapse(page.id)}
            >
              <i className='fa fa-book fa-2x f-s-8 mr-2 text-teal'></i>{' '}
              <Link>{page.title}</Link>
              <div className='btn-group btn-group-justified pull-right'>
                <Link className='btn btn-xs btn-default'>Rename</Link>
                <Link className='btn btn-xs btn-primary'>Edit</Link>
                <Link className='btn btn-xs btn-danger'>Delete</Link>
              </div>
            </CardHeader>
            <Collapse isOpen={page.collapse}></Collapse>
          </Card>
        ))}
        <hr />
        <button
          onClick={e => handleAdd()} //a prop has to be passed in here to tell which chapter this page has to be added to
          className='btn btn-primary btn-block m-b-5'
        >
          Add page
        </button>
      </div>
    </Fragment>
  );
};

export default PageList;
