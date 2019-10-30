import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextType = props => {
  const [text, setText] = useState(props.text);
  const onChange = (e, editor) => {
    setText(editor.getData());
  };
  const handleSave = text => {
    props.onSave(text);
  };

  return (
    <Fragment>
      <Card className='border-0 bg-success'>
        {/* <CardHeader className='f-w-600'>Theory As Text</CardHeader> */}
        <CardBody>
          <CKEditor
            id='editor'
            editor={ClassicEditor}
            onChange={(e, editor) => onChange(e, editor)}
            data={text}
          ></CKEditor>
        </CardBody>
        {!props.isNew ? (
          <CardFooter className='f-w-600'>
            <button
              onClick={e => handleSave(text)}
              className='btn btn-sm btn-primary m-r-5'
            >
              Save
            </button>
          </CardFooter>
        ) : (
          ''
        )}
      </Card>
    </Fragment>
  );
};

export default TextType;
