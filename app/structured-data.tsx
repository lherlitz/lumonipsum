import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lumonipsum.com';

interface StructuredDataProps {
  url?: string;
}

export default function StructuredData({ url = siteUrl }: StructuredDataProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lumon Ipsum Generator',
    description: 'Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor.',
    url: url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lumon Industries',
      url: url,
    },
    inLanguage: 'en-US',
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Lumon Ipsum Generator',
    description: 'A web-based text generator that creates Severance-themed Lorem Ipsum placeholder text for design and development projects.',
    url: url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Generate 1-10 paragraphs of Severance-themed text',
      'Copy to clipboard functionality',
      'Corporate terminal aesthetic',
      'Lumon Industries branded content',
      'Responsive design for all devices',
    ],
    screenshot: `${url}/lumon-globe.svg`,
    author: {
      '@type': 'Organization',
      name: 'Lumon Industries',
    },
    datePublished: '2024-01-01',
    version: '1.0.0',
    inLanguage: 'en-US',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumon Industries',
    description: 'A leading corporation in data refinement and employee wellness solutions.',
    url: url,
    logo: `${url}/lumon-globe.svg`,
    sameAs: [
      'https://severance.tv',
    ],
    knowsAbout: [
      'Data Refinement',
      'Employee Wellness',
      'Corporate Solutions',
      'Lorem Ipsum Generation',
      'Design Tools',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Text Generator',
        item: `${url}#generator`,
      },
    ],
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}