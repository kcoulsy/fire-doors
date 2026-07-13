import { LOCATIONS } from "../constants/locations";
import { getNearbyLocations } from "./getNearbyLocations";

export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function formatLocationName(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
    const baseType = type || "";

    const formattedServiceName = baseType
      .split("-")
      .map(capitalizeFirstLetter)
      .join(" ");

    const locationFormated = location ? formatLocationName(location) : "";
    const locationInText = location ? ` in ${locationFormated}` : "";
    const cleanLocationName = locationFormated;

    const fallbackLocation = {
      slug: "york",
      lat: 53.9655,
      lng: -1.205,
      postcode: "YO1",
      type: "city" as const,
      region: "North Yorkshire",
    };
    const locationData = LOCATIONS.find((l) => l.slug === location) ?? fallbackLocation;
    const geo = { lat: locationData.lat, lng: locationData.lng };
    const locationPostcode = locationData.postcode;
    const locationRegion = locationData.region;
    const locationType = locationData.type;

    // Deterministic hash so the same slug+service always picks the same variant,
    // stabilising output across builds (Google dislikes flapping content).
    const variantKey = `${location ?? "base"}-${baseType}`;
    let variantHash = 0;
    for (let i = 0; i < variantKey.length; i++) {
      variantHash = ((variantHash << 5) - variantHash + variantKey.charCodeAt(i)) | 0;
    }
    variantHash = Math.abs(variantHash);

    const lowerService = formattedServiceName.toLowerCase() || "fire door services";
    const locTypeWord =
      locationType === "city" ? "city"
      : locationType === "market-town" ? "market town"
      : locationType === "town" ? "town"
      : locationType === "suburb" ? "suburb"
      : locationType === "village" ? "village"
      : "area";

    // Non-overlapping "angle" text — deliberately does NOT repeat the word
    // already in the service name (e.g. avoid "fire door maintenance, maintenance…").
    const serviceAngle =
      baseType.includes("maintenance") ? "repairs, seal replacement and compliance checks"
      : baseType.includes("inspect") ? "certification and written compliance reports"
      : baseType.includes("install") ? "fitting, ironmongery and certification"
      : "installation, maintenance and inspections";

    // Pool of 5 description variants picked deterministically per slug+service.
    // Each opens differently and highlights a different angle to reduce
    // near-duplicate signals across the location matrix.
    const descriptionVariants = location
      ? [
          `FireQual qualified fire door inspector covering ${cleanLocationName} (${locationPostcode}) — ${lowerService} and fire door ${serviceAngle} across ${locationRegion}. 35+ years' experience, fully insured.`,
          `${formattedServiceName} in ${cleanLocationName} and the wider ${locationRegion} area. FireQual certified inspector, 35+ years on the tools. Free no-obligation quotes and emergency callouts.`,
          `${formattedServiceName} in ${cleanLocationName} ${locationPostcode}. Fire door ${serviceAngle} by a FireQual qualified inspector. CSCS Gold, fully insured, compliant with current fire safety regulations.`,
          `Professional ${lowerService} for properties in ${cleanLocationName} — a ${locTypeWord} I regularly work across. FireQual certified fire door inspector, 35+ years on the tools as a City & Guilds joiner.`,
          `Trusted fire door specialist in ${cleanLocationName} (${locationPostcode}) — ${lowerService}, ${serviceAngle}. FireQual qualified, fully insured. Covering ${locationRegion}.`,
        ]
      : [
          `FireQual qualified fire door inspector covering Yorkshire — ${lowerService} and fire door ${serviceAngle}. 35+ years' experience, fully insured.`,
          `${formattedServiceName} across Yorkshire. FireQual certified inspector, 35+ years on the tools. Free no-obligation quotes and emergency callouts.`,
          `${formattedServiceName} across Yorkshire. Fire door ${serviceAngle} by a FireQual qualified inspector. CSCS Gold, fully insured, compliant with current fire safety regulations.`,
          `Professional ${lowerService} for properties across Yorkshire. FireQual certified fire door inspector, 35+ years on the tools as a City & Guilds joiner.`,
          `Trusted fire door specialist covering Yorkshire — ${lowerService}, ${serviceAngle}. FireQual qualified, fully insured.`,
        ];

    const defaultDescription = descriptionVariants[variantHash % descriptionVariants.length];
    const enhancedDescription = defaultDescription;

    // Nearby locations for enhanced areaServed
    const nearbyRaw = location ? getNearbyLocations(location, baseType) : [];
    const nearbyLocations = nearbyRaw
      .map((loc) => {
        const locData = LOCATIONS.find((l) => l.slug === loc.slug);
        return locData ? formatLocationName(locData.slug) : null;
      })
      .filter(Boolean) as string[];

    const enhancedAreaServed = [
      cleanLocationName || "York",
      "Leeds",
      "Harrogate",
      "Wetherby",
      "Yorkshire",
      ...nearbyLocations,
    ].filter((value, index, self) => self.indexOf(value) === index);

    const pageUrl = `https://coulsyfiredoors.co.uk/${location ? `${location}-${baseType}` : baseType}`;

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://coulsyfiredoors.co.uk/#business",
      name: "Coulsy Fire Door Services",
      description: enhancedDescription,
      url: pageUrl,
      image: "https://coulsyfiredoors.co.uk/images/coulsy-logo-sm.png",
      email: "robert@coulsy.co.uk",
      telephone: "+44 7544 030486",
      priceRange: "££",
      paymentAccepted: ["Cash", "Bank Transfer"],
      currenciesAccepted: "GBP",
      knowsAbout: [
        "Fire Door Installation",
        "Fire Door Maintenance",
        "Fire Door Inspections",
        "Fire Safety Compliance",
        "Fire Door Repairs",
      ],
      award: [
        "FireQual Fire Door Inspector",
        "CSCS Gold Card Holder",
        "NVQ Level 7 in Construction Senior Management",
        "Advanced City & Guilds in Carpentry & Joinery (Distinction)",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: cleanLocationName || "York",
        addressRegion: locationRegion,
        postalCode: locationPostcode,
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.lat,
        longitude: geo.lng,
      },
      openingHours: "Mo-Fr 07:00-18:00",
      areaServed: enhancedAreaServed.map((city) => ({
        "@type": "City",
        name: city,
        containedIn: {
          "@type": "State",
          name: locationRegion,
        },
      })),
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: String(geo.lat),
          longitude: String(geo.lng),
        },
        geoRadius: {
          "@type": "Distance",
          name: "30 miles",
        },
      },
      hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
      sameAs: [
        "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
        "https://www.facebook.com/coulsyjoinery/",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      foundingDate: "1989",
      numberOfEmployees: "2",
      slogan: "Fire doors, fitted and inspected properly",
      hasCredential: [
        "FireQual Fire Door Inspector",
        "CSCS Gold Card Holder",
        "NVQ Level 7 in Construction Senior Management",
        "Advanced City & Guilds in Carpentry & Joinery (Distinction)",
      ],
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Coulsy Fire Door Services - ${cleanLocationName || "York"}`,
      description: enhancedDescription,
      url: pageUrl,
      telephone: "+447544030486",
      email: "robert@coulsy.co.uk",
      address: {
        "@type": "PostalAddress",
        addressLocality: cleanLocationName || "York",
        addressRegion: locationRegion,
        postalCode: locationPostcode,
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.lat,
        longitude: geo.lng,
      },
      openingHours: "Mo-Fr 07:00-18:00",
      priceRange: "££",
      currenciesAccepted: "GBP",
      paymentAccepted: ["Cash", "Bank Transfer"],
      areaServed: {
        "@type": "City",
        name: cleanLocationName || "York",
      },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: geo.lat,
          longitude: geo.lng,
        },
        geoRadius: "50000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${formattedServiceName} ${locationInText}`,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: formattedServiceName,
            },
          },
        ],
      },
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${formattedServiceName} ${locationInText}`,
      description: enhancedDescription,
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://coulsyfiredoors.co.uk/#business",
        name: "Coulsy Fire Door Services",
        telephone: "+447544030486",
        email: "robert@coulsy.co.uk",
        address: {
          "@type": "PostalAddress",
          addressLocality: "York",
          addressRegion: "North Yorkshire",
          addressCountry: "GB",
        },
      },
      areaServed: [
        {
          "@type": "City",
          name: cleanLocationName || "York",
          containedIn: {
            "@type": "State",
            name: locationRegion,
          },
        },
        ...enhancedAreaServed.slice(0, 5).map((city) => ({
          "@type": "City",
          name: city,
          containedIn: {
            "@type": "State",
            name: locationRegion,
          },
        })),
      ],
      serviceType: "Fire Door Services",
      category: "Fire Safety",
      url: pageUrl,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Fire Door Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Fire Door Installation" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Fire Door Maintenance" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Fire Door Inspections" },
          },
        ],
      },
    };

    // FAQ pool: each page picks 4 deterministically by slug hash, breaking
    // near-duplicate signals vs the previous single 5-Q template.
    const faqPool: { name: string; text: string }[] = [];

    if (location) {
      faqPool.push({
        name: `Do you cover ${cleanLocationName} for fire door work?`,
        text: `Yes — I regularly carry out ${lowerService} and fire door ${serviceAngle} in ${cleanLocationName} and the wider ${locationRegion} area. ${locationPostcode} and surrounding postcodes are firmly within my service area.`,
      });
      faqPool.push({
        name: `How much does ${lowerService} cost in ${cleanLocationName}?`,
        text: `Costs depend on the property, scope and compliance requirements. I provide detailed no-obligation quotes for all fire door work in ${cleanLocationName} after assessing the doors and the site's fire safety obligations.`,
      });
      if (nearbyLocations.length > 0) {
        faqPool.push({
          name: `What areas near ${cleanLocationName} do you serve?`,
          text: `I serve ${cleanLocationName} and surrounding areas — including ${nearbyLocations.slice(0, 5).join(", ")}${nearbyLocations.length > 5 ? ", and more" : ""}. Emergency callouts are available where capacity allows.`,
        });
      }
      if (locationType === "city" || locationType === "market-town") {
        faqPool.push({
          name: `Do you work on commercial and HMO fire doors in ${cleanLocationName}?`,
          text: `Yes. ${cleanLocationName} has significant commercial and multi-occupancy stock, and I handle fire door inspections, maintenance and installs for landlords, letting agents, care homes, schools and commercial premises with the required certification and reports.`,
        });
      }
    }

    faqPool.push({
      name: `How often should fire doors be ${baseType.includes("maintenance") ? "maintained" : baseType.includes("inspect") ? "inspected" : "serviced"}${locationInText}?`,
      text: `Fire doors should be checked at least every 6 months under current fire safety regulations, with more frequent checks for high-traffic commercial sites. Regular ${baseType.includes("maintenance") ? "maintenance" : baseType.includes("inspect") ? "inspections" : "servicing"} keeps doors compliant and documents your duty-of-care position.`,
    });
    faqPool.push({
      name: `Are you qualified for fire door work${locationInText}?`,
      text: "Yes — I'm a FireQual qualified fire door inspector, certified in December 2024, and a CSCS Gold Card holder, with 35+ years on the tools as a City & Guilds qualified joiner.",
    });
    faqPool.push({
      name: `Do you provide certification and compliance reports${locationInText}?`,
      text: "Yes. Every inspection comes with a written report suitable for insurers, Responsible Persons and enforcement bodies, covering door leaf, frame, seals, gaps, hinges, closers and ironmongery against the relevant standard.",
    });
    faqPool.push({
      name: "Do you work on both domestic and commercial properties?",
      text: "Yes — I handle fire door work on private homes, HMOs, rental properties, care homes, schools, offices and commercial premises. The same standards apply: correct certification, correct installation, documented compliance.",
    });

    const faqCount = Math.min(4, faqPool.length);
    const pickedFaqs: typeof faqPool = [];
    const seen = new Set<number>();
    for (let i = 0; i < faqPool.length && pickedFaqs.length < faqCount; i++) {
      const idx = (variantHash + i * 3) % faqPool.length;
      if (seen.has(idx)) continue;
      seen.add(idx);
      pickedFaqs.push(faqPool[idx]);
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pickedFaqs.map((f) => ({
        "@type": "Question",
        name: f.name,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.text,
        },
      })),
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
