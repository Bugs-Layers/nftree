"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { createUser } from "~/client/api";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(200),
});

function OnboardingForm({ walletAddress }: { walletAddress: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: async ({ name, bio, addr }: { name: string, bio: string, addr: string }) => {
      await createUser(name, bio, addr)
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    createUserMutation.mutate({ name: data.name, bio: data.bio, addr: walletAddress }, {
      onSuccess: () => {
        router.push(`/home`)
      }
    })
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-10 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-5 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Describe yourself!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default OnboardingForm;