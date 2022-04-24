import HeadTitle from "../components/headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Image from "next/image";
import { AiOutlineMenu, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaBirthdayCake } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

export default function Home() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  return (
    <>
      <HeadTitle />
      <Navbar />
      
      {/* Options section start */}
      <section id="profile" className="pt-32 font-asap bg-white">
        <div className="container">
        <div className="flex flex-row">
            <div className="ml-8">
              <a href=""><AiFillHeart className="ml-8 mb-2" size="50px"/></a>
              <p className="text-lg ml-8 mb-4 text-center">34</p>
              <a href=""><BsBookmark className="ml-8 mb-2" size="50px"/></a>
              <p className="text-lg ml-8 text-center">15</p>
            </div>
            <div className="w-full px-4">
              <div className="rounded-t-xl shadow-lg overflow-hidden h-72 bg-[url('/test.png')]"></div>
              <div className="rounded-b-xl shadow-lg overflow-hidden mb-10">
                <div className="py-8 px-6 bg-[#3980BF] text-white">
                  <div className="lg:flex lg:gap-x-4">
                    <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
                    <div>
                      <h3 className="font-medium">Jane Doe</h3>
                      <small>20 Januari 2021</small>
                      <h1 className="font-bold text-base my-2 md:text-2xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dolor dicta doloribus reiciendis exercitationem
                        assumenda fuga tempore corporis architecto
                      </h1>
                      <div className="flex gap-x-1 mb-4 ">
                        <a href="">#umum</a>
                        <a href="">#anak</a>
                        <a href="">#rumahtangga</a>
                      </div>
                      <p className="font-medium text-base my-2 md:text-lg">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus vero officia excepturi quaerat libero eos ducimus molestias alias iste, nostrum, sed repellat quibusdam fuga natus culpa, hic accusamus porro magni?
                      Optio, architecto! Laboriosam in, possimus nesciunt aperiam commodi a nobis saepe deleniti dicta, doloremque cum sint! Quam exercitationem voluptatibus temporibus, voluptates officiis unde hic explicabo incidunt non sed voluptatum consequuntur.
                      <br></br>
                      Nulla reiciendis placeat architecto ab, odio quas distinctio repellendus, culpa sequi quis rem totam maxime eum commodi pariatur incidunt rerum. Laborum nisi voluptas at error iusto harum, asperiores eius nulla.
                      Iure neque non iusto inventore eius ratione laudantium odio excepturi, error, numquam voluptate harum, veritatis dignissimos ullam quo rerum quis. Hic rerum alias debitis neque cum, iste natus atque velit?
                      <br></br>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus quae sequi aspernatur eaque omnis recusandae unde consectetur esse, in, nesciunt et sit facere rerum delectus. Molestiae sit sunt sapiente eveniet.
                      Perferendis quod voluptate assumenda animi unde labore nesciunt delectus necessitatibus, temporibus, incidunt recusandae. Nobis quidem odio ducimus, hic in expedita quia? Minima molestiae unde veniam nobis quod, odit dolorum ab.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Options section end */}
      <Footer />
    </>
  );
}
