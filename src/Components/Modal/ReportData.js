import React, { Fragment } from 'react';

const ReportData = ({ data, inputEmailValue, handleInputEmailChange, postReport }) => (
  <Fragment>
    <p>{data.product}</p>
    <p>{data.dates}</p>
    <table>
      <thead>
        <tr>
          <td>Banner</td>
          <td>Min price</td>
          <td>Max price</td>
        </tr>
      </thead>
      <tbody>
      {data.data.map((d, index) => (
         <tr key={index}>
           <td>{d.name}</td>
           <td>{d.min}</td>
           <td>{d.max}</td>
         </tr>
      ))}
      </tbody>
    </table>
    <input 
      type="mail"
      value={inputEmailValue}
      onChange={handleInputEmailChange}
    />
    <button onClick={postReport}>
      sent
    </button>
  </Fragment>
);
export default ReportData;
