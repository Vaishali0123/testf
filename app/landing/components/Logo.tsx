export default function Logo() {
  return (
    <div className="h-[100%] w-[100%]">
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.75;
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes scaleFloat {
          0%, 100% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes oscillate {
          0%, 100% {
            transform: translateX(-3px) scale(0.98);
            opacity: 0.8;
          }
          50% {
            transform: translateX(3px) scale(1.02);
            opacity: 1;
          }
        }

        @keyframes sparkleScale {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        .ring-outer {
          animation: pulse 3s ease-in-out infinite;
          transform-origin: center;
        }

        .ring-inner {
          animation: breathe 4s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .ellipse-1 {
          animation: scaleFloat 4s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .ellipse-2 {
          animation: scaleFloat 4s ease-in-out infinite 2s;
          transform-origin: center;
          transform-box: fill-box;
        }

        .rotating-bar {
          animation: oscillate 5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .spark-1, .spark-2 {
          animation: sparkleScale 2s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .spark-2 {
          animation-delay: 1s;
        }

        .svg-container {
          filter: drop-shadow(0 0 20px rgba(168, 17, 85, 0.5));
        }
      `}</style>

      <svg
        className="svg-container h-[100%] w-[100%]"
        // width="122"
        // height="127"
        viewBox="0 0 122 127"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1069_4725)" className="ring-inner">
          <path
            d="M60.5 32.5C78.2429 32.5 92.5 46.6724 92.5 64C92.5 81.3276 78.2429 95.5 60.5 95.5C42.7571 95.5 28.5 81.3276 28.5 64C28.5 46.6724 42.7571 32.5 60.5 32.5Z"
            stroke="url(#paint0_linear_1069_4725)"
            strokeWidth="11"
          />
        </g>
        <g filter="url(#filter1_f_1069_4725)" className="ellipse-1">
          <ellipse
            cx="53.9749"
            cy="76.974"
            rx="28.9258"
            ry="11.3704"
            transform="rotate(-61.4986 53.9749 76.974)"
            fill="url(#paint1_linear_1069_4725)"
          />
        </g>
        <g filter="url(#filter2_f_1069_4725)" className="ellipse-2">
          <ellipse
            cx="71.8667"
            cy="47.564"
            rx="26.1925"
            ry="15.5184"
            transform="rotate(-61.4986 71.8667 47.564)"
            fill="url(#paint2_linear_1069_4725)"
          />
        </g>
        <g filter="url(#filter3_f_1069_4725)" className="ring-outer">
          <path
            d="M61 16.5C85.4562 16.5 105.5 37.419 105.5 63.5C105.5 89.5811 85.4562 110.5 61 110.5C36.5438 110.5 16.5 89.5811 16.5 63.5C16.5 37.419 36.5438 16.5 61 16.5Z"
            stroke="url(#paint3_linear_1069_4725)"
            strokeWidth="5"
          />
        </g>
        <g filter="url(#filter4_f_1069_4725)">
          <path
            d="M62 17.5C86.5664 17.5 106.5 37.8606 106.5 63C106.5 88.1394 86.5664 108.5 62 108.5C37.4336 108.5 17.5 88.1394 17.5 63C17.5 37.8606 37.4336 17.5 62 17.5Z"
            stroke="url(#paint4_linear_1069_4725)"
          />
        </g>
        <g filter="url(#filter5_f_1069_4725)" className="rotating-bar">
          <rect
            x="44.6953"
            y="101.803"
            width="8.68591"
            height="84.0863"
            rx="4.34295"
            transform="rotate(-149.783 44.6953 101.803)"
            fill="url(#paint5_linear_1069_4725)"
          />
        </g>
        <g filter="url(#filter6_f_1069_4725)" className="spark-1">
          <path
            d="M28.8776 43.0324L31.0765 41.2742C31.2984 41.0967 31.5742 41 31.8583 41C32.8161 41 33.4191 42.0316 32.9492 42.8662L30.1601 47.8199C29.9689 48.1594 29.8404 48.5306 29.7808 48.9156L29.324 51.8659C29.1182 53.1948 27.5073 53.7493 26.5272 52.8286C26.1908 52.5126 26 52.0716 26 51.61V49.0178C26 46.6891 27.0589 44.4867 28.8776 43.0324Z"
            fill="url(#paint6_linear_1069_4725)"
          />
        </g>
        <g filter="url(#filter7_f_1069_4725)" className="spark-2">
          <path
            d="M36.6953 45.2368L38.1862 44.1468C38.3168 44.0514 38.4742 44 38.6359 44C39.2321 44 39.5973 44.6538 39.2847 45.1615L37.62 47.8646C37.4875 48.0798 37.3977 48.3186 37.3554 48.5678L37.0842 50.1694C36.9479 50.9743 35.985 51.3222 35.3657 50.7903C35.1336 50.5909 35 50.3001 35 49.9941V48.5762C35 47.2563 35.6298 46.0158 36.6953 45.2368Z"
            fill="#A81155"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1069_4725"
            x="14.4"
            y="18.4"
            width="92.2"
            height="91.2"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="4.3"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter1_f_1069_4725"
            x="28.8336"
            y="42.8759"
            width="50.282"
            height="68.1962"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="4.05"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter2_f_1069_4725"
            x="45.2672"
            y="15.2776"
            width="53.2"
            height="64.5729"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="4.05"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter3_f_1069_4725"
            x="0.7"
            y="0.7"
            width="120.6"
            height="125.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="6.65"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter4_f_1069_4725"
            x="15.5"
            y="15.5"
            width="93"
            height="95"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.75"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter5_f_1069_4725"
            x="33.7852"
            y="21.3657"
            width="56.6328"
            height="83.8426"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="2.5"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter6_f_1069_4725"
            x="22"
            y="37"
            width="15.1133"
            height="20.2837"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="2"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <filter
            id="filter7_f_1069_4725"
            x="31"
            y="40"
            width="12.3984"
            height="15.0446"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="2"
              result="effect1_foregroundBlur_1069_4725"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1069_4725"
            x1="-23.5"
            y1="40.5"
            x2="157.066"
            y2="86.7939"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#760B30" />
            <stop offset="0.509615" stopColor="#292929" stopOpacity="0.87" />
            <stop offset="1" stopColor="#760B30" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1069_4725"
            x1="69.4058"
            y1="80.2958"
            x2="32.2273"
            y2="82.5129"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#640631" />
            <stop offset="1" stopColor="#B5155D" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1069_4725"
            x1="52.6157"
            y1="51.2434"
            x2="122.897"
            y2="53.6929"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#221D1F" />
            <stop offset="0.0906729" stopColor="#4D114D" />
            <stop offset="0.518531" stopColor="#FF62FF" />
            <stop offset="1" stopColor="white" stopOpacity="0.36" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1069_4725"
            x1="103.452"
            y1="-3.56452"
            x2="-25.1394"
            y2="165.216"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A400AC" />
            <stop offset="0.370192" stopColor="#292929" />
            <stop offset="1" stopColor="#FF0058" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_1069_4725"
            x1="102.645"
            y1="0.677418"
            x2="-15.8618"
            y2="160.935"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E400EF" />
            <stop offset="0.370192" stopColor="#292929" />
            <stop offset="1" stopColor="#F00053" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_1069_4725"
            x1="49.0383"
            y1="185.889"
            x2="49.0383"
            y2="101.803"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.451923" stopColor="#E192BB" stopOpacity="0.68" />
            <stop offset="1" stopColor="#D1A2BA" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_1069_4725"
            x1="25.5"
            y1="57.5"
            x2="39.5"
            y2="37.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A81155" />
            <stop offset="1" stopColor="#420721" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
