//app.config.ts

export default defineAppConfig({
  // ── Identité ─────────────────────────────────────────
  identity: {
    name: "Adam Abdel-Djamal",
    title: "Full-Stack Developer",
    tagline:
      "Laravel · Vue.js · Node.js · REST APIs · SaaS · Intégrations paiements",
    bio: "Développeur Full-Stack basé à Cotonou, Bénin. Je conçois des applications web rapides, accessibles et scalables — du backend Laravel/Node.js au frontend Vue/Nuxt, en passant par l'intégration de paiements et les architectures SaaS.",
    location: "Cotonou, Bénin",
    available: true, // passe à false si tu n'es plus disponible
  },

  // ── Liens ────────────────────────────────────────────
  links: {
    github: "https://github.com/ton-user", // à remplacer
    linkedin: "https://linkedin.com/in/abdel-djamal-adam-b952381b2",
    cal: "https://cal.com/ton-compte", // à remplacer
    whatsapp: "https://wa.me/XXXX", // à remplacer
    email: "ton@email.com", // à remplacer
  },

  // ── Expériences professionnelles ─────────────────────
  experience: [
    {
      role: "Développeur Web Freelance",
      company: "Infraxdev",
      type: "Freelance · Hybride",
      location: "Cotonou, Bénin",
      period: "Janvier 2023 — Aujourd'hui",
      current: true,
      description:
        "Conception et développement d'applications web full-stack pour des clients variés. Architecture de solutions SaaS, intégrations de paiements, et déploiement sur des environnements cloud.",
      skills: [
        "Vue.js",
        "Nuxt.js",
        "Laravel",
        "PHP",
        "MongoDB",
        "Pinia",
        "Vuex",
        "Supabase",
        "Mongoose",
        "Vite",
      ],
    },
    {
      role: "Stagiaire Développeur",
      company: "OSI Group Sarl",
      type: "Stage · Sur site",
      location: "Cotonou, Bénin",
      period: "Mars 2022 — Novembre 2022",
      current: false,
      description:
        "Développement et maintenance d'outils internes avec React.js. Participation au cycle complet de développement : conception, intégration, tests et livraison. Collaboration en équipe sur des projets réels en environnement professionnel.",
      skills: [
        "React.js",
        "Express.js",
        "Node.js",
        "PostgreSQL",
        "TailwindCSS",
        "React Hooks",
      ],
    },
    {
      role: "Stagiaire Développeur",
      company: "RINTIO",
      type: "Stage de fin de licence · Sur site",
      location: "Cotonou, Bénin",
      period: "Septembre 2019 — Décembre 2019",
      current: false,
      description:
        "Stage de fin de licence au sein de l'équipe technique. Développement d'une application web avec Angular, conception d'interfaces avec Angular Material, exploration d'Ionic pour le mobile hybride. Premier contact avec un environnement professionnel réel.",
      skills: [
        "Angular",
        "JavaScript",
        "Angular Material",
        "Ionic",
        "Git",
        "Bootstrap",
      ],
    },
  ],

  // ── Formation ────────────────────────────────────────
  education: [
    {
      institution: "Smartel",
      degree: "Développement & Conception d'Applications Web",
      level: "Formation intensive",
      period: "Février 2023 — Juillet 2024",
      description:
        "Formation intensive orientée pratique sur le développement et la conception d'applications web. Projets pratiques en équipe.",
      skills: ["Laravel", "Nuxt.js", "Vue.js", "TypeScript"],
    },
    {
      institution: "ENEAM",
      degree: "Licence en Informatique",
      level: "Bac + 3",
      period: "Janvier 2017 — Décembre 2019",
      description:
        "Licence en informatique avec spécialisation en programmation et conception de systèmes d'information. Projets de développement en équipe, travaux pratiques de programmation.",
      skills: ["PHP", "SQL", "Algorithmique", "Systèmes d'information"],
    },
  ],

  // ── Certifications ───────────────────────────────────
  // Stratégie : afficher uniquement les certifications Anthropic (actives, récentes, rares)
  // Les 3 Udemy sont expirées (jan 2024–jan 2025) → masquées, expired: true
  certifications: [
    {
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "Mai 2026",
      credentialId: "thnjbp4m5s5n",
      expired: false,
      skills: ["AI", "Prompt Engineering"],
      description:
        "Formation pratique sur l'interaction efficace, éthique et sécurisée avec les modèles d'IA. Conçue avec des experts académiques de University College Cork et Ringling College.",
      url: "https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/overlay/Certifications/1074494503/treasury/",
    },
    {
      title: "Claude Code 101",
      issuer: "Anthropic",
      date: "Mai 2026",
      credentialId: "c4wwij2se4cs",
      expired: false,
      skills: ["Claude Code", "AI Coding Agents"],
      description:
        "Maîtrise de Claude Code comme agent de développement : installation, workflow quotidien, personnalisation avancée.",
      url: "https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/overlay/Certifications/1074494503/treasury/",
    },
    {
      title: "Claude Code in Action",
      issuer: "Anthropic",
      date: "Avril 2026",
      credentialId: "o5qsz8yqtxf6",
      expired: false,
      skills: ["Claude Code", "MCP Servers", "GitHub Integration"],
      description:
        "Architecture avancée des assistants de code IA, gestion du contexte, extension via MCP servers et intégration GitHub.",
      url: "https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/overlay/Certifications/1074494503/treasury/",
    },
    // Certifications Udemy conservées en données mais masquées (expired: true)
    // Le composant filtre sur expired: false pour l'affichage public
    {
      title: "Pack Google Digital (Ads, SEO, Analytics, My Business)",
      issuer: "Udemy",
      date: "Janvier 2024",
      credentialId: "UC-90ef65f8-978f-41e4-a08e-f55702473349",
      expired: true,
      skills: ["Google Analytics", "Google Ads", "SEO"],
      description: "",
      url: "",
    },
    {
      title: "ChatGPT, GPT4, Midjourney — Formation IA Complète 2023",
      issuer: "Udemy",
      date: "Janvier 2024",
      credentialId: "UC-a11912c2-e361-4157-ab68-d5a34dd2e741",
      expired: true,
      skills: ["Prompt Engineering", "Midjourney"],
      description: "",
      url: "",
    },
    {
      title: "Formation Complète Développeur Web",
      issuer: "Udemy",
      date: "Janvier 2024",
      credentialId: "UC-e7a70b35-6a04-43be-a90d-a7f32f28dbbc",
      expired: true,
      skills: ["Bootstrap", "PHP"],
      description: "",
      url: "",
    },
  ],

  // ── Compétences techniques ───────────────────────────
  // Niveaux : 'expert' | 'proficient' | 'familiar'
  // expert     → utilisé en production quotidiennement
  // proficient → utilisé régulièrement sur des projets réels
  // familiar   → concepts maîtrisés, utilisé en projet
  skills: {
    frontend: [
      { name: "Vue.js / Nuxt", icon: "logos:vue", level: "expert" },
      {
        name: "TypeScript",
        icon: "logos:typescript-icon",
        level: "proficient",
      },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", level: "expert" },
      {
        name: "React / React Native",
        icon: "logos:react",
        level: "proficient",
      },
      { name: "JavaScript", icon: "logos:javascript", level: "expert" },
      { name: "HTML / CSS", icon: "logos:html-5", level: "expert" },
    ],
    backend: [
      { name: "Laravel / PHP", icon: "logos:laravel", level: "expert" },
      { name: "Node.js", icon: "logos:nodejs-icon", level: "proficient" },
      { name: "Express.js", icon: "logos:express", level: "proficient" },
      { name: "REST APIs", icon: "ph:cloud-arrow-up", level: "expert" },
      { name: "Python", icon: "logos:python", level: "familiar" },
    ],
    database: [
      {
        name: "PostgreSQL",
        icon: "logos:postgresql",
        level: "proficient",
        project: "query-craft",
      },
      { name: "MongoDB", icon: "logos:mongodb-icon", level: "proficient" },
      { name: "Supabase", icon: "logos:supabase-icon", level: "proficient" },
      { name: "MySQL", icon: "logos:mysql-icon", level: "familiar" },
    ],
    devops: [
      { name: "Git / GitHub", icon: "logos:github-icon", level: "expert" },
      {
        name: "Docker",
        icon: "logos:docker-icon",
        level: "familiar",
        project: "deploy-lab",
      },
      { name: "Vercel", icon: "logos:vercel-icon", level: "proficient" },
      { name: "Linux", icon: "logos:linux-tux", level: "familiar" },
    ],
    ai: [
      {
        name: "Claude Code",
        icon: "ph:robot",
        level: "proficient",
        project: "ai-blog-autopilot",
      },
      { name: "Prompt Engineering", icon: "ph:brain", level: "proficient" },
      { name: "MCP Servers", icon: "ph:plug", level: "familiar" },
    ],
  },

  // ── Services proposés ────────────────────────────────
  services: [
    {
      icon: 'ph:code',
      title: 'Web Applications',
      category: 'frontend',
      painPoint: 'Votre application est lente, complexe à maintenir, et vos utilisateurs partent chez la concurrence.',
      solution: 'Je construis des applications web sur mesure, rapides, scalables et maintenables, avec un frontend fluide et une architecture cloud robuste.',
      // Résultats traduits en euros / business impact
      results: [
        'Jusqu’à +20 % de conversions grâce à un temps de chargement divisé par 3',
        'Réduction de 30 à 50 % des coûts de maintenance à long terme',
        'Scalabilité immédiate : vous passez de 100 à 10 000 utilisateurs sans refonte',
      ],
      techs: ['Vue.js / Nuxt', 'Laravel / PHP', 'TypeScript', 'Tailwind CSS', 'Docker'],
      project: 'saas-ecommerce',
      testimonial: null,
      cta: 'Parlez-moi de votre projet',
    },
    {
      icon: 'ph:device-mobile',
      title: 'Mobile Apps',
      category: 'frontend',
      painPoint: 'Développer pour iOS et Android séparément double vos coûts et vos délais.',
      solution: 'Je crée une application React Native unique, performante et native-like, déployée sur les deux stores, avec un code maintenable et une expérience fluide.',
      results: [
        'Budget réduit de 40 % par rapport à deux développements natifs séparés',
        'Mise sur le marché 30 % plus rapide (un seul développement)',
        'Maintenance simplifiée : une seule base de code pour les deux plateformes',
      ],
      techs: ['React / React Native', 'Expo', 'Node.js', 'PostgreSQL'],
      project: 'mobile-x',
      testimonial: null,
      cta: 'Parlons de votre app mobile',
    },
    {
      icon: 'ph:globe',
      title: 'SEO & Performance',
      category: 'frontend',
      painPoint: 'Votre site est invisible sur Google et si lent que vos visiteurs quittent avant même d’avoir vu votre contenu.',
      solution: 'Je réalise un audit technique complet (Core Web Vitals, accessibilité, SEO) et j’applique les optimisations nécessaires pour un site éclair.',
      results: [
        'Chargement en < 2 s → réduction du taux de rebond de 40 %',
        'Score SEO technique parfait → meilleure indexation, trafic organique multiplié',
        'Chaque seconde de chargement en moins = +2 % de taux de conversion',
      ],
      techs: ['Lighthouse', 'Nuxt SEO', 'Vercel', 'Cloudflare'],
      project: 'adam-portfolio',
      testimonial: null,
      cta: 'Auditez votre site',
    },
    {
      icon: 'ph:robot',
      title: 'AI & Automatisation',
      category: 'ai',
      painPoint: 'Votre équipe passe des heures sur des tâches (saisie, emails, rapports) qui pourraient être automatisées.',
      solution: 'J’intègre des assistants IA sur mesure et des pipelines d’automatisation pour vous rendre du temps et réduire les erreurs humaines.',
      results: [
        'Économisez jusqu’à 15 h / semaine par collaborateur (soit environ 8 000 € / an)',
        'Réduction des erreurs de saisie de 90 %',
        'Vos collaborateurs recentrés sur la création de valeur, pas sur la paperasse',
      ],
      techs: ['Claude Code', 'Prompt Engineering', 'n8n', 'Python'],
      project: null,
      testimonial: null,
      cta: 'Automatisez vos processus',
    },
  ],
  // projects
  projects: [
    {
      slug: "adam-portfolio",
      title: "Adam Portfolio",
      role: "Lead Full-Stack Developer",
      year: "2025",
      description:
        "Nuxt 4 portfolio with dynamic content, i18n, blog, and CI/CD via GitHub Actions.",
      image: "/images/portfolio/portfolio-v2.jpg", // ensure path exists
      stack: ["Vue.js", "Nuxt 4", "TypeScript", "Tailwind", "GitHub Actions"],
      liveUrl: "https://adam.codes",
      repoUrl: "https://github.com/adam/portfolio", // replace
      category: "frontend", // for filtering
    },
    {
      slug: "saas-ecommerce",
      title: "SaaS E‑commerce Platform",
      role: "Full-Stack Developer",
      year: "2025",
      description:
        "Multi-tenant SaaS with Laravel, Vue 3, Stripe integration, and Docker deployment.",
      image: "/images/portfolio/saas.jpg", // add image
      stack: ["Laravel", "Vue.js", "Stripe", "PostgreSQL", "Docker"],
      liveUrl: "https://saas.app",
      repoUrl: null, // if private
      category: "backend",
    },
    {
      slug: "mobile-x",
      title: "Mobile App X",
      role: "React Native Developer",
      year: "2024",
      description:
        "Cross-platform mobile app for field agents with offline-first sync and real-time dashboard.",
      image: "/images/portfolio/mobile-x.jpg",
      stack: ["React Native", "Expo", "Node.js", "MongoDB"],
      liveUrl: null, // maybe only on app stores
      repoUrl: "https://github.com/adam/mobile-x",
      category: "frontend", // or 'mobile'
    },
    // Database
    {
      slug: "query-craft",
      title: "Query Craft",
      role: "Full-Stack Developer",
      year: "2026",
      description:
        "SQL query analyzer with execution plan visualization and optimization suggestions.",
      image: "/images/portfolio/query-craft.jpg",
      stack: ["Vue.js", "Node.js", "PostgreSQL", "Docker", "Tailwind"],
      liveUrl: "https://query-craft.vercel.app",
      repoUrl: "https://github.com/your-username/query-craft",
      category: "database",
    },

    // DevOps
    {
      slug: "deploy-lab",
      title: "Deploy Lab",
      role: "DevOps Engineer",
      year: "2025",
      description:
        "CI/CD pipeline and containerized microservice with automated deployment and monitoring.",
      image: "/images/portfolio/deploy-lab.jpg",
      stack: ["Docker", "GitHub Actions", "Vercel", "Nginx", "Linux"],
      liveUrl: "https://deploy-lab.vercel.app",
      repoUrl: "https://github.com/your-username/deploy-lab",
      category: "devops",
    },

    // AI
    {
      slug: "ai-blog-autopilot",
      title: "AI Blog Autopilot",
      role: "AI Developer",
      year: "2026",
      description:
        "Article summarization tool using Claude API with prompt templates and MCP integration.",
      image: "/images/portfolio/ai-autopilot.jpg",
      stack: [
        "Nuxt 4",
        "Claude API",
        "Prompt Engineering",
        "Supabase",
        "Figma",
      ],
      liveUrl: "https://ai-autopilot.vercel.app",
      repoUrl: "https://github.com/your-username/ai-blog-autopilot",
      category: "ai",
    },
  ],
});
