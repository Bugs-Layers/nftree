import { eth_getLogs } from "thirdweb";
import { z } from "zod";

export const BASE_URL = "https://important-keywords-united-loans.trycloudflare.com"

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
  username: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type PostResponseType = z.infer<typeof PostResponse>

export const TreeResponse = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  user_id: z.number(),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type TreeResponseType = z.infer<typeof TreeResponse>

export const getUserById = async (id: number): Promise<UserResponseType> => {
  const res = await fetch(`${BASE_URL}/user/${id}`)
  if (!res.ok) {
    throw new Error(await res.json())
  }

  const user = await res.json()
  UserResponse.parse(user);

  return user
}

export const getUserTrees = async (id: number): Promise<TreeResponseType[]> => {
  const res = await fetch(`${BASE_URL}/user/${id}/trees`)
  if (!res.ok) throw new Error(await res.json())
  const data = await res.json()

  z.array(TreeResponse).parse(data)

  return data
}

export const getUserByWalletAddress = async (addr: string): Promise<UserResponseType> => {
  const res = await fetch(`${BASE_URL}/user/wallet/${addr}`)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data)
  }

  UserResponse.parse(data);

  return data
}

export const getAllPosts = async (): Promise<PostResponseType[]> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: {
      "Accept": "application/json"
    },
    cache: "no-store"
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data)
  }

  z.array(PostResponse).parse(data)

  return data
}

export const getUserPosts = async (id: number): Promise<PostResponseType[]> => {
  const res = await fetch(`${BASE_URL}/post/user/${id}`, {
    headers: {
      "Accept": "application/json"
    }
  })
  const data = await res.json()
  data.forEach((elt: any) => {
    elt.username = undefined
  });
  if (!res.ok) throw new Error(data)

  z.array(PostResponse).parse(data)

  return data

}

export const getLastTreeId = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}/tree/get_last_id`)
  const data = await res.text()
  if (!res.ok) throw new Error(data)
  return parseInt(data)
}


export const createUser = async (name: string, bio: string, wallet: string) => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, bio, wallet })
  })
  if (!res.ok) {
    throw new Error(await res.json())
  }

  console.log(await res.json())
}

export const uploadImage = async (image: Blob): Promise<{ filename: string }> => {
  const formData = new FormData();
  formData.append("file", image);

  const res = await fetch(`${BASE_URL}/images`, {
    method: "POST",
    body: formData
  })
  if (!res.ok) throw new Error(await res.json())

  return await res.json()
}

export const createPost = async (content: string, user_id: number, tree_id: number, imageFilename: string) => {
  const res = await fetch(`${BASE_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `img=/images/${imageFilename} ${content}`,
      user_id,
      tree_id
    })
  })
  if (!res.ok) throw new Error(await res.json())

  return await res.json()
}


export const createTree = async (tree_id: number | undefined, name: string, location: string, user_id: number, type: string, content: string, imageFilename: string): Promise<{
  message: string,
  tree_id: number | undefined
}> => {
  const res = await fetch(`${BASE_URL}/tree`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tree: tree_id ? {
        tree_id,
        name,
        location,
        user_id,
        type,
      } : {
        name,
        location,
        user_id,
        type,
      },
      post: {
        content: `img=/images/${imageFilename} ${content}`,
        user_id: 0,
        tree_id: 0
      }
    })
  })
  if (!res.ok) {
    throw new Error(await res.json())
  }

  return await res.json()
}