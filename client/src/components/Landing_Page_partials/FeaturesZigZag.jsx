import React from 'react';
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

function FeaturesZigzag({ images }) {
    const features = [
        {
            title: "Easy Event Setup",
            subtitle: "Launch hackathons effortlessly",
            description: "Set up a fully customizable hackathon landing page in minutes. Define themes, rules, and schedules seamlessly to ensure a smooth experience for organizers and participants.",
            points: [
                "Quick setup with branding & themes",
                "Flexible event scheduling",
                "User-friendly interface"
            ]
        },
        {
            title: "One-Click Registrations",
            subtitle: "Simplify participant sign-ups",
            description: "Enable hassle-free event registration with social authentication. Participants can sign up using Google, GitHub, or email, reducing friction and increasing turnout.",
            points: [
                "Seamless sign-ups with social logins",
                "Automated email confirmations",
                "Secure participant data handling"
            ]
        },
        {
            title: "Smart Team Formation",
            subtitle: "Effortless collaboration",
            description: "Allow participants to easily form or join teams based on shared interests and skills. Teams can coordinate seamlessly within the platform.",
            points: [
                "Team matchmaking suggestions",
                "Easy invite & join process",
                "Integrated team chat support"
            ]
        },
        {
            title: "Project Submissions & Judging",
            subtitle: "Streamlined evaluation process",
            description: "Submit projects with GitHub links, demo videos, and supporting documents. Multi-stage judging allows fair assessment and ranking of submissions.",
            points: [
                "Supports GitHub & demo links",
                "Multi-stage scoring system",
                "Automated plagiarism detection"
            ]
        },
        {
            title: "Resume-Based Registrations",
            subtitle: "Enhance participant screening",
            description: "Enable recruiters and event hosts to shortlist candidates based on their resumes. This helps in selecting top talent for hackathons.",
            points: [
                "Upload & parse resumes",
                "Recruiter-friendly filtering",
                "Automated profile matching"
            ]
        },
        {
            title: "Recruitment & Hiring",
            subtitle: "Connect talent with opportunities",
            description: "Integrated job postings allow companies to scout potential candidates for internships and full-time roles directly from hackathons.",
            points: [
                "Job postings integrated",
                "Talent scouting dashboard",
                "Direct company-participant interaction"
            ]
        }
    ];

    return (
        <section className="bg-[#000814] text-white p-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20 border-t border-gray-700">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h2 mb-4">Effortless Event Management</h1>
                        <p className="text-2xl text-gray-400">
                            Our platform provides a range of features, including event creation and the ability to take registrations, all while accommodating multiple admins.
                        </p>
                    </div>
                    <div className="grid gap-20">
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="md:grid md:grid-cols-12 md:gap-6 items-center"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                                >
                                    <img
                                        className="max-w-full mx-auto md:max-w-none h-auto rounded-xl shadow-lg"
                                        src={images[index]?.src || ''}
                                        width="540"
                                        height="405"
                                        alt={images[index]?.title || ''}
                                    />
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}
                                > 
                                    <div className="md:pr-4 lg:pr-12 xl:pr-16">
                                        <div className="text-xl text-[#38BDF8] font-semibold mb-2">{feature.title}</div>
                                        <h3 className="h3 mb-3 text-white">{feature.subtitle}</h3>
                                        <p className="text-xl text-gray-300 mb-4">{feature.description}</p>
                                        <ul className="text-lg text-gray-300 -mb-2">
                                            {feature.points.map((point, i) => (
                                                <motion.li 
                                                    key={i} 
                                                    className="flex items-center mb-2"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    transition={{ duration: 1, delay: i * 0.2 }}
                                                >
                                                    <FaCheck className="w-4 h-4 text-green-400 mr-3" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesZigzag;