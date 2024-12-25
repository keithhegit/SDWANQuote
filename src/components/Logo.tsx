import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/ogcloud-logo.png"
      alt="OgCloud"
      width={120}
      height={30}
      className="h-auto w-auto"
      priority
    />
  );
} 