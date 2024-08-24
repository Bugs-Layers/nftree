import Image from "next/image"
type ProfilePageImagesProps = {
  image:string;
}


export default function ProfilePageImages({image}:ProfilePageImagesProps) {
  return (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-6 lg:p-8">
        
<Image src={image} width={250} height={250} style={{'borderRadius':'15px'}} alt="Image"/>
</div>
  )
}

