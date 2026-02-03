import { useState } from "react";
import projectData from "../data/projectData.jsx";
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Filter projects based on the active tab
  const filteredProjects = activeTab === "all"
    ? projectData.projects
    : projectData.projects.filter(project => project.type.toLowerCase() === activeTab.toLowerCase());

  // Calculate pagination
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = activeTab === "all"
    ? filteredProjects.slice(startIndex, endIndex)
    : filteredProjects;

  // Handle pagination navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle Demo button click with SweetAlert2 confirmation
  const handleDemoClick = (url) => {
    Swal.fire({
      title: "Visit Demo?",
      text: "You will be redirected to the demo page.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F2937",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, go to demo",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  };

  // Handle Code button click with SweetAlert2 confirmation
  const handleCodeClick = (url) => {
    Swal.fire({
      title: "View Code?",
      text: "You will be redirected to the GitHub repository.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1F2937",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, view code",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  };

  // Debugging: Log project icons to console
  currentProjects.forEach(project => {
    console.log(`Project: ${project.title}, Icon: ${project.icon}`);
  });

  return (
    <section id="projects" className="min-h-screen pb-20 bg-white dark:bg-gray-800 pt-20" data-aos-duration="1000" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center mb-12 text-gray-800" data-aos-delay="600" data-aos="fade-down">
          <h2 className="text-5xl font-bold dark:text-white mb-2">{projectData.title}</h2>
          <p className="text-lg dark:text-gray-400">{projectData.subtitle}</p>
        </div>

        {/* Tabs Menu */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap" data-aos-delay="600" data-aos="fade-down">
          {[
            { value: "all", label: "All Projects", icon: "bx bx-grid-alt" },
            { value: "frontend", label: "Frontend", icon: "bx bx-desktop" },
            { value: "backend", label: "Backend", icon: "bx bx-server" },
            { value: "fullstack", label: "Fullstack", icon: "bx bx-code-alt" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                setCurrentPage(1); // Reset to page 1 when changing tabs
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-white"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos-delay="600" data-aos="fade-down">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-white rounded-lg shadow-lg p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white dark:bg-white dark:text-gray-800 shrink-0">
                  <i className={`bx ${project.icon} text-5xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.type} • {project.year} • {project.status}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <i className="bx bx-check text-lg"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
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
                {project.demo && (
                  <Tippy content="View Demo" placement="top">
                    <button
                      onClick={() => handleDemoClick(project.demo)}
                      className={`px-4 py-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                        project.demo && project.github ? 'w-[70%]' : 'w-full'
                      }`}
                    >
                      Demo
                      <i className="bx bx-link-external"></i>
                    </button>
                  </Tippy>
                )}
                {project.github && (
                  <Tippy content="View Code" placement="top">
                    <button
                      onClick={() => handleCodeClick(project.github)}
                      className={`px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                        project.demo && project.github ? 'w-[30%]' : 'w-full'
                      }`}
                    >
                      Code
                      <i className="bx bx-code"></i>
                    </button>
                  </Tippy>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {activeTab === "all" && totalPages > 1 && (
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

export default Projects;