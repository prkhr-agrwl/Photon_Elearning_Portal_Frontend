import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ImageType = () => {
  const [url, setUrl] = useState(
    'https://drop.ndtv.com/albums/AUTO/porsche-taycan-turbo/6401200x900_1_640x480.jpg'
  );
  const [previewState, setPreviewState] = useState('');
  const [modal, setModal] = useState(false);
  const toggleModal = url => {
    setModal(!modal);
    setPreviewState(url);
  };
  const onUrlChange = e => {
    setUrl(e.target.value);
  };
  const onClear = e => {
    e.preventDefault();
    setUrl('');
  };
  const handleUpload = () => {
    //add logic to upload the content
  };
  return (
    <Fragment>
      <Card className='border-0'>
        <CardBody>
          <div className='row'>
            <div className='col-4'>
              <form className='form-inline'>
                <div className='form-group m-r-10'>
                  <input
                    type='url'
                    className='form-control form-control-sm'
                    placeholder='Enter image url'
                    onChange={e => onUrlChange(e)}
                    value={url}
                  />
                </div>
                <button
                  onClick={e => onClear(e)}
                  className='btn btn-sm btn-warning m-r-5'
                >
                  Clear
                </button>
                <button
                  onClick={e => toggleModal(url)}
                  type='button'
                  className='btn btn-sm btn-info m-r-5'
                >
                  Preview
                </button>
                <button
                  onClick={e => handleUpload()}
                  className='btn btn-sm btn-primary m-r-5'
                >
                  Upload Image
                </button>
              </form>
            </div>
            <div className='col-8'>
              <div className='progress rounded-corner m-b-15'>
                <div
                  className='progress-bar bg-lime progress-bar-striped'
                  style={{ width: '80%' }}
                >
                  80%
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <button className='btn btn-sm btn-primary m-r-5'>
            Add another image
          </button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={e => toggleModal()}>
        <ModalHeader toggle={e => toggleModal()}>Image Preview</ModalHeader>
        <ModalBody>
          <div style={{ padding: '42.5% 0 0 0', position: 'relative' }}>
            <img
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}
              src={previewState}
              alt='preview'
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-white' onClick={e => toggleModal()}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ImageType;
