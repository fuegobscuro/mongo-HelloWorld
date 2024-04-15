import React from 'react';

const LoadingAnimation = () => {
  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 50%, 100% {
              transform: scale(1);
              filter: blur(0px);
            }
            25% {
              transform: scale(0.6);
              filter: blur(1px);
            }
            75% {
              transform: scale(1.4);
              filter: blur(2px);
            }
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.1); /* Dim the background */
            z-index: 9999; /* Ensure it's on top of other content */
          }
        `}
      </style>
      <div className='overlay'>
        <div className='flex justify-center items-center'>
          <div
            className='w-[3vw] h-[3vw] rounded-full m-[2vw] bg-yellow-500 drop-shadow-xl'
            style={{ animation: 'bounce 1.5s infinite linear' }}
          ></div>
          <div
            className='w-[3vw] h-[3vw] rounded-full m-[2vw] bg-red-500 drop-shadow-xl'
            style={{ animation: 'bounce 1.5s infinite linear 0.1s' }}
          ></div>
          <div
            className='w-[3vw] h-[3vw] rounded-full m-[2vw] bg-indigo-500 drop-shadow-xl'
            style={{ animation: 'bounce 1.5s infinite linear 0.2s' }}
          ></div>
          <div
            className='w-[3vw] h-[3vw] rounded-full m-[2vw] bg-emerald-500 drop-shadow-xl'
            style={{ animation: 'bounce 1.5s infinite linear 0.3s' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
