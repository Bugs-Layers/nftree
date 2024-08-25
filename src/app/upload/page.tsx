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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTree, getUserById, getUserByWalletAddress, uploadImage } from "~/client/api";
import { useRouter } from "next/navigation";
import { log } from "console";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { sendAndConfirmTransaction } from "thirdweb";
import { safeMint } from "~/lib/thirdweb/rpc/43113/0xdcee2dd10dd46086cc1d2b0825a11ffc990e6eff";
import { nftreeContract } from "~/lib/thirdweb/web3";

function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter()

    const activeAccount = useActiveAccount()

    const [isCaptureEnabled, setCaptureEnabled] = useState<boolean>(false);
    const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
    const [url, setUrl] = useState<string>("/tree.jpg");
    const [selectedFile, setSelectedFile] = useState<Blob>();
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");

    const [showDialog, setShowDialog] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string>();

    const [isCapturedImageInForm, setIsCapturedImageInForm] = useState<boolean>(false);

    // Function to toggle camera facing mode
    const toggleCamera = () => {
        setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    };

    // Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        // console.log('Longitude:', longitude);
        // console.log('Latitude:', latitude);

    };

    // Function to start capturing and get the location
    const startCaptureWithLocation = () => {
        setCaptureEnabled(true);
        getLocation();
    };

    // const { data: imageUrl, mutate: mutateImageUrl, isSuccess: uploadImageIsSuccess } = useMutation({
    //     mutationFn: ({ image }: { image: Blob }) => {
    //         return uploadImage(image)
    //     }
    // })

    const treeMutation = useMutation({
        mutationFn: async ({ name, location, user_id, type, content, image }: { name: string, location: string, user_id: number, type: string, content: string, image: Blob }) => {
            if (!activeAccount) throw new Error("No active account")

            const imageUrlObj = await uploadImage(image)
            const res = await createTree(name, location, user_id, type, content, imageUrlObj.filename)

            if (!res.tree_id) throw new Error("No tree created in db")

            const reciept = await sendAndConfirmTransaction({
                transaction: safeMint({
                    to: activeAccount.address,
                    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/trees/${res.tree_id}`,
                    contract: nftreeContract,
                }),
                account: activeAccount!,
            });
        }
    })

    const useUserByWallet = (wallet: string) => useQuery({
        queryKey: ["wallet", wallet],
        queryFn: async () => {
            if (!activeAccount) router.push("/login")
            return await getUserByWalletAddress(wallet)
        }
    })


    const { data: user } = useUserByWallet(activeAccount ? activeAccount.address : "")

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!user || !activeAccount) {
            router.push("/login")
            return;
        }

        if (capturedImage) {
            const imageBlob = await (await fetch(capturedImage)).blob();

            // mutateImageUrl({ image: imageBlob })

            treeMutation.mutate({
                name: data.name,
                location: `${data.latitude}:${data.longitude}`,
                type: data.type,
                user_id: user.id,
                content: data.description,
                image: imageBlob
            }, {
                onSuccess: () => {
                    console.log("mutated")
                    router.push("/home")
                }
            })

        }
    };

    const handleCapureImage = (images: string[]) => {
        const newImage = images[images.length - 1];
        if (newImage) {
            setShowDialog(false);
            setCapturedImage(newImage);
        }
        console.log(capturedImage);
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col items-center w-full gap-2 px-4 pt-10">
                {/* Image preview */}
                {capturedImage &&
                    <div className="relative size-64">
                        <Image
                            src={capturedImage}
                            alt="Preview of the captured image"
                            fill
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>}
                {/* Form */}
                {/* <div>{capturedImage}</div> */}

                {/* <Button onClick={getLocation}>Get Location</Button> */}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={`w-full p-10 flex flex-col gap-10`}
                    >
                        <div className={`flex flex-col gap-5 w-full ${capturedImage ? '' : 'my-8'}`}>
                            {/* Capture Picture Section */}
                            <div>
                                {/* <FormLabel>Capture Picture</FormLabel> */}
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
                                                <Camera
                                                    onClosed={() => {
                                                        setShowDialog(false);
                                                    }}
                                                    onCapturedImages={(images) => {
                                                        handleCapureImage(images);
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
                            </div>

                            {/* Form Fields */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Name</FormLabel> */}
                                        <FormControl>
                                            <Input {...field} placeholder="Add Name of Tree" />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Name your tree (important!)
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Type</FormLabel> */}
                                        <FormControl>
                                            <Input {...field} placeholder="Enter Type" />
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
                                        {/* <FormLabel>Description</FormLabel> */}
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type Description here"
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
                            <span className="w-full flex justify-center">or</span>
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
