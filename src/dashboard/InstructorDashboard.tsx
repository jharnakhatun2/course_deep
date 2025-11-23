import  { useState, type FC } from 'react';
import { PiUploadSimpleThin, PiPlus, PiTrashSimpleLight } from "react-icons/pi";
import { LiaSave } from "react-icons/lia";
import type { Contact, CurriculumItem, InstrutorCourse, Lesson, SocialLinks } from '../ult/types/types';
import { Section } from '../ult/instructorInput/Section';
import { DynamicInputList } from '../ult/instructorInput/DynamicInputList';
import { useAddInstructorCourseMutation } from '../features/instructor-course/instructorCourseApi';
import { showErrorToast, showSuccessToast } from '../ult/toast/toast';


const InstructorDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [addInstructorCourse, { isLoading }] = useAddInstructorCourseMutation();
  const [courseData, setCourseData] = useState<InstrutorCourse>({
    name: '',
    price: 0.00,
    ratings: 4.8,
    time: '',
    teacher: {
      name: '',
      role: '',
      experience: '',
      specialistIn: '',
      currentWork: '',
      profession: '',
      image: '',
      contact: { phone: '', mobile: '', email: '' },
      socialLinks: { facebook: '', twitter: '', googlePlus: '#', linkedin: '' },
      biography: '',
      topicsHandling: []
    },
    shortDes: '',
    description: ['', ''],
    image: '',
    category: '',
    level: 'Intermediate',
    language: 'English',
    studentsEnrolled: 0,
    certificate: true,
    lastUpdated: new Date().toISOString().split('T')[0],
    courseURL: '',
    prerequisites: [],
    promoVideo: '',
    teacherProfession: '',
    lessons: '',
    whatYouWillLearn: [],
    curriculum: [],
    totalDays: '',
    totalDurationLength: '',
    totalLectures: '',
    totalSection: ''
  });

  //input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setCourseData(prev => ({
      ...prev,
      [name]: type === "number"
        ? Number(value)
        : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleTeacherChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      teacher: { ...prev.teacher, [field]: value }
    }));
  };

  const handleContactChange = (field: keyof Contact, value: string) => {
    setCourseData(prev => ({
      ...prev,
      teacher: {
        ...prev.teacher,
        contact: { ...prev.teacher.contact, [field]: value }
      }
    }));
  };

  const handleSocialChange = (field: keyof SocialLinks, value: string) => {
    setCourseData(prev => ({
      ...prev,
      teacher: {
        ...prev.teacher,
        socialLinks: { ...prev.teacher.socialLinks, [field]: value }
      }
    }));
  };

  const addArrayItem = (field: keyof InstrutorCourse, item: string = '') => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), item]
    }));
  };

  const updateArrayItem = (field: keyof InstrutorCourse, index: number, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: keyof InstrutorCourse, index: number) => {
    setCourseData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };


  // For curriculum arrays
  const addCurriculumItem = (item: CurriculumItem) => {
    setCourseData(prev => ({
      ...prev,
      curriculum: [...(prev.curriculum || []), item]
    }));
  };

  // Update addCurriculumSection to use the new function
  const addCurriculumSection = () => {
    const newSection: CurriculumItem = {
      title: '',
      lectures: '',
      duration: '',
      lessons: []
    };
    addCurriculumItem(newSection);
  };

  const updateCurriculumSection = (index: number, field: keyof CurriculumItem, value: any) => {
    const updatedCurriculum = [...(courseData?.curriculum ?? [])];
    updatedCurriculum[index] = { ...updatedCurriculum[index], [field]: value };
    setCourseData(prev => ({ ...prev, curriculum: updatedCurriculum }));
  };

  const addLesson = (sectionIndex: number) => {
    const newLesson: Lesson = { id: '', title: '', duration: '', type: 'video' };
    const updatedCurriculum = [...(courseData?.curriculum ?? [])];
    updatedCurriculum[sectionIndex].lessons.push(newLesson);
    setCourseData(prev => ({ ...prev, curriculum: updatedCurriculum }));
  };

  const updateLesson = (sectionIndex: number, lessonIndex: number, field: keyof Lesson, value: string) => {
    const updatedCurriculum = [...(courseData?.curriculum ?? [])];
    updatedCurriculum[sectionIndex].lessons[lessonIndex] = {
      ...updatedCurriculum[sectionIndex].lessons[lessonIndex],
      [field]: value
    };
    setCourseData(prev => ({ ...prev, curriculum: updatedCurriculum }));
  };

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    const updatedCurriculum = [...(courseData?.curriculum ?? [])];
    updatedCurriculum[sectionIndex].lessons.splice(lessonIndex, 1);
    setCourseData(prev => ({ ...prev, curriculum: updatedCurriculum }));
  };


  //form submit handler
  const handleSubmit = async () => {

    try {
      await addInstructorCourse(courseData).unwrap();
      showSuccessToast('Course uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload course:', error);
      showErrorToast('Failed to upload course. Please try again.');
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'content', label: 'Content' },
    { id: 'curriculum', label: 'Curriculum' }
  ];

  //variable for class
  const inputStyle = "w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-yellow-400 focus:border-transparent outline-none text-sm";
  const lebelStyle = "block text-sm font-medium text-zinc-600 mb-2";
  const addButton = "inline-flex items-center px-4 py-2 text-sm text-teal-600 hover:bg-yellow-100 transition-smooth cursor-pointer hover:shadow-lg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="lg:max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl text-zinc-700">Create New Course</h1>
              <p className=" text-sm text-teal-500">Fill in the details to upload your course</p>
            </div>
            {/* Submit Button using isLoading */}
            <button
              onClick={handleSubmit}
              disabled={isLoading} // Disable button when loading
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-smooth cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <LiaSave className="w-5 h-5 mr-2" />
                  Publish Course
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id
                  ? 'border-b-2 border-yellow-500 text-yellow-500'
                  : 'text-zinc-600 hover:text-zinc-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">

          {/* Basic Information */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={lebelStyle}>Course Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={courseData.name}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., React.js Frontend Development"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Course Duration</label>
                  <input
                    type="text"
                    name="time"
                    value={courseData.time}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 5 hours"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={courseData.category}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Frontend"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Level</label>
                  <select
                    value={courseData.level}
                    name="level"
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className={lebelStyle}>Language</label>
                  <input
                    type="text"
                    name="language"
                    value={courseData.language}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="English"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Course Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={courseData.image}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Promo Video URL</label>
                  <input
                    type="text"
                    name="promoVideo"
                    value={courseData.promoVideo}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="https://youtu.be/..."
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Course URL</label>
                  <input
                    type="text"
                    name="courseURL"
                    value={courseData.courseURL}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="/courses/..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="certificate"
                    checked={courseData.certificate}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Certificate Available</label>
                </div>
              </div>

              <div>
                <label className={lebelStyle}>Short Description</label>
                <textarea
                  value={courseData.shortDes}
                  name="shortDes"
                  onChange={handleInputChange}
                  rows={2}
                  className={inputStyle}
                  placeholder="Brief course description..."
                />
              </div>

              {/* Prerequisites */}
              <Section title="Prerequisites">
                <DynamicInputList
                  items={courseData.prerequisites ?? []}
                  field="prerequisites"
                  placeholder="Enter prerequisite"
                  addItem={addArrayItem}
                  updateItem={updateArrayItem}
                  removeItem={removeArrayItem}
                  inputStyle={inputStyle}
                  addButton={addButton}
                />
              </Section>
            </div>
          )}

          {/* Teacher Information */}
          {activeTab === 'teacher' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6">Teacher Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={lebelStyle}>Name *</label>
                  <input
                    type="text"
                    value={courseData.teacher.name}
                    onChange={(e) => handleTeacherChange('name', e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Role</label>
                  <input
                    type="text"
                    value={courseData.teacher.role}
                    onChange={(e) => handleTeacherChange('role', e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Experience</label>
                  <input
                    type="text"
                    value={courseData.teacher.experience}
                    onChange={(e) => handleTeacherChange('experience', e.target.value)}
                    className={inputStyle}
                    placeholder="e.g., 17+ years"
                  />
                </div>

                <div>
                  <label className={lebelStyle}>Profession</label>
                  <input
                    type="text"
                    value={courseData.teacher.profession}
                    onChange={(e) => handleTeacherChange('profession', e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={lebelStyle}>Specialist In</label>
                  <input
                    type="text"
                    value={courseData.teacher.specialistIn}
                    onChange={(e) => handleTeacherChange('specialistIn', e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={lebelStyle}>Image URL</label>
                  <input
                    type="text"
                    value={courseData.teacher.image}
                    onChange={(e) => handleTeacherChange('image', e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="pt-9 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={lebelStyle}>Phone</label>
                    <input
                      type="text"
                      value={courseData.teacher.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={lebelStyle}>Mobile</label>
                    <input
                      type="text"
                      value={courseData.teacher.contact.mobile}
                      onChange={(e) => handleContactChange('mobile', e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={lebelStyle}>Email</label>
                    <input
                      type="email"
                      value={courseData.teacher.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-9 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={lebelStyle}>Facebook</label>
                    <input
                      type="text"
                      value={courseData.teacher.socialLinks.facebook}
                      onChange={(e) => handleSocialChange('facebook', e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={lebelStyle}>Twitter</label>
                    <input
                      type="text"
                      value={courseData.teacher.socialLinks.twitter}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={lebelStyle}>LinkedIn</label>
                    <input
                      type="text"
                      value={courseData.teacher.socialLinks.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={lebelStyle}>Biography</label>
                <textarea
                  value={courseData.teacher.biography}
                  onChange={(e) => handleTeacherChange('biography', e.target.value)}
                  rows={4}
                  className={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Course Content */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-6">Course Content</h2>

              {/* Description */}
              <Section title="Description">
                <DynamicInputList
                  items={courseData.description ?? []}
                  field="description"
                  placeholder="Write description"
                  addItem={addArrayItem}
                  updateItem={updateArrayItem}
                  removeItem={removeArrayItem}
                  inputStyle={inputStyle}
                  addButton={addButton}
                />
              </Section>

              {/* What You Will Learn */}
              <Section title="What You Will Learn">
                <DynamicInputList
                  items={courseData.whatYouWillLearn ?? []}
                  field="whatYouWillLearn"
                  placeholder="Enter point"
                  addItem={addArrayItem}
                  updateItem={updateArrayItem}
                  removeItem={removeArrayItem}
                  inputStyle={inputStyle}
                  addButton={addButton}
                />
              </Section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total days */}
                <div>
                  <label className={lebelStyle}>Total Days</label>
                  <input
                    type="text"
                    name="totalDays"
                    value={courseData.totalDays}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 5 days"
                  />
                </div>

                {/* course duration length */}
                <div>
                  <label className={lebelStyle}>Total Duration</label>
                  <input
                    type="text"
                    name="totalDurationLength"
                    value={courseData.totalDurationLength}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 28 hours"
                  />
                </div>

                {/* Total Lectures */}
                <div>
                  <label className={lebelStyle}>Total Lectures</label>
                  <input
                    type="number"
                    name="totalLectures"
                    value={courseData.totalLectures}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 95"
                  />
                </div>

                {/* Total Sections */}
                <div>
                  <label className={lebelStyle}>Total Sections</label>
                  <input
                    type="number"
                    name="totalSection"
                    value={courseData.totalSection}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Course Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-zinc-900">Course Curriculum</h2>
                <button
                  onClick={addCurriculumSection}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-medium hover:bg-yellow-400 transition-smooth cursor-pointer shadow-lg"
                >
                  <PiPlus className="w-4 h-4 mr-2" />
                  Add Section
                </button>
              </div>

              {courseData.curriculum?.map((section, sectionIndex) => (
                <div key={section._id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-zinc-900">Section {section._id}</h3>
                    <button
                      onClick={() => removeArrayItem('curriculum', sectionIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-smooth cursor-pointer"
                    >
                      <PiTrashSimpleLight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-3">
                      <label className={lebelStyle}>Section Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateCurriculumSection(sectionIndex, 'title', e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., Day 1 - Introduction to React"
                      />
                    </div>

                    <div>
                      <label className={lebelStyle}>Lectures</label>
                      <input
                        type="text"
                        value={section.lectures}
                        onChange={(e) => updateCurriculumSection(sectionIndex, 'lectures', e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., 5 lectures"
                      />
                    </div>

                    <div>
                      <label className={lebelStyle}>Duration</label>
                      <input
                        type="text"
                        value={section.duration}
                        onChange={(e) => updateCurriculumSection(sectionIndex, 'duration', e.target.value)}
                        className={inputStyle}
                        placeholder="e.g., 1hr 20min"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Lessons</label>
                      <button
                        onClick={() => addLesson(sectionIndex)}
                        className={addButton}
                      >
                        <PiPlus className="w-4 h-4 mr-1" />
                        Add Lesson
                      </button>
                    </div>

                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Lesson {lessonIndex + 1}</span>
                          <button
                            onClick={() => removeLesson(sectionIndex, lessonIndex)}
                            className="py-1 px-2 text-red-600 hover:bg-red-50 rounded transition-smooth cursor-pointer"
                          >
                            X
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Video ID</label>
                            <input
                              type="text"
                              value={lesson.id}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'id', e.target.value)}
                              className={inputStyle}
                              placeholder="e.g., OpHbSHp8PcI"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Lesson Title</label>
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'title', e.target.value)}
                              className={inputStyle}
                              placeholder="e.g., React Data Fetching Patterns"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-zinc-500 mb-1">Duration</label>
                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'duration', e.target.value)}
                                className={inputStyle}
                                placeholder="e.g., 34.31"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-zinc-500 mb-1">Type</label>
                              <select
                                value={lesson.type}
                                onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'type', e.target.value)}
                                className={inputStyle}
                              >
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                                <option value="quiz">Quiz</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {section.lessons.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm bg-white border border-gray-200 rounded-lg">
                        No lessons added yet. Click "Add Lesson" to get started.
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {courseData.curriculum?.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <PiUploadSimpleThin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg font-medium mb-1">No curriculum sections yet</p>
                  <p className="text-sm">Click "Add Section" to create your first curriculum section</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;