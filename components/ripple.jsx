const Ripple = () => {
    return (
        <>
            <style>
                {`
          @keyframes ripple {
            0% {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
            }
            50% {
              transform: scale(1.3);
              box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px -0px;
            }
            100% {
              transform: scale(1);
              box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
            }
          }

          @keyframes color-change {
            0% { fill: var(--logo-color); }
            50% { fill: white; }
            100% { fill: var(--logo-color); }
          }
        `}
            </style>

            <div
                className="relative"
                style={{
                    "--size": "600px",
                    "--duration": "2s",
                    "--background":
                        "linear-gradient(0deg, rgba(50, 50, 50, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%)",
                    height: "var(--size)",
                    aspectRatio: "1 / 1",
                }}
            >
                {/* Five Ripple Layers */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full backdrop-blur-md"
                        style={{
                            background: "var(--background)",
                            borderTop: "1px solid rgba(100, 100, 100, 1)",
                            animation: `ripple var(--duration) infinite ease-in-out`,
                            animationDelay: `${i * 0.2}s`,
                            inset: `${40 - i * 10}%`,
                            zIndex: `${99 - i}`,
                            borderColor: `rgba(100, 100, 100, ${1 - i * 0.2})`,
                            opacity: '40%',
                        }}
                    ></div>
                ))}

                {/* center logo */}
                <div className="absolute inset-0 grid place-content-center p-[30%]">
                </div>
            </div>
        </>
    );
}

export default Ripple;