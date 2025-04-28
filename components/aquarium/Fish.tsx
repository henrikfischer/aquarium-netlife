"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';

type FishProps = {
  type: string;
  imageUrl?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  yPosition: number;
  isNightMode: boolean;
  position: { x: number; y: number };
  direction: 'left' | 'right';
  temperature?: number;
};

const Fish = ({ type, imageUrl, size, isNightMode, position, direction, temperature }: FishProps) => {
  // No local state or animation logic
  // Use only props for position and direction


  // Size mapping for image-based fish
  const imageSizeClasses = {
    xs: 'w-16 h-16',
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48',
  };

  // Faded if cold, extra bright if hot
  const tempStyle = temperature !== undefined
    ? temperature <= 20
      ? { filter: 'brightness(0.7) grayscale(0.4)' }
      : temperature >= 28
        ? { filter: 'brightness(1.2) saturate(2)' }
        : {}
    : {};

  const renderFishShape = () => {
    // Handle custom image fish
    if (type === 'custom-image' && imageUrl) {
      return (
        <div className={`relative ${imageSizeClasses[size]}`}>
          <div className={`${direction === 'right' ? 'scale-x-[-1]' : ''} transition-transform origin-center w-full h-full`}>
            <Image
              src={imageUrl}
              alt="Custom fish"
              width={192}
              height={192}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      );
    }

  };

  return (
    <div
      className={cn(
        "absolute transition-opacity",
        isNightMode ? "opacity-75" : "opacity-100"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        // make the transform slower
        transition: 'transform 5s ease',
        transform: `translate(-50%, -50%)${temperature !== undefined && temperature >= 28 ? ' rotate(180deg)' : ''}`,
        zIndex: Math.floor(position.y / 10),
        filter: isNightMode ? 'brightness(0.8)' : 'brightness(1)',
        // transition: 'filter 2s ease',
        ...tempStyle,
      }}
    >
      {renderFishShape()}
    </div>
  );
};

export default Fish;