import MaxWidthWrapper from "./max-width-wrapper";

export default function Footer() {
  return (
    <footer className='h-20 relative'>
      <MaxWidthWrapper>

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          FOOTER
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}