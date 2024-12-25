import Image from 'next/image';

export function Logo() {
  return (
    <div className="fixed top-4 left-4 z-10 p-2">
      <Image
        src="/ogcloud-logo.png"
        alt="OgCloud"
        width={150}
        height={40}
        className="h-auto w-auto dark:brightness-110"
        priority
      />
    </div>
  );
} 