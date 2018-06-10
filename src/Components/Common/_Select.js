import React from 'react';

const Select = ({ handleSubmitSelect, valueSlect, handleChangeSelect }) => (
  <form onSubmit={this.handleSubmitSelect}>
    <label>
      Pick your favorite La Croix flavor:
      <select value={valueSlect} onChange={handleChangeSelect}>
        <option value="sortBy">Sort by</option>
        <option value="priceHighToLow">Price (high - low)</option>
        <option value="priceLowToHigh">Price (low - high)</option>
        <option value="productNameAscending">Product name (A - Z)</option>
        <option value="productNameDescending">Product name (Z - A)</option>
      </select>
    </label>
    <input type="submit" value="Submit" />
  </form>
);

export default Select;
