export interface Project {
    id?: string;
    title: string;
    content: string;
    image?: File | string;
    autor: string;
    labels: string[];
    date: Date;
  }
  