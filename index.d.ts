interface Community {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  thumbnail: string | undefined;
  Post: Post[] | [];
}

interface Post {
  id: number;
  title: string;
  username: string;
  creator: string;
  viewCount: number;
  ratePlus: number;
  rateMinus: number;
  content: string;
  commentCount: number;
  previousId: number;
  nextId: number;
  creationTime: string;
  modificationTime: string;
  communityId: number;
}

interface Comment {
  id: number;
  username: string;
  creator: string;
  content: string;
  creationTime: string;
  modificationTime: string;
}

interface ValidationProps {
  value: string | undefined;
  setValidateState: (state: typeof ValidateState) => void;
}

type ValidationConfig = {
  regex: RegExp;
  errorField: typeof ValidateState;
  errorMessage: string;
  validateVariable: keyof ValidateState;
};
