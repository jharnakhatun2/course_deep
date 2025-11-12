export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  lastSignInTime: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  free: boolean;
}

export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "exercise" | "quiz" | "assignment";
}

export interface CurriculumItem {
  id: number;
  title: string;
  lectures: string;
  duration: string;
  lessons: Lesson[];
}

export interface TopicsHandle {
  courseName: string;
  lessonName: string;
  complexity: string;
  length: string;
}

export interface Teacher {
  name: string;
  role: string;
  profession: string; 
  experience?: string; 
  specialistIn?: string; 
  currentWork?: string; 
  contact?: {
    phone?: string;
    mobile?: string;
    email?: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    googlePlus: string;
  };
  biography?: string; 
  image?: string; 
  topicsHandling: TopicsHandle[];
}

export interface Review {
  _id: string;
  name: string;
  email: string;
  review: string;
  ratings: number;
  date: string;
  image: string;
}

export interface Course {
  _id: string;
  name: string;
  price: number;
  ratings: number;
  lessons: string;
  time: string;
  teacher: Teacher;
  teacherProfession: string;
  shortDes: string;
  description: string[];
  learnSummery: string;
  whatYouWillLearn: string[];
  closingNote: string;
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
  curriculum: CurriculumItem[];
  totalDays: string;
  totalDurationLength: string;
  totalLectures: number;
  totalSection: number;
  progress: number;
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
  status:  "upcoming" | "ongoing" | "completed";
}

// ✅ UPDATED: Booking interface
export interface Booking {
  _id: string;
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
  eventDate: string;
  eventTime: string;
  eventLocation: string;

  // Booking metadata
  status: "confirmed" | "cancelled" | "upcoming" | "ongoing" | "completed";
  bookedAt: string;
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
  originalPrice: number | string;
  quantity: number;
  type: "course" | "event";
  image: string;
  date?: string;
  time?: string;
  location?: string;
  teacher: string;
  ratings: string;
  duration?: string;
  userEmail: string;
}

//course enrollment
export interface Enrollment {
  _id: string;
  // User information
  userId: string;
  userEmail: string;
  userName: string;

  // Course information
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  instructorName: string;
  coursePrice: number;
  isFree: boolean;

  // Curriculum and progress tracking
  curriculum: CurriculumItem[];
  allLessons: EnrollmentLesson[];
  progress: number;
  completedLessons: string[];
  currentLesson: string | null;
  currentDay: number;
  status: "active" | "completed" | "cancelled";

  // Payment information (for paid courses)
  paymentIntentId?: string;
  paymentStatus?: "pending" | "succeeded" | "failed";
  paymentAmount?: number;
  paymentCurrency?: string;

  // Metadata
  enrolledAt: string;
  lastAccessedAt: string;
  completedAt: string | null;
}

export interface EnrollmentLesson {
  id: string;
  lessonId: string;
  videoId: string;
  dayId: number;
  dayTitle: string;
  title: string;
  duration: string;
  type: "video" | "exercise" | "quiz" | "assignment";
  order: number;
}

export interface CourseContent {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  courseImage: string;
  instructor: Teacher;
  progress: number;
  currentLesson: string | null;
  currentDay: number;
  completedLessons: string[];
  curriculum: EnrichedCurriculumItem[];
}

export interface EnrichedCurriculumItem {
  id: number;
  title: string;
  duration: string;
  lectures: string;
  lessons: EnrichedLesson[];
}

export interface EnrichedLesson {
  lessonId: string;
  title: string;
  duration: string;
  type: "video" | "exercise" | "quiz" | "assignment";
  isCompleted: boolean;
  isLocked: boolean;
}

// Progress update payload
export interface ProgressUpdate {
  lessonId?: string;
  completed?: boolean;
  progress?: number;
  currentDay?: number;
}

export interface CompleteLessonPayload {
  lessonId: string;
  nextLessonId?: string;
  currentDay?: number;
}

export interface DuplicateCheckResponse {
  isEnrolled: boolean;
  enrollment?: Enrollment;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}
