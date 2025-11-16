export interface MalUrl {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}


interface JpgImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Images {
  jpg: JpgImage;
  webp: JpgImage;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  episodes: number | null;
  status: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  synopsis: string;
  season: string | null;
  year: number | null;
  genres: MalUrl[];
  trailer: {
    embed_url: string | null;
    url: string | null;
  };
  
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeSearchResponse {
  data: Anime[];
  pagination: JikanPagination;
}

export interface AnimeState {
  searchTerm: string;
  results: Anime[];
  pagination: JikanPagination | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}