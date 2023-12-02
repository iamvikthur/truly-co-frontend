import { useState } from 'react';
import { Label } from './FormInput.styles';

interface FromInputProps {
  id?: string;
  className?: string;
  defaultValue?: string;
  forwardRef?: any;
  name?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  id,
  className,
  min,
  max,
  name,
  placeholder,
  forwardRef,
  type,
  required,
  defaultValue,
  onChange,
}: FromInputProps) => {
  const [filled, setFilled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFilled(!!e.target.value);
    }

    if (onChange) onChange(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (e.target) {
      setFilled(!!(e.target as HTMLInputElement).value);
    }
  };

  return (
    <Label filled={filled}>
      <input
        id={id}
        className={className}
        defaultValue={defaultValue}
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        ref={forwardRef}
        required={required}
        type={type}
        onChange={handleChange}
        onPaste={handlePaste}
      />
      {placeholder && <span>{placeholder}</span>}
    </Label>
  );
};

export default FormInput;
