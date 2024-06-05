import React, { useState } from 'react';
import Barcode from 'react-barcode';

const BarcodeGen: React.FC = () => {
  const [text, setText] = useState<string | undefined>();
  const [barcode, setBarcode] = useState<string | undefined>();

  const generateBarcode = () => {
    if (text) {
      setBarcode(text);
    }
  };

  return (
    <>
      <div>
        <span className="row text-center badges badge-success mt-3">
          <h2>Barcode Generation</h2>
        </span>
      </div>
      <div className="row mt-3">
        <input className="col-sm-6 mx-4" type="text" value={text} onChange={e => setText(e.target.value)} />
        <button className="col-sm-2 btn btn-primary mx-3" onClick={generateBarcode}>
          Generate Barcode
        </button>
      </div>
      <div className="row mt-2">{barcode && <Barcode value={barcode} displayValue={false} />}</div>
    </>
  );
};

export default BarcodeGen;
