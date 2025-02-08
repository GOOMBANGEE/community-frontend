import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  type: string;
  page: number | undefined;
  totalPage: number | undefined;
}

export default function PaginationBar(props: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { communityId } = useParams();

  const page = props.page ? props.page : 1;
  const totalPage = props.totalPage ? props.totalPage : 1;

  let url = location.pathname + location.search;
  if (props.type === "post") {
    const index = url.indexOf("page=");
    // 쿼리에서 comment page가 있는경우 postDetail에 진입한상태
    // postPaginationBar의 버튼 클릭할경우 postList상태로 가야하기때문에 postId부분이 필요없다
    if (url.indexOf("&commentPage=") != -1) {
      url = `/community/${communityId}?`;
    }
    url = url.slice(0, index) + `page=`;
  }

  if (props.type === "comment") {
    const index = url.indexOf("commentPage=");
    url = url.slice(0, index) + `commentPage=`;
  }

  const renderPageNumbers = () => {
    let minPage = 1;
    let maxPage = totalPage;

    if (totalPage > 10) {
      if (page < 6) {
        maxPage = 10;
      } else if (page + 5 >= totalPage) {
        minPage = totalPage - 9;
      } else {
        minPage = page - 4;
        maxPage = page + 5;
      }
    }

    const pageNumbers = [];
    for (let i = minPage; i <= maxPage; i++) {
      const isActivePage = i === page;
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
    <>
      {totalPage > 1 ? (
        <div className="mx-auto flex w-full justify-center">
          <div className="mx-6 my-2 flex bg-customBlack p-1 font-extralight text-white sm:font-normal">
            {page >= 6 ? (
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
                      `${url}${page >= totalPage - 5 ? totalPage - 10 : page - 5}`,
                    );
                  }}
                >
                  〈
                </button>
              </>
            ) : null}

            {renderPageNumbers()}

            {totalPage > 10 && totalPage - page >= 6 ? (
              <>
                <button
                  className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
                  onClick={() => {
                    navigate(`${url}${page <= 5 ? 11 : page + 6}`);
                  }}
                >
                  〉
                </button>
                <button
                  className="border-2 border-customBlack px-1.5 sm:px-3 sm:py-1"
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
      ) : null}
    </>
  );
}
