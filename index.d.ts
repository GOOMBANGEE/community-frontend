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
  content: string;
  reply_count: number;
  previous_id: number;
  next_id: number;
  creation_time: Date;
  modification_time: Date;
}

interface ValidateUser {
  emailError?: string;
  nicknameError?: string;
  passwordError?: string;
  codeError?: string;
}
