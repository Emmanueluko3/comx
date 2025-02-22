import { ScaleLoader } from "react-spinners";

export function Spinner({
  className = "text-green-500",
  loadingText = "Loading...",
}) {
  return (
    <div className={`inline-flex ${className}`}>
      <ScaleLoader color="currentColor" /> <span>{loadingText}</span>
    </div>
  );
}
