import React, { Fragment } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextType = () => {
  return (
    <Fragment>
      <Card className='border-0 bg-success'>
        <CardHeader className='f-w-600'>Theory As Text</CardHeader>
        <CardBody>
          <CKEditor
            editor={ClassicEditor}
            data='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa aperiam
      ratione, corrupti repudiandae eaque laudantium aut eligendi? Rerum
      corrupti facilis accusamus quam cumque. Esse impedit nemo dolorum hic
      tenetur quis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Dicta facere voluptates ab, quam assumenda laborum, rerum quod autem
      repudiandae blanditiis harum. Eaque, dolore et? Ut nemo beatae ab expedita
      assumenda?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
      possimus, dignissimos, minima mollitia dolorum, deserunt quo nesciunt
      inventore adipisci praesentium ea laboriosam repudiandae dolore libero
      nulla unde quam sed saepe?Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Unde enim accusamus nisi molestias, sint tempore.
      Repellendus ut assumenda necessitatibus accusantium esse, eligendi
      voluptates officiis molestias commodi dolorum ratione, velit optio?'
          ></CKEditor>
        </CardBody>
        <CardFooter className='f-w-600'>
          <button className='btn btn-sm btn-primary m-r-5'>Add Text</button>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default TextType;
