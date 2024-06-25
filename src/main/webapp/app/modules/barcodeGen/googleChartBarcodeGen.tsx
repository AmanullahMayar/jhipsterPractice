import React, { FormEvent, useState } from 'react';

const GoogleChartBarcodeGen: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleClick = () => {
    if (value) {
      setUrl(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="row">
      <div>
        <span className="row text-center badges badge-success mt-3">
          <h2>QR Code Generation Via Google api</h2>
        </span>
      </div>
      <div className="row mt-3">
        <input
          className="col-sm-6 mx-4"
          type="url"
          name="url"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter Value"
        />
        <button className="col-sm-2 btn btn-primary mx-3" onClick={handleClick}>
          Generate
        </button>
      </div>
      <div className="row mt-2">
        {url && <img src={`https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${url}`} alt="QR Code" />}
      </div>
    </div>
  );
};

export default GoogleChartBarcodeGen;
