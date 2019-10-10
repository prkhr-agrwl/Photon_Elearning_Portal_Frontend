import React, { Fragment, useState } from 'react';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';

const KnowledgeDomain = () => {
  const [collapse, setCollapse] = useState([
    { id: 1, collapse: true },
    { id: 2, collapse: false },
    { id: 3, collapse: false },
    { id: 4, collapse: false },
    { id: 5, collapse: false },
    { id: 6, collapse: false },
    { id: 7, collapse: false }
  ]);
  const toggleCollapse = index => {
    var newArray = [];
    for (let collapseObj of collapse) {
      if (collapseObj.id === index) {
        collapseObj.collapse = !collapseObj.collapse;
      } else {
        collapseObj.collapse = false;
      }
      newArray.push(collapseObj);
    }

    setCollapse({
      collapse: newArray
    });
  };

  return (
    <Fragment>
      <div>
        <h1 className='page-header'>
          Knowledge Domains <small></small>
        </h1>
        {/* <div className='col-xl-6'> */}
        <div id='accordion' className='accordion'>
          {collapse.map((value, i) => (
            <Card className='bg-dark text-white' key={i}>
              <CardHeader
                className={
                  'card-header bg-dark-darker text-white pointer-cursor ' +
                  (!value.collapse ? 'collapsed ' : '')
                }
                onClick={() => toggleCollapse(value.id)}
              >
                <i className='fa fa-circle f-s-8 mr-2 text-indigo'></i>{' '}
                Collapsible Group Item #{value.id}
              </CardHeader>
              <Collapse isOpen={value.collapse}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </CardBody>
              </Collapse>
            </Card>
          ))}
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default KnowledgeDomain;
