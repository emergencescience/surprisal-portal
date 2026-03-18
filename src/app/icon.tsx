import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Emergence Science Logo';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          border: '1px solid rgba(59, 130, 246, 0.5)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <path d="M20.2 20.2c2.8-2.8 2.8-7.4 0-10.2s-7.4-2.8-10.2 0-2.8 7.4 0 10.2 7.4 2.8 10.2 0z" />
          <path d="M15.8 15.8c2.2-2.2 2.2-5.8 0-8s-5.8-2.2-8 0-2.2 5.8 0 8 5.8 2.2 8 0z" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
