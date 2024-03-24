import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  type: string;
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar(prop: Props) {
  const { currentPage, totalPage } = prop;
  const navigate = useNavigate();
  const { communityId } = useParams();
  const location = useLocation();

  let url = location.pathname + location.search;
  if (prop.type === "post") {
    const index = url.indexOf("p=");
    // 쿼리에서 cp가 있는경우 postDetail에 진입한상태
    // postPaginationBar의 버튼 클릭할경우 postList상태로 가야하기때문에 postId부분이 필요없다
    if (url.indexOf("cp=")) {
      url = `/community/${communityId}?`;
    }
    url = url.slice(0, index) + `p=`;
  }

  if (prop.type === "comment") {
    const index = url.indexOf("cp=");
    url = url.slice(0, index) + `cp=`;
    console.log(url);
  }

  const renderPageNumbers = () => {
    let minPage = 1;
    let maxPage = totalPage;

    if (totalPage > 10) {
      if (currentPage < 6) {
        maxPage = 10;
      } else if (currentPage + 5 >= totalPage) {
        minPage = totalPage - 9;
      } else {
        minPage = currentPage - 4;
        maxPage = currentPage + 5;
      }
    }

    const pageNumbers = [];
    for (let i = minPage; i <= maxPage; i++) {
      const isActivePage = i === currentPage;
      pageNumbers.push(
        <button
          key={i}
          className={`flex items-center border-2 border-customGray px-1 text-sm ${isActivePage ? "border-emerald-600 bg-customGray px-1.5" : ""}`}
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
    <>
      <div className="mx-auto flex w-full justify-center">
        <div className="bg-buttonBlack mx-6 my-2 flex p-1 font-extralight text-white">
          {currentPage >= 6 ? (
            <>
              <button
                className="border-2 border-customGray px-1"
                onClick={() => {
                  navigate(`${url}1`);
                }}
              >
                〈〈
              </button>
              <button
                className="border-2 border-customGray px-1"
                onClick={() => {
                  navigate(
                    `${url}${currentPage >= totalPage - 5 ? totalPage - 10 : currentPage - 5}`,
                  );
                }}
              >
                〈
              </button>
            </>
          ) : null}

          {renderPageNumbers()}

          {totalPage > 10 && totalPage - currentPage >= 6 ? (
            <>
              <button
                className="border-2 border-customGray px-1"
                onClick={() => {
                  navigate(`${url}${currentPage <= 5 ? 11 : currentPage + 6}`);
                }}
              >
                〉
              </button>
              <button
                className="border-2 border-customGray px-1"
                onClick={() => {
                  navigate(`${url}${totalPage}`);
                }}
              >
                〉〉
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
