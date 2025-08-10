export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatLocationDisplay(slug: string): string {
  // Convert hyphenated slugs to proper display names
  return slug
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}
