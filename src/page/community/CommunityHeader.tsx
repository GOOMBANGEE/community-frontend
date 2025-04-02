import { useCommunityStore } from "../../store/CommunityStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";

export default function CommunityHeader() {
  const { communityState } = useCommunityStore();
  const { envState } = useEnvStore();

  const handleClickCommunityHeader = () => {
    window.location.href = `/community/${communityState.id}?page=1`;
  };

  return (
    <>
      <button
        className="my-1.5 mb-1.5 flex h-10 items-center px-4 text-start text-white sm:h-20 sm:items-start lg:my-0"
        onClick={() => {
          handleClickCommunityHeader();
        }}
      >
        {communityState.thumbnail ? (
          <div className="flex h-full items-center">
            <img
              src={`${envState.baseUrl}/${communityState.thumbnail}`}
              alt="Community Thumbnail"
              className="w-10 rounded-full sm:w-14"
            />
          </div>
        ) : (
          <div className="h-10 w-10 sm:w-14"></div>
        )}

        <div className="ml-3 flex h-full items-center">
          <div className="flex-row">
            <div className="text-xl font-semibold opacity-80">
              {communityState.title}
            </div>
            <div className="hidden font-extralight sm:block">
              {communityState.description}
            </div>
          </div>
        </div>
      </button>
      <div className="my-1 mb-4 border-b-2 border-customGray"></div>
    </>
  );
}
