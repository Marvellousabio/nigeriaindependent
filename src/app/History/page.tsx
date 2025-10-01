const History = () => {
  const timeline = [
    { year: "500 BC - 200 AD", event: "Nok Civilization flourishes" },
    { year: "1000 AD", event: "Kanem-Bornu Empire established" },
    { year: "1400s", event: "Benin Empire at its peak" },
    { year: "1960", event: "Independence from British colonial rule" },
    { year: "1999", event: "Return to democratic governance" },
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-8">Our History</h2>
        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="min-w-[140px] text-green-700 font-bold">{item.year}</div>
              <div className="text-gray-700 text-lg">{item.event}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default History