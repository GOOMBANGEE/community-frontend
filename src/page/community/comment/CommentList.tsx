import useCommentList from "../../../hook/community/comment/useCommentList.ts";
import { useCommentStore } from "../../../store/CommentStore.ts";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import CommentListComment from "./CommentListComment.tsx";
import CommentEditor from "./CommentEditor.tsx";
import PaginationBar from "../PaginationBar.tsx";

export default function CommentList() {
  const { commentList } = useCommentList();
  const { commentState, commentListState } = useCommentStore();
  const { communityId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentPage = searchParams.get("commentPage");

  const paginationProps = {
    type: "comment",
    page: commentListState.page,
    totalPage: commentListState.totalPage,
  };

  useEffect(() => {
    commentList();
  }, [postId, commentPage]);

  return (
    <div className="lg:bg-customBlack">
      <div className="mb-2 flex px-2 sm:px-6">
        <svg
          className="pt-1"
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 7.2C4 6.07989 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.07989 20 7.2V13.8C20 14.9201 20 15.4802 19.782 15.908C19.5903 16.2843 19.2843 16.5903 18.908 16.782C18.4802 17 17.9201 17 16.8 17H15.6627C15.4182 17 15.2959 17 15.1808 17.0276C15.0787 17.0521 14.9812 17.0925 14.8917 17.1474C14.7908 17.2092 14.7043 17.2957 14.5314 17.4686L12 20L9.46863 17.4686C9.29568 17.2957 9.2092 17.2092 9.10828 17.1474C9.01881 17.0925 8.92127 17.0521 8.81923 17.0276C8.70414 17 8.58185 17 8.33726 17H7.2C6.0799 17 5.51984 17 5.09202 16.782C4.71569 16.5903 4.40973 16.2843 4.21799 15.908C4 15.4802 4 14.9201 4 13.8V7.2Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
        <div className="ml-1 text-xl font-extralight text-white">댓글</div>
      </div>

      {commentListState.commentList.map((comment: Comment) => (
        <div key={comment.id}>
          <CommentListComment
            communityId={communityId}
            postId={postId}
            comment={comment}
          />
          {commentState.status === "update" &&
          commentState.id === comment.id ? (
            <CommentEditor status={"update"} />
          ) : null}
        </div>
      ))}

      <PaginationBar {...paginationProps} />
    </div>
  );
}
