export type Movie = {
  id: string;
  title: string;
  year: number;
  director: string;
  genres: string[];
  runtime: number;
  synopsis: string;
};

export const movies: Movie[] = [
  {
    id: "arrival",
    title: "Arrival",
    year: 2016,
    director: "Denis Villeneuve",
    genres: ["Science Fiction", "Drama"],
    runtime: 116,
    synopsis:
      "A linguist is asked to translate an alien language before fear decides the outcome. The film treats communication as the real first contact.",
  },
  {
    id: "grand-budapest",
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    genres: ["Comedy"],
    runtime: 99,
    synopsis:
      "A concierge and his lobby boy are pulled into a theft, a chase, and the last days of a grand hotel. Manners stay intact even as the world does not.",
  },
  {
    id: "parasite",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    genres: ["Thriller", "Drama"],
    runtime: 132,
    synopsis:
      "A family living in a basement finds work in a wealthy household, one introduction at a time. The house looks spacious until everyone is inside it.",
  },
  {
    id: "spirited-away",
    title: "Spirited Away",
    year: 2001,
    director: "Hayao Miyazaki",
    genres: ["Animation"],
    runtime: 125,
    synopsis:
      "A girl crosses into a spirit bathhouse to save her parents and has to remember her own name to leave. Work, food, and courage keep her moving.",
  },
  {
    id: "before-sunrise",
    title: "Before Sunrise",
    year: 1995,
    director: "Richard Linklater",
    genres: ["Romance", "Drama"],
    runtime: 101,
    synopsis:
      "Two strangers get off a train in Vienna and spend one night walking and talking. The film is almost entirely the decision to stay a little longer.",
  },
  {
    id: "moonlight",
    title: "Moonlight",
    year: 2016,
    director: "Barry Jenkins",
    genres: ["Drama"],
    runtime: 111,
    synopsis:
      "Three chapters follow a boy in Miami as he grows up, finds a rare kindness, and learns what he can say out loud.",
  },
  {
    id: "fury-road",
    title: "Mad Max: Fury Road",
    year: 2015,
    director: "George Miller",
    genres: ["Action"],
    runtime: 120,
    synopsis:
      "A war rig crosses a wasteland with people who refuse to be cargo. The chase is the story, and the destination is a rumor.",
  },
  {
    id: "portrait",
    title: "Portrait of a Lady on Fire",
    year: 2019,
    director: "Céline Sciamma",
    genres: ["Romance", "Drama"],
    runtime: 122,
    synopsis:
      "A painter is hired to make a portrait without her subject knowing. Looking becomes the plot, and the sitting becomes a collaboration.",
  },
  {
    id: "social-network",
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    genres: ["Drama"],
    runtime: 120,
    synopsis:
      "A campus site becomes a company, and the friendships around it become depositions. Speed and resentment do most of the talking.",
  },
  {
    id: "in-the-mood",
    title: "In the Mood for Love",
    year: 2000,
    director: "Wong Kar-wai",
    genres: ["Romance"],
    runtime: 98,
    synopsis:
      "Neighbors in 1960s Hong Kong discover their spouses are involved and circle each other in hallways, noodle shops, and rain.",
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    director: "Damien Chazelle",
    genres: ["Drama"],
    runtime: 106,
    synopsis:
      "A drum student chases a spot in a ruthless jazz ensemble. Practice turns into a contest over who gets to decide what excellence costs.",
  },
  {
    id: "her",
    title: "Her",
    year: 2013,
    director: "Spike Jonze",
    genres: ["Science Fiction", "Romance"],
    runtime: 126,
    synopsis:
      "A lonely writer falls for the voice of his operating system. The relationship is intimate, ordinary, and impossible to keep at human scale.",
  },
];
