import React, { Fragment, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelBody
} from "../../../components/panel/panel.jsx";
import DomainComponent from "./DomainComponent.js";

const KnowledgeDomain = () => {
  return (
    <Fragment>
      <div>
        <h1 className="page-header">
          Knowledge Domains <small></small>
        </h1>
        <Panel theme="inverse" className="bg-success">
          <PanelHeader>DOMAINS</PanelHeader>
          <PanelBody>
            <DomainComponent />
          </PanelBody>
        </Panel>
      </div>
    </Fragment>
  );
};

export default KnowledgeDomain;
