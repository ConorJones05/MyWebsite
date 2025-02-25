"use client"; // Mark this page as client-side

import { useState, useEffect } from "react";
import { Link, Element, scroller } from "react-scroll";
import Head from "next/head";
import CommandPromptCursor from '../../components/CommandPromptCursor';
import Classes from '../../components/Classes'


export default function Home() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null); // track which job is expanded
  const [currentSection, setCurrentSection] = useState<string>("home"); // track the current section
  const [keyPressed, setKeyPressed] = useState<string | null>(null); // track the key pressed by the user
  useEffect(() => {
    setKeyPressed(null); // Ensure consistent initial state
  }, []);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false); // track chatbot visibility
  const [chatbotInput, setChatbotInput] = useState<string>(""); // track chatbot input
  const [chatbotResponse, setChatbotResponse] = useState<string>(""); // track chatbot response

  // Job data
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

  // job click
  const handleJobClick = (id: number): void => {
    setExpandedJob(expandedJob === id ? null : id); // Toggle expanded state
  };

  // keypress event
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'y' || event.key === 'Y' || event.key === 'n' || event.key === 'N') {
        setKeyPressed(event.key); // Update the state with pressed key

        if (event.key === 'y' || event.key === 'Y') {
          const sections = ['home', 'about', 'projects', 'jobs', 'contact'];
          const currentIndex = sections.indexOf(currentSection);
          const nextIndex = (currentIndex + 1) % sections.length;
          const nextSection = sections[nextIndex];

          setCurrentSection(nextSection);
          scroller.scrollTo(nextSection, {
            duration: 500,
            smooth: true,
            offset: -50,
          });
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentSection]); // Re-run effect when currentSection diff

  // chatbot input submission
  const handleChatbotSubmit = async () => {
    if (!chatbotInput.trim()) return;

    // Show loading animation
    setChatbotResponse("Thinking...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: chatbotInput }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        // Animate the response appearing
        setTimeout(() => {
          setChatbotResponse(data.choices[0].message.content);
        }, 300);
      } else {
        setChatbotResponse("Unexpected response format.");
      }
      setChatbotInput("");
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatbotResponse("An error occurred. Please try again.");
    }
  };

  {isChatbotOpen && (
    <div className="fixed top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50
      transform transition-all duration-300 ease-in-out
      animate-[slideIn_0.3s_ease-out]
      hover:shadow-xl">
    </div>
  )}

  return (
    <div className="h-screen w-full overflow-y-auto scroll-smooth">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full bg-custom-black shadow-md p-4 flex space-x-6 z-50 justify-start">
        <Link
          to="home"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          Home
        </Link>
        <Link
          to="about"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          About
        </Link>
        <Link
          to="projects"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          Projects
        </Link>
        <Link
          to="academics"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          Academics
        </Link>
        <Link
          to="jobs"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          Jobs
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          spy={true}
          offset={-50}
          className="cursor-pointer text-white hover:underline"
        >
          Contact
        </Link>
      </nav>

      {/* CHATBOT BUTTON */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed top-4 right-4 bg-custom-green text-black p-2 rounded-xl z-50 hover:bg-green-600 transition duration-300"
      >
        {isChatbotOpen ? "✕" : "💬"}
      </button>

      {/* CHATBOT */}
      {isChatbotOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="h-64 overflow-y-auto mb-4">
            {chatbotResponse && (
              <div className="mb-2">
                <p className="text-sm text-gray-800">{chatbotResponse}</p>
              </div>
            )}
          </div>
          <div className="flex text-black">
            {typeof window !== 'undefined' && (
              <input
                onKeyDown={(e) => e.key === "Enter" && handleChatbotSubmit()}
                value={chatbotInput}
                onChange={(e) => setChatbotInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
            )}

          </div>
        </div>
      )}

      {/* Homepage */}
      <Element name="home" className="h-screen flex items-center justify-center bg-custom-black">
        <div>
          <h1 className="text-4xl font-bold text-custom-green">Conor Jones Personal Website</h1>
          <p className="ml-2 font-Consolas text-custom-green">
            Press [Y/n] to continue:
            {<span className="ml-2">{keyPressed}</span>}
            <CommandPromptCursor />
          </p>
        </div>
      </Element>

      {/* Philosophy */}
      <Element name="about" className="h-screen flex flex-col items-center justify-center bg-black p-8">
        <h1 className="text-4xl font-bold mb-8">My Philosophy</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Communications Pillar */}
          <div 
            className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.open('https://github.com/your-username', '_blank')}
          >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Communications</h2>
        <p className="text-gray-700">
          Effective communication is crucial in data science. It involves translating complex technical concepts
          into clear insights that stakeholders can understand and act upon.
        </p>
          </div>

          {/* Statistics Pillar */}
          <div 
        className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
        onClick={() => window.open('https://linkedin.com/in/your-profile', '_blank')}
          >
        <h2 className="text-2xl font-bold mb-4 text-green-600">Statistics</h2>
        <p className="text-gray-700">
          Statistical analysis forms the foundation of data science. It enables us to draw meaningful
          conclusions from data and make informed decisions based on evidence.
        </p>
          </div>

          {/* Computer Science Pillar */}
          <div 
        className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
        onClick={() => window.open('https://your-portfolio.com', '_blank')}
          >
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Computer Science</h2>
        <p className="text-gray-700">
          Programming and computational thinking are essential tools in data science. They allow us to
          automate analysis, build models, and handle large datasets efficiently.
        </p>
          </div>
        </div>
      </Element>

      {/* Personal Projects */}
      <Element name="projects" className="min-h-screen flex flex-col items-center justify-center bg-black py-16">
        <h1 className="text-4xl font-bold mb-12">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-4">
          
          {/* Project Card 1 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <img src="/images/project1.jpg" alt="Project 1" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Personal Website</h3>
          <p className="text-gray-300 mb-4">A responsive personal website built with Next.js, TypeScript, and Tailwind CSS.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Next.js</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">TypeScript</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Tailwind</span>
          </div>
          <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer" 
             className="inline-block bg-custom-green text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            View Source
          </a>
        </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <img src="/images/project2.jpg" alt="Project 2" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Data Analysis Tool</h3>
          <p className="text-gray-300 mb-4">A Python-based tool for analyzing and visualizing large datasets.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Python</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Pandas</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Matplotlib</span>
          </div>
          <a href="https://github.com/yourusername/project2" target="_blank" rel="noopener noreferrer" 
             className="inline-block bg-custom-green text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            View Source
          </a>
        </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <img src="/images/project3.jpg" alt="Project 3" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Machine Learning Model</h3>
          <p className="text-gray-300 mb-4">A neural network for predicting student performance based on various factors.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">TensorFlow</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">Scikit-learn</span>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">NumPy</span>
          </div>
          <a href="https://github.com/yourusername/project3" target="_blank" rel="noopener noreferrer" 
             className="inline-block bg-custom-green text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            View Source
          </a>
        </div>
          </div>

        </div>
      </Element>

      {/* Academics */}
      <Element name="academics" className="min-h-screen flex flex-col items-center justify-center bg-black py-8 relative z-20">
        <h1 className="text-4xl font-bold">My Academics</h1>
        <div className="w-full mt-8 relative">
          <Classes />
        </div>
      </Element>


      {/* Work Expernce */}
      <Element name="jobs" className="h-screen flex flex-col items-center justify-center bg-custom-black relative overflow-hidden mb-8">
        <h1 className="text-5xl font-bold mb-8">My Work Experience</h1>
        <div className="flex space-x-4 relative z-11">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                expandedJob === job.id
                  ? "fixed left-4 max-w-[90vw] w-[800px] h-[550px]" // Expanded size with left positioning
                  : expandedJob
                  ? "w-40 h-40" // shrink other boxes when one is expanded
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
              {/* Overlay (dont show only shown when not expanded) */}
              {expandedJob !== job.id && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-white text-lg font-bold">{job.title}</h2> {/* Smaller font for shrunken boxes so it dont overhang*/}
                </div>
              )}
              {/* Expanded boxes stuff */}
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
                  {/* Pillars*/}
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

      {/* Contanct */}

      <Element name="contact" className="h-screen flex flex-col items-center justify-center bg-custom-black">
        <h1 className="text-4xl font-bold mb-8">Let's Connect!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-4">
          {/* Contact Info */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6 text-center">
              <div>
                <p className="text-custom-green font-semibold mb-2">Email</p>
                <a href="mailto:conor.jones@unc.edu" className="hover:text-custom-green transition-colors">
                  conor.jones@unc.edu
                </a>
              </div>
              <div>
                <p className="text-custom-green font-semibold mb-2">Based in</p>
                <p>Chapel Hill, North Carolina</p>
              </div>
              <div>
                <p className="text-custom-green font-semibold mb-2">Open for</p>
                <p>Data Science Internships & Research Opportunities</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Connect With Me</h2>
        <div className="grid grid-cols-2 gap-4">
          <a 
            href="https://github.com/conorjones13" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span className="mr-2">GitHub</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/conor-jones-861a7a251" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span className="mr-2">LinkedIn</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Prefer to chat directly?</p>
          <a 
            href="https://calendly.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-custom-green text-black px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 inline-block"
          >
            Schedule a Meeting
          </a>
        </div>
          </div>
        </div>
      </Element>
    </div>
  );
}