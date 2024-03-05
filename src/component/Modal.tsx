import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store/GlobalStore";

export default function Modal() {
  const { globalState, setGlobalState, resetGlobalState } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="fixed inset-0 bg-gray-700 opacity-50"></div>
      <div className="absolute rounded border-2 border-white bg-slate-800 p-8 shadow-md">
        <p className="mb-4 text-lg font-semibold text-white">
          {globalState.modalMessage}
        </p>

        {globalState.redirectUrl ? (
          <div className="flex">
            <button
              className="mx-auto rounded bg-indigo-500 px-4 py-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                resetGlobalState();
                navigate(`${globalState.redirectUrl}`);
              }}
            >
              {globalState.redirectName}
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              className="mx-auto rounded bg-indigo-500 px-4 py-2 text-white"
              onClick={() => {
                setGlobalState({ ...globalState, modalMessage: "" });
              }}
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
