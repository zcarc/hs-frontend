export interface GetPostData {
  posts: Post[];
  meta: Meta;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: {
    name: string;
  };
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}
