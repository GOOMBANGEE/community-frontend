import { useConfirmStore } from "../store/ConfirmStore.ts";

export default function ConfirmModal() {
  const { confirmState, setConfirmState, resetConfirmState } =
    useConfirmStore();

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="fixed inset-0 bg-gray-700 opacity-50"></div>
      <div className="absolute mx-4 rounded-lg bg-black shadow-md">
        <div className="flex rounded-lg rounded-b-none bg-customGray px-4 py-2 text-lg font-semibold text-white">
          확인{" "}
          <button
            className="ml-auto font-semibold"
            onClick={() => {
              resetConfirmState();
            }}
          >
            X
          </button>
        </div>

        <div className="px-8 py-6">
          <p
            className="mb-4 text-lg font-semibold text-white"
            dangerouslySetInnerHTML={{
              __html: confirmState.modalMessage
                ? confirmState.modalMessage
                : "",
            }}
          />

          <div className="flex justify-center gap-4">
            <button
              className="rounded bg-red-500 px-4 py-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                setConfirmState({
                  modalMessage: undefined,
                  confirm: true,
                });
              }}
            >
              확인
            </button>

            <button
              className="rounded bg-indigo-500 px-4 py-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                resetConfirmState();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
