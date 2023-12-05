import React, {useState, useCallback} from "react";

export function useFormWithValidation() {

  const[errorMessage, setErrorMessage] = useState({
  });

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    search: ''
  })

  const[isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setFormValue({
      ...formValue,
      [name]: value
    });
    setErrorMessage({
      ...errorMessage,
      [name]: input.validationMessage
    });
    setIsValid(input.closest("form").checkValidity());
  }

  const resetForm = useCallback(
  (
    newValue = {},
    newErrorMessage = {},
    newIsValid = false
    ) => {
      setFormValue(newValue);
      setErrorMessage(newErrorMessage);
      setIsValid(newIsValid);
    },
    [setFormValue, setErrorMessage, setIsValid]
  )

  return { formValue, handleChange, resetForm, errorMessage, isValid, setFormValue };
}