import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/ogcloud-logo.png"
      alt="OgCloud"
      width={100}
      height={25}
      className="h-auto w-auto"
      priority
    />
  );
} 