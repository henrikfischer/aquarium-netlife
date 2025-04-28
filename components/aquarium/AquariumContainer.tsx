"use client";

import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AquariumDecor from './AquariumDecor';
import Bubbles from './Bubbles';
import Fish from './Fish';
import ThermometerDisplay from './ThermometerDisplay';


const AquariumContainer = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [temperature, setTemperature] = useState(24); // Celsius
  const [isMuted, setIsMuted] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  // Fish data - different species with their properties
  const fishData = useMemo(() => [
    { id: 3, type: 'custom-image', imageUrl: '/Henrik.png', size: 'xl', speed: 2, yPosition: 60 },
    { id: 4, type: 'custom-image', imageUrl: '/Audun.png', size: 'xl', speed: 0.5, yPosition: -260 },
    { id: 5, type: 'custom-image', imageUrl: '/Michael.png', size: 'lg', speed: 2, yPosition: 40 },
    { id: 6, type: 'custom-image', imageUrl: '/Togga.png', size: 'xl', speed: 2, yPosition: 60 },
    { id: 7, type: 'custom-image', imageUrl: '/Simen.png', size: 'xl', speed: .1, yPosition: 20 },
    { id: 8, type: 'custom-image', imageUrl: '/Kevin.png', size: 'lg', speed: 2, yPosition: 60 },
    { id: 9, type: 'custom-image', imageUrl: '/Matulan.png', size: 'lg', speed: 1, yPosition: 120 },
    { id: 10, type: 'custom-image', imageUrl: '/Anna.png', size: 'lg', speed: 1, yPosition: 10 },
    { id: 11, type: 'custom-image', imageUrl: '/Martin.png', size: 'lg', speed: 1, yPosition: 120 },
    { id: 12, type: 'custom-image', imageUrl: '/Espen.png', size: 'xl', speed: 1, yPosition: 120 },
  ], []);

  // Track which fishes are currently added
  const [addedFishIds, setAddedFishIds] = useState<number[]>([]);
  // Track if Alex has been added
  const [alexAdded, setAlexAdded] = useState(false);
  // Track Alex's angle (direction in radians)
  const [alexAngle, setAlexAngle] = useState(Math.random() * 2 * Math.PI);

  // Alex fish data
  const alexFish = { id: 99, type: 'custom-image', imageUrl: '/Alex.png', size: 'xxl', speed: .75, yPosition: 50 };

  // Go Crazy mode
  const [goCrazy, setGoCrazy] = useState(false);

  // Manage positions in state
  const [fishPositions, setFishPositions] = useState(() =>
    fishData.reduce((acc, fish) => {
      acc[fish.id] = { x: Math.random() * 80 + 10, y: fish.yPosition };
      return acc;
    }, {} as Record<number, { x: number; y: number }>)
  );
  // Track direction for each fish
  const [fishDirections, setFishDirections] = useState<Record<number, 'left' | 'right'>>(() =>
    fishData.reduce((acc, fish) => {
      acc[fish.id] = Math.random() > 0.5 ? 'right' : 'left';
      return acc;
    }, {} as Record<number, 'left' | 'right'>)
  );

  // Add Alex to fishData and state when needed
  const allFishData = useMemo(() => {
    return alexAdded ? [...fishData, alexFish] : fishData;
  }, [fishData, alexAdded]);

  const aquariumAudioRef = useRef<HTMLAudioElement>(null);
  const rickrollAudioRef = useRef<HTMLAudioElement>(null);

  // Animate fish swimming
  useEffect(() => {
    let animFrame: number;
    const animate = () => {
      setFishPositions(prevPositions => {
        let newPositions = { ...prevPositions };
        setFishDirections(prevDirections => {
          let newDirections = { ...prevDirections };
          allFishData.forEach(fish => {
            const prev = prevPositions[fish.id] || { x: 50, y: 50 };
            const direction = prevDirections[fish.id] || 'right';

            // --- TEMPERATURE EFFECTS & GO CRAZY ---
            let tempSpeed = fish.speed;
            if (fish.id !== 99) { // normal fish
              if (temperature <= 20) tempSpeed *= 0.5;
              else if (temperature >= 28) tempSpeed *= 1.5;
              if (goCrazy) tempSpeed = 15;
            } else { // Alex
              tempSpeed *= 2; // even faster
            }

            const swimSpeed = tempSpeed * (0.02 + Math.random() * 0.01);

            // Cluster (cold): move toward center X
            let clusterOffset = 0;
            if (fish.id !== 99 && temperature <= 20) {
              clusterOffset = (50 - prev.x) * 0.02; // drift toward center
            }
            // Swim to top (hot): move Y upward
            let heatLift = 0;
            if (fish.id !== 99 && temperature >= 28) {
              heatLift = -0.2 * (temperature - 27); // stronger lift if hotter
            }
            if (goCrazy && fish.id !== 99) {
              // Randomly flip direction often
              if (Math.random() < 0.2) {
                newDirections[fish.id] = direction === 'right' ? 'left' : 'right';
              }
              // Add some random vertical jitter
              heatLift += (Math.random() - 0.5) * 2;
            }

            // Alex: smooth movement
            let newX, newY;
            if (fish.id === 99) {
              // Move along persistent angle
              let angle = alexAngle;
              newX = prev.x + Math.cos(angle) * tempSpeed * 0.5;
              newY = prev.y + Math.sin(angle) * tempSpeed * 0.5;
              // Clamp to aquarium
              let bounced = false;
              if (newX < 8 || newX > 92) {
                angle = Math.PI - angle + (Math.random() - 0.5) * 0.5; // bounce and randomize a bit
                newX = Math.max(8, Math.min(92, newX));
                bounced = true;
              }
              if (newY < 8 || newY > 92) {
                angle = -angle + (Math.random() - 0.5) * 0.5;
                newY = Math.max(8, Math.min(92, newY));
                bounced = true;
              }
              // Occasionally randomize angle for erratic but smooth movement
              if (Math.random() < 0.01 || bounced) {
                angle = angle + (Math.random() - 0.5) * 1.2;
              }
              setAlexAngle(angle);
            } else {
              newX = direction === 'right' ? prev.x + swimSpeed : prev.x - swimSpeed;
              newX += clusterOffset;
              const verticalMovement = Math.sin(Date.now() / 2000 + fish.id) * 0.3;
              newY = prev.y + verticalMovement + heatLift;
              // Clamp based on fish size so fish never leaves aquarium
              const sizeToHalfWidth = { xs: 2, sm: 3, md: 4, lg: 6, xl: 8, xxl: 12 };
              const halfWidth = sizeToHalfWidth[fish.size as keyof typeof sizeToHalfWidth] || 4;
              const minX = halfWidth;
              const maxX = 100 - halfWidth;
              if (newX > maxX) {
                newDirections[fish.id] = 'left';
                newX = maxX;
              } else if (newX < minX) {
                newDirections[fish.id] = 'right';
                newX = minX;
              }
              newY = Math.max(10, Math.min(85, newY));
            }
            newPositions[fish.id] = { x: newX, y: newY };
          });
          return newDirections;
        });
        return newPositions;
      });
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [allFishData, temperature, goCrazy, alexAngle]);

  useEffect(() => {
    if (aquariumAudioRef.current) {
      aquariumAudioRef.current.muted = isMuted;
    }
    if (rickrollAudioRef.current) {
      rickrollAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (goCrazy) {
      if (aquariumAudioRef.current) aquariumAudioRef.current.pause();
      if (rickrollAudioRef.current) {
        rickrollAudioRef.current.currentTime = 0;
        rickrollAudioRef.current.play();
      }
    } else {
      if (rickrollAudioRef.current) rickrollAudioRef.current.pause();
      if (aquariumAudioRef.current) {
        aquariumAudioRef.current.currentTime = 0;
        aquariumAudioRef.current.play();
      }
    }
  }, [goCrazy]);

  // Adjust temperature handler
  const adjustTemperature = (adjustment: number) => {
    setTemperature(prev => {
      const newTemp = prev + adjustment;
      return Math.min(Math.max(newTemp, 18), 30); // Clamp between 18-30°C
    });
  };


  return (
    <div className="w-full h-screen max-h-[100dvh] relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
      {/* Ambient aquarium sound */}
      <audio ref={aquariumAudioRef} src="/fish-tank.mp3" autoPlay loop style={{ display: 'none' }} />
      {/* Rick Roll sound */}
      <audio ref={rickrollAudioRef} src="/rickroll.mp3" style={{ display: 'none' }} />
        {/* Aquarium background with water effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            isNightMode
              ? 'from-blue-950 via-blue-900 to-blue-950'
              : 'from-blue-400 via-blue-500 to-blue-600'
          } transition-colors duration-1000`}
        >
        {/* Water surface reflection */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-cyan-300/20 animate-pulse" />
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>

      {/* Night/day toggle and controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleNightMode}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            {isNightMode ? <SunIcon className="h-5 w-5 text-yellow-300" /> : <MoonIcon className="h-5 w-5 text-blue-100" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMuted(m => !m)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            {isMuted ? (
              <span role="img" aria-label="Unmute">🔇</span>
            ) : (
              <span role="img" aria-label="Mute">🔊</span>
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            disabled={addedFishIds.length >= fishData.length}
            onClick={() => {
              if (addedFishIds.length < fishData.length) {
                const remainingFish = fishData.filter(fish => !addedFishIds.includes(fish.id));
                const randomFish = remainingFish[Math.floor(Math.random() * remainingFish.length)];
                setAddedFishIds(ids => [...ids, randomFish.id]);
              }
            }}
          >
            Add Fish
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={addedFishIds.length === 0}
            onClick={() => {
              setAddedFishIds(ids => ids.slice(0, -1));
            }}
          >
            Remove Fish
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={addedFishIds.length === fishData.length}
            onClick={() => setAddedFishIds(fishData.map(f => f.id))}
          >
            Add All
          </Button>
        </div>
      </div>

      {/* Temperature control */}
      <div className="absolute top-4 left-4 z-10 flex flex-col sm:flex-row items-center gap-4">
        <ThermometerDisplay temperature={temperature} />
        <div className="flex flex-row sm:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTemperature(1)}
            className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-xl"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTemperature(-1)}
            className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-xl"
          >
            -
          </Button>
        </div>
        <Button
          variant={goCrazy ? "destructive" : "default"}
          size="sm"
          className="ml-0 sm:ml-4 animate-pulse"
          onClick={() => setGoCrazy(crazy => !crazy)}
        >
          {goCrazy ? "Stop This Madness" : "Go Crazy"}
        </Button>
      </div>

      {/* We Need Help Button */}
      {addedFishIds.length === fishData.length && !alexAdded && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex justify-center">
          <Button
            variant="destructive"
            size="lg"
            className="animate-bounce shadow-xl"
            onClick={() => {
              setAlexAdded(true);
              setFishPositions(prev => ({
                ...prev,
                99: { x: Math.random() * 80 + 10, y: 50 },
              }));
              setFishDirections(prev => ({
                ...prev,
                99: Math.random() > 0.5 ? 'right' : 'left',
              }));
              setAlexAngle(Math.random() * 2 * Math.PI);
            }}
          >
            We Need Help
          </Button>
        </div>
      )}

      {/* Fish components */}
      {allFishData.filter(fish => addedFishIds.includes(fish.id) || fish.id === 99 && alexAdded).map((fish) => (
        <Fish
          key={fish.id}
          {...fish}
          size={fish.size as "xl" | "lg" | "md" | "sm" | "xs" | "xxl"}
          isNightMode={isNightMode}
          position={fishPositions[fish.id]}
          direction={fishDirections[fish.id]}
          temperature={temperature}
        />
      ))}

      {/* Bubbles */}
      <Bubbles count={goCrazy ? 50 : 15} isNightMode={isNightMode} speed={goCrazy ? 3 : 1} />

      {/* Decorative elements */}
      <AquariumDecor isNightMode={isNightMode} />

      {/* Aquarium frame */}
      <div className="absolute inset-0 border-8 border-gray-800/20 rounded-lg pointer-events-none" />
      </div>
  );
};

export default AquariumContainer;