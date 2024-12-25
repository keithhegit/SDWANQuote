import Image from 'next/image';
import { useState } from 'react';

export function Logo() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="relative w-[100px] h-[25px] flex items-center justify-center text-brand-500 font-medium">
        OgCloud
      </div>
    );
  }

  return (
    <div className="relative w-[100px] h-[25px]">
      <Image
        src="/ogcloud-logo.png"
        alt="OgCloud"
        fill
        className="object-contain"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
} 