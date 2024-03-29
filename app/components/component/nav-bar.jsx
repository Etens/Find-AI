import Link from "next/link"

export default function NavBar() {
  return (
    (<header
      key="1"
      className="flex items-center h-14 w-full bg-black-100 flex justify-between  shadow-lg">
      <div className="flex gap-4 md:gap-8 md:mx-6 lg:gap-10 lg:mx-10 xl:gap-12 xl:mx-12">
        <Link
          className="flex items-center text-sm font-medium hover:underline"
          href="/pages/video-find">
          <VideoIcon className="h-4 w-4 mr-1.5" />
          Vidéo
        </Link>
        <Link
          className="flex items-center text-sm font-medium hover:underline"
          href="/pages/company-find">
          <GroupIcon className="h-4 w-4 mr-1.5" />
          Company
        </Link>
        <Link
          className="flex items-center text-sm font-medium hover:underline"
          href="/pages/travel-find">
          <LuggageIcon className="h-4 w-4 mr-1.5" />
          Travel
        </Link>
      </div>
    </header>)
  );
}


function VideoIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>)
  );
}


function GroupIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>)
  );
}


function LuggageIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
      <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M10 20h4" />
      <circle cx="16" cy="20" r="2" />
      <circle cx="8" cy="20" r="2" />
    </svg>)
  );
}