import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store/GlobalStore.ts";

export default function ErrorPage() {
  const { globalState } = useGlobalStore();

  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="mt-14 px-4 text-white opacity-90">
      <div className="px-2">
        <div className="mb-2 font-semibold text-gray-400">ERROR 400</div>
        <div className="mb-4 text-4xl font-semibold">오류</div>
        <div>{globalState.errorMessage}</div>
      </div>

      <button
        className="mt-12 px-2 text-lg text-orange-400 underline underline-offset-8"
        onClick={() => {
          handlePrevious();
        }}
      >
        PREVIOUS PAGE
      </button>
    </div>
  );
}
