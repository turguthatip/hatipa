export interface ProjectVideo {
  src: string;
  caption?: string;
}

export interface ProjectMediaBlock {
  type: "image" | "video";
  /** One src for a single image/video, or several to lay images out side by side under one caption. */
  src: string | string[];
  caption?: string;
}

export interface ProjectSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Images/videos shown after this section's text, in order (e.g. screenshots, flows). */
  media?: ProjectMediaBlock[];
}

export interface CaseStudy {
  sections: ProjectSection[];
  videos?: ProjectVideo[];
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  year: string;
  /** Video shown on the homepage grid card, in place of the placeholder thumbnail. */
  thumbnail?: string;
  caseStudy?: CaseStudy;
}

const tapAndSignCaseStudy: CaseStudy = {
  sections: [
    {
      heading: "Project overview",
      paragraphs: [
        "Tap&Sign is a cloud-based digital signature software developed by DDTECH, a tech company based in Turkey. DDTECH was looking to improve the usability of the platform. I was tasked with conducting user research, competitive analysis and designing a user interface to improve the signing experience.",
      ],
    },
    {
      heading: "Identifying problems",
      paragraphs: [
        "After conducting user research and competitive analysis, I uncovered several key issues:",
      ],
      bullets: [
        "Document upload feature lacked discoverability and did not support multiple uploads, which did not address user needs",
        "Recipient feature lacked discoverability and was too complicated to use",
        "Signature assignment in editor mode was confusing, especially when dealing with multiple signers and assigning signature type.",
      ],
    },
    {
      heading: "Turning ideas into prototypes",
      paragraphs: [
        "I created wireframes to redesign the process flows. I built several iterations to address weaknesses and produced a low-fidelity prototype of the platform's user interface.",
      ],
    },
    {
      heading: "Testing and iteration",
      paragraphs: [
        "The low-fidelity prototype was presented to internal stakeholders, who provided feedback that was incorporated into the design. Final changes were made, and high-fidelity prototypes of the document upload, recipient and signature allocation process flows were created. User testing was conducted and feedback incorporated. Then, the user interface was finalised.",
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "The refreshed platform features are now simpler and easier to use, with a streamlined user flow and improved interface. The discoverability of the features was boosted, and all previously unaddressed user needs were taken into account, resulting in an improved signing experience.",
      ],
    },
  ],
  videos: [{ src: "/videos/tap-and-sign/platform-design.mp4" }],
};

const myVodafoneCaseStudy: CaseStudy = {
  sections: [
    {
      heading: "Project overview",
      paragraphs: [
        "Vodafone Cyprus approached me to improve the usability of its My Vodafone app for B2B and B2C users. I analysed user and competitor information, generated ideas, prototyped, iterated and built high-fidelity prototypes to optimise the app's user experience and align it with user expectations in a fast-paced tech environment.",
      ],
      media: [{ type: "image", src: "/images/my-vodafone/hero.png" }],
    },
    {
      heading: "Identifying problems",
      paragraphs: [
        "Issues with the app's user experience were identified through user research and competitive analysis:",
      ],
      bullets: [
        "Fragmented and complicated user experience left users frustrated and overwhelmed",
        "Hard to find critical features were driving users away from the app",
        "Lack of discoverability of user information made users feel insecure, resulting in a lack of reliance on the app",
      ],
      media: [
        {
          type: "image",
          src: "/images/my-vodafone/home-page.png",
          caption: "Home page",
        },
        { type: "image", src: "/images/my-vodafone/flow.png" },
      ],
    },
    {
      heading: "Turning ideas into prototypes",
      paragraphs: [
        "Low-fidelity prototypes were created for the optimised landing page, sitemap and individual functionalities. The structure of the app was simplified by integrating features into a single screen, reducing user confusion and making navigation easier and more efficient. KPI sections were highlighted, and filtering and categorisation options were introduced for various functions, making information more discoverable.",
      ],
      media: [
        {
          type: "image",
          src: "/images/my-vodafone/pay-shop.png",
          caption: "Vodafone pay, online shop",
        },
      ],
    },
    {
      heading: "Testing and iteration",
      paragraphs: [
        "Once the low-fidelity prototypes were delivered, they were tested with partners, and final refinements were made. High-fidelity prototypes were created for the app's landing page, sitemap and individual functionalities, adding interaction and applying branding guidelines.",
      ],
      media: [
        {
          type: "image",
          src: "/images/my-vodafone/vodafone-happy.png",
          caption: "Vodafone happy",
        },
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "The project resulted in a refined user experience of the app, reducing user confusion and increasing engagement with the client's KPI features.",
      ],
      media: [
        {
          type: "image",
          src: "/images/my-vodafone/fortune-wheel.png",
          caption: "Fortune wheel",
        },
      ],
    },
  ],
};

