import React from 'react';

const FAQs = () => {
    return (
        <section className="p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions (FAQs)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 text-start gap-8">
                {[
                    { question: 'What is CrowdFunding?', answer: 'CrowdFunding is a platform that connects students in need with donors who wish to support their educational journeys.' },
                    { question: 'How can I post a request?', answer: 'Simply sign up as a student, fill out your profile, and share your story through the "Post a Request" page.' },
                    { question: 'How do I donate to a student?', answer: 'Browse the list of funding requests, select a student whose story inspires you, and contribute securely through our platform.' },
                    { question: 'Is the platform secure for payments?', answer: 'Yes, we use industry-standard encryption to ensure all transactions are safe and secure.' },
                    { question: 'Are the funding requests verified?', answer: 'Yes, we have a strict verification process to ensure that all requests are authentic and genuine.' },
                    { question: 'Can I track how my donation is used?', answer: 'While we do not provide direct tracking, you can stay connected with the student through updates shared on their profile.' },
                ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;