export interface User {
  email: string;
  nickname?: string;
}

export interface Post {
  post_id: string;
  posts_contents: string;
  post_created_at: string;
  comment_id: string | null;
  comment_content: string | null;
  comment_created_at: string | null;
  post_creator_id: string;
  post_creator: string;
}

export interface Comment {
  id: string;
  comment: string;
  created_at: string;
  user_email: string;
  post_id: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AuthData {
  email: string;
  token: string;
}

export interface RegisterPayload {
  nickname: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface CreatePostPayload {
  content: string;
}

export interface CreateCommentPayload {
  comment: string;
  post_id: string;
}

export interface GroupedPost {
  id: string;
  content: string;
  created_at: string;
  creator_id: string;
  creator_email: string;
  comments: Array<{
    id: string;
    comment: string;
    created_at: string;
  }>;
}
