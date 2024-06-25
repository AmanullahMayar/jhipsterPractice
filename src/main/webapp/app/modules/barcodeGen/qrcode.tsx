import qrcode from 'qrcode';
import React, { useRef, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useReactToPrint } from 'react-to-print';

const Allinone: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [imageQR, setImageQR] = useState<string>('');
  const [scanedImageQr, setScanedImageQr] = useState<string>('');
  const barcodeRef = useRef();

  const qrRef = useRef<any>(null);
  const [fileResult, setFileResult] = useState<any>();

  const openDialog = () => {
    qrRef.current.openImageDialog();
  };

  const fileError = (error: any) => {
    if (error) {
      console.log(error);
    }
  };

  const fileScan = async (result: any) => {
    if (result) {
      setFileResult(result.text);
      console.log(result);

      var imageData = await result?.canvas?.toDataURL();
      setScanedImageQr(imageData);
    }
  };

  const generateQRCode = async () => {
    try {
      const image = await qrcode.toDataURL(text);
      setImageQR(image);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current,
  });

  return (
    <div className="container mx-auto mt-2">
      <div className="row">
        <h2 className="col-sm-12 badges bg-danger text-center text-white">QrCode Generator</h2>
      </div>
      <div className="row">
        <h3 className="col-sm-12">Enter Text For QrCode</h3>
      </div>
      <div className="row mb-2">
        <input className="col-sm-5" type="text" value={text} onChange={e => setText(e.target.value)} />
        <button className="col-sm-2 btn btn-primary m-2 mt-1 mb-1" onClick={generateQRCode}>
          Generate QR Code
        </button>
      </div>
      <div className="row">
        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <h3 className="">QR Code Image</h3>
          </div>
          <div className="card-body text-center" ref={barcodeRef}>
            <img src={imageQR} width="70%" alt="qr code pic is here" />
          </div>
          <div className="card-footer rounded mb-1 text-center">
            <button className="col-sm-12 btn btn-primary m-2 mt-1 mb-1" onClick={handlePrint}>
              Print QrCode
            </button>
          </div>
        </div>
        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <span>
              {/* <button onClick={openDialog}> */}
              <h4>Open QR Code File</h4>
              {/* </button> */}
            </span>
          </div>
          <div className="card-body text-center"></div>
          <div className="card-footer rounded mb-1 text-center">
            <h5>Image Result:</h5>
          </div>
        </div>
        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <h3>QR Code Image</h3>
          </div>
          <div className="card-body text-center">
            <QrScanner delay={300} onError={fileError} onScan={fileScan} style={{ width: '100%' }} />
          </div>
          <div className="card-footer rounded mb-1 text-center">
            <h5>
              Webcam Result:
              {
                <div>
                  {scanedImageQr && <img src={scanedImageQr} style={{ width: '70%', height: '70%' }} alt="Scanned QR Code" />}
                  <p>Scanned Value: {fileResult}</p>
                </div>
              }
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allinone;
