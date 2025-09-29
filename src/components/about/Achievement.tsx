const achievements = [
    { value: "150+", label: "Courses" },
    { value: "30K+", label: "Students" },
    { value: "180+", label: "Instructors" },
    { value: "10K+", label: "Certificates" },
  ];

const Achievement = () => {
  return (
    <section className="bg-gray-500 text-white p-5 lg:p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl lg:text-5xl font-bold text-yellow-400 mb-2">
                  {item.value}
                </div>
                <div className="text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
  )
}

export default Achievement