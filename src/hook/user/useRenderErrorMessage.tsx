export default function useRenderErrorMessage(message: string | undefined) {
  return message ? (
    <div className="mx-auto p-2 text-start text-base text-red-500">
      {message}
    </div>
  ) : null;
}
