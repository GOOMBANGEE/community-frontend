import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface Props {
  currentPage: number;
  totalPage: number;
  prev: number;
  next: number;
}

export default function PaginationBar(prop: Props) {
  const { currentPage, totalPage } = prop;
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [searchParams] = useSearchParams();
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const mode = searchParams.get("mode");

  let url = `/community/${communityId}`;
  const queryParams = [];
  if (mode) {
    queryParams.push(`mode=${mode}`);
  }
  if (target && keyword) {
    queryParams.push(`target=${target}&keyword=${keyword}`);
  }
  url += queryParams.length > 0 ? `?${queryParams.join("&")}&p=` : "?p=";

  const renderPageNumbers = () => {
    let minPage, maxPage;
    if (totalPage <= 10) {
      minPage = 1;
      maxPage = totalPage;
    } else {
      if (currentPage < 6) {
        minPage = 1;
        maxPage = 10;
      } else if (currentPage + 5 >= totalPage) {
        minPage = totalPage - 9;
        maxPage = totalPage;
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
                  navigate(`${url}${currentPage - 5}`);
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
                  navigate(
                    `${url}${currentPage <= 5 ? currentPage : currentPage + 6}`,
                  );
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
