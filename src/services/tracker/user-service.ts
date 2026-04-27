import request from "@/services/request";

export interface TrackerUser {
  id: string;
  email: string;
}

export const apiSignIn = async (email: string, password: string): Promise<void> => {
  await request.post("/api/user/users/auth", { email, password });
};

export const apiSignOut = async (): Promise<void> => {
  await request.post("/api/user/users/auth/logout");
};

export const apiGetUser = async (): Promise<TrackerUser> => {
  const response = await request.get("/api/user/users/me");
  return response.data;
};
