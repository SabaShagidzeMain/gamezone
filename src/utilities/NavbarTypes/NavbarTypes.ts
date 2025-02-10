import { ReactNode } from "react";

export interface NavLink {
  href?: string;
  label: string;
}

export interface GameLink {
  id: string;
  href: string;
  icon: ReactNode;
  label: string;
}

export interface Game {
  id: string;
  name: string;
  main_images: {
    disc: string;
  };
}
