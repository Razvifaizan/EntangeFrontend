import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";

const CoursePDF = ({ course }) => {
  const pdfRef = useRef();

  const handleDownload = () => {
    const input = pdfRef.current;

    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.name}.pdf`);
    });
  };

  return (
    <div>
      <div ref={pdfRef} style={{ padding: "20px", background: "#fff" }}>
        <h2>{course.name}</h2>
        {course.subcategories.map((sub, i) => (
          <div key={i}>
            <h3>{sub.name}</h3>
            <p><strong>Duration:</strong> {sub.duration}</p>
            <p>{sub.description}</p>
            {sub.topics.map((topic, j) => (
              <div key={j}>
                <h4>Topic: {topic.title}</h4>
                {topic.subtopics.map((subtopic, k) => (
                  <p key={k}>- {subtopic.title}</p>
                ))}
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>

      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default CoursePDF;
