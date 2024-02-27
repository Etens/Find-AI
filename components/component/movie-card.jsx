import { CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card"

export default function MovieCard({ title, description, duration, category, rating, keywords }) {
  return (
    <Card key="1">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FilmIcon className="w-8 h-8" />
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-500" : "fill-gray-200"}`} />
            ))}
          </div>
        </div>
        <CardDescription>
          <div>
            {description}
          </div>
          <div className="text-sm text-gray-500">
            Duration: {duration}, Category: {category}
          </div>
          <div className="text-sm text-gray-500">
            Keywords: {keywords}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}


function FilmIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>)
  );
}


function StarIcon(props) {
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
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>)
  );
}
