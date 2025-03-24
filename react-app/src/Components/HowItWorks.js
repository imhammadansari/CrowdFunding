import React from 'react';

const HowItWorks = () => {
    return (
        <section className="flex flex-col items-start text-start md:flex-row gap-8 p-8 md:p-12 bg-blue-50">
            <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-bold mb-8">How It Works</h2>
                <h4 className="text-lg font-bold mb-4">For Students</h4>
                <ol className="list-decimal list-inside mb-8">
                    <li className="mb-2">Post Your Request: Share your story and funding needs on our platform.</li>
                    <li className="mb-2">Get Funded: Generous donors will review your request and contribute.</li>
                    <li className="mb-2">Achieve Your Dreams: Use the funds to overcome financial barriers.</li>
                </ol>
                <h4 className="text-lg font-bold mb-4">For Donors</h4>
                <ol className="list-decimal list-inside">
                    <li className="mb-2">Browse Requests: Explore heartfelt stories from students.</li>
                    <li className="mb-2">Choose a Student: Select the student whose story inspires you.</li>
                    <li className="mb-2">Make a Difference: See the impact of your generosity.</li>
                </ol>
            </div>
            <div className="flex-1 flex justify-center">
                <img src="./how-it-works.jpg" alt="How It Works" className="rounded-lg shadow-lg max-w-full" />
            </div>
        </section>
    );
};

export default HowItWorks;