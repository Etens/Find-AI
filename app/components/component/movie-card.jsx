import { CardTitle, CardDescription, CardHeader, Card, CardImage } from "../ui/card";

export default function MovieCard({ title, description, emotion, note, explication, date, posterURL, duration, mainActors }) {
  // Utilisez cette fonction pour convertir la note en étoiles
  const getRatingFromNote = (note) => {
    const ratings = {
      'Excellent': 5,
      'Bon': 4,
      'Moyen': 3,
      'Mauvais': 2,
      'Désastreux': 1,
    };
    return ratings[note] || 0;
  };

  return (
    <Card key="1" className="shadow-lg rounded-lg overflow-hidden w-80">
      <CardImage src={posterURL} alt={title} className="w-full h-150" />
      <CardHeader className="bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold" >{title}</CardTitle>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 ml-2 mr-2">{note}</span>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={`w-4 h-4 ${i < getRatingFromNote(note) ? "text-yellow-500" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardDescription className="p-4">
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500 mt-5">{explication}</p>
        <p className="text-sm text-gray-500 mt-5">{emotion}</p>
        <p className="text-sm text-gray-500 mt-5">{date}</p>
        <p className="text-sm text-gray-500 mt-5">{duration}</p>
        <p className="text-sm text-gray-500 mt-5">{mainActors}</p>
      </CardDescription>
    </Card>
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
