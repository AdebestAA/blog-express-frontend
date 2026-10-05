export interface User {
  email: string;
  nickname?: string;
}

// Flat post shape from GET /api/posts
export interface PostFromApi {
  id: string;
  nickname?: string | null;
  content: string;
  created_at?: string;
  comments_count: string | number;
  likes_count: string | number;
}

// Comment shape from GET /api/comments/:postId
export interface PostComment {
  id: string;
  user_id: number;
  post_id: string;
  comment: string;
  created_at: string;
  user_email: string;
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

// PATCH /api/accounts — all fields optional
export interface UpdateProfilePayload {
  nickname?: string;
  first_name?: string;
  last_name?: string;
}

// GET /api/accounts — fields may be null if never set
export interface UserProfile {
  email: string;
  nickname: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
}
