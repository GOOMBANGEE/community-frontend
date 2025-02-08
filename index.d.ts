interface Community {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
  postList: Post[] | [];
}

interface Post {
  id: number;
  title: string;
  nickname: string;
  creator: string;
  view_count: number;
  rate_plus: number;
  rate_minus: number;
  content: string;
  comment_count: number;
  previous_id: number;
  next_id: number;
  creation_time: Date;
  modification_time: Date;
}

interface Comment {
  id: number;
  nickname: string;
  creator: string;
  content: string;
  creation_time: Date;
  modification_time: Date;
}

interface ValidationProps {
  value: string;
  setValidateState: (state: typeof ValidateState) => void;
}

type ValidationConfig = {
  regex: RegExp;
  errorField: typeof ValidateState;
  errorMessage: string;
  validateVariable: keyof ValidateState;
};

interface ValidateUser {
  emailError?: string;
  nicknameError?: string;
  passwordError?: string;
  codeError?: string;
}

interface ValidatePost {
  titleError?: string;
  nicknameError?: string;
  passwordError?: string;
  contentError?: string;
}

interface ValidateComment {
  nicknameError?: string;
  passwordError?: string;
  contentError?: string;
  invalidPasswordError?: string;
}
