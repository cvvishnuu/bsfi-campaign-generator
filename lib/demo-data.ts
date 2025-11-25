/**
 * Demo Data for Interactive Tour
 * Sample CSV data and campaign configuration
 */

export const DEMO_CSV_DATA = [
  {
    customer_id: '1001',
    name: 'Rajesh Kumar',
    phone: '+919876543210',
    email: 'rajesh.kumar@example.com',
    age: '35',
    location: 'Mumbai',
    occupation: 'Software Engineer',
    income: '75000',
    creditScore: '720',
  },
  {
    customer_id: '1002',
    name: 'Priya Sharma',
    phone: '+919876543211',
    email: 'priya.sharma@example.com',
    age: '28',
    location: 'Delhi',
    occupation: 'Marketing Manager',
    income: '90000',
    creditScore: '780',
  },
  {
    customer_id: '1003',
    name: 'Amit Patel',
    phone: '+919876543212',
    email: 'amit.patel@example.com',
    age: '42',
    location: 'Bangalore',
    occupation: 'Business Owner',
    income: '120000',
    creditScore: '650',
  },
];

export const DEMO_CAMPAIGN_PROMPT = `Generate a personalized credit card offer highlighting cashback benefits and premium features. Mention their occupation and credit score to make it relevant. Keep it professional and compliance-friendly with all required disclaimers.`;

export const DEMO_GENERATED_MESSAGES = [
  {
    row: 1,
    name: 'Rajesh Kumar',
    product: 'Credit Card',
    message: `Hello Rajesh Kumar,

As a successful Software Engineer with an excellent credit score of 720, you're pre-approved for our Premium Cashback Credit Card!

✨ Enjoy 5% cashback on all tech purchases
✨ Zero annual fee for the first year
✨ Exclusive airport lounge access

Apply now and start earning rewards today!

*Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.*

Reply STOP to opt-out of promotional messages.`,
    complianceScore: 95,
    complianceStatus: 'pass' as const,
    violations: [],
    xai: {
      reasoning_trace: [
        'Analyzed customer profile: Software Engineer, age 35, credit score 720',
        'Selected professional tone with tech-focused benefits',
        'Included mandatory credit card disclaimers',
        'Added UCC opt-out compliance language',
        'Personalized content based on occupation',
      ],
      decision_factors: [
        'Occupation-specific benefit (tech purchases cashback)',
        'Credit score mention for relevance',
        'Professional tone matching customer profile',
        'Compliance with RBI credit card guidelines',
        'TRAI opt-out requirement',
      ],
      confidence: 0.95,
    },
    compliance_xai: {
      reasoning_trace: [
        'Checked for mandatory credit card disclaimers',
        'Verified all 3 RBI-required disclaimers present',
        'Confirmed UCC opt-out language included',
        'No prohibited terms detected',
        'Professional tone maintained',
      ],
      decision_factors: [
        'Subject to credit approval - PRESENT',
        'Terms and conditions apply - PRESENT',
        'Subject to eligibility criteria - PRESENT',
        'Opt-out language - PRESENT',
        'No exaggerated claims',
      ],
      confidence: 0.95,
      rule_hits: [
        {
          rule: 'RBI Credit Card Disclaimers',
          severity: 'info',
          reason: 'All mandatory disclaimers present',
          evidence: 'Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.',
        },
      ],
    },
  },
  {
    row: 2,
    name: 'Priya Sharma',
    product: 'Credit Card',
    message: `Hi Priya Sharma! ✨

Unlock exclusive rewards with our Premium Credit Card, tailored for dynamic Marketing Managers like you.

🎁 10% cashback on dining and travel
🎁 Complimentary lifestyle magazine subscription
🎁 Priority customer support

With your impressive credit profile (780), approval is just a click away!

*Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.*

Reply STOP to opt-out of promotional messages.`,
    complianceScore: 98,
    complianceStatus: 'pass' as const,
    violations: [],
    xai: {
      reasoning_trace: [
        'Analyzed customer profile: Marketing Manager, age 28, credit score 780',
        'Selected friendly professional tone with lifestyle focus',
        'Highlighted travel/dining benefits for marketing professional',
        'Included all mandatory disclaimers',
        'Added personalization based on excellent credit score',
      ],
      decision_factors: [
        'Lifestyle-oriented benefits (dining, travel)',
        'Credit score emphasis (780 - excellent)',
        'Professional yet friendly tone',
        'All compliance requirements met',
        'Opt-out language included',
      ],
      confidence: 0.98,
    },
    compliance_xai: {
      reasoning_trace: [
        'Verified all RBI credit card disclaimers',
        'Confirmed UCC compliance with opt-out',
        'No prohibited terms or exaggerated claims',
        'Tone appropriate for target audience',
        'All regulatory requirements satisfied',
      ],
      decision_factors: [
        'Subject to credit approval - PRESENT',
        'Terms and conditions apply - PRESENT',
        'Subject to eligibility criteria - PRESENT',
        'Opt-out language - PRESENT',
        'No regulatory violations',
      ],
      confidence: 0.98,
      rule_hits: [
        {
          rule: 'RBI Credit Card Disclaimers',
          severity: 'info',
          reason: 'All mandatory disclaimers present',
          evidence: 'Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.',
        },
      ],
    },
  },
  {
    row: 3,
    name: 'Amit Patel',
    product: 'Credit Card',
    message: `Hello Amit Patel,

As a valued Business Owner, we're delighted to offer you our Business Platinum Credit Card!

🚀 Unlimited cashback on business expenses
🚀 Dedicated relationship manager
🚀 Flexible payment terms for entrepreneurs

Your business deserves premium benefits. Apply today!

*Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.*

Reply STOP to opt-out of promotional messages.`,
    complianceScore: 92,
    complianceStatus: 'pass' as const,
    violations: [],
    xai: {
      reasoning_trace: [
        'Analyzed customer profile: Business Owner, age 42, credit score 650',
        'Selected professional tone with business focus',
        'Emphasized business-specific benefits',
        'Included all mandatory compliance disclaimers',
        'Personalized for entrepreneur audience',
      ],
      decision_factors: [
        'Business-oriented benefits (expenses, relationship manager)',
        'Professional tone for business owner',
        'All RBI disclaimers included',
        'TRAI opt-out compliance',
        'No prohibited terms',
      ],
      confidence: 0.92,
    },
    compliance_xai: {
      reasoning_trace: [
        'Checked all RBI credit card requirements',
        'Verified 3 mandatory disclaimers present',
        'Confirmed UCC opt-out language',
        'No exaggerated claims detected',
        'Professional business tone maintained',
      ],
      decision_factors: [
        'Subject to credit approval - PRESENT',
        'Terms and conditions apply - PRESENT',
        'Subject to eligibility criteria - PRESENT',
        'Opt-out language - PRESENT',
        'Business-appropriate language',
      ],
      confidence: 0.92,
      rule_hits: [
        {
          rule: 'RBI Credit Card Disclaimers',
          severity: 'info',
          reason: 'All mandatory disclaimers present',
          evidence: 'Subject to credit approval. Terms and conditions apply. Subject to eligibility criteria.',
        },
      ],
    },
  },
];

