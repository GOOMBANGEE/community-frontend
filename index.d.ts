interface Community {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface Post {
  id: number;
  title: string;
  nickname: string;
  member_id: string;
  view_count: number;
  content: string;
  reply_count: number;
  previous_id: number;
  next_id: number;
  creation_time: Date;
  modification_time: Date;
}

interface Reply {
  id: number;
  nickname: string;
  member_id: string;
  content: string;
  creation_time: Date;
  modification_time: Date;
}

interface ValidationProps {
  value: string;
  validateState: typeof ValidateState;
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

interface ValidateReply {
  nicknameError?: string;
  passwordError?: string;
  contentError?: string;
  invalidPasswordError?: string;
}
