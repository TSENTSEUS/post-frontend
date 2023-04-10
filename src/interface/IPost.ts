import { IUser } from './IUser';
import { IComment } from './IComment';

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: IUser;
  comments: IComment[];
}
