/**
 * Created by Yes.Man on 2021/8/29 17:56.
 * @file: PersonalDetails
 */
import { Col, Row } from 'reactstrap';
import React from 'react';
import { IPersonState } from './Types';

interface IProps {
  DefaultState: IPersonState;
}

export default class PersonalDetails extends React.Component<IProps, IPersonState> {
  render () {
    return (
      <Row>
        <Col lg="8">
          col
        </Col>

        <Col>
          col
        </Col>
      </Row>
    );
  }
}
