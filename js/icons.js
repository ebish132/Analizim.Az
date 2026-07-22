// Shared icon library — maps a short key (chosen in the CMS) to inner SVG markup.
var ANALIZIM_ICONS = {
  flask: '<path d="M9 2v6.34a4 4 0 0 1-.5 1.94L4.24 17.5A2 2 0 0 0 6 20.5h12a2 2 0 0 0 1.76-3l-4.26-7.22A4 4 0 0 1 15 8.34V2"/><path d="M7 2h10"/><path d="M7.5 14h9"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><circle cx="18" cy="9" r="3"/><path d="M22 21v-1a5 5 0 0 0-3.5-4.8"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m9 13.5-1.5 7L12 18l4.5 2.5L15 13.5"/>',
  liver: '<path d="M6 3c-2 2-3 4.5-3 7a5 5 0 0 0 10 0c0-1.5-.7-2.7-1.5-3.8C10.3 4.8 8.5 3 6 3z"/><path d="M9 14c2 0 4 1 4 3.5S11 21 9 21"/>',
  droplet: '<path d="M12 2s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mri: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  ct: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
  waveform: '<path d="M2 12h2l2-8 3 16 3-12 2 6 2-4h6"/>',
  scan: '<path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><path d="M4 4l16 16"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  stethoscope: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 15a6 6 0 0 0 12 0v-2"/><circle cx="20" cy="10" r="2"/><circle cx="6" cy="17" r="3"/>',
  smiley: '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8 15c1 1.5 2.5 2 4 2s3-.5 4-2"/>'
};

function analizimIconSvg(key, size) {
  size = size || 26;
  var inner = ANALIZIM_ICONS[key] || ANALIZIM_ICONS.flask;
  return (
    '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
    inner +
    "</svg>"
  );
}
