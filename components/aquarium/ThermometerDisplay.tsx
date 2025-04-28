"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type ThermometerDisplayProps = {
  temperature: number;
};

const ThermometerDisplay = ({ temperature }: ThermometerDisplayProps) => {
  // Calculate color based on temperature
  const getTemperatureColor = () => {
    if (temperature < 20) return 'bg-blue-500';
    if (temperature > 28) return 'bg-red-500';
    return 'bg-green-500';
  };

  // Calculate fill height based on temperature (18-30°C range)
  const getFillHeight = () => {
    const minTemp = 18;
    const maxTemp = 30;
    const percentage = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;
    return `${Math.max(0, Math.min(100, percentage))}%`;
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-md p-1.5">
      <div className="relative w-3 h-10 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out",
            getTemperatureColor()
          )}
          style={{ height: getFillHeight() }}
        />
        <div className="absolute inset-0 rounded-full border border-gray-400" />
      </div>
      <div className="text-white text-xs font-medium">
        {temperature}°C
      </div>
    </div>
  );
};

export default ThermometerDisplay;