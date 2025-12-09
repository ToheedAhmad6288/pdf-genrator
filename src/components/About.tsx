
import React from 'react';
import { Container, Section, Button, Card, Grid } from './UI';
import { FaRocket, FaShieldAlt, FaMagic, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa';

interface AboutProps {
    onNavigateHome: () => void;
}

const About: React.FC<AboutProps> = ({ onNavigateHome }) => {
    return (
        <div className="animate-fade-in-up min-h-screen relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <Section className="relative z-10 pt-16 pb-24">
                <Container maxWidth="5xl">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100/50 shadow-sm backdrop-blur-sm">
                            <span className="text-sm font-bold bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent tracking-wide uppercase">
                                Our Story
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                            <span className="text-black drop-shadow-sm">
                                Redefining Document Management
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-xl text-black leading-relaxed font-bold">
                            We're building the future of PDF tools. Simple, powerful, and accessible to everyone.
                            Experience the difference with our state-of-the-art processing engine.
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <Grid cols={3} gap="lg" className="mb-24">
                        {[
                            {
                                icon: <FaRocket />,
                                title: "Lightning Fast",
                                desc: "Powered by WebAssembly for native-like performance directly in your browser.",
                                color: "blue"
                            },
                            {
                                icon: <FaShieldAlt />,
                                title: "Secure by Design",
                                desc: "Your files never leave your device. All processing happens locally for maximum privacy.",
                                color: "green"
                            },
                            {
                                icon: <FaMagic />,
                                title: "Smart Tools",
                                desc: "Intelligent algorithms designed to handle complex document tasks with a single click.",
                                color: "purple"
                            }
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className={`
                  p-8 h-full border border-white/40 bg-white/60 backdrop-blur-xl 
                  hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 
                  transition-all duration-300 group
                `}
                            >
                                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6
                  bg-${item.color}-50 text-${item.color}-600 
                  group-hover:scale-110 transition-transform duration-300 shadow-sm
                `}>
                                    <div className="float">{item.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-primary-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-black leading-relaxed font-semibold">
                                    {item.desc}
                                </p>
                            </Card>
                        ))}
                    </Grid>

                    {/* Mission Section */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white mb-20 group">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600 opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

                        <div className="relative z-10 p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                                    Our Mission
                                </h2>
                                <p className="text-lg text-black leading-relaxed font-medium drop-shadow-sm">
                                    We believe that professional-grade PDF tools shouldn't come with a premium price tag.
                                    Our goal is to democratize document management, making it easy and free for students,
                                    freelancers, and businesses worldwide.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6 md:w-1/3">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                                    <FaUsers className="text-3xl text-black mx-auto mb-2 opacity-100" />
                                    <div className="text-2xl font-bold text-black">100k+</div>
                                    <div className="text-xs text-black uppercase tracking-wider font-extrabold text-shadow-sm">Users</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                                    <FaGlobe className="text-3xl text-black mx-auto mb-2 opacity-100" />
                                    <div className="text-2xl font-bold text-black">150+</div>
                                    <div className="text-xs text-black uppercase tracking-wider font-extrabold text-shadow-sm">Countries</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black mb-8">Ready to get started?</h2>
                        <Button
                            size="lg"
                            onClick={onNavigateHome}
                            className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            icon={<FaHeart className="text-red-500 animate-pulse" />}
                        >
                            Explore All Tools
                        </Button>
                        <p className="mt-6 text-sm text-black font-extrabold">
                            No registration required • 100% Free • Secure
                        </p>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default About;
