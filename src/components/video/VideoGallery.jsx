import "./video.css";

const videos = [
  { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, url: "https://www.youtube.com/embed/9bZkp7q19f0" },
  { id: 3, url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
];

export default function VideoGallery() {
  return (
    <div className="videoGallery">
      {videos.map(({ id, url }) => (
        <div key={id} className="videoWrapper">
          <iframe
            src={url}
            title={`video-${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
