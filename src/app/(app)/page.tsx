import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-3xl text-center m-5">Rise Stream website</div>
      <div className="text-xl text-center m-5">
        <div>Get started to appication</div>
        <Link
          href="/sign-up"
          className="font-medium  text-sm hover:text-primary-dark"
          prefetch={false}
        >
          <button>register account</button>
        </Link>
      </div>
    </>
  );
}
