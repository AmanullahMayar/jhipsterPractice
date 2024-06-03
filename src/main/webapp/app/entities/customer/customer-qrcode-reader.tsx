import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import axios from 'axios';

const CustomerPattern = /ID:\s*(\d+)\s+FirstName:\s*(.+?)\s+LastName:\s*(.+)/;

const CustomerQRCodeReader: React.FC = () => {
  const [customerVerificationText, setCustomerVerificationText] = useState('');
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    if (id.length > 0) {
      const getCustomerData = async () => {
        const apiUrl = 'api/customers';
        const requestUrl = `${apiUrl}/${id}`;
        try {
          const response = await axios.get(requestUrl);
          if (response.data.id.toString() === id && response.data.firstName === firstName && response.data.lastName === lastName) {
            setCustomerVerificationText('Customer Verified Successfully');
          } else {
            setCustomerVerificationText('Not Valid QR Code data');
          }
        } catch (error) {
          setCustomerVerificationText('No Data Found For Provided QRCode');
        }
      };
      getCustomerData();
    }
  }, [id]);
  useEffect(() => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      const match = decodedText.match(CustomerPattern);
      if (match) {
        setId(match[1]);
        setFirstName(match[2]);
        setLastName(match[3]);
      } else {
        setCustomerVerificationText('Not Valid QR Code data');
      }
    };
    const qrCodeErrorCallback = error => {
      console.error('QR Code error:', error);
    };
    const html5QrCode = new Html5Qrcode('reader', {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });
    const config = {
      fps: 5,
      qrbox: { width: 350, height: 350 },
      verbose: false,
    };
    html5QrCode.start({ facingMode: 'user' }, config, qrCodeSuccessCallback, qrCodeErrorCallback).catch(err => {
      console.error('Failed to start QR Code scanner:', err);
    });
    return () => {
      html5QrCode.stop().catch(err => {
        console.error('Failed to stop QR Code scanner:', err);
      });
    };
  }, []);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="5">
          <h1>Customer QR Code Scanner</h1>
          <div id="reader"></div>
          <br />
          <h4>Scan Result:&nbsp;</h4>
          {id && firstName && (
            <div>
              <p>{'ID: ' + id + ', First Name: ' + firstName + ', Last Name: ' + lastName}</p>
            </div>
          )}
          {customerVerificationText === 'Customer Verified Successfully' ? (
            <div>
              <h3 style={{ color: 'green', fontSize: '24px', fontWeight: 'bold' }}>{customerVerificationText}</h3>
            </div>
          ) : (
            <div>
              <h3 style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{customerVerificationText}</h3>
            </div>
          )}
          <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerQRCodeReader;
