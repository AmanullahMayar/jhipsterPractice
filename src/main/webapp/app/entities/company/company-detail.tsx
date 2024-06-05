import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './company.reducer';

export const CompanyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const companyEntity = useAppSelector(state => state.company.entity);
  return (
    <Row>
      <h2 data-cy="companyDetailsHeading">
        <Translate contentKey="testprojectApp.company.detail.title">Company</Translate>
      </h2>
      <Col md="4">
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{companyEntity.id}</dd>
          <dt>
            <span id="companyName">
              <Translate contentKey="testprojectApp.company.companyName">Company</Translate>
            </span>
          </dt>
          <dd>{companyEntity.companyName}</dd>
          <dt>
            <span id="companyAddress">
              <Translate contentKey="testprojectApp.company.companyAddress">Company Address</Translate>
            </span>
          </dt>
          <dd>{companyEntity.companyAddress}</dd>
        </dl>
        <Button tag={Link} to="/company" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company/${companyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="4">
        <dl className="jh-entity-details">
          <dt>
            <span id="companyDescription">
              <Translate contentKey="testprojectApp.company.companyDescription">Company Description</Translate>
            </span>
          </dt>
          <dd>{companyEntity.companyDescription}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="testprojectApp.company.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>{companyEntity.createDate ? <TextFormat value={companyEntity.createDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
      </Col>
    </Row>
  );
};

export default CompanyDetail;
