import React from 'react';

const InputField = ({ type, placeholder, onChange }) => (
  <input type={type} placeholder={placeholder} onChange={onChange} required />
);

export default InputField;