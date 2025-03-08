import { motion } from 'framer-motion';

function HeroHome() {
    return (
        <section className="bg-[#000814] text-white">
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                {/* Hero content */}
                <div className="relative pt-12 pb-10 md:pt-16 md:pb-16">
                    {/* Section header */}
                    <motion.div 
                        className="max-w-3xl mx-auto text-center pb-6 md:pb-16"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* Logo */}
                        <img src="/img/event_logo.png" alt="logo" className="w-60 h-60 mx-auto mb-4" />
                        
                        {/* Main Heading with Gradient */}
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
                            Code, Create, Collaborate
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-gray-300 mt-4 tracking-wide leading-relaxed">
                            "Bringing Your Events to Life: <br /> 
                            <span className="font-semibold text-blue-400">Simplified Registration</span>, 
                            <span className="font-semibold text-purple-400"> Seamless Management</span>, 
                            and <span className="font-semibold text-pink-400">Easy Ticketing.</span>"
                        </p>

                        {/* Buttons */}
                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mt-8">
                            <div>
                                <a   
                                    href="/users/signin"
                                    className="btn text-white bg-[#161D29] hover:bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0 border-2 border-blue-500 hover:border-blue-400 
                                    shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 transition-all duration-300 ease-in-out 
                                    px-6 py-3 rounded-lg text-lg font-semibold tracking-wide"
                                >
                                    Sign In
                                </a>
                            </div>
                            <div>
                                <a
                                    className="btn text-white bg-[#161D29] hover:bg-gray-700 w-full sm:w-auto sm:ml-4 border-2 border-blue-500 hover:border-blue-400 
                                    shadow-lg shadow-blue-500/50 hover:shadow-blue-400/50 transition-all duration-300 ease-in-out 
                                    px-6 py-3 rounded-lg text-lg font-semibold tracking-wide"
                                    href="/users/signup"
                                >
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HeroHome;
