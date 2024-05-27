import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QRCode from 'qrcode.react';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer.reducer';
import axios from 'axios';

export const CustomerDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  const [qrCodeData, setQrCodeData] = useState(null);
  useEffect(() => {
    const getQrCodeData = async () => {
      const apiUrl = 'api/customers/customer';
      const requestUrl = `${apiUrl}/${id}`;
      const qrCodeDataResponse = await axios.get(requestUrl);
      setQrCodeData(qrCodeDataResponse?.data);
    };
    getQrCodeData();
  }, [id]);

  console.log(qrCodeData);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerEntity = useAppSelector(state => state.customer.entity);

  return (
    <Row className="justify-content-center">
      <Col md="6">
        <h2 data-cy="customerDetailsHeading">
          <Translate contentKey="testprojectApp.customer.detail.title">Customer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="testprojectApp.customer.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="testprojectApp.customer.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.lastName}</dd>
          <dt>
            <span id="contact">
              <Translate contentKey="testprojectApp.customer.contact">Contact</Translate>
            </span>
          </dt>
          <dd>{customerEntity.contact}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="testprojectApp.customer.address">Address</Translate>
            </span>
          </dt>
          <dd>{customerEntity.address}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="testprojectApp.customer.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.createDate ? <TextFormat value={customerEntity.createDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="testprojectApp.customer.company">Company</Translate>
          </dt>
          <dd>{customerEntity.company ? customerEntity.company.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetail;
