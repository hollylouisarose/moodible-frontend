import React from 'react'

export function useForm(initialFormState){
  const [formData, setFormData] = React.useState(initialFormState)
  const [formErrors, setFormErrors] = React.useState(initialFormState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  return {
    formData,
    formErrors,
    setFormErrors,
    handleChange,
    setFormData,
  }

}
