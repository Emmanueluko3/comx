import { ScaleLoader } from "react-spinners";

export function Loader({ className = "text-green-500" }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <ScaleLoader color="currentColor" />
    </div>
  );
}
