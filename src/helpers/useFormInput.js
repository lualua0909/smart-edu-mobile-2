import { useState } from 'react'

export default function useFormInput(initialValue = '') {
    const [value, setValue] = useState(initialValue)
  
    function onChangeText(text) {
      setValue(text)
    }
  
    return {
      value,
      onChangeText
    }
  }