export const DEMO_EXECUTION_ID = 'demo-execution-12345';

// Voiceover scripts for each demo step (steps 0-8)
export const DEMO_VOICEOVER_SCRIPTS = [
  {
    step: 0,
    duration: 7000, // 7 seconds
    text: 'Welcome to BFSI Campaign Generator! Let me show you how to create compliant marketing campaigns in minutes.',
  },
  {
    step: 1,
    duration: 8000, // 8 seconds
    text: "First, upload your customer data. We accept CSV files with details like name, email, and occupation. I'll load a sample file for you.",
  },
  {
    step: 2,
    duration: 9000, // 9 seconds
    text: "Next, describe your campaign goal in the prompt box. For example, you could say Generate credit card offers with cashback benefits for young professionals. Our AI will use this to craft personalized messages tailored to each customer.",
  },
  {
    step: 3,
    duration: 7000, // 7 seconds
    text: 'Choose your message tone - professional, friendly, or urgent. This helps the AI match your brand voice.',
  },
  {
    step: 4,
    duration: 10000, // 10 seconds
    text: 'Our AI generates personalized messages and automatically checks compliance against BFSI regulations. This ensures your campaigns meet RBI, SEBI, IRDAI, and TRAI guidelines.',
  },
  {
    step: 5,
    duration: 10000, // 10 seconds
    text: 'All three messages are shown in this table with customer names and compliance scores. Click the View button to see full details, edit the content, or regenerate with feedback.',
  },
  {
    step: 6,
    duration: 9000, // 9 seconds
    text: 'Here you can see the full message. Click Edit to modify the text, then Save your changes. Or click Regenerate to create a new version with your feedback.',
  },
  {
    step: 7,
    duration: 11000, // 11 seconds
    text: 'These tabs show full AI transparency. Content Analysis explains how the message was generated. Compliance Check shows regulatory analysis with any violations from RBI, SEBI, IRDAI, and TRAI guidelines.',
  },
  {
    step: 8,
    duration: 9000, // 9 seconds
    text: 'That\'s it! You can now approve all messages and download your compliant campaign as an Excel file, ready to deploy. Click Get Started to create your own campaigns!',
  },
];
