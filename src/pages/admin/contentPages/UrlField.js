import React, { Fragment, useState } from 'react';

const UrlField = ({ getModal }) => {
  const [url, setUrl] = useState('');
  const handleModal = url => {
    getModal(url);
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
      <form className='form-inline'>
        <div className='form-group m-r-10'>
          <input
            type='url'
            className='form-control form-control-sm'
            placeholder='Enter content url'
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
          onClick={e => handleModal(url)}
          type='button'
          className='btn btn-sm btn-info m-r-5'
        >
          Preview
        </button>
        <button
          onClick={e => handleUpload()}
          className='btn btn-sm btn-primary m-r-5'
        >
          Upload Content
        </button>
      </form>
    </Fragment>
  );
};

export default UrlField;
