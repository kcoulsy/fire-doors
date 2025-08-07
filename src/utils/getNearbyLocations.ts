import { LOCATIONS, NEARBY_LOCATIONS } from "../constants/locations";

const BASE_LAT = 53.9655; // York's latitude
const BASE_LNG = -1.205; // York's longitude

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Service-specific radius limits for mobile-friendly searches
const SERVICE_RADIUS_LIMITS: Record<string, number> = {
  "fire-door-services": 20,      // Main services - 20 miles
  "fire-door-maintenance": 15,   // Maintenance - 15 miles (more frequent visits)
  "fire-door-inspectors": 20,    // Inspections - 20 miles
  "fire-door-installers": 18,    // Installation - 18 miles
  "default": 30                  // Fallback radius
};

export function getNearbyLocations(location?: string, serviceType?: string) {
  // Get the appropriate radius for the service type
  const radius = serviceType ? SERVICE_RADIUS_LIMITS[serviceType] || SERVICE_RADIUS_LIMITS.default : SERVICE_RADIUS_LIMITS.default;
  
  const curated = location && NEARBY_LOCATIONS[location]
    ? NEARBY_LOCATIONS[location]
    : NEARBY_LOCATIONS.default;

  return LOCATIONS
    .filter((loc) => curated.includes(loc.slug))
    .map((loc) => ({
      slug: loc.slug,
      distance: haversineDistance(BASE_LAT, BASE_LNG, loc.lat, loc.lng),
    }))
    .filter(({ slug, distance }) => slug !== location && distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8); // Limit to 8 nearby locations
}
