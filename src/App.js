import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import Backgrounds from './assets/bg.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.scss';
import Login from './Login';

const App = () => {
  const containerRef = useRef();
  const [fullname, setFullname] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select choose course");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formattedDateString = (dateString) => {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const courses = [
    { value: "React Frontend Web Development Course 6 months 300 hours" },
    { value: "React Native Mobile App Development Course 4 months 200 hours" },
    { value: "Nodejs Backend Development Course 4 months 200 hours" },
    { value: "English Speaking in For Software Professionals 6 months 300 hours" },
    { value: "Web Frontend Development Online Training 4 months 50 hours" }
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

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>
      <div ref={containerRef} className='wrapper'>
        <div className='centered'>
          <div>
            <svg id="certificate-svg" xmlns="http://www.w3.org/2000/svg" width="900" height="90" viewBox="0 0 900 90">
              <text id="Certificate_of_Achievement_Ayşegül_Avcu" data-name="Certificate of Achievement Ayşegül Avcu" transform="translate(0 34)" fontSize="42" fontFamily="Rokkitt" fontWeight="300" textAnchor="middle" alignmentBaseline="middle">
                <tspan x="450" y="0">Certificate of Achievement</tspan>
                <tspan fontSize="32" fontWeight="800">
                  {fullname ? <tspan x="450" y="44">{fullname}</tspan> : <tspan x="450" y="44" fontWeight={"100"}>______ ___________</tspan>}
                </tspan>
              </text>
            </svg>
            {selectedOption === "Select choose course" && <div style={{ height: "120px" }}></div>}
            {selectedOption === courses[0].value &&
              <h3>
                By successfully completing the {" "}
                <b>
                  {selectedOption}
                </b>
                {" "} under the guidance of Udemig Software Academy,
                {" "}{fullname ? <b>{fullname}</b> : "_____ _________"} has demonstrated proficiency in a
                comprehensive range of front-end development technologies,
                project management methodologies, and design tools.
                <b> Congratulations!</b>
              </h3>
            }
            {selectedOption === courses[1].value && <h3>
              This is to certify that

              {" "}{fullname ? <b>{fullname}</b> : "_____ _________"} {" "}

              has successfully completed for four months of the <b>{selectedOption}</b> under the guidance of Udemig <b> Congratulations!</b></h3>}
            {selectedOption === courses[2].value &&
              <h3>
                This is to certify that
                <b>  {" "}{fullname ? <b>{fullname}</b> : "_____ _________"} {" "}</b>
                has successfully completed the Algorithm, Mongo DB, Next JS, Node JS, Express JS, and Projects <b>{selectedOption}</b> for four months. <b> Congratulations!</b>
              </h3>}
            {selectedOption === courses[3].value &&
              <h3>This is to certify that
                <b>  {" "}{fullname ? <b>{fullname}</b> : "_____ _________"} {" "}</b>
                has successfully completed the <b>{selectedOption}</b> in English
                under the guidance of Arabuleu & Udemig <b> Congratulations!</b></h3>}
            {selectedOption === courses[4].value && <p>
              <h3>This certificate is awarded to <b>{" "}{fullname ? <b>{fullname}</b> : "_____ _________"} {" "}</b>
                For successfully completing the ……months Algorithm, HTML, CSS, GIT, and JavaScript <b>{selectedOption}</b> under the guidance of Udemig. <b> Congratulations!</b>
              </h3>
            </p>}
            <div className='ul-row'>
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
      <div className='bg-light p-3'>
        <div className='row g-2'>
          <div className='col-md-3 col-6'>
            <input className='form-control' type="text" placeholder='Fullname' value={fullname} onChange={handleFullnameChange} />
          </div>
          <div className='col-md-4 col-6'>
            <select className='form-control' value={selectedOption} onChange={handleSelectChange}>
              <option disabled>Select choose course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.value}>{course.value}</option>
              ))}
            </select>
          </div>
          <div className='col-md-2 col-6'>
            <input className='form-control' type="date" value={date} onChange={handleDateChange} />
          </div>
          <div className='col-md-3 col-6'>
            <button className='btn btn-primary w-100' disabled={!fullname || selectedOption === "Select choose course"} onClick={generatePdf}>Generate PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
