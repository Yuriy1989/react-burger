import React, { ChangeEvent, useState } from 'react';

export interface IInputValues {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
  buttonActive?: boolean;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

