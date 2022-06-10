import React, { useState, useCallback } from 'react';

const useInput = <T,>(
  initialValue: T = null,
): [T, (e) => void, (e) => void] => {
  const [inputs, setInputs] = useState<any>(initialValue);

  const inputsHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof initialValue === 'object') {
        const { name, value } = e.target;

        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      } else {
        setInputs(e.target.value);
      }
    },
    [],
  );

  return [inputs, inputsHandler, setInputs];
};

export default useInput;
