import { IPost } from './IPost';
import { IUser } from './IUser';

export interface IComment {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  post: IPost;
}
