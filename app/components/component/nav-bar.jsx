import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet, faPlane, faVideo, faGamepad } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    (<header
      key="1"
      className="flex items-center h-14 w-full bg-black-100 justify-between shadow-lg">
      <div className="flex gap-4 md:gap-8 md:mx-6 lg:gap-10 lg:mx-10 xl:gap-12 xl:mx-12">
      </div>
    </header>)
  );
}