import Image from 'next/image';

export function Logo() {
  return (
    <div className="relative w-[100px] h-[25px]">
      <Image
        src="/ogcloud-logo.png"
        alt="OgCloud"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 