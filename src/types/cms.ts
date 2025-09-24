export type ImageRef = { asset?: { _id: string } | null } | null;

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  excerpt?: string;
  cover?: ImageRef;
};

export type FeaturedProject = ProjectCard;

export type HomeDoc = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroMedia?: ImageRef;
  autoFeatured?: boolean;
  featuredProjects?: FeaturedProject[];
};

export type Category = { _id: string; title: string; slug: string };

export type PlanDoc = {
  _id: string;
  title: string;
  slug: string;
  badge?: string;
  price?: string;
  image?: ImageRef;
  description?: string;
  features?: string[];
  ctaLabel?: string;
  ctaLink?: string;
};

export type SettingsDoc = {
  siteTitle?: string;
  logo?: ImageRef;
  emails?: string[];
  phone?: string;
  whatsappNumber?: string;
  socials?: { label: string; url: string }[];
};

export type ContactDoc = {
  emails?: string[];
  phone?: string;
  whatsappNumber?: string;
  schedulerEmbed?: string;
};
