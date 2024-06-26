import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram, FaViber } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" mt-6 grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 bg-black  items-start gap-6 p-6 ">
      <div>
        <h1 className=" text-white text-4xl">
          Find your
          <br /> perfect
          <br /> fabric match.
        </h1>
      </div>
      <div>
        <h1 className=" text-lg mb-1">Myin Mu</h1>
        <h1 className=" underline">phonemyatkhant45@gmail.com</h1>
        <h1 className="mb-3 font-semibold">+95909763092929</h1>
        <h1 className="text-sm">
          Unit7, MinYe, Padauk St.,
          <br /> Myin Mu, Sagaing City
        </h1>
      </div>
      <div>
        <h1 className="mb-2 text-xl">
          Threads to trends,
          <br /> we've got you covered.
        </h1>
        <Link href="/about-us">
          <h1 className="underline">About Us</h1>{" "}
        </Link>
        <Link href="/payment-methods">
          <h1 className="underline">Payment Methods</h1>{" "}
        </Link>
        <Link href="/contact-us">
          <h1 className="underline">Contact Us</h1>{" "}
        </Link>
      </div>
      <div >
        <h1 className="text-lg">Follow Us</h1>
        <div className="my-5 flex justify-between items-center max-w-[100px]">
          <Link href="">
            <FaFacebook />
          </Link>
          <Link href="">
            {" "}
            <FaGoogle />
          </Link>
          <Link href="">
            {" "}
            <FaViber />
          </Link>
          <Link href="">
            {" "}
            <FaInstagram />
          </Link>
        </div>
        <h1> &copy; {currentYear} KK Fabrics</h1>
      </div>
    </footer>
  );
};

export default Footer;
