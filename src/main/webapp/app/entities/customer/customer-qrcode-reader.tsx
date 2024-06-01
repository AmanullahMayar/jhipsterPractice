import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const CustomerQRCodeReader: React.FC = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      setScanResult(decodedText);
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
          {scanResult && (
            <div>
              <p>{scanResult}</p>
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
