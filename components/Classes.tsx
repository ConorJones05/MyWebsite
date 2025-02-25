'use client';

import { JSX, useState } from 'react';
import { FaPython, FaRProject, FaChartBar, FaCalculator, FaRobot, FaComments, FaBook, FaJava, FaDocker, FaServer, FaLaptopCode } from 'react-icons/fa';

interface ClassCardProps {
    title: string;
    description: string;
    attributes: string[];
    link: string;
}

const ClassCard = ({ title, description, attributes, link }: ClassCardProps) => {
    const [hovered, setHovered] = useState(false);

    const attributeIcons: { [key: string]: JSX.Element } = {
        "Python": <FaPython />,
        "R": <FaRProject />,
        "Statistics": <FaChartBar />,
        "Math": <FaCalculator />,
        "Machine Learning": <FaRobot />,
        "Communication": <FaComments />,
        "Theory": <FaBook />,
        "Java": <FaJava />,
        "Docker": <FaDocker />,
        "Application Deployment": <FaServer />,
        "Web Dev": <FaLaptopCode />
    };

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <div
                className="relative p-2 border border-gray-300 rounded-lg m-1 transition-transform transform hover:scale-105 bg-white text-black"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <h4 className="text-lg font-semibold">{title}</h4>
                <div className="mt-1">
                    {attributes.map((attr: string) => (
                        <span key={attr} className="inline-block mr-1 mb-1 px-1 py-0.5 bg-white rounded text-sm">
                            {attributeIcons[attr]} {attr}
                        </span>
                    ))}
                </div>
                {hovered && (
                    <div className="absolute top-full left-0 w-full p-2 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        {description}
                    </div>
                )}
            </div>
        </a>
    );
};

interface Course {
    title: string;
    description: string;
    attributes: string[];
    link: string;
}

const ClassList = ({ classes }: { classes: Course[] }) => {
    return (
        <div className="my_classes">
            <h2 className="title text-2xl font-bold mb-4 text-white">My Academics</h2>
            <div className="class_container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((course, index) => (
                    <ClassCard 
                        key={index} 
                        title={course.title} 
                        description={course.description} 
                        attributes={course.attributes} 
                        link={course.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default function MyClassesComponent() {
    const classes = [
        {
            "title": "COMP 110",
            "description": "Introduction to Programming and Data Science: The course offers an introduction to programming and data science, beginning with fundamentals such as data types and control structures, and advancing to concepts like recursion and data visualization. It emphasizes real-world applications, problem-solving, algorithm design, and the ethics of computing.",
            "attributes": ["Python"],
            "link": "https://example.com/comp110"
        },
        {
            "title": "STOR 455",
            "description": "Methods of Data Analysis: This course reviews basic statistical inference and covers two-sample comparisons, correlation, and an introduction to matrices. It includes simple and multiple regression, significance tests, diagnostics, variable selection, analysis of variance, and the use of statistical software.",
            "attributes": ["R", "Statistics"],
            "link": "https://example.com/stor455"
        },
        {
            "title": "MATH 210",
            "description": "Mathematical Tools for Data Science: This course covers linear algebra and optimization tools, including solving linear systems, matrix transformations, eigenvalues, and gradient descent. It applies these concepts to data science problems like image compression and neural networks, using computational tools such as Python.",
            "attributes": ["Machine Learning", "Math"],
            "link": "https://example.com/math210"
        },
        {
            "title": "INLS 201",
            "description": "Foundations of Information Science: This course explores the evolution of information science, covering topics such as information representation, organization, and management. It also addresses search and retrieval techniques, human information-seeking behaviors, organizational communication, and the policies and ethics surrounding scholarly communication.",
            "attributes": ["Communication", "Theory"],
            "link": "https://example.com/inls201"
        },
        {
            "title": "POLI 281",
            "description": "Data in Politics I: An Introduction: This course explores how the Information Revolution has transformed fields like business, journalism, and law, highlighting how data can address significant social issues. It aims to build students' confidence in handling and analyzing data, providing a foundation for more advanced techniques.",
            "attributes": ["R", "Statistics", "Communication"],
            "link": "https://example.com/poli281"
        },
        {
            "title": "POLI 130",
            "description": "Introduction to Comparative Politics: This course explores the various political systems and arrangements found in societies around the world, examining their diversity and characteristics.",
            "attributes": ["Communication"],
            "link": "https://example.com/poli130"
        },
        {
            "title": "STOR 120",
            "description": "Foundations of Statistics and Data Science: This course covers critical concepts in computer programming and statistical inference, incorporating hands-on analysis of real-world datasets like economic, document, geographical, and social network data. It also addresses social issues related to data analysis, such as privacy and design considerations.",
            "attributes": ["Python", "Statistics"],
            "link": "https://example.com/stor120"
        },
        {
            "title": "MATH 115",
            "description": "Reasoning with Data: Navigating a Quantitative World: This course teaches students to apply mathematical and statistical methods to solve societal issues, make informed personal decisions, and develop critical thinking skills. It covers real-world contexts such as voting, health, finance, and human behavior, but does not count towards psychology or neuroscience majors.",
            "attributes": ["Math"],
            "link": "https://example.com/math115"
        },
        {
            "title": "MATH 130",
            "description": "Precalculus Mathematics: This course provides foundational mathematical skills necessary for studying calculus, including working with functions and data, an introduction to trigonometry, parametric equations, and conic sections.",
            "attributes": ["Math"],
            "link": "https://example.com/math130"
        },
        {
            "title": "COMP 210",
            "description": "Data Structures and Analysis: I learned how to organize data for efficient manipulation in large-scale problems and data sets. Instead of just using existing data structures, I explored how these structures are built and why certain elements are included or excluded.",
            "attributes": ["Java", "Theory"],
            "link": "https://example.com/comp210"
        },
        {
            "title": "COMP 283",
            "description": "Discrete Structures: This course introduces discrete structures such as sets, tuples, relations, functions, graphs, and trees, along with the formal mathematics of logic, proof, and induction to analyze their properties and algorithms. It enhances problem-solving skills through puzzles and applications central to computer science.",
            "attributes": ["Theory", "Math"],
            "link": "https://example.com/comp283"
        },
        {
            "title": "COMP 290",
            "description": "Essential Tools for Computer Science: This course equips students with essential software engineering tools like git, Docker, and HTTP servers, while emphasizing self-learning and independent project development. It also offers exposure to the UNC Computer Science community and showcases opportunities for further academic and professional engagement.",
            "attributes": ["Docker", "Application Deployment", "Web Dev"],
            "link": "https://example.com/comp290"
        },
        {
            "title": "MATH 232",
            "description": "Calculus of Functions of One Variable II: This course focuses on the calculus of elementary transcendental functions, including integration techniques, handling indeterminate forms, Taylor's formula, and infinite series.",
            "attributes": ["Math"],
            "link": "https://example.com/math232"
        },
        {
            "title": "STOR 320",
            "description": "Introduction to Data Science: This course develops fundamental skills for data analysis, covering the entire process from data acquisition to data carpentry, exploration, modeling, and communication. Topics include regression, clustering, classification, algorithmic thinking, and handling non-standard data objects like networks and text data.",
            "attributes": ["Python", "Statistics"],
            "link": "https://example.com/stor320"
        }
    ];

    return <ClassList classes={classes} />;
}