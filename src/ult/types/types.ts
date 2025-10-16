export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string; 
  lastSignInTime?: string; 
}

export interface Course {
  _id: string;
  name: string;
  price: string;
  ratings: string;
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
  lastUpdated: string;
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
  _id: string;
  title: string;
  name: string;
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
  price: number | string;
  country: string;
  seats: number;
  discussItems: string[];
}

// ✅ UPDATED: Booking interface
export interface Booking {
  _id?: string;
  // User information
  userId: string;
  userEmail: string;
  userName: string;
  
  // Product information
  productId: string;
  productType: "course" | "event";
  productTitle: string;
  productPrice: number;
  quantity: number;
  
  // Payment information
  paymentIntentId: string;
  paymentStatus: "pending" | "succeeded" | "failed";
  paymentAmount: number;
  paymentCurrency: string;
  
  // Event-specific
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  
  // Booking metadata
  status: "confirmed" | "cancelled";
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
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: string;
  quantity: number;
  type: 'course' | 'event';
  image: string;
  date?: string;
  time?: string;
  location?: string;
  teacher?: string;
  ratings?: string;
  duration?: string;
  userEmail: string;
}