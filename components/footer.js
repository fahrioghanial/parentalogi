import Link from "next/link";

export default function Footer(props) {
  return (
    <>
      {/* Footer start */}
      <footer className="bg-[#3980BF] mt-32 font-asap pt-7 px-5 md:px-16 pb-10">
        <div className="container">
          <div className="flex flex-wrap gap-y-5 md:justify-between">
            <div className="w-full md:w-1/4">
              <img src="/favicon.svg" alt="parentalogi" className="w-24" />
              <div className="flex gap-x-2 mt-3 text-white">
                <Link href="/about">Tentang Kami</Link>
              </div>
              <p className="text-white mt-4 text-sm md:visible invisible">
                © 2022 Parentalogi. All rights reserved
              </p>
            </div>
            <div className="w-full mb-12 md:w-1/4">
              <p className="text-white mt-10 text-sm md:invisible">
                © 2022 Parentalogi. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer end */}
    </>
  );
}
