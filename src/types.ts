export type AppId = 'portfolio' | 'resume' | 'skills' | 'contact';

export interface Education {
  institution: string;
  qualification: string;
  date: string;
  description?: string;
}

export interface Metric {
  value: string;
  label: string;
  context?: string;
}

interface MediaBase {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ImageMedia extends MediaBase {
  type: 'image';
  variants?: { src: string; width: number }[];
}

export interface VideoMedia extends MediaBase {
  type: 'video';
  poster: string;
  captions?: { src: string; language: string; label: string }[];
  placeholder?: boolean;
}

export type ProjectMedia = ImageMedia | VideoMedia;

/** Controls the display frame; media width/height still describe the original file. */
export type ProjectLayout =
  'auto' | 'portrait' | 'square' | 'landscape' | { width: number; height: number };

export interface Project {
  layout?: ProjectLayout;
  id: string;
  type: 'project' | 'experience';
  title: string;
  client: string;
  clientInitials: string;
  role: string;
  date: string;
  discipline: string;
  description: string;
  challenge: string;
  strategy: string;
  results: string;
  metrics: Metric[];
  tags: string[];
  media: ProjectMedia[];
  illustrative: boolean;
}

export interface Portfolio {
  sampleContent: boolean;
  device: { wallpaper: string; wallpaperPosition: string };
  resume: { education: Education[] };
  profile: {
    name: string;
    initials: string;
    title: string;
    location: string;
    availability: string;
    positioning: string;
    headline: string[];
    photo: string;
    aboutHeading: string;
    about: string[];
  };
  contact: {
    heading: string;
    description: string;
    email: string;
    socials: { label: string; url: string }[];
  };
  skills: { title: string; description: string; items: string[] }[];
  seo: { title: string; description: string; siteUrl: string; image: string; imageAlt: string };
  projects: Project[];
}
