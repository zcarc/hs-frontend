export interface GetPost {
  id: number;
  title: string;
  content: string | null;
  author: {
    name: string;
  };
}
