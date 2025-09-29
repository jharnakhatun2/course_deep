const achievements = [
    { value: "37+", label: "Peer-Reviewed Papers" },
    { value: "84+", label: "Patents Granted" },
    { value: "22M+", label: "Daily Predictions" },
    { value: "98%", label: "Client Retention" },
  ];

const Achievement = () => {
  return (
    <section className="bg-gray-500 text-white p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((item, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-yellow-400 mb-2">
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