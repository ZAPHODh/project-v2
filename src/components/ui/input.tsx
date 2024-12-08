import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, required, topLabel, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      setInputType(type === "password" && showPassword ? "text" : type);
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <span className="mb-2 text-sm font-medium text-gray-700">
            {topLabel}
          </span>
        )}
        <div className="relative w-full">
          <input
            type={inputType}
            name={name}
            required={required}
            placeholder=" "
            className="peer block w-full h-11 px-4 border rounded-md focus:outline-none focus:ring-2  focus:border-transparent "
            ref={inputRef}
            value={value}
            {...props}
          />
          <label
            htmlFor={name}
            className={`absolute left-3 top-14 text-gray-500 text-sm transition-all ${
              value
                ? "top-14 text-xs"
                : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-14 peer-focus:text-xs"
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
