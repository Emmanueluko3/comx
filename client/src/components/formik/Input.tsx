import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";

interface FormFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: Record<string, any>;
  touched?: Record<string, boolean>;
  enablePasswordToggle?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  touched,
  enablePasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor={name} className="mb-1 flex text-sm">
        {label}
      </label>
      <div className="relative">
        <Field
          type={enablePasswordToggle && showPassword ? "text" : type}
          name={name}
          id={name}
          className={`border border-[#E8ECEF] px-3 p-2 rounded w-full placeholder:text-xs md:placeholder:text-sm ${
            errors?.[name] && touched?.[name]
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder={placeholder}
        />

        {enablePasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2.5"
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default FormField;
