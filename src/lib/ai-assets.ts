/** Local AI / studio imagery in /public */
export const AI_IMAGES = {
  aidevJpeg: '/aidev.jpeg',
  aidevPng: '/aidev.png',
  aiimages: '/aiimages.jpeg',
  airobotics: '/airobotics.png',
  fullstack: '/fullstackai.png',
  llmDev: '/llm%20ai%20dev.png',
  llm: '/llm.png',
  llmai: '/llmai.png',
  robotics: '/robotics.png',
} as const;

export const HOME_AI_CARDS = [
  {
    title: 'Vision AI for Smart Manufacturing',
    description:
      'Custom YOLO-based inspection with a React control cockpit that triages defects and syncs telemetry to the cloud.',
    impact: '95% accuracy · 30% faster QA cycles',
    image: AI_IMAGES.airobotics,
  },
  {
    title: 'GenAI Copilot for Financial Ops',
    description:
      'Secure prompt-engineered assistant layered over ERP data with guardrails, audit logs, and Slack workflows.',
    impact: '400+ daily tasks automated',
    image: AI_IMAGES.llm,
  },
  {
    title: 'Robotics Fleet Dashboard',
    description:
      'Real-time telemetry, mission planning, and OTA updates for collaborative robots controlled via WebRTC.',
    impact: 'Deployed across 3 continents',
    image: AI_IMAGES.robotics,
  },
] as const;

export const AI_STUDIO_PILLARS = [
  {
    title: 'LLM Products & Copilots',
    description:
      'Secure copilots, AI agents, and retrieval applications with guardrails, observability, and enterprise access control.',
    bullets: ['Prompt engineering & evaluation', 'Vector DB architecture', 'Compliance-ready audit trails'],
    image: AI_IMAGES.llmai,
  },
  {
    title: 'Computer Vision & Robotics',
    description:
      'Custom models for inspection, safety, telepresence, and robotic arm control with low-latency dashboards.',
    bullets: ['Edge deployments', 'WebRTC control rooms', 'Digital twin visualizations'],
    image: AI_IMAGES.robotics,
  },
  {
    title: 'Automation & Intelligent Ops',
    description:
      'Workflow automation, predictive maintenance, and event-driven pipelines wired into ERP, CRM, and support tooling.',
    bullets: ['Orchestration with Temporal', 'MLOps + CI/CD', 'SLO-backed incident response'],
    image: AI_IMAGES.llmDev,
  },
] as const;

export const AI_STUDIO_LAB = [
  {
    title: 'Hybrid Robotics Console',
    detail: '3D mission planning, ROS telemetry, and OTA updates for autonomous material handling robots.',
    stack: ['ROS2', 'WebRTC', 'Next.js', 'Three.js'],
    image: AI_IMAGES.robotics,
  },
  {
    title: 'Industrial Vision QA',
    detail: 'Transformer-based defect detection deployed on Jetson edge devices with live retraining schedule.',
    stack: ['PyTorch', 'TensorRT', 'FastAPI', 'Azure IoT'],
    image: AI_IMAGES.airobotics,
  },
  {
    title: 'AI Ops Copilot',
    detail: 'LangChain-powered assistant monitoring logs, suggesting remediations, and triggering workflows via Slack.',
    stack: ['LangChain', 'OpenAI', 'Temporal', 'Postgres'],
    image: AI_IMAGES.aidevPng,
  },
] as const;

export const AI_STUDIO_GALLERY = [
  { title: 'AI Product Engineering', image: AI_IMAGES.fullstack, tag: 'Full stack + AI' },
  { title: 'Generative AI Studio', image: AI_IMAGES.aidevJpeg, tag: 'Copilots & agents' },
  { title: 'Intelligent Interfaces', image: AI_IMAGES.aiimages, tag: 'UX for AI products' },
  { title: 'LLM Workflow Design', image: AI_IMAGES.llmDev, tag: 'Production LLMs' },
] as const;
