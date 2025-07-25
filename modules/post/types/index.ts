export interface PagedResponse<T> {
  list: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface PostListResponse {
  id: number;
  title: string;
  authorName: string;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  authorName: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
}

export interface PostUpdateRequest {
  title: string;
  content: string;
}
