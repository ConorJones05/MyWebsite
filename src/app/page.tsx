"use client"; // Mark this page as client-side

import { useState, useEffect } from "react";
import { Link, Element, scroller } from "react-scroll";
import Head from "next/head";
import CommandPromptCursor from '../../components/CommandPromptCursor'; // Import the blinking cursor

export default function Home() {
    const [expandedJob, setExpandedJob] = useState<number | null>(null); // Track which job is expanded
    const [currentSection, setCurrentSection] = useState<string>("home"); // Track the current section
    const [keyPressed, setKeyPressed] = useState<string | null>(null); // Track the key pressed by the user

  // Job data (updated with your resume details and pillars)
  const jobs = [
    {
      id: 1,
      title: "Boys and Girls Club of Cabarrus County",
      image: "/images/b_and_G.jpg",
      description: "Program Assistant | July 2021 - February 2025 | Concord, NC",
      details: [
        "Created and led the BGC Robotics Program, enrolling over 20 youths.",
        "Oversaw and facilitated students through life skills-building activities.",
        "Fostered a supportive and inclusive environment for youth development.",
      ],
      pillars: {
        communications: [
          "Communicated complex technical concepts to youth in an accessible way.",
          "Collaborated with team members to design and implement educational programs.",
        ],
        statistics: [
          "Analyzed program participation data to measure impact and improve engagement.",
        ],
        computerScience: [
          "Developed and taught robotics programming using Python and LEGO Mindstorms.",
        ],
      },
    },
    {
      id: 2,
      title: "Carolina Housing",
      image: "/images/granville.jpg",
      description: "Resident Advisor | January 2024 - Present | Chapel Hill, NC",
      details: [
        "Responsible for 25 residents, fostering a supportive and inclusive living environment.",
        "Planned and organized community-building events and educational talks.",
        "Provided one-on-one support to residents through regular check-ins and advising sessions.",
      ],
      pillars: {
        communications: [
          "Facilitated open and effective communication among residents.",
          "Presented educational talks on topics like time management and conflict resolution.",
        ],
        statistics: [
          "Collected and analyzed feedback from residents to improve programming.",
        ],
        computerScience: [
          "Used Excel and Google Sheets to track resident engagement and event attendance.",
        ],
      },
    },
    {
      id: 3,
      title: "Carolina Institute of Neurostimulation",
      image: "/images/MaryEllenJones-8-pf8irpsn4xmvl9b11wcczi8ao3eeeggonu9omvk31s.jpg",
      description: "Research Assistant | October 2024 - Present | Chapel Hill, NC",
      details: [
        "Conducted analysis on correlations between the Default Mode Network (DMN) and Dorsal Attention Network (DAN).",
        "Developed software for tracking pupil sizes of patients in neurostimulation studies.",
        "Built and configured a tACTS machine for brainwave stimulation experiments.",
      ],
      pillars: {
        communications: [
          "Presented research findings at team meetings and conferences.",
          "Collaborated with cross-functional teams to design experiments.",
        ],
        statistics: [
          "Performed statistical analysis on brainwave data using R and Python.",
          "Applied regression models to identify correlations between neural networks.",
        ],
        computerScience: [
          "Developed software for data collection and analysis using Python.",
          "Configured and maintained hardware for neurostimulation experiments.",
        ],
      },
    },
    {
      id: 4,
      title: "Undergraduate Teaching Assistant",
      image: "/images/SittersonHallSmall.jpg",
      description: "Introduction to Programming and Data Science | August 2024 - Present | Chapel Hill, NC",
      details: [
        "Administered tests and supported in-class assignments during lectures.",
        "Held office hours to provide academic assistance and address student inquiries.",
        "Contributed to the development and maintenance of a team website.",
      ],
      pillars: {
        communications: [
          "Explained complex programming concepts to students in a clear and concise manner.",
          "Provided constructive feedback on assignments and projects.",
        ],
        statistics: [
          "Assisted students with statistical analysis using R and Python.",
        ],
        computerScience: [
          "Helped students debug code and understand algorithms.",
          "Contributed to the development of a team website using HTML, CSS, and JavaScript.",
        ],
      },
    },
  ];

  // Handle job click
  const handleJobClick = (id: number): void => {
    setExpandedJob(expandedJob === id ? null : id); // Toggle expanded state
  };

  // Handle keypress event
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'y' || event.key === 'Y' || event.key === 'n' || event.key === 'N') {
        setKeyPressed(event.key); // Update the state with the pressed key

        if (event.key === 'y' || event.key === 'Y') {
          const sections = ['home', 'about', 'projects', 'jobs', 'contact'];
          const currentIndex = sections.indexOf(currentSection);
          const nextIndex = (currentIndex + 1) % sections.length;
          const nextSection = sections[nextIndex];

          setCurrentSection(nextSection);
          scroller.scrollTo(nextSection, {
            duration: 500,
            smooth: true,
            offset: -50, // Adjust this value if needed
          });
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentSection]); // Re-run effect when currentSection changes

  return (
    <div className="h-screen w-full overflow-y-auto scroll-smooth">
      <Head>
        <title>Conor Jones Personal Website</title>
      </Head>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-center space-x-4 z-50">
        <Link to="home" smooth={true} duration={500} spy={true} offset={-50} className="cursor-pointer text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="about" smooth={true} duration={500} spy={true} offset={-50} className="cursor-pointer text-blue-500 hover:underline">
          About
        </Link>
        <Link to="projects" smooth={true} duration={500} spy={true} offset={-50} className="cursor-pointer text-blue-500 hover:underline">
          Projects
        </Link>
        <Link to="jobs" smooth={true} duration={500} spy={true} offset={-50} className="cursor-pointer text-blue-500 hover:underline">
          Jobs
        </Link>
        <Link to="contact" smooth={true} duration={500} spy={true} offset={-50} className="cursor-pointer text-blue-500 hover:underline">
          Contact
        </Link>
      </nav>

      {/* SECTIONS */}
      <Element name="home" className="h-screen flex items-center justify-center bg-black">
        <div>
          <h1 className="text-4xl font-bold">Conor Jones Personal Website</h1>
          <p className="text-2x mt-4 font-Consolas">
            Welcome (Press Y/n to continue)
            <CommandPromptCursor />
            {keyPressed && <span className="ml-2">{keyPressed}</span>}
          </p>
        </div>
      </Element>

      {/* Other sections (About, Projects, Jobs, Contact) */}
      <Element name="about" className="h-screen flex items-center justify-center bg-green-200">
        <h1 className="text-4xl font-bold">About Me</h1>
      </Element>

      <Element name="projects" className="h-screen flex items-center justify-center bg-purple-200">
        <h1 className="text-4xl font-bold">My Projects</h1>
      </Element>

      <Element name="jobs" className="h-screen flex flex-col items-center justify-center bg-blue-200 relative overflow-hidden mb-8">
        <h1 className="text-5xl font-bold mb-8">My Work Experience</h1>
        <div className="flex space-x-4 relative z-11">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                expandedJob === job.id
                  ? "fixed left-4 max-w-[90vw] w-[800px] h-[550px]" // Expanded size with left positioning
                  : expandedJob
                  ? "w-40 h-40" // Shrink other boxes when one is expanded
                  : "w-60 h-60 hover:scale-105" // Default size
              }`}
              onClick={() => handleJobClick(job.id)}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${job.image})`,
                }}
              />
              {/* Overlay (only shown when not expanded) */}
              {expandedJob !== job.id && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-white text-lg font-bold">{job.title}</h2> {/* Smaller font for shrunken boxes */}
                </div>
              )}
              {/* Expanded content */}
              {expandedJob === job.id && (
                <div className="absolute inset-0 p-6 bg-gray-200 bg-opacity-90 flex flex-col items-center justify-center">
                  <img src={job.image} alt={job.title} className="w-48 h-48 object-cover mb-4 rounded-lg" />
                  <h2 className="text-black text-2xl font-bold mb-2">{job.title}</h2>
                  <p className="text-gray-800 text-center">{job.description}</p>
                  <ul className="text-gray-800 list-disc list-inside mt-4">
                    {job.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  {/* Pillars of Data Science */}
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2 text-black">Pillars of Data Science</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-black">Communications</h4>
                        <ul className="list-disc list-inside text-black">
                          {job.pillars.communications.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Statistics</h4>
                        <ul className="list-disc list-inside text-black">
                          {job.pillars.statistics.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Computer Science</h4>
                        <ul className="list-disc list-inside text-black">
                          {job.pillars.computerScience.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Element>

      <Element name="contact" className="h-screen flex items-center justify-center bg-red-200">
        <h1 className="text-4xl font-bold">Contact Me</h1>
      </Element>
    </div>
  );
}