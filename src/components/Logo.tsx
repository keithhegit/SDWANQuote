import { useState } from 'react';

export function Logo() {
  // 由于图片加载问题，我们暂时使用文字Logo
  return (
    <div className="text-2xl font-bold text-brand-500 tracking-wide">
      OgCloud
    </div>
  );
} 