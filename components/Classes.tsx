'use client';

import { JSX } from 'react';
import { FaPython, FaRProject, FaChartBar, FaCalculator, FaRobot, FaComments, FaBook, FaJava, FaDocker, FaServer, FaLaptopCode } from 'react-icons/fa';

interface ClassCardProps {
    title: string;
    attributes: string[];
    link: string;
}

const ClassCard = ({ title, attributes, link }: ClassCardProps) => {
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
            <div className="p-4 border border-gray-300 rounded-lg m-2 transition-all duration-300 hover:scale-105 bg-white text-black hover:shadow-xl">
                <h4 className="text-lg font-bold mb-3">{title}</h4>
                <div className="flex flex-wrap gap-2">
                    {attributes.map((attr: string) => (
                        <span key={attr} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                            {attributeIcons[attr]} {attr}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
};

interface Course {
    title: string;
    attributes: string[];
    link: string;
}

const ClassList = ({ classes }: { classes: Course[] }) => {
    return (
        <div className="my_classes">
            <div className="class_container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((course, index) => (
                    <ClassCard 
                        key={index} 
                        title={course.title} 
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
            "attributes": ["Python"],
            "link": "https://catalog.unc.edu/courses/comp/"
        },
        {
            "title": "STOR 455",
            "attributes": ["R", "Statistics"],
            "link": "https://catalog.unc.edu/courses/stor/"
        },
        {
            "title": "MATH 210",
            "attributes": ["Machine Learning", "Math"],
            "link": "https://catalog.unc.edu/courses/math/"
        },
        {
            "title": "INLS 201",
            "attributes": ["Communication", "Theory"],
            "link": "https://catalog.unc.edu/courses/inls/"
        },
        {
            "title": "POLI 281",
            "attributes": ["R", "Statistics", "Communication"],
            "link": "https://catalog.unc.edu/courses/poli/"
        },
        {
            "title": "POLI 130",
            "attributes": ["Communication"],
            "link": "https://catalog.unc.edu/courses/poli/"
        },
        {
            "title": "STOR 120",
            "attributes": ["Python", "Statistics"],
            "link": "https://catalog.unc.edu/courses/stor/"
        },
        {
            "title": "MATH 115",
            "attributes": ["Math"],
            "link": "https://catalog.unc.edu/courses/math/"
        },
        {
            "title": "MATH 130",
            "attributes": ["Math"],
            "link": "https://catalog.unc.edu/courses/math/"
        },
        {
            "title": "COMP 210",
            "attributes": ["Java", "Theory"],
            "link": "https://catalog.unc.edu/courses/comp/"
        },
        {
            "title": "COMP 283",
            "attributes": ["Theory", "Math"],
            "link": "https://catalog.unc.edu/courses/comp/"
        },
        {
            "title": "COMP 290",
            "attributes": ["Docker", "Application Deployment", "Web Dev"],
            "link": "https://catalog.unc.edu/courses/comp/"
        },
        {
            "title": "MATH 232",
            "attributes": ["Math"],
            "link": "https://catalog.unc.edu/courses/math/"
        },
        {
            "title": "STOR 320",
            "attributes": ["Python", "Statistics"],
            "link": "https://catalog.unc.edu/courses/stor/"
        }
    ];

    return <ClassList classes={classes} />;
}
