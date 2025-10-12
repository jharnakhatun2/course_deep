export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string; 
  lastSignInTime?: string; 
}

//Course data type
export interface Course {
  _id: string;
  name: string;
  price: number;
  ratings: number;
  lessons: string;
  time: string;
  teacher: string;
  teacherProfession: string;
  shortDes: string;
  description: string;
  image: string;
  category: string;
  level: string;
  language: string;
  studentsEnrolled: number;
  certificate: boolean;
  lastUpdated: string; // ISO date string
  courseURL: string;
  prerequisites: string[];
  promoVideo: string;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
  url: string;
  free: boolean;
}

export interface Event {
  _id?: string;
  title: string;
  day: string;
  month: string;
  weekday: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  image: string;
  category: string;
  price: number;
  country: string;
  seats: number;
  discussItems: string[];
}

export interface Booking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  eventTitle: string;
  tickets: number;
  date: string;
  bookedAt?: string;
}

export interface Replay {
  _id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
  image: string;
}


export interface Comment {
  _id: string; 
  name: string;
  email: string;
  website?: string;
  comment: string;
  date: string;
  image: string;
  replies?: Replay[]; 
}


export interface BlogPost {
  _id: string;        
  title: string;
  author: string;
  date: string;  
  shortDes: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  readTime?: string;
  comments: Comment[];
  authorBio: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

