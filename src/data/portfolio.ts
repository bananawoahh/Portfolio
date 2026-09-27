import type { Portfolio } from '../types';

/** EDIT HERE: all identity, copy, projects, contact details, and SEO.
 * All people, organizations, and results below are fictional examples.
 * Replace the examples before setting sampleContent / illustrative to false.
 * Media paths are relative to public/ and must not include "public/".
 */
export const portfolio: Portfolio = {
  sampleContent: true,
  device: {
    wallpaper: 'media/ipad-wallpaper.svg', // REPLACE with media/your-wallpaper.webp
    wallpaperPosition: 'center', // CSS object-position, e.g. '60% center'
  },
  resume: {
    education: [
      {
        institution: 'Your university or institution', // REPLACE
        qualification: 'Bachelor of Communications — sample qualification',
        date: '2021–2024',
        description:
          'Replace with your actual qualification, study dates, and relevant areas of study.',
      },
    ],
  },
  profile: {
    name: 'Boody', // REPLACE with your name
    initials: 'BB',
    title: 'Marketing & communications',
    location: 'Melbourne, Australia', // REPLACE
    availability: 'Open to good conversations',
    headline: ['Good stories.', 'Clear strategy.', 'Real impact.'],
    positioning:
      'I turn brand ambitions into stories people connect with. A curious mind working at the intersection of marketing, content, and communications.',
    photo: '', // Optional: media/your-name-profile.webp
    aboutHeading: 'A strategic mind.\nA creative instinct.',
    about: [
      'I’m Alex, a marketing and communications professional who believes the best work starts with listening. To the audience, to the data, and to the question behind the brief.',
      'From the first insight to the final report, I connect thoughtful strategy with content that feels human. I like clear ideas, collaborative teams, and making the complicated feel simple.',
    ],
  },
  contact: {
    heading: 'Let’s make\nsomething matter.',
    description:
      'Have a story to tell, a challenge to untangle, or a team I should meet? I’d love to hear about it.',
    email: '', // REPLACE with your real email, e.g. hello@yourdomain.com
    socials: [
      { label: 'LinkedIn', url: '' }, // REPLACE with complete https:// URLs
      { label: 'Instagram', url: '' },
    ],
  },
  seo: {
    title: 'Alex Morgan — Marketing & Communications Portfolio', // REPLACE
    description:
      'Thoughtful strategy. Human stories. Explore Alex Morgan’s marketing, content, social media, and communications portfolio. Sample portfolio content.',
    siteUrl: '', // Optional canonical URL; GitHub Actions supplies the Pages URL automatically.
    image: 'media/social-card.png',
    imageAlt: 'Alex Morgan — Good stories. Clear strategy. Real impact.', // REPLACE
  },
  skills: [
    {
      title: 'Find the direction.',
      description: 'The right questions before the big ideas.',
      items: ['Marketing strategy', 'Audience research', 'Brand positioning'],
    },
    {
      title: 'Make it resonate.',
      description: 'Ideas that sound human and feel relevant.',
      items: ['Content creation', 'Social media', 'Brand storytelling'],
    },
    {
      title: 'Move it forward.',
      description: 'Clear messages, considered channels, shared goals.',
      items: ['Communications', 'Integrated campaigns', 'Media planning'],
    },
    {
      title: 'Know what worked.',
      description: 'Connecting creative decisions to meaningful outcomes.',
      items: ['Analytics & reporting', 'Campaign optimisation', 'Social listening'],
    },
  ],
  projects: [
    {
      id: 'common-ground',
      type: 'project',
      layout: 'auto', // 'portrait' (9:16), 'square', 'landscape' (16:9), or { width: 4, height: 5 }
      title: 'Ah',
      client: 'Common Ground Coffee',
      clientInitials: 'cg',
      role: 'Campaign strategy & creative direction',
      date: '2025-11',
      discipline: 'Brand campaign',
      illustrative: true,
      description:
        'Turning an everyday coffee run into a shared neighbourhood ritual. An integrated launch that gave a small coffee brand a much bigger conversation.',
      challenge:
        'Build recognition for an independent coffee subscription in a crowded category, without relying on a large paid-media budget.',
      strategy:
        'Audience interviews revealed that the morning ritual mattered more than tasting notes. I developed “Make time for good,” then connected creator partnerships, short-form social content, and a neighbourhood tasting event with one clear invitation.',
      results:
        'The six-week sample campaign exceeded its subscription target and established a repeatable content platform for the brand.',
      metrics: [
        {
          value: '+48%',
          label: 'engagement rate',
          context: 'Relative increase vs. previous six weeks',
        },
        { value: '2.4×', label: 'campaign ROAS', context: 'Attributed revenue / paid-media spend' },
        { value: '320', label: 'new subscribers', context: 'During the six-week launch' },
      ],
      tags: ['Strategy', 'Branding', 'Social media', 'Creator partnerships'],
      media: [
        {
          type: 'image',
          src: 'media/smash-room.svg',
          alt: 'ah',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'after-hours',
      type: 'project',
      title: 'Culture, beyond the usual crowd.',
      client: 'After Hours Arts',
      clientInitials: 'ah',
      role: 'Social strategy & content production',
      date: '2025-08',
      discipline: 'Social & content',
      illustrative: true,
      description:
        'Opening the doors to a new generation of gallery-goers through a playful, people-first social series.',
      challenge:
        'Help a local arts programme reach younger audiences who felt that galleries were not for them.',
      strategy:
        'Reframed the programme around the people behind the art. Built a four-week editorial calendar of artist introductions, informal explainers, and audience-led recommendations, supported by geographically focused media.',
      results:
        'The sample programme attracted first-time visitors and improved the path from social discovery to ticket purchase.',
      metrics: [
        { value: '86K', label: 'people reached', context: 'Unique accounts across the campaign' },
        { value: '+35%', label: 'ticket sales', context: 'Compared with the previous programme' },
      ],
      tags: ['Social media', 'Content creation', 'Media planning'],
      media: [
        {
          type: 'image',
          src: 'media/after-hours.svg',
          alt: 'Original black-and-ivory After Hours arts poster with intersecting orange circles and the words Art is for everyone.',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'better-together',
      type: 'project',
      title: 'A shared purpose. A clearer voice.',
      client: 'Neighbourhood Collective',
      clientInitials: 'nc',
      role: 'Communications planning & copywriting',
      date: '2025-05',
      discipline: 'Communications',
      illustrative: true,
      description:
        'A communications toolkit that helped a community organisation tell one clear story across many different voices.',
      challenge:
        'Unify fragmented messaging across volunteers, partners, and public channels while keeping the organisation’s warmth.',
      strategy:
        'Facilitated stakeholder interviews, mapped key audiences, and developed a message framework with practical templates for newsletters, partner outreach, and volunteer onboarding.',
      results:
        'The illustrative rollout shortened content approval times and made the volunteer sign-up journey easier to understand.',
      metrics: [
        {
          value: '+29%',
          label: 'volunteer enquiries',
          context: 'First quarter after the sample rollout',
        },
        { value: '−40%', label: 'approval time', context: 'Average time from draft to approval' },
      ],
      tags: ['Communications', 'Copywriting', 'Stakeholder engagement'],
      media: [
        {
          type: 'image',
          src: 'media/better-together.svg',
          alt: 'Original Neighbourhood Collective editorial artwork with overlapping human-shaped symbols and the words Better, together.',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'northline',
      type: 'project',
      title: 'From more content to better content.',
      client: 'Northline Studio',
      clientInitials: 'ns',
      role: 'Content audit & performance analysis',
      date: '2025-02',
      discipline: 'Strategy & analytics',
      illustrative: true,
      description:
        'Replacing a busy publishing schedule with an insight-led content system designed to earn attention and generate qualified interest.',
      challenge:
        'A growing design studio was publishing regularly, but could not connect its content efforts to commercial outcomes.',
      strategy:
        'Audited six months of content, introduced a shared measurement framework, and tested three audience-focused pillars. Built a concise reporting dashboard linking saves, site visits, and enquiries.',
      results:
        'The sample eight-week test produced more qualified enquiries with fewer posts, giving the team a clearer basis for future investment.',
      metrics: [
        {
          value: '+62%',
          label: 'qualified enquiries',
          context: 'Compared with the prior eight weeks',
        },
        {
          value: '−25%',
          label: 'publishing volume',
          context: 'With a focus on higher-value formats',
        },
      ],
      tags: ['Analytics', 'Content strategy', 'Optimisation'],
      media: [
        {
          type: 'image',
          src: 'media/northline.svg',
          alt: 'Original Northline strategy graphic: Less noise. More signal. with a rising orange bar chart.',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'studio-experience',
      type: 'experience',
      title: 'Connecting the dots, every day.',
      client: 'Fieldwork Creative — sample employer',
      clientInitials: 'fc',
      role: 'Marketing & Communications Coordinator',
      date: '2024–2025',
      discipline: 'Experience',
      illustrative: true,
      description:
        'A sample professional experience entry showing how a day-to-day role connects planning, creative production, and reporting.',
      challenge:
        'Keep multiple client workstreams aligned while maintaining a consistent standard across channels.',
      strategy:
        'Coordinated campaign calendars, wrote social and email content, briefed creative partners, and translated monthly reporting into clear next steps.',
      results:
        'Introduced a shared briefing template and reporting rhythm that helped the team make clearer decisions. Replace this entry with your actual responsibilities and achievements.',
      metrics: [],
      tags: ['Project coordination', 'Copywriting', 'Reporting'],
      media: [],
    },
  ],
};
