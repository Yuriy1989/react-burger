import React, { useState } from 'react';

export interface IInputValues {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
  buttonActive?: boolean;
}

interface IEvent {
  target: {
    value: string;
    name: string;
  }
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: IEvent ) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

