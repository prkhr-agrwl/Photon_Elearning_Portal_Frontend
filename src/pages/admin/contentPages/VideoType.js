import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UrlField from './UrlField';

const VideoType = () => {
  const [previewState, setPreviewState] = useState('');
  const [modal, setModal] = useState(false);
  const toggleModal = url => {
    setModal(!modal);
    setPreviewState(url);
  };
  const [urlList, setUrlList] = useState([
    {
      id: 0,
      status: 'false'
    }
  ]);
  const addUrlField = () => {
    const newArray = [
      ...urlList,
      {
        id: urlList.length,
        status: 'false'
      }
    ];
    setUrlList(newArray);
  };
  return (
    <Fragment>
      <Card className='border-0 bg-success'>
        <CardHeader className='f-w-600'>Theory As Videos</CardHeader>

        <CardBody>
          {urlList.map((field, key) => (
            <div key={key}>
              <UrlField getModal={url => toggleModal(url)} />
              <hr />
            </div>
          ))}
        </CardBody>
        <CardFooter className='f-w-600'>
          <button
            onClick={e => addUrlField()}
            className='btn btn-sm btn-primary m-r-5'
          >
            Add another video
          </button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={e => toggleModal()}>
        <ModalHeader toggle={e => toggleModal()}>Video Preview</ModalHeader>
        <ModalBody>
          <div style={{ padding: '42.5% 0 0 0', position: 'relative' }}>
            <iframe
              src={previewState}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}
              frameBorder='0'
              allow='autoplay; fullscreen'
              allowFullScreen
            ></iframe>
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

export default VideoType;
