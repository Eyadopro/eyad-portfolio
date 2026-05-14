export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  metrics?: string[];
  tech?: string[];
  link?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'neural-arch',
    title: 'Neural Architecture',
    category: 'AI / 3D Visualization',
    description:
      'A WebGL-powered visualization tool for deep learning models, rendering 1M+ pathways in real-time.',
    challenge: 'Rendering dense neural connections at 60fps without GPU thermal throttling.',
    solution:
      'Implemented GPGPU computing using custom GLSL shaders to offload particle math from the CPU.',
    metrics: ['-40% Latency', '99.9% Frame Stability', 'WebGL 2.0 Optimized'],
    tech: ['Next.js', 'Three.js', 'Python', 'GLSL'],
    link: '#',
  },
  {
    id: 'quantum-ledger',
    title: 'Quantum Ledger',
    category: 'FinTech Interface',
    description:
      'Ultra-low latency trading dashboard for digital assets with atomic state synchronization.',
    challenge: 'Visualizing micro-fluctuations in high-frequency trading environments.',
    solution:
      'Custom WebSocket orchestration layer with binary data compression and atomic state updates.',
    metrics: ['<1ms Update Rate', 'Zero State Conflicts', 'ISO 27001 Compliant'],
    tech: ['React', 'Zustand', 'WebSockets', 'Rust'],
    link: '#',
  },
  {
    id: 'silent-id',
    title: 'Silent Identity',
    category: 'Luxury E-Commerce',
    description:
      'Headless storefront focusing on typographic elegance and non-intrusive user journeys.',
    challenge: 'Balancing ultra-high-res editorial imagery with mobile performance.',
    solution:
      'Next.js Image optimization with custom Edge Functions for localized asset delivery.',
    metrics: ['98 Lighthouse Score', '+25% Conversion', 'Global CDN'],
    tech: ['Next.js', 'Tailwind', 'Shopify API', 'Vercel'],
    link: '#',
  },
  {
    id: 'helios-os',
    title: 'Helios OS',
    category: 'Systems Design',
    description:
      'A browser-based micro-kernel environment for decentralized application hosting.',
    challenge:
      'Emulating OS-level memory management within a sandboxed browser environment.',
    solution:
      'Utilized Web Workers and SharedArrayBuffer for multi-threaded process simulation.',
    metrics: ['50ms Boot Time', 'Zero Jank UI', 'Wasm Powered'],
    tech: ['Rust', 'WebAssembly', 'TypeScript'],
    link: '#',
  },
  {
    id: 'cyber-vault',
    title: 'Cyber Vault',
    category: 'Security',
    tech: ['Next.js', 'Auth.js'],
    description: 'Encrypted asset management system.',
  },
  {
    id: 'nexus-flow',
    title: 'Nexus Flow',
    category: 'SaaS',
    tech: ['Node.js', 'Redis'],
    description: 'Automation workflow engine for enterprise.',
  },
  {
    id: 'aura-ui',
    title: 'Aura UI',
    category: 'Design System',
    tech: ['React', 'Framer'],
    description: 'Luxury component library with motion primitives.',
  },
  {
    id: 'zenith-ai',
    title: 'Zenith AI',
    category: 'LLM Tools',
    tech: ['OpenAI', 'LangChain'],
    description: 'Intelligent prompt engineering platform.',
  },
];
