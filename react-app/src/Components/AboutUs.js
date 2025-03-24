import React from 'react';

const AboutUs = () => {
    return (
        <section className="flex flex-col md:flex-row gap-5 p-8 md:p-12 items-center">
            <div className="flex-1 text-center">
                <dotlottie-player
                    src="https://lottie.host/d62492d2-0380-4bde-898e-3483ef5cbc92/ALPdgRUjuy.lottie"
                    background="transparent"
                    speed="1"
                    style={{ width: '100%', height: 'auto' }}
                    loop
                    autoplay
                ></dotlottie-player>
            </div>
            <div className="flex-1 text-left">
                <h4 className="text-lg font-bold mb-4">Mission and Vision</h4>
                <p className="text-md mb-6">
                    At CrowdFunding, we empower students by connecting them with donors who believe in education and opportunity.
                    Our goal is a world where no student is held back due to financial limits.
                </p>
                <h4 className="text-lg font-bold mb-4">Transparency and Impact</h4>
                <p className="text-md">
                    We ensure trust and transparency—donors see exactly how their contributions help. Every donation creates real change, turning
                    dreams into reality.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;