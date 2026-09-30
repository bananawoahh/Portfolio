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
        institution: 'The University of Melbourne', // REPLACE
        qualification: 'Bachelor of Arts (Media and Communication)',
        date: 'July 2023 - March 2026',
        description:
          '• Grade: H1 First Class Honours\n• Awards: Melbourne Global Scholars Award 2025\n• Co-Curricular Activities: Farrago Magazine (Social Media Team)',
      },
      {
        institution: 'King’s College London', // REPLACE
        qualification: 'Study Abroad',
        date: 'Sep. 2025 - Jan. 2026',
        description: '• Grade: First Class\n• Co-Curricular Activities: DJ Society',
      },
    ],
  },
  profile: {
    name: 'King Shi', // REPLACE with your name
    initials: 'KS',
    title: '',
    location: 'Melbourne, Australia', // REPLACE
    availability: '',
    headline: ['Good stories.', 'Clear strategy.', 'Real impact.'],
    positioning: '',
    photo: '', // Optional: media/your-name-profile.webp
    aboutHeading: 'Unimelb Graduate!!',
    about: [
      'I’m King, a media and communications graduate with experience across communications, marketing and customer-facing roles.',
      'A curious and adaptable communicator who learns quickly and works well with people.',
    ],
  },
  // EDIT HERE: your personal message to readers. Use \n for new lines.
  notes: {
    title: '',
    body: 'Thanks for taking a look around. I hope these projects give you a sense of how I think, what I can do, and the kind of work I enjoy.\n\nI’m always learning, and I’m excited to bring that curiosity to my next opportunity. Thank you for considering my application. I hope to hear from you soon.',
    signOff: 'King.', // Replace with your own closing or signature.
  },
  contact: {
    heading: 'Let’s make\nsomething matter.',
    description:
      'Have a story to tell, a challenge to untangle, or a team I should meet? I’d love to hear about it.',
    email: '', // REPLACE with your real email, e.g. hello@yourdomain.com
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/king-shi/' }, // REPLACE with complete https:// URLs
      { label: 'Instagram', url: '' },
    ],
  },
  seo: {
    title: 'King’s Portfolio', // REPLACE
    description:
      '',
    siteUrl: '', // Optional canonical URL; GitHub Actions supplies the Pages URL automatically.
    image: '',
    imageAlt: '', // REPLACE
  },
  skills: [
    {
      title: 'I love to learn.',
      description:
        'Curious, adaptable, a desire to learn new skills. Some tools I’ve self-learnt include:',
      items: ['Final Cut Pro', 'CapCut', 'Affinity', 'Logic Pro', 'Canva', 'Making this website!'],
    },
    {
      title: 'Social Media.',
      description: 'Creating, publishing, consuming. Some of them I’ve done it across:',
      items: ['Instagram', 'TikTok', 'Facebook'],
    },
    {
      title: 'Languages.',
      description: 'Connection across Cultures.',
      items: [
        'Native English Speaker',
        'Limited working proficiency Mandarin',
        'Limited working proficiency Cantonese',
      ],
    },
    {
      title: 'Certifications.',
      description: 'Always good to have these.',
      items: [
        'First Aid (Valid until mid 2029)',
        'Working with Childrens’s Check (vaild until April 2027)',
      ],
    },
  ],
  projects: [
    {
      id: 'event-posters',
      type: 'project',
      instagramUrl: '', // Paste your https://www.instagram.com/p/.../ or /reel/.../ link. Optional.

      layout: 'auto', // 'portrait' (9:16), 'square', 'landscape' (16:9), or { width: 4, height: 5 }
      title: 'Promotional Event Posters',
      client: 'Sunflower Care Victoria',
      clientInitials: 'SFCV',
      role: 'Communications Officer',
      date: 'February 2026 - Present',
      discipline: 'Marketing',
      illustrative: false,
      description:
        'Cohesive and brand-aligned designs advertising group activities for NDIS participants, promoting social support, community participation and skills development. Working in English and Chinese.',
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
          src: 'media/smash-room.png',
          alt: 'smash-room',
          width: 1600,
          height: 1200,
        },
        {
          type: 'image',
          src: 'media/jigsaw.png',
          alt: 'jigsaw',
          width: 1600,
          height: 1200,
        },
        {
          type: 'image',
          src: 'media/escape-room.png',
          alt: 'escape-room',
          width: 1600,
          height: 1200,
        },
        {
          type: 'image',
          src: 'media/smash-room-chin.png',
          alt: 'escape-room-chinese',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'whatever',
      type: 'project',
      instagramUrl: 'https://www.instagram.com/reel/Da6lZ83hwXh/', // Paste your https://www.instagram.com/p/.../ or /reel/.../ link. Optional.
      title: 'kinshee',
      client: 'Self',
      clientInitials: '',
      role: 'independent music artist',
      date: 'Present',
      discipline: 'Independent Music Artist',
      illustrative: false,
      description:
        'I make music, fully independent. From recording, to editing, to distribution, to promotion. Have a look at my promo campaign!',
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
          src: 'media/whatever-thumb.png',
          alt: 'Original black-and-ivory After Hours arts poster with intersecting orange circles and the words Art is for everyone.',
          width: 1600,
          height: 1200,
        },
      ],
    },
    {
      id: 'teasr',
      type: 'project',
      instagramUrl: 'https://www.instagram.com/reel/DbQVFT2x314/',
      title: 'kinshee',
      client: 'Self',
      clientInitials: '',
      role: '',
      date: 'Present',
      discipline: 'Independent Music Artist',
      illustrative: false,
      description:
        'Brand Imaging, Visual Identity, Storytelling. One of my songs ended up on the radio on Triple J Unearthed! See my teaser reel for it on Instagram below.',
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
          src: 'media/triple-j.png',
          alt: 'RadioPlay',
          width: 1600,
          height: 1200,
        },
      ],
    },

    {
      id: 'studio-experience',
      type: 'experience',
      title: 'Connecting the dots, every day.',
      client: 'Sunflower Care Victoria',
      clientInitials: 'SFCV',
      role: 'Communications Officer/Disability Support Worker',
      date: 'Feb. 2026 - Present',
      discipline: 'Experience',
      illustrative: false,
      description:
        'Main tasks involve invoicing, creating advertising material, and other miscellaneous admin. I ocassionally help out in supporting participants 1 on 1 or in group settings.',
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
    {
      id: 'studio-experience',
      type: 'experience',
      title: 'Connecting the dots, every day.',
      client: 'Luna Park Melbourne',
      clientInitials: 'LPM',
      role: 'Food and Beverage Attendant',
      date: 'March 2022 - Aug. 2025',
      discipline: 'Experience',
      illustrative: false,
      description:
        'Hospitality and customer service job covering front-of-house, back-of-house, barista and many other roles.\n Got to go on the rides for free, that was pretty cool.',
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
    {
      id: 'studio-experience',
      type: 'experience',
      title: 'Connecting the dots, every day.',
      client: 'Melbourne Convention and Exhibition Centre',
      clientInitials: 'MCEC',
      role: 'Catering Attendant',
      date: 'June 2022 - Jan. 2023',
      discipline: 'Experience',
      illustrative: false,
      description:
        'Supported conferences, concerts, exhibitions, corporate functions and other events at the Convention Centre. They do so many things there.',
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
    {
      id: 'studio-experience',
      type: 'experience',
      title: 'Connecting the dots, every day.',
      client: 'Surf Dive n Ski',
      clientInitials: 'SDS',
      role: 'Retail Sales Assistant',
      date: 'Oct. 2021 - Jan. 2022',
      discipline: 'Experience',
      illustrative: false,
      description:
        'Retail and customer service role. Sold mainly surf and skate clothes. Was pretty cool.',
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
