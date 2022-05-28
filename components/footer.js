import Link from "next/link";

export default function Footer(props) {
  return (
    <>
      {/* Footer start */}
      <footer className="bg-[#3980BF] inset-x-0 bottom-0 mt-20 font-asap pt-7 px-5 md:px-16 pb-10">
        <div className="container">
          <div className="flex flex-wrap md:justify-between">
            <div className="w-full md:w-1/4">
              <img
                src="/logo-parentalogi.png"
                alt="parentalogi"
                className="w-24"
              />
              <div className="flex gap-x-2 mt-3 text-white hover:text-black">
                <Link href="/about">Tentang Kami</Link>
              </div>
              <p className="text-white mt-4 text-sm">
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
