export interface GetPostData {
  posts: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: {
    name: string;
  };
}
