import Image from 'next/image';

export function Logo() {
  return (
    <div className="relative h-8">
      <Image
        src="/ogcloud-logo.png"
        alt="OgCloud"
        width={120}
        height={32}
        className="h-auto w-auto"
        priority
      />
    </div>
  );
} 