const turkcellCaseStudy: CaseStudy = {
  sections: [
    {
      heading: "Project overview",
      paragraphs: [
        "In my most recent project with Turkcell, a Turkish telecoms company, I was responsible for designing the look and the feel of a new feature for its sales platform that enabled B2C customer service representatives (working in showrooms) to collect electronic signatures from clients using their ID-cards to sign documents.",
      ],
      media: [{ type: "image", src: "/images/turkcell/hero.jpg" }],
    },
    {
      heading: "Research and analysis",
      paragraphs: [
        "First, I had detailed discussions with the client to understand the business needs and thoroughly analysed the project brief. I also researched best practices in the industry and user preferences to ensure that my design choices met the needs of the target users.",
      ],
    },
    {
      heading: "Turning ideas into prototypes",
      paragraphs: [
        "In the prototyping phase, I aimed to ensure that users were able to easily understand the instructions and navigate the process. To achieve this, I designed a step-by-step process flow. I also created screens with simple and visually-supported instructions to help users move along smoothly.",
      ],
      media: [{ type: "image", src: "/images/turkcell/flow.png" }],
    },
    {
      heading: "Testing and iteration",
      paragraphs: [
        "User testing was conducted to ensure that the feature was easy to use and the instructions were easy to comprehend. The prototype went through several iterations of testing and refinement until the desired user experience was attained. Finally, I produced a high-fidelity prototype and collaborated with a cross-functional team to integrate the new feature into the existing ecosystem of Turkcell's platform.",
      ],
      media: [
        {
          type: "video",
          src: "/videos/turkcell/card-reader-signing.mp4",
          caption: "Card reader signing",
        },
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "The result of the project was the successful implementation of the new feature designed for Turkcell's B2C showroom sales platform, which led to a more efficient sales process.",
      ],
    },
  ],
};

const verifierCaseStudy: CaseStudy = {
  sections: [
    {
      heading: "Project overview",
      paragraphs: [
        "Verifier, a face ID verification application developed by KnowYourX, needed to be optimised to improve the user experience and streamline the verification process in order to grow user satisfaction and process efficiency. I was given the task of identifying problem areas and creating a clearer and more straightforward experience for both users and agents.",
      ],
      media: [{ type: "image", src: "/images/verifier/hero.png" }],
    },
    {
      heading: "Identifying problems",
      paragraphs: [
        "I conducted competitor and user research and participated in a problem definition workshop with the project team where several issues were pinpointed:",
      ],
      bullets: [
        "Unnecessarily long user journey in the app",
        "Many non-essential screens, driving the interaction cost up and causing user fatigue",
        "KYC agent verification section was not properly integrated into the user journey and did not provide adequate guidance",
        "KYC agent platform did not provide a step-by-step view of user ID verification progress, making it more difficult for agents to effectively perform compliance checks",
      ],
    },
    {
      heading: "Turning ideas into prototypes",
      paragraphs: [
        "To address these issues, I produced low fidelity prototypes for a streamlined user journey, improving the integration and guidance of the KYC agent check section, and for the KYC agent platform, providing a clear, step-by-step representation of the verification progress and needed guidance.",
      ],
      media: [
        { type: "video", src: "/videos/verifier/showcase.mp4" },
        {
          type: "image",
          src: [
            "/images/verifier/id-verification-flow.png",
            "/images/verifier/id-verification-screens.png",
          ],
          caption: "ID verification",
        },
        {
          type: "image",
          src: "/images/verifier/kyc-agent-flow.png",
          caption: "KYC Agent",
        },
      ],
    },
    {
      heading: "Testing and iteration",
      paragraphs: [
        "Testing was conducted to gather feedback from users and agents on the usability, functionality and overall experience of the new design. This feedback was then used to make the necessary improvements and refinements, leading to the creation of a high-fidelity prototype.",
      ],
      media: [
        { type: "video", src: "/videos/verifier/agent-platform-mockup.mp4" },
        { type: "image", src: "/images/verifier/verification-platform.png" },
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "The redesigned user journey on the verification app is now simpler and easier to follow, with a streamlined user flow and improved interface. The structured flow of face ID verification on the agent platform increased process efficiency and eliminated friction points. Overall, the redesign improved the user experience, raised user confidence and streamlined the verification process, enabling KnowYourX to achieve its goal of bettering its product.",
      ],
    },
  ],
};

/* Placeholder year — fill in with the real details. */
const projectData: Omit<Project, "slug">[] = [
  {
    title: "UX optimisation for Tap&Sign",
    company: "Tap&Sign",
    year: "2024",
    thumbnail: "/videos/tap-and-sign/main.mp4",
    caseStudy: tapAndSignCaseStudy,
  },
  {
    title: "UX optimisation for My Vodafone",
    company: "Vodafone Cyprus",
    year: "2022",
    thumbnail: "/videos/my-vodafone/thumbnail.mp4",
    caseStudy: myVodafoneCaseStudy,
  },
  {
    title: "UX optimisation for Verifier",
    company: "KnowYourX",
    year: "2021",
    thumbnail: "/videos/verifier/thumbnail.mp4",
    caseStudy: verifierCaseStudy,
  },
  {
    title: "Feature design (UX/UI) for Turkcell",
    company: "Turkcell",
    year: "2021",
    thumbnail: "/images/turkcell/thumbnail.jpg",
    caseStudy: turkcellCaseStudy,
  },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* Dedupe slugs in case titles repeat. */
const slugCounts = new Map<string, number>();

export const projects: Project[] = projectData.map((data) => {
  const base = slugify(data.title);
  const count = slugCounts.get(base) ?? 0;
  slugCounts.set(base, count + 1);
  const slug = count === 0 ? base : `${base}-${count + 1}`;
  return { slug, ...data };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index - 1 + projects.length) % projects.length];
}
