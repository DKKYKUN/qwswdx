import { useState } from "react";
import experienceData from "../data/experinceData.jsx";
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';

const Experience = () => {
  const [activeTab, setActiveTab] = useState("Work");
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 6;

  // Filter experiences based on the active tab
  const filteredExperiences = experienceData.experiences.filter(
    experience => experience.tab.toLowerCase() === activeTab.toLowerCase()
  );

  // Calculate pagination
  const totalExperiences = filteredExperiences.length;
  const totalPages = Math.ceil(totalExperiences / experiencesPerPage);
  const startIndex = (currentPage - 1) * experiencesPerPage;
  const endIndex = startIndex + experiencesPerPage;
  const currentExperiences = filteredExperiences.slice(startIndex, endIndex);

  // Handle pagination navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle Details button click with SweetAlert2 confirmation
  const handleDetailsClick = (url) => {
    Swal.fire({
      title: "View Details?",
      text: "You will be redirected to the details page.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F2937",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, view details",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else if (!url) {
        Swal.fire({
          title: "No Details Available",
          text: "Details for this experience are not available yet.",
          icon: "info",
          confirmButtonColor: "#1F2937",
          confirmButtonText: "OK",
        });
      }
    });
  };

  // Handle Company button click with SweetAlert2 confirmation
  const handleCompanyClick = (url) => {
    Swal.fire({
      title: "Visit Company?",
      text: "You will be redirected to the company website.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F2937",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, visit company",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else if (!url) {
        Swal.fire({
          title: "No Company Link Available",
          text: "The company website is not available yet.",
          icon: "info",
          confirmButtonColor: "#1F2937",
          confirmButtonText: "OK",
        });
      }
    });
  };

  // Debugging: Log experience icons to console
  currentExperiences.forEach(experience => {
    console.log(`Experience: ${experience.title}, Icon: ${experience.icon}`);
  });

  return (
    <section id="experience" className="min-h-screen bg-white dark:bg-gray-800 pt-20 overflow-hidden" data-aos-duration="1000" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center mb-12 text-gray-800" data-aos-delay="600" data-aos="fade-down">
          <h2 className="text-5xl font-bold dark:text-white mb-2">{experienceData.title}</h2>
          <p className="text-lg dark:text-gray-400">{experienceData.subtitle}</p>
        </div>

        {/* Tabs Menu */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap" data-aos-delay="600" data-aos="fade-down">
          {experienceData.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-white"
              }`}
            >
              <i className={`bx bx-${tab.toLowerCase() === "work" ? "briefcase" : "group"}`}></i>
              {tab}
            </button>
          ))}
        </div>

        {/* Experiences Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mb-4 gap-6" data-aos-delay="600" data-aos="fade-down">
          {currentExperiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-white rounded-lg shadow-lg p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white dark:bg-white dark:text-gray-800 shrink-0">
                  <i className={`bx ${experience.icon} text-5xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{experience.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{experience.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{experience.year} • {experience.location}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Responsibilities:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  {experience.description.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <i className="bx bx-check text-lg"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {experience.details && (
                  <Tippy content="View Details" placement="top">
                    <button
                      onClick={() => handleDetailsClick(experience.details)}
                      className={`px-4 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                        experience.details && experience.companyUrl ? 'w-[70%]' : 'w-full'
                      }`}
                    >
                      Details
                      <i className="bx bx-link-external"></i>
                    </button>
                  </Tippy>
                )}
                {experience.companyUrl && (
                  <Tippy content="Visit Company" placement="top">
                    <button
                      onClick={() => handleCompanyClick(experience.companyUrl)}
                      className={`px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                        experience.details && experience.companyUrl ? 'w-[30%]' : 'w-full'
                      }`}
                    >
                      Company
                      <i className="bx bx-building"></i>
                    </button>
                  </Tippy>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2" data-aos-delay="600" data-aos="fade-down">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white dark:bg-white dark:text-gray-800 hover:-translate-y-1"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                    : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:-translate-y-1"
                }`}
              >
                {page}
            </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white dark:bg-white dark:text-gray-800 hover:-translate-y-1"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;