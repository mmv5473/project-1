export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const allPhotos = [
    {
      id: 1,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-07-14",
      thumbnail: "https://randomfox.ca/images/1.jpg",
      fullSize:  "https://randomfox.ca/images/1.jpg"
    },
    {
      id: 2,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-08-02",
      thumbnail: "https://randomfox.ca/images/5.jpg",
      fullSize:  "https://randomfox.ca/images/5.jpg"
    },
    {
      id: 3,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-01-15",
      thumbnail: "https://randomfox.ca/images/10.jpg",
      fullSize:  "https://randomfox.ca/images/10.jpg"
    },
    {
      id: 4,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-05-09",
      thumbnail: "https://randomfox.ca/images/15.jpg",
      fullSize:  "https://randomfox.ca/images/15.jpg"
    },
    {
      id: 5,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-09-30",
      thumbnail: "https://randomfox.ca/images/20.jpg",
      fullSize:  "https://randomfox.ca/images/20.jpg"
    },
    {
      id: 6,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-12-18",
      thumbnail: "https://randomfox.ca/images/25.jpg",
      fullSize:  "https://randomfox.ca/images/25.jpg"
    },
    {
      id: 7,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-06-03",
      thumbnail: "https://randomfox.ca/images/30.jpg",
      fullSize:  "https://randomfox.ca/images/30.jpg"
    },
    {
      id: 8,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-07-28",
      thumbnail: "https://randomfox.ca/images/35.jpg",
      fullSize:  "https://randomfox.ca/images/35.jpg"
    },
    {
      id: 9,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-10-15",
      thumbnail: "https://randomfox.ca/images/40.jpg",
      fullSize:  "https://randomfox.ca/images/40.jpg"
    },
    {
      id: 10,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-08-19",
      thumbnail: "https://randomfox.ca/images/45.jpg",
      fullSize:  "https://randomfox.ca/images/45.jpg"
    },
    {
      id: 11,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-04-05",
      thumbnail: "https://randomfox.ca/images/50.jpg",
      fullSize:  "https://randomfox.ca/images/50.jpg"
    },
    {
      id: 12,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-11-07",
      thumbnail: "https://randomfox.ca/images/55.jpg",
      fullSize:  "https://randomfox.ca/images/55.jpg"
    },
    {
      id: 13,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-02-11",
      thumbnail: "https://randomfox.ca/images/60.jpg",
      fullSize:  "https://randomfox.ca/images/60.jpg"
    },
    {
      id: 14,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-10-22",
      thumbnail: "https://randomfox.ca/images/65.jpg",
      fullSize:  "https://randomfox.ca/images/65.jpg"
    },
    {
      id: 15,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-08-11",
      thumbnail: "https://randomfox.ca/images/70.jpg",
      fullSize:  "https://randomfox.ca/images/70.jpg"
    },
    {
      id: 16,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-03-22",
      thumbnail: "https://randomfox.ca/images/75.jpg",
      fullSize:  "https://randomfox.ca/images/75.jpg"
    },
    {
      id: 17,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-05-30",
      thumbnail: "https://randomfox.ca/images/80.jpg",
      fullSize:  "https://randomfox.ca/images/80.jpg"
    },
    {
      id: 18,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-06-17",
      thumbnail: "https://randomfox.ca/images/85.jpg",
      fullSize:  "https://randomfox.ca/images/85.jpg"
    },
    {
      id: 19,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-01-29",
      thumbnail: "https://randomfox.ca/images/90.jpg",
      fullSize:  "https://randomfox.ca/images/90.jpg"
    },
    {
      id: 20,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-09-04",
      thumbnail: "https://randomfox.ca/images/95.jpg",
      fullSize:  "https://randomfox.ca/images/95.jpg"
    },
    {
      id: 21,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-07-05",
      thumbnail: "https://randomfox.ca/images/100.jpg",
      fullSize:  "https://randomfox.ca/images/100.jpg"
    },
    {
      id: 22,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-08-25",
      thumbnail: "https://randomfox.ca/images/105.jpg",
      fullSize:  "https://randomfox.ca/images/105.jpg"
    },
    {
      id: 23,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-11-20",
      thumbnail: "https://randomfox.ca/images/110.jpg",
      fullSize:  "https://randomfox.ca/images/110.jpg"
    },
    {
      id: 24,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-04-18",
      thumbnail: "https://randomfox.ca/images/115.jpg",
      fullSize:  "https://randomfox.ca/images/115.jpg"
    },
    {
      id: 25,
      description: "Here are some photos of cute foxex!",
      dateTaken: "2023-06-28",
      thumbnail: "https://randomfox.ca/images/120.jpg",
      fullSize:  "https://randomfox.ca/images/120.jpg"
    }
  ];

  const shuffled = allPhotos
    .map(photo => ({ photo, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ photo }) => photo)
    .slice(0, 7);

  const data = {
    author: {
      name: "Marcos Vazquez",
      channel: "Marcos Vazquez",
    },
    photos: shuffled
  };

  res.status(200).json(data);
}