import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label, TextInput } from "flowbite-react";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, required, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      setInputType(type === "password" && showPassword ? "text" : type);
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex flex-col w-full">
        <div className="relative w-full my-2">
          <div className="mb-2 block">
            <Label htmlFor={name} onClick={() => inputRef.current?.focus()}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
          </div>
          <TextInput
            type={inputType}
            name={name}
            required={required}
            placeholder=" "
            ref={inputRef}
            value={value}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
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
