import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { name: 'Dus Dus', quote: 'CrowdFunding has been a game-changer for me. Thanks to the donors, I am now pursuing my dream degree!' },
        { name: 'Bilal Jameel', quote: 'This platform helped me get the funding I needed. The transparency and ease of use made all the difference!' },
        { name: 'Abdul Manan', quote: 'I never thought I’d be able to finish my studies until I found this amazing platform. I’m so grateful!' },
    ];

    return (
        <section className="p-8 md:p-12 bg-gray-50 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-8">What Our Users Say</h2>
            <div className="flex flex-col items-center gap-8">
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white p-6 rounded-lg text-start shadow-md w-full md:w-4/5 ${
                            index === 1 ? '!bg-orange-500 text-end !text-white md:translate-x-20' : ''
                        }`}
                    >
                        <p className="text-md md:text-lg">{item.quote}</p>
                        <h3 className="text-xl md:text-2xl font-bold mt-4">{item.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;