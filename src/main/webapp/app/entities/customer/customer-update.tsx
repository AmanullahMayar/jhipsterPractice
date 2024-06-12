import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputText } from 'primereact/inputtext';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { createEntity, getEntity, reset, updateEntity } from './customer.reducer';

export const CustomerUpdate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const companies = useAppSelector(state => state.company.entities);
  const customerEntity = useAppSelector(state => state.customer.entity);
  const loading = useAppSelector(state => state.customer.loading);
  const updating = useAppSelector(state => state.customer.updating);
  const updateSuccess = useAppSelector(state => state.customer.updateSuccess);
  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const handleClose = () => {
    navigate('/customer' + location.search);
  };

  const saveEntity = data => {
    const entity = {
      ...customerEntity,
      ...data,
      createDate: convertDateTimeToServer(data.createDate),
      company: companies.find(it => it.id.toString() === data.company?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? { createDate: displayDefaultDateTime() }
      : { ...customerEntity, createDate: convertDateTimeFromServer(customerEntity.createDate), company: customerEntity?.company?.id };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCompanies({}));
  }, []);
  console.log(defaultValues);
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="testprojectApp.customer.home.createOrEditLabel" data-cy="CustomerCreateUpdateHeading">
            Create or edit a Customer
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="12">
          {loading ? (
            <p>Loading...</p>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <form onSubmit={handleSubmit(saveEntity)}>
              {!isNew && <input type="hidden" name="id" defaultValue={customerEntity.id} />}
              <Row md="6" sm="12">
                <Col md="6" sm="12">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={defaultValues().firstName}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-firstName">First Name</label>
                        <InputText {...field} id="customer-firstName" className="form-control" />
                      </div>
                    )}
                    rules={{ required: 'First Name is required' }}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={defaultValues().lastName}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-lastName">Last Name</label>
                        <InputText {...field} id="customer-lastName" className="form-control" />
                      </div>
                    )}
                    rules={{ required: 'Last Name is required' }}
                  />
                  <Controller
                    name="contact"
                    control={control}
                    defaultValue={defaultValues().contact}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-contact">Contact</label>
                        <InputText {...field} id="customer-contact" className="form-control" />
                      </div>
                    )}
                    rules={{ required: 'Contact is required' }}
                  />
                </Col>
                <Col md="6" sm="12">
                  <Controller
                    name="address"
                    control={control}
                    defaultValue={defaultValues().address}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-address">Address</label>
                        <InputText {...field} id="customer-address" className="form-control" />
                      </div>
                    )}
                    rules={{ required: 'Address is required' }}
                  />
                  <Controller
                    name="createDate"
                    control={control}
                    defaultValue={defaultValues().createdDate}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-createDate">Create Date</label>
                        <InputText {...field} type="date" id="customer-createDate" className="form-control" />
                      </div>
                    )}
                    rules={{ required: 'Create Date is required' }}
                  />
                  <Controller
                    name="company"
                    control={control}
                    defaultValue={defaultValues().company}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor="customer-company">Company</label>
                        <select {...field} id="customer-company" className="form-control">
                          <option value="" key="0" />
                          {companies
                            ? companies.map(otherEntity => (
                                <option value={otherEntity.id} key={otherEntity.id}>
                                  {otherEntity.id}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    )}
                    rules={{ required: 'Company is required' }}
                  />
                  <Button tag={Link} to="/customer" color="info">
                    <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
                  </Button>{' '}
                  <Button color="primary" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" /> <span className="d-none d-md-inline">Save</span>
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CustomerUpdate;
