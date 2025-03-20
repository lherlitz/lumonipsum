import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lumon Ipsum Generator',
    short_name: 'Lumon Ipsum',
    description: 'Generate Severance-themed placeholder text. Please enjoy all paragraphs equally.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e1a26',
    theme_color: '#0e1a26',
    icons: [
      {
        src: '/lumon-globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
} 