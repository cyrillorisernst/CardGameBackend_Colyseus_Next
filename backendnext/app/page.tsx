"use client";

import dynamic from 'next/dynamic';

// This is the magic part: it disables SSR for this specific component
const TestNoSSR = dynamic(() => import('@/app/components/Test'), { 
  ssr: false 
});

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Test</h1>
      <TestNoSSR />
    </main>
  );
}