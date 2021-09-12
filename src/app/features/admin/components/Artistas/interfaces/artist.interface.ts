export interface Artist {
  name_artist: string,
  description_artist: string,
  nationality_artist: string,
  social_networks: [string],
  photo_artist: string
};

export interface responseArtist {
  status: string,
  artists: Artist[]
};
