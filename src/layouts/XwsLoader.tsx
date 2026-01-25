import React from "react";

const XwsLoader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="logo">
        <span className="x">X</span>
        <span className="w">W</span>
        <span className="s">S</span>
      </div>
      <p className="tagline">Xwave Solutions</p>

      <style jsx>{`
        .loader-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle, #0f2027, #000);
          color: #fff;
        }

        .logo {
          font-size: 64px;
          font-weight: 800;
          letter-spacing: 8px;
        }

        .logo span {
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .logo .x {
          color: #00eaff;
          animation-delay: 0s;
        }

        .logo .w {
          color: #4facfe;
          animation-delay: 0.2s;
        }

        .logo .s {
          color: #38f9d7;
          animation-delay: 0.4s;
        }

        .tagline {
          margin-top: 12px;
          font-size: 14px;
          letter-spacing: 3px;
          opacity: 0.8;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default XwsLoader;
