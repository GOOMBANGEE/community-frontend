import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store/GlobalStore.ts";
import React from "react";

export default function Modal() {
  const { globalState, setGlobalState, resetGlobalState } = useGlobalStore();
  const navigate = useNavigate();

  const handleRedirectButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetGlobalState();
    if (globalState.redirectUrl === "reload") {
      window.location.reload();
      return;
    }
    if (globalState.redirectUrl === "reloadHome") {
      navigate("/");
      window.location.reload();
      return;
    }
    navigate(`${globalState.redirectUrl}`);
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="fixed inset-0 bg-gray-700 opacity-50"></div>
      <div className="absolute w-2/3 rounded-lg bg-black shadow-md sm:w-1/4">
        <div className="flex rounded-lg rounded-b-none bg-customGray px-4 py-2 text-lg font-semibold text-white">
          알림{" "}
          <button
            className="ml-auto font-semibold"
            onClick={() => {
              setGlobalState({ modalMessage: undefined });
            }}
          >
            X
          </button>
        </div>

        <div className="px-8 py-6">
          <p className="mb-4 text-lg font-semibold text-white">
            {globalState.modalMessage}
          </p>

          {globalState.redirectName ? (
            <button
              className="mx-auto flex rounded bg-indigo-500 px-4 py-2 text-white"
              onClick={(e) => {
                handleRedirectButton(e);
              }}
            >
              {globalState.redirectName}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
