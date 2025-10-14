export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  userType: 'homeowner' | 'designer' | 'professional';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    userType: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  userType: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        userType: string;
      };
    }
  }
}