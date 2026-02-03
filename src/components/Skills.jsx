import { useState } from "react";
import skillsData from '../data/skillData.jsx';
import Tippy from '@tippyjs/react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 6;

  // Skill level descriptions
  const levelDescriptions = {
    Advanced: "Proficient in complex tasks",
    Intermediate: "Comfortable with common tasks",
    Basic: "Learning and experimenting"
  };

  // Filter skills based on the active tab
  const filteredCategory = skillsData.categories.find(
    category => category.title.toLowerCase() === activeTab.toLowerCase()
  );
  const filteredSkills = filteredCategory ? filteredCategory.skills : [];

  // Calculate pagination
  const totalSkills = filteredSkills.length;
  const totalPages = Math.ceil(totalSkills / skillsPerPage);
  const startIndex = (currentPage - 1) * skillsPerPage;
  const endIndex = startIndex + skillsPerPage;
  const currentSkills = filteredSkills.slice(startIndex, endIndex);

  // Handle pagination navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Debugging: Log skill icons to console
  currentSkills.forEach(skill => {
    console.log(`Skill: ${skill.name}, Icon: ${skill.icon}`);
  });

  return (
    <section id="skills" className="min-h-screen bg-white dark:bg-gray-800 pt-20 overflow-hidden" data-aos-duration="1000" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center mb-12 text-gray-800" data-aos-delay="600" data-aos="fade-down">
          <h2 className="text-5xl font-bold dark:text-white mb-2">{skillsData.title}</h2>
          <p className="text-lg dark:text-gray-400">{skillsData.subtitle}</p>
        </div>

        {/* Tabs Menu */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap" data-aos-delay="600" data-aos="fade-down">
          {skillsData.categories.map((category) => (
            <button
              key={category.title}
              onClick={() => {
                setActiveTab(category.title);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
                activeTab === category.title
                  ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-white"
              }`}
            >
              <i className={`bx ${category.icon}`}></i>
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4 gap-6" data-aos-delay="600" data-aos="fade-down">
          {currentSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-white rounded-lg shadow-lg p-6 hover:-translate-y-1 transition-transform flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white dark:bg-white dark:text-gray-800 mb-4">
                <i className={`bx ${skill.icon} text-5xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">{skill.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                <Tippy content={levelDescriptions[skill.level] || `Proficiency: ${skill.level}`} placement="top">
                  <span className="inline-block">{skill.level}</span>
                </Tippy>
              </p>
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

export default Skills;