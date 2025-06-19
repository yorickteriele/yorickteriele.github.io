export const siteConfig = {
  name: "Yorick te Riele",
  title: "Yorick te Riele - Full-Stack Developer Portfolio",
  description: "Ervaren full-stack developer uit Nederland, gespecialiseerd in moderne web technologieën. Bekijk mijn projecten en ervaring in React, Next.js, TypeScript en meer.",
  url: "https://yorickteriele.nl",
  domain: "yorickteriele.nl",
  email: "yorick.teriele@outlook.com",
  
  keywords: [
    "Yorick te Riele",
    "full-stack developer",
    "web developer Nederland", 
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "frontend developer",
    "backend developer",
    "portfolio website",
    "web development",
    "software engineer",
    "JavaScript developer"
  ],
  
  ogImage: "/og-image.svg", // Simple SVG that works with static export 
  twitterHandle: "@yorickteriele", 
  
  location: "Nederland",
  
  googleAnalyticsId: "G-XXXXXXXXXX", 
  
  schema: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yorick te Riele",
    "jobTitle": "Full-Stack Developer",
    "description": "Ervaren full-stack developer gespecialiseerd in moderne web technologieën",
    "url": "https://yorickteriele.nl",
    "email": "yorick.teriele@outlook.com",
    "addressLocality": "Nederland",
    "knowsAbout": [
      "JavaScript",
      "TypeScript", 
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Frontend Development",
      "Backend Development"
    ],
    "sameAs": [
      "https://github.com/yorickteriele",
      "https://linkedin.com/in/yorickteriele",
      "https://twitter.com/yorickteriele"
    ]
  }
} as const;
