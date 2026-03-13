import classNames from 'classnames';
import React, { useId } from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Дополнительный classname */
  className?: string;
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, disabled, type = 'text', id, ...props }, ref) => {
    const internalId = useId();
    const inputId = id || internalId;

    return (
      <label
        className={classNames(className, styles.input, { [styles.input_disabled]: disabled })}
        htmlFor={inputId}
      >
        <input
          {...props}
          id={inputId}
          ref={ref}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
        {afterSlot}
      </label>
    );
  }
);

export default Input;
