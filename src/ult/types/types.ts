//Course data type
export interface Course {
  _id?: string;
  name: string;
  price: string;
  ratings: string;
  time: string;
  teacher: string;
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
