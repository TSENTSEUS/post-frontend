import { IPost } from './IPost';
import { IComment } from './IComment';

export interface IUser {
  id: number;
  name: string;
  posts: IPost[];
  comments: IComment[];
}
