import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UrlField from './UrlField';

const AssignmentType = () => {
  const [previewState, setPreviewState] = useState('');
  const [modal, setModal] = useState(false);
  const toggleModal = url => {
    setModal(!modal);
    setPreviewState(url);
  };

  const [whiteUrlList, setWhiteUrlList] = useState([
    {
      id: 0,
      status: 'false'
    }
  ]);
  const addWhiteUrlField = () => {
    const newArray = [
      ...whiteUrlList,
      {
        id: whiteUrlList.length,
        status: 'false'
      }
    ];
    setWhiteUrlList(newArray);
  };

  const [blackUrlList, setBlackUrlList] = useState([
    {
      id: 0,
      status: 'false'
    }
  ]);
  const addBlackUrlField = () => {
    const newArray = [
      ...blackUrlList,
      {
        id: blackUrlList.length,
        status: 'false'
      }
    ];
    setBlackUrlList(newArray);
  };
  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
          <Card className='border-0 bg-success'>
            <CardHeader className='f-w-600'>Black Question Image</CardHeader>
            <CardBody>
              {whiteUrlList.map((field, key) => (
                <div key={key}>
                  <UrlField getModal={url => toggleModal(url)} />
                  <hr />
                </div>
              ))}
            </CardBody>
            <CardFooter className='f-w-600'>
              <button
                onClick={e => addWhiteUrlField()}
                className='btn btn-sm btn-primary m-r-5'
              >
                Add another image
              </button>
            </CardFooter>
          </Card>
        </div>
        <div className='col-6'>
          <Card className='border-0 bg-success'>
            <CardHeader className='f-w-600'>White Question Image</CardHeader>
            <CardBody>
              {blackUrlList.map((field, key) => (
                <div key={key}>
                  <UrlField getModal={url => toggleModal(url)} />
                  <hr />
                </div>
              ))}
            </CardBody>
            <CardFooter className='f-w-600'>
              <button
                onClick={e => addBlackUrlField()}
                className='btn btn-sm btn-primary m-r-5'
              >
                Add another image
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>

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

export default AssignmentType;
