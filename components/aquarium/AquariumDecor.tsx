"use client";

import { cn } from '@/lib/utils';

type AquariumDecorProps = {
  isNightMode: boolean;
};

const AquariumDecor = ({ isNightMode }: AquariumDecorProps) => {
  return (
    <>
      {/* Sand/gravel bottom with gradient */}
      {/** make the sand/gravel dark in night mode */}
      <div className={cn(
        "absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t 0 opacity-90",
        isNightMode ? "from-gray-900 via-gray-800 to-gray-900" : "from-amber-200 via-amber-100 to-amber-50"
      )} />

      {/* Decorative elements - plants, rocks, etc. */}
      <Plant type="seaweed" position={{ left: '15%', bottom: '0' }} height="h-72" isNightMode={isNightMode} />
      <Plant type="seaweed" position={{ left: '30%', bottom: '0' }} height="h-64" isNightMode={isNightMode} />
      <Plant type="coral" position={{ left: '75%', bottom: '0' }} height="h-48" isNightMode={isNightMode} />
      <Plant type="coral" position={{ left: '85%', bottom: '0' }} height="h-56" isNightMode={isNightMode} />
      <Plant type="seaweed" position={{ left: '45%', bottom: '0' }} height="h-60" isNightMode={isNightMode} />

      <Rock position={{ left: '50%', bottom: '0' }} size="lg" isNightMode={isNightMode} />
      <Rock position={{ left: '60%', bottom: '5px' }} size="md" isNightMode={isNightMode} />
      <Rock position={{ left: '85%', bottom: '0' }} size="sm" isNightMode={isNightMode} />
      <Rock position={{ left: '25%', bottom: '0' }} size="md" isNightMode={isNightMode} />

      {/* Castle decoration with enhanced effects */}
      <div
        className={cn(
          "absolute left-[10%] bottom-0 w-24 h-36",
          isNightMode ? "opacity-70" : "opacity-100"
        )}
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/258327/pexels-photo-258327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          filter: `brightness(${isNightMode ? 0.7 : 1})`,
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
          transition: "filter 1s ease",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/30" />
        {/* Castle glow effect */}
        <div className="absolute inset-0 bg-blue-400/10 animate-pulse" />
      </div>

      {/* Enhanced treasure chest */}
      <div
        className={cn(
          "absolute left-[40%] bottom-5 w-16 h-12 bg-amber-800 rounded-t-lg border-2 border-amber-900",
          isNightMode ? "opacity-60" : "opacity-100"
        )}
        style={{
          transition: "opacity 1s ease",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-amber-700 rounded-t-lg border-b border-amber-900" />
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full border border-amber-900" />
        {/* Chest glow effect */}
        <div className="absolute inset-0 bg-yellow-500/10 animate-pulse" />
      </div>

      {/* Bubbles */}
      {/* {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-blue-200/30 rounded-full animate-float"
          style={{
            left: `${15 + i * 15}%`,
            bottom: '20%',
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))} */}

      {/* Floating particles */}
      {/* {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-slower"
          style={{
            left: `${(i * 5 + Math.random() * 5)}%`,
            bottom: `${5 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))} */}

      {/* --- Enhanced Rocks and Plants Inspired by Reference Image --- */}
      {/* Large center rock cluster */}
      <Rock position={{ left: '38%', bottom: '0' }} size="xxl"  />
      <Rock position={{ left: '48%', bottom: '0' }} size="xl"  />
      <Rock position={{ left: '58%', bottom: '0' }} size="lg"  />
      {/* Left-side rocks */}
      <Rock position={{ left: '8%', bottom: '0' }} size="xl"  />
      <Rock position={{ left: '18%', bottom: '0' }} size="lg"  />
      {/* Right-side rocks */}
      <Rock position={{ left: '78%', bottom: '0' }} size="xl"  />
      <Rock position={{ left: '88%', bottom: '0' }} size="lg"  />
      {/* Pebbles - now cover the whole aquarium and drift slowly */}
      {/* {[...Array(50)].map((_, i) => {
        const size = 4 + Math.random() * 8;
        const left = Math.random() * 98;
        const bottom = Math.random() * 90;
        const driftType = i % 2 === 0 ? 'pebble-drift-x' : 'pebble-drift-y';
        const delayClass = `pebble-delay-${i % 10}`;
        return (
          <div
            key={i}
            className={`absolute rounded-full bg-gray-400 opacity-60 animate-${driftType} ${delayClass}`}
            style={{
              left: `${left}%`,
              bottom: `${bottom}%`,
              width: `${size}px`,
              height: `${size * 0.7}px`,
              zIndex: 1,
            }}
          />
        );
      })} */}

      {/* --- Diverse Plants --- */}
      {/* Tall grass-like plants */}
      <Plant type="tallgrass" position={{ left: '70%', bottom: '0' }} height="h-100" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '73%', bottom: '0' }} height="h-[45rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '80%', bottom: '0' }} height="h-[30rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '35%', bottom: '0' }} height="h-[20rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '10%', bottom: '0' }} height="h-[40rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '12%', bottom: '0' }} height="h-[25rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '11%', bottom: '0' }} height="h-[10rem]" isNightMode={isNightMode} />
      <Plant type="tallgrass" position={{ left: '5%', bottom: '0' }} height="h-[20rem]" isNightMode={isNightMode} />
      {/* Bushy plant */}
      <Plant type="bushy" position={{ left: '43%', bottom: '0' }} height="h-32" isNightMode={isNightMode} />
      {/* Broad-leaf plant */}
      <Plant type="broadleaf" position={{ left: '20%', bottom: '0' }} height="h-40" isNightMode={isNightMode} />
      {/* Small grass tufts */}
      <Plant type="grass" position={{ left: '12%', bottom: '0' }} height="h-16" isNightMode={isNightMode} />
      <Plant type="grass" position={{ left: '25%', bottom: '0' }} height="h-20" isNightMode={isNightMode} />
      <Plant type="grass" position={{ left: '60%', bottom: '0' }} height="h-16" isNightMode={isNightMode} />

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }
        @keyframes float-slow {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.5; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
        @keyframes float-slower {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-40px) scale(1.1); opacity: 0.5; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }
        .animate-float-slower {
          animation: float-slower 12s linear infinite;
        }
        @keyframes pebble-drift-x {
          0% { transform: translateX(0); }
          50% { transform: translateX(12px); }
          100% { transform: translateX(0); }
        }
        @keyframes pebble-drift-y {
          0% { transform: translateY(0); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
        .animate-pebble-drift-x {
          animation-name: pebble-drift-x;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 180s;
        }
        .animate-pebble-drift-y {
          animation-name: pebble-drift-y;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 180s;
        }
        .pebble-delay-0 { animation-delay: 0s; }
        .pebble-delay-1 { animation-delay: 18s; }
        .pebble-delay-2 { animation-delay: 36s; }
        .pebble-delay-3 { animation-delay: 54s; }
        .pebble-delay-4 { animation-delay: 72s; }
        .pebble-delay-5 { animation-delay: 90s; }
        .pebble-delay-6 { animation-delay: 108s; }
        .pebble-delay-7 { animation-delay: 126s; }
        .pebble-delay-8 { animation-delay: 144s; }
        .pebble-delay-9 { animation-delay: 162s; }
      `}</style>
    </>
  );
};

type PlantProps = {
  type: 'seaweed' | 'coral' | 'tallgrass' | 'bushy' | 'broadleaf' | 'grass';
  position: { left: string; bottom: string };
  height: string;
  isNightMode: boolean;
};

const Plant = ({ type, position, height, isNightMode }: PlantProps) => {
  if (type === 'seaweed') {
    return (
      <div
        className={cn(
          "absolute",
          height,
          "w-12 flex items-end justify-center",
          isNightMode ? "opacity-75" : "opacity-100"
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: "opacity 1s ease",
          zIndex: 10,
        }}
      >
        <div className="relative w-2 bg-green-600 h-full rounded-full mx-auto">
          {/* Seaweed leaves */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-8 h-8 bg-green-500 rounded-full"
              style={{
                top: `${i * 20}%`,
                opacity: 0.7,
                animation: `sway 3s ease-in-out infinite alternate ${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Second seaweed strand */}
        <div className="relative w-2 bg-green-600 h-[80%] rounded-full mx-1">
          {/* Seaweed leaves */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute right-0 w-8 h-8 bg-green-500 rounded-full"
              style={{
                top: `${i * 25}%`,
                opacity: 0.7,
                animation: `sway 3.5s ease-in-out infinite alternate-reverse ${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes sway {
            0% { transform: translateX(-5px) rotate(-5deg); }
            100% { transform: translateX(5px) rotate(5deg); }
          }
        `}</style>
      </div>
    );
  } else if (type === 'coral') {
    return (
      <div
        className={cn(
          "absolute",
          height,
          "w-16 flex items-end justify-center",
          isNightMode ? "opacity-75" : "opacity-100"
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: "opacity 1s ease",
          zIndex: 10,
        }}
      >
        <div className="relative w-full h-full">
          {/* Coral branches */}
          <div className="absolute bottom-0 left-1/4 w-3 h-[80%] bg-pink-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-3 h-full bg-pink-500 rounded-full" />
          <div className="absolute bottom-0 left-3/4 w-3 h-[70%] bg-pink-300 rounded-full" />

          {/* Coral tips */}
          <div className="absolute top-[20%] left-1/4 w-6 h-6 bg-pink-300 rounded-full" />
          <div className="absolute top-0 left-1/2 w-8 h-8 bg-pink-400 rounded-full" />
          <div className="absolute top-[30%] left-3/4 w-5 h-5 bg-pink-200 rounded-full" />
        </div>
      </div>
    );
  } else if (type === 'tallgrass') {
    // Tall, wavy grass-like plant
    return (
      <div
        className={cn(
          'absolute',
          height,
          'w-8 flex items-end justify-center',
          isNightMode ? 'opacity-70' : 'opacity-100'
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: 'opacity 1s ease',
          zIndex: 10,
        }}
      >
        <div className="relative w-full h-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 w-1 bg-green-400 rounded-full"
              style={{
                height: `${60 + i * 20}%`,
                transform: `translateX(-50%) rotate(${i * 10 - 15}deg)` ,
                background: `linear-gradient(to top, #a3e635, #22c55e)` ,
                zIndex: 2,
                animation: `sway 4s ease-in-out infinite alternate ${i * 0.7}s`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    );
  } else if (type === 'bushy') {
    // Bushy plant
    return (
      <div
        className={cn(
          'absolute',
          height,
          'w-16 flex items-end justify-center',
          isNightMode ? 'opacity-80' : 'opacity-100'
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: 'opacity 1s ease',
          zIndex: 10,
        }}
      >
        <div className="relative w-full h-full flex items-end">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-green-500 rounded-full"
              style={{
                left: `${i * 12}%`,
                width: '16px',
                height: `${18 + Math.random() * 10}px`,
                zIndex: 2,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    );
  } else if (type === 'broadleaf') {
    // Broad-leaf plant
    return (
      <div
        className={cn(
          'absolute',
          height,
          'w-16 flex items-end justify-center',
          isNightMode ? 'opacity-80' : 'opacity-100'
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: 'opacity 1s ease',
          zIndex: 10,
        }}
      >
        <div className="relative w-full h-full flex items-end">
          {/* Main stem */}
          <div className="absolute bottom-0 left-1/2 w-1 bg-green-700 rounded-full" style={{ height: '80%', transform: 'translateX(-50%)' }} />
          {/* Leaves */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-300 rounded-t-full border border-green-600"
              style={{
                left: `${30 + i * 15}%`,
                bottom: `${30 + i * 10}%`,
                width: '24px',
                height: '32px',
                transform: `rotate(${i * 15 - 20}deg)`,
                zIndex: 2,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    );
  } else if (type === 'grass') {
    // Small grass tuft
    return (
      <div
        className={cn(
          'absolute',
          height,
          'w-6 flex items-end justify-center',
          isNightMode ? 'opacity-70' : 'opacity-100'
        )}
        style={{
          left: position.left,
          bottom: position.bottom,
          transition: 'opacity 1s ease',
          zIndex: 10,
        }}
      >
        <div className="relative w-full h-full flex items-end">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-green-400 rounded-full"
              style={{
                left: `${i * 30}%`,
                width: '6px',
                height: `${10 + i * 6}px`,
                zIndex: 2,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

type RockProps = {
  position: { left: string; bottom: string };
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

const Rock = ({ position, size }: RockProps) => {
  const sizeClasses = {
    sm: 'w-20 h-16',
    md: 'w-32 h-24',
    lg: 'w-48 h-32',
    xl: 'w-64 h-40',
    xxl: 'w-80 h-56',
  };

  return (
    <div
      className={cn(
        "absolute bg-gray-700 rounded-lg overflow-hidden",
        sizeClasses[size],
      )}
      style={{
        left: position.left,
        bottom: position.bottom,
        transition: "opacity 1s ease",
        zIndex: 10,
      }}
    >
      {/* Rock texture */}
      <div className="absolute inset-0 bg-gray-800 opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 30%, black 70%)",
        }}
      />
    </div>
  );
};

export default AquariumDecor;