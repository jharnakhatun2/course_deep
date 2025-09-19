//Course data type
export interface Course {
  _id?: string;
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
}
