import { z } from "zod";

const BASE_URL = "https://important-keywords-united-loans.trycloudflare.com"

export const UserResponse = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string().optional(),
  wallet: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type UserResponseType = z.infer<typeof UserResponse>;

export const PostResponse = z.object({
  id: z.number(),
  content: z.string(),
  user_id: z.number(),
  tree_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type PostResponseType = z.infer<typeof PostResponse>

export const getUserById = async (id: number): Promise<UserResponseType> => {
  const res = await fetch(`${BASE_URL}/user/${id}`)
  if (!res.ok) {
    throw new Error(await res.json())
  }

  const user = await res.json()
  UserResponse.parse(user);

  return user
}

export const createUser = async (name: string, bio: string, wallet: string) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    body: JSON.stringify({ name, bio, wallet })
  })
  if (!res.ok) {
    throw new Error(await res.json())
  }

  console.log(await res.json())
}