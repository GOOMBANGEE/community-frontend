import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  type: string;
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar(props: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { communityId } = useParams();

  let url = location.pathname + location.search;
  if (props.type === "post") {
    const index = url.indexOf("p=");
    // 쿼리에서 cp가 있는경우 postDetail에 진입한상태
    // postPaginationBar의 버튼 클릭할경우 postList상태로 가야하기때문에 postId부분이 필요없다
    if (url.indexOf("cp=")) {
      url = `/community/${communityId}?`;
    }
    url = url.slice(0, index) + `p=`;
  }

  if (props.type === "comment") {
    const index = url.indexOf("cp=");
    url = url.slice(0, index) + `cp=`;
  }

  const renderPageNumbers = () => {
    let minPage = 1;
    let maxPage = props.totalPage;

    if (props.totalPage > 10) {
      if (props.currentPage < 6) {
        maxPage = 10;
      } else if (props.currentPage + 5 >= props.totalPage) {
        minPage = props.totalPage - 9;
      } else {
        minPage = props.currentPage - 4;
        maxPage = props.currentPage + 5;
      }
    }

    const pageNumbers = [];
    for (let i = minPage; i <= maxPage; i++) {
      const isActivePage = i === props.currentPage;
      pageNumbers.push(
        <button
          key={i}
          className={`flex items-center border-2 border-customGray bg-customBlack px-1.5 text-sm sm:px-3 sm:py-1 ${isActivePage ? "border-emerald-600 bg-customGray" : ""}`}
          onClick={() => {
            if (isActivePage) {
              window.location.reload();
            }
            navigate(`${url}${i}`);
          }}
        >
          {i}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mx-auto flex w-full justify-center">
      <div className="mx-6 my-2 flex bg-customBlack p-1 font-extralight text-white sm:font-normal">
        {props.currentPage >= 6 ? (
          <>
            <button
              className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
              onClick={() => {
                navigate(`${url}1`);
              }}
            >
              〈〈
            </button>
            <button
              className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
              onClick={() => {
                navigate(
                  `${url}${props.currentPage >= props.totalPage - 5 ? props.totalPage - 10 : props.currentPage - 5}`,
                );
              }}
            >
              〈
            </button>
          </>
        ) : null}

        {renderPageNumbers()}

        {props.totalPage > 10 && props.totalPage - props.currentPage >= 6 ? (
          <>
            <button
              className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
              onClick={() => {
                navigate(
                  `${url}${props.currentPage <= 5 ? 11 : props.currentPage + 6}`,
                );
              }}
            >
              〉
            </button>
            <button
              className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
              onClick={() => {
                navigate(`${url}${props.totalPage}`);
              }}
            >
              〉〉
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
