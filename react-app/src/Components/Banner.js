import React from 'react';

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 md:pb-28 bg-gradient-to-r from-gray-100 via-gray-200 to-white">
      <div className="flex-1 md:pr-8">
        <h1 className="text-xl md:text-4xl text-start font-bold text-black md:mb-4">
          Empower Education Where Hope Finds a <span className="text-orange-500">Helping Hand!</span>
        </h1>
        <p className="text-sm md:text-xl text-start text-black mb-8">
          Be the reason a student’s journey turns into a success story!
        </p>
      </div>
      <div className="flex-1 text-center">
        <dotlottie-player
          src="https://lottie.host/310c5f60-1483-492a-a50b-56d17132b17a/FGR3MGDbkR.lottie"
          background="transparent"
          speed="1"
          style={{ width: '100%', height: 'auto' }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Banner;