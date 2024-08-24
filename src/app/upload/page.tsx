"use client";

import { Button, buttonVariants } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CameraProvider } from "~/components/ui/camera/camera-provider";

const formSchema = z.object({
    description: z.string().min(1).max(100),
    type: z.string(),
    name: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
});

import Camera from "~/components/ui/camera/camera";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { UploadIcon, CameraIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "~/client/api";

function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [isCaptureEnabled, setCaptureEnabled] = useState<boolean>(false);
    const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
    const [url, setUrl] = useState<string>("/tree.jpg");
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");

    console.log(`lat:${latitude}, long: ${longitude}`);


    // Function to toggle camera facing mode
    const toggleCamera = () => {
        setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    };

    // Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("pos:", position);

                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Function to start capturing and get the location
    const startCaptureWithLocation = () => {
        setCaptureEnabled(true);
        getLocation();
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("picUrl", selectedFile);
            formData.append("description", data.description);
            formData.append("location", `${latitude}, ${longitude}`); // Using the captured location

            // console.log(Array.from(formData));

            // const createdRecordPosts = await pb.collection("posts").create(formData);

            const newFormData = new FormData();
            newFormData.append("picUrl", selectedFile);
            // newFormData.append("tree_id", createdRecordTrees.id);
            // newFormData.append("user_id", user.id);
            newFormData.append("upvotes", "0");


            // TODO: redirect to individual tree page
        }
    };

    const [showDialog, setShowDialog] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col items-center w-full gap-2 px-4 pt-10">
                {/* Image preview */}
                <div className="relative size-64">
                    <Image
                        src={url}
                        alt="Preview of the captured image"
                        fill
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                {/* Form */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full p-10 flex flex-col gap-10"
                    >
                        <div className="flex flex-col gap-5 w-full">
                            {/* Capture Picture Section */}
                            <div>
                                <FormLabel>Capture Picture</FormLabel>
                                {1 ? (
                                    <>
                                        {/* <div className="mb-2">
                                            <Button onClick={() => setCaptureEnabled(false)}>
                                                End
                                            </Button>
                                        </div> */}
                                        <div className="mb-2">
                                            <div className="flex items-center justify-center space-x-4">
                                                <Dialog
                                                    open={showDialog}
                                                    onOpenChange={(open) => setShowDialog(open)}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">
                                                            <CameraIcon className="mr-2 h-5 w-5" />
                                                            Capture Photo
                                                            <span className="sr-only">Capture</span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="h-svh w-svw max-w-full p-0">
                                                        <DialogHeader>
                                                            <DialogTitle>Capture your tree</DialogTitle>
                                                        </DialogHeader>
                                                        <Camera
                                                            onClosed={() => {
                                                                setShowDialog(false);
                                                            }}
                                                            onCapturedImages={(images) => {
                                                                setCapturedImages(images);
                                                                setShowDialog(false);
                                                            }}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                        {/* <div className="flex gap-2">
                                            <Button onClick={capture}>Capture</Button>
                                            <Button onClick={toggleCamera}>Switch Camera</Button>
                                        </div> */}
                                    </>
                                ) : (
                                    <Button onClick={startCaptureWithLocation}>Start</Button>
                                )}
                            </div>

                            {/* Form Fields */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Name your tree (important!)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            What kind of tree did you plant?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
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
                                        <FormDescription>
                                            Tell everyone about your newly planted tree!
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <Button type="submit">Submit new tree</Button>
                            <span className="w-full flex justify-center">OR</span>
                            <Link
                                href="/update"
                                className={buttonVariants({ variant: "outline" })}
                            >
                                Update your existing tree
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Page;
