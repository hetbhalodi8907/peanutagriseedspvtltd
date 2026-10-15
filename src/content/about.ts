/**
 * About Us page copy. Company facts (name, years, leadership names and roles,
 * contacts) come from `siteConfig`. Biographies use only facts the company supplied:
 * no founding year, export destinations, volumes, awards or certifications.
 */
import { siteConfig } from "@/config/site";
import { images, leadershipPortraits } from "./images";

const { name, yearsInMarket } = siteConfig;
const [md, ceo] = siteConfig.leadership;

export const aboutHero = {
  eyebrow: "About Peanut Agri Seeds",
  titleLead: "Our Culture Is",
  titleAccent: "Agriculture.",
  subtitle: "Rooted in Experience. Growing with Purpose.",
  body: `For ${yearsInMarket} years, ${name} has been part of the agricultural market, focusing on premium groundnut seed products and lasting relationships with the people behind agriculture.`,
  image: images.seedling,
};

export const companyStory = {
  eyebrow: "Our Story",
  titleLead: "Built on Experience.",
  titleAccent: "Guided by Agriculture.",
  paragraphs: [
    `At ${name}, agriculture is more than our business — it is our culture. Over ${yearsInMarket} years in the agricultural market, we have continued to focus on premium groundnut seed products, attention to detail, and meaningful relationships with farmers and business partners.`,
    "Our approach rests on a simple belief: a strong agricultural business is built through experience, care, product knowledge and long-term trust. Guided by a commitment to quality and continuous growth, we aim to serve the evolving needs of the agricultural community.",
  ],
  pillars: ["Experience", "Care", "Product knowledge", "Long-term trust"],
  image: images.floweringPlants,
};

export type LeaderProfile = {
  id: "md" | "ceo";
  name: string;
  role: string;
  roleShort: string;
  intro: string;
  paragraphs: string[];
  focus: string[];
  portrait: (typeof leadershipPortraits)[keyof typeof leadershipPortraits];
};

export const leadershipIntro = {
  eyebrow: "Our Leadership",
  title: "Leadership Rooted in Experience",
  lede: "Two generations of the Bhalodi family guide the company, each bringing their own strengths to its growth.",
};

export const leaders: LeaderProfile[] = [
  {
    id: "md",
    name: md.name,
    role: md.role,
    roleShort: md.roleShort,
    intro: "A hands-on leader who believes lasting growth comes from attention to every detail.",
    paragraphs: [
      `${md.name} has played a pivotal role in building ${name} and guiding its growth. With a hands-on approach to business leadership, he believes that lasting growth comes from paying attention to every detail.`,
      "His leadership is defined by thoughtful decision-making, careful oversight and a commitment to maintaining standards across the company's activities. His experience and guidance have shaped how the company serves the agricultural market and builds long-term business relationships.",
      `As ${md.role}, ${md.name} continues to contribute his experience, practical business understanding and attention to detail to the growth and direction of the company.`,
    ],
    focus: ["Hands-on business leadership", "Attention to detail", "Long-term business relationships"],
    portrait: leadershipPortraits.md,
  },
  {
    id: "ceo",
    name: ceo.name,
    role: ceo.role,
    roleShort: ceo.roleShort,
    intro: "Strong communication and an international outlook, built on a foundation of family experience.",
    paragraphs: [
      `${ceo.name} brings strong communication skills and an international outlook to ${name} in his role as ${ceo.role}. His focus includes building business relationships, communicating effectively with customers and business partners, and developing seed-export opportunities in foreign markets.`,
      `As the son of ${md.role} ${md.name}, he has learned important principles of business management directly from his father's experience and guidance. This foundation has given him a clear understanding of the value of attention to detail, practical business decisions and long-term relationships.`,
      `Combining that foundation with his own strengths in communication and international market development, ${ceo.name} contributes to the company's continuing growth and future direction.`,
    ],
    focus: ["Communication", "Business relationships", "International market development"],
    portrait: leadershipPortraits.ceo,
  },
];

export const leadershipBridge = {
  eyebrow: "Two Generations",
  titleLead: "Experience That Guides.",
  titleAccent: "Vision That Grows.",
  paragraphs: [
    `At ${name}, business experience and forward-looking ambition work together. ${md.role} ${md.name} provides experienced, detail-oriented business guidance, while ${ceo.role} ${ceo.name} builds on that foundation through communication, business relationships and an international-market perspective.`,
    "As father and son, they share a commitment to the company's continued growth, each contributing their own strengths and responsibilities to its development.",
  ],
  roles: [
    { id: "md" as const, label: "Experience", summary: "Detail-oriented business guidance and hands-on leadership" },
    { id: "ceo" as const, label: "Vision", summary: "Communication, business relationships and an international-market perspective" },
  ],
};

export type ApproachTheme = { icon: "years" | "detail" | "seed" | "relationships"; title: string; text: string };

export const approach = {
  eyebrow: "Our Philosophy",
  title: "Why Our Approach Matters",
  lede: "Four principles shape how we run the business and serve our customers.",
  themes: [
    {
      icon: "years",
      title: `${yearsInMarket} Years of Experience`,
      text: `Our understanding of the agricultural market has been built over ${yearsInMarket} years of working with groundnut seeds.`,
    },
    {
      icon: "detail",
      title: "Attention to Detail",
      text: "Care for the details guides both our business leadership and the service we give every customer.",
    },
    {
      icon: "seed",
      title: "Focused on Groundnut Seeds",
      text: "Our offering centres on premium and hybrid groundnut seed products — the crop we know best.",
    },
    {
      icon: "relationships",
      title: "Communication & Relationships",
      text: "We value clear communication and long-term relationships with farmers, dealers, distributors and business partners.",
    },
  ] satisfies ApproachTheme[],
};

export const brandStatement = {
  eyebrow: "Our Purpose",
  body: "We believe that agriculture connects experience, responsibility and the future of food production. Our work is guided by respect for the agricultural community and a focus on serving its evolving seed requirements.",
  image: { ...images.sowingField, alt: "" }, // decorative behind the statement
};

export const aboutContact = {
  eyebrow: "Visit & Contact",
  title: "Connect With Our Team",
  lede: "Speak with us about our groundnut seed range, dealership opportunities or your business requirements.",
  ctas: [
    { label: "Explore Our Seeds", href: "/seeds", variant: "forest" },
    { label: "Contact Our Team", href: "/contact", variant: "outline-dark" },
    { label: "Become a Dealer", href: "/dealer-enquiry", variant: "outline-dark" },
  ] as const,
};
