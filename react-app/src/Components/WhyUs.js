import React from 'react';

const WhyUs = () => {
    return (
        <section className="p-8 md:p-12 bg-gray-50 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { icon: './shield.png', title: 'Trusted Platform', description: 'We ensure every request is verified for authenticity.' },
                    { icon: './reach.png', title: 'Global Reach', description: 'Our platform connects people worldwide for a common cause.' },
                    { icon: './credit-card.png', title: 'Secure Payments', description: 'Payments are safe and encrypted for all donors.' },
                    { icon: './graduated.png', title: 'Empower Students', description: 'Empowering students to turn their dreams into reality.' },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={item.icon} alt={item.title} className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-md md:text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm md:text-lg text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;