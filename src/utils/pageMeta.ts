import { LOCATIONS } from "../constants/locations";

export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getFormattedPageData(Astro: any): {
  formattedServiceName: string;
  locationFormated: string;
  locationInText: string;
  cleanLocationName: string;
  defaultDescription: string;
  businessSchema: any;
  serviceSchema: any;
  faqSchema: any;
  lastmod: string;
} {
  const { location } = Astro.params;
  const pathname = Astro.url.pathname;
  const rawType = pathname.replace(/\/$/, "").split("/").pop() ?? "";
  const cleanRawType = rawType.replace(/\.html$/i, "");
  const baseType = location
    ? cleanRawType
        .replace(new RegExp(`^${location}-`, "i"), "")
        .replace(new RegExp(`-${location}$`, "i"), "")
    : cleanRawType;

  const formattedServiceName = baseType
    .split("-")
    .map(capitalizeFirstLetter)
    .join(" ");

  const locationFormated = location ? capitalizeFirstLetter(location) : "";
  const locationInText = location ? ` in ${locationFormated}` : "";

  const cleanLocationName = location
    ? location.trim().replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "";

  const fallbackGeo = { lat: 53.9655, lng: -1.205 };
  const geo = LOCATIONS.find((l) => l.slug === location) ?? fallbackGeo;

  const defaultDescription = `Qualified fire door specialist offering professional fire door services ${locationInText.trim()}, including installation, maintenance, inspections, and repairs. Over 35 years' experience. Fully compliant with fire safety regulations.`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://coulsyfiredoors.co.uk/#business",
    name: "Coulsy Fire Door Services",
    description: defaultDescription,
    url: `https://coulsyfiredoors.co.uk/${location ? `${location}-${baseType}` : baseType}`,
    image: "https://coulsyfiredoors.co.uk/images/coulsy-logo-sm.jpg",
    email: "robert@coulsy.co.uk",
    telephone: "+44 7544 030486",
    priceRange: "££",
    paymentAccepted: ["Cash", "Bank Transfer"],
    currenciesAccepted: "GBP",
    knowsAbout: ["Fire Door Installation", "Fire Door Maintenance", "Fire Door Inspections", "Fire Safety Compliance", "Fire Door Repairs"],
    award: ["FireQual Fire Door Inspector", "CSCS Gold Card Holder", "35+ Years Experience"],
    address: {
      "@type": "PostalAddress",
      addressLocality: locationFormated || "York",
      postalCode: "YO26 7NW",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    openingHours: "Mo-Fr 07:00-18:00",
    areaServed: [
      locationFormated || "York",
      "Leeds",
      "Harrogate",
      "Wetherby",
      "Yorkshire"
    ],
    hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    sameAs: [
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
      "https://www.facebook.com/coulsyjoinery/"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Service-specific schema for better service search rankings
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${formattedServiceName} ${locationInText}`,
    "description": defaultDescription,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://coulsyfiredoors.co.uk/#business",
      "name": "Coulsy Fire Door Services"
    },
    "areaServed": {
      "@type": "City",
      "name": locationFormated || "York"
    },
    "serviceType": "Fire Door Services",
    "category": "Fire Safety",
    "url": `https://coulsyfiredoors.co.uk/${location ? `${location}-${baseType}` : baseType}`
  };

  // FAQ schema for rich snippets in search results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does ${formattedServiceName.toLowerCase()} cost ${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${formattedServiceName.toLowerCase()} costs vary depending on the project scope and requirements. I provide detailed quotes for all work ${locationInText} after assessing your specific fire door needs and compliance requirements.`
        }
      },
      {
        "@type": "Question",
        "name": `How often should fire doors be ${baseType.includes('maintenance') ? 'maintained' : baseType.includes('inspection') ? 'inspected' : 'serviced'}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Fire doors should be ${baseType.includes('maintenance') ? 'maintained' : baseType.includes('inspection') ? 'inspected' : 'serviced'} at least every 6 months according to fire safety regulations. Regular ${baseType.includes('maintenance') ? 'maintenance' : baseType.includes('inspection') ? 'inspections' : 'servicing'} ensures compliance and optimal performance.`
        }
      },
      {
        "@type": "Question",
        "name": `What fire door ${formattedServiceName.toLowerCase()} do you provide?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I offer comprehensive fire door ${formattedServiceName.toLowerCase()} including installation, maintenance, inspections, repairs, and compliance certification. From new installations to existing door maintenance, I handle all aspects of fire door safety and compliance.`
        }
      },
      {
        "@type": "Question",
        "name": `Are you qualified for fire door ${formattedServiceName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, I'm a fully qualified FireQual Fire Door Inspector with over 35 years' experience in fire safety. I'm qualified to handle all aspects of fire door installation, maintenance, inspections, and compliance with current fire safety regulations.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you work on both domestic and commercial fire door ${formattedServiceName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, I work on both domestic and commercial properties. From residential fire door installations to commercial fire safety compliance, I provide the same high-quality service for all types of properties requiring fire door ${formattedServiceName.toLowerCase()}.`
        }
      }
    ]
  };

  const lastmod = new Date().toISOString();

  return {
    formattedServiceName,
    locationFormated,
    locationInText,
    cleanLocationName,
    defaultDescription,
    businessSchema,
    serviceSchema,
    faqSchema,
    lastmod,
  };
}
