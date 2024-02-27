import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import Backgrounds from './bg.png';
import './style.scss';

const App = () => {
  const containerRef = useRef();
  const [fullname, setFullname] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select choose course");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const formattedDateString = (dateString) => {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const courses = [
    { value: "React Front-end Web Development Course 6 months 300 hour" },
    { value: "React Native Mobile App Development Course 4 months 200 hour" },
    { value: "Nodejs Back-end Development Course 4 months 200 hour" },
    { value: "English Speaking in For Software Professionals 6 months 300 hour" },
    { value: "Kid's Software Programming Course 4 months 50 hour" }
  ];

  const generatePdf = async () => {
    try {
      const pdfWidth = 900;
      const pdfHeight = 670;

      const doc = new jsPDF('landscape', 'mm', [pdfWidth, pdfHeight]);
      doc.addImage(Backgrounds, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const contentUrl = await toPng(containerRef.current);

      doc.addImage(contentUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      doc.save(`${fullname.replaceAll(' ', '_')}.pdf`);
      console.log('PDF oluşturuldu ve başarıyla indirildi.');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF oluşturma işleminde bir hata oluştu.');
    }
  };


  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const generateUniqueID = () => {
    const min = 100000;
    const max = 999999;
    return `cert_${Math.floor(Math.random() * (max - min + 1)) + min}`;
  }

  return (
    <div>
      <div ref={containerRef} className='container'>
        <div className='centered'>
          <div>
            <svg id="certificate-svg" xmlns="http://www.w3.org/2000/svg" width="900" height="90" viewBox="0 0 900 90">
              <text id="Certificate_of_Achievement_Ayşegül_Avcu" data-name="Certificate of Achievement Ayşegül Avcu" transform="translate(0 34)" fontSize="42" fontFamily="Rokkitt" fontWeight="300" textAnchor="middle" alignmentBaseline="middle">
                <tspan x="450" y="0">Certificate of Achievement</tspan>
                <tspan fontSize="32" fontWeight="800">
                  <tspan x="450" y="44">{fullname ? fullname : "Enter fullname"}</tspan>
                </tspan>
              </text>
            </svg>

            <h3>
              By successfully completing the {" "}
              <b>
                {selectedOption ? selectedOption : "Select choose course"}
              </b>
              {" "} under the guidance of Udemig Software Academy,
              <b>{" "}{fullname}</b> has demonstrated proficiency in a
              comprehensive range of front-end development technologies,
              project management methodologies, and design tools.
              <b> Congratulations!</b>
            </h3>
            <div className='row'>
              <ul>
                <li>Instructor:</li>
                <li>Date:</li>
                <li>Serial No:</li>
              </ul>
              <ul>
                <li>Mehmet Can Seyhan</li>
                <li>{formattedDateString(date)}</li>
                <li>{generateUniqueID()}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", width: "900px", paddingTop: "1rem"
      }}>
        <input type="text" placeholder='Fullname' value={fullname} onChange={handleFullnameChange} />
        <select value={selectedOption} onChange={handleSelectChange}>
          <option disabled>Select choose course</option>
          {courses.map((course, index) => (
            <option key={index} value={course.value}>{course.value}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={handleDateChange} />
        <button disabled={!fullname || selectedOption === "Select choose course"} onClick={generatePdf}>Generate PDF</button>
      </div>
    </div>
  );
};

export default App;
