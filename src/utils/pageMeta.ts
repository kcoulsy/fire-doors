import { LOCATIONS } from "../constants/locations";

export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getFormattedPageData(location?: string, type?: string): {
  formattedServiceName: string;
  locationFormated: string;
  locationInText: string;
  cleanLocationName: string;
  defaultDescription: string;
  enhancedDescription: string;
  businessSchema: any;
  localBusinessSchema: any;
  serviceSchema: any;
  faqSchema: any;
  lastmod: string;
} {
  try {
    // Use the parameters directly
    const baseType = type || "";

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
    const geo = location ? LOCATIONS.find((l) => l.slug === location) ?? fallbackGeo : fallbackGeo;

    const defaultDescription = `Professional ${formattedServiceName.toLowerCase()} ${locationInText} by qualified FireQual Fire Door Inspector with 35+ years experience. ${baseType.includes('maintenance') ? 'Fire door maintenance, repairs and compliance checks' : baseType.includes('inspection') ? 'Fire door inspections, certification and compliance reports' : baseType.includes('installers') ? 'Fire door installation, fitting and certification' : 'Fire door services, installation, maintenance and inspections'} ${locationInText}. Fully insured, certified and compliant with fire safety regulations. Call for free quote.`;

    // Enhanced description with more local SEO keywords
    const enhancedDescription = `${formattedServiceName} ${locationInText} - Expert fire door ${baseType.includes('maintenance') ? 'maintenance and repairs' : baseType.includes('inspection') ? 'inspections and certification' : baseType.includes('installers') ? 'installation and fitting' : 'services, installation and maintenance'} by qualified FireQual inspector. 35+ years experience in fire safety compliance. Serving ${locationFormated || 'York'} and surrounding areas. Free quotes, fully insured, certified work. Emergency callouts available.`;

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
      },
      "foundingDate": "1989",
      "numberOfEmployees": "2",
      "slogan": "Professional Fire Door Services Since 1989",
      "hasCredential": [
        "FireQual Fire Door Inspector",
        "CSCS Gold Card Holder", 
        "35+ Years Experience",
        "Fully Insured",
        "Certified Installer"
      ]
    };

    // Local business schema specifically for the location
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Coulsy Fire Door Services - ${locationFormated || 'York'}`,
      "description": enhancedDescription,
      "url": `https://coulsyfiredoors.co.uk/${location ? `${location}-${baseType}` : baseType}`,
      "telephone": "+447544030486",
      "email": "robert@coulsy.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationFormated || "York",
        "addressRegion": "Yorkshire",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": geo.lat,
        "longitude": geo.lng
      },
      "openingHours": "Mo-Fr 07:00-18:00",
      "priceRange": "££",
      "currenciesAccepted": "GBP",
      "paymentAccepted": ["Cash", "Bank Transfer"],
      "areaServed": {
        "@type": "City",
        "name": locationFormated || "York"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": geo.lat,
          "longitude": geo.lng
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${formattedServiceName} ${locationInText}`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": formattedServiceName
            }
          }
        ]
      }
    };

    // Enhanced service schema with more detailed information
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${formattedServiceName} ${locationInText}`,
      "description": enhancedDescription,
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://coulsyfiredoors.co.uk/#business",
        "name": "Coulsy Fire Door Services",
        "telephone": "+447544030486",
        "email": "robert@coulsy.co.uk",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "York",
          "addressRegion": "Yorkshire",
          "addressCountry": "GB"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": locationFormated || "York"
      },
      "serviceType": "Fire Door Services",
      "category": "Fire Safety",
      "url": `https://coulsyfiredoors.co.uk/${location ? `${location}-${baseType}` : baseType}`,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Fire Door Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fire Door Installation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fire Door Maintenance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fire Door Inspections"
            }
          }
        ]
      }
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
      enhancedDescription,
      businessSchema,
      localBusinessSchema,
      serviceSchema,
      faqSchema,
      lastmod,
    };
  } catch (error) {
    console.error("Error formatting page data:", error);
    return {
      formattedServiceName: "",
      locationFormated: "",
      locationInText: "",
      cleanLocationName: "",
      defaultDescription: "",
      enhancedDescription: "",
      businessSchema: null,
      localBusinessSchema: null,
      serviceSchema: null,
      faqSchema: null,
      lastmod: "",
    };
  }
}
