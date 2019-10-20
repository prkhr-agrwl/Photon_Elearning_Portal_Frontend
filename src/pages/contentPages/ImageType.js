import React from 'react';
import { Card, CardBody } from 'reactstrap';

const ImageType = () => {
  return (
    <div>
      <Card className='border-0'>
        <CardBody>
          <form className='form-inline'>
            <div className='form-group m-r-10'>
              <input
                type='url'
                className='form-control'
                placeholder='Enter image url'
              />
            </div>
            <button type='submit' className='btn btn-sm btn-primary m-r-5'>
              Upload
            </button>
          </form>
        </CardBody>
      </Card>
      <Card className='border-0'>
        <CardBody>
          <form className='form-inline'>
            <div className='form-group m-r-10'>
              <input
                type='url'
                className='form-control'
                placeholder='Enter image url'
              />
            </div>
            <button type='submit' className='btn btn-sm btn-primary m-r-5'>
              Upload
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ImageType;
