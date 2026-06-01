/**
 * ContainerPod - Reusable SVG container illustration module
 * Generates the stacked container illustration for the hero section
 */

export function generateContainerPodSVG() {
  return `
    <!-- ─ TOP CONTAINER ─ -->
    <rect
      x="90"
      y="30"
      width="300"
      height="90"
      fill="#0d0d0d"
      stroke="#FDE215"
      stroke-width="1.5"
    />
    <rect x="90" y="30" width="300" height="6" fill="#FDE215" />
    <!-- ribs -->
    <line
      x1="150"
      y1="36"
      x2="150"
      y2="120"
      stroke="#1e1e1e"
      stroke-width="1.5"
    />
    <line
      x1="210"
      y1="36"
      x2="210"
      y2="120"
      stroke="#1e1e1e"
      stroke-width="1.5"
    />
    <line
      x1="270"
      y1="36"
      x2="270"
      y2="120"
      stroke="#1e1e1e"
      stroke-width="1.5"
    />
    <line
      x1="330"
      y1="36"
      x2="330"
      y2="120"
      stroke="#1e1e1e"
      stroke-width="1.5"
    />
    <!-- corner castings -->
    <rect x="90" y="30" width="14" height="14" fill="#FDE215" />
    <rect x="376" y="30" width="14" height="14" fill="#FDE215" />
    <rect x="90" y="106" width="14" height="14" fill="#FDE215" />
    <rect x="376" y="106" width="14" height="14" fill="#FDE215" />
    <!-- label -->
    <text
      x="108"
      y="44"
      font-family="monospace"
      font-size="7"
      fill="#000"
      letter-spacing="1.2"
    >
      SNS-POD-A03 / AS-RS CELL
    </text>
    <!-- interior sketch -->
    <rect
      x="110"
      y="50"
      width="40"
      height="55"
      fill="none"
      stroke="#2a2a2a"
      stroke-width="1"
      stroke-dasharray="3,2"
    />
    <rect
      x="155"
      y="50"
      width="40"
      height="55"
      fill="none"
      stroke="#2a2a2a"
      stroke-width="1"
      stroke-dasharray="3,2"
    />
    <line
      x1="110"
      y1="70"
      x2="150"
      y2="70"
      stroke="#252525"
      stroke-width="1"
    />
    <line
      x1="110"
      y1="86"
      x2="150"
      y2="86"
      stroke="#252525"
      stroke-width="1"
    />
    <line
      x1="155"
      y1="70"
      x2="195"
      y2="70"
      stroke="#252525"
      stroke-width="1"
    />
    <line
      x1="155"
      y1="86"
      x2="195"
      y2="86"
      stroke="#252525"
      stroke-width="1"
    />

    <!-- ─ MID CONTAINER ─ -->
    <rect
      x="50"
      y="120"
      width="380"
      height="100"
      fill="#0a0a0a"
      stroke="#FDE215"
      stroke-width="1.5"
    />
    <rect
      x="50"
      y="120"
      width="380"
      height="5"
      fill="#FDE215"
      opacity=".7"
    />
    <!-- ribs -->
    <line
      x1="116"
      y1="125"
      x2="116"
      y2="220"
      stroke="#1a1a1a"
      stroke-width="1.5"
    />
    <line
      x1="182"
      y1="125"
      x2="182"
      y2="220"
      stroke="#1a1a1a"
      stroke-width="1.5"
    />
    <line
      x1="248"
      y1="125"
      x2="248"
      y2="220"
      stroke="#1a1a1a"
      stroke-width="1.5"
    />
    <line
      x1="314"
      y1="125"
      x2="314"
      y2="220"
      stroke="#1a1a1a"
      stroke-width="1.5"
    />
    <line
      x1="380"
      y1="125"
      x2="380"
      y2="220"
      stroke="#1a1a1a"
      stroke-width="1.5"
    />
    <!-- doors -->
    <rect
      x="195"
      y="140"
      width="45"
      height="70"
      fill="#0d0d0d"
      stroke="#2a2a2a"
      stroke-width="1"
    />
    <rect
      x="242"
      y="140"
      width="45"
      height="70"
      fill="#0d0d0d"
      stroke="#2a2a2a"
      stroke-width="1"
    />
    <circle
      cx="238"
      cy="175"
      r="3"
      fill="none"
      stroke="#FDE215"
      stroke-width="1"
      opacity=".6"
    />
    <circle
      cx="248"
      cy="175"
      r="3"
      fill="none"
      stroke="#FDE215"
      stroke-width="1"
      opacity=".6"
    />
    <!-- corner castings -->
    <rect x="50" y="120" width="14" height="14" fill="#FDE215" />
    <rect x="416" y="120" width="14" height="14" fill="#FDE215" />
    <rect x="50" y="206" width="14" height="14" fill="#FDE215" />
    <rect x="416" y="206" width="14" height="14" fill="#FDE215" />
    <text
      x="68"
      y="133"
      font-family="monospace"
      font-size="7"
      fill="#FDE215"
      opacity=".7"
      letter-spacing="1.2"
    >
      SNS-POD-A02 / 40FT PICK STATION
    </text>

    <!-- ─ BOTTOM CONTAINER ─ -->
    <rect
      x="20"
      y="220"
      width="440"
      height="120"
      fill="#080808"
      stroke="#FDE215"
      stroke-width="1.5"
    />
    <!-- ribs -->
    <line
      x1="84"
      y1="220"
      x2="84"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <line
      x1="148"
      y1="220"
      x2="148"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <line
      x1="212"
      y1="220"
      x2="212"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <line
      x1="276"
      y1="220"
      x2="276"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <line
      x1="340"
      y1="220"
      x2="340"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <line
      x1="404"
      y1="220"
      x2="404"
      y2="340"
      stroke="#141414"
      stroke-width="1.5"
    />
    <!-- corner castings glowing -->
    <rect x="20" y="220" width="16" height="16" fill="#FDE215" />
    <rect x="444" y="220" width="16" height="16" fill="#FDE215" />
    <rect x="20" y="324" width="16" height="16" fill="#FDE215" />
    <rect x="444" y="324" width="16" height="16" fill="#FDE215" />
    <text
      x="38"
      y="234"
      font-family="monospace"
      font-size="7"
      fill="#FDE215"
      letter-spacing="1.2"
    >
      SNS-POD-A01 / 40FT STORAGE / ISO 668
    </text>

    <!-- ─ DIMENSION LINES (motif 4) ─ -->
    <line
      x1="8"
      y1="30"
      x2="8"
      y2="340"
      stroke="#FDE215"
      stroke-width=".5"
      stroke-dasharray="3,3"
      opacity=".4"
    />
    <line
      x1="4"
      y1="30"
      x2="12"
      y2="30"
      stroke="#FDE215"
      stroke-width="1.2"
      opacity=".6"
    />
    <line
      x1="4"
      y1="340"
      x2="12"
      y2="340"
      stroke="#FDE215"
      stroke-width="1.2"
      opacity=".6"
    />
    <text
      x="-2"
      y="192"
      font-family="monospace"
      font-size="7"
      fill="#FDE215"
      opacity=".5"
      transform="rotate(-90,-2,192)"
      letter-spacing=".8"
    >
      9.6 M HEIGHT
    </text>

    <line
      x1="20"
      y1="356"
      x2="460"
      y2="356"
      stroke="#FDE215"
      stroke-width=".5"
      stroke-dasharray="3,3"
      opacity=".4"
    />
    <line
      x1="20"
      y1="352"
      x2="20"
      y2="360"
      stroke="#FDE215"
      stroke-width="1.2"
      opacity=".6"
    />
    <line
      x1="460"
      y1="352"
      x2="460"
      y2="360"
      stroke="#FDE215"
      stroke-width="1.2"
      opacity=".6"
    />
    <text
      x="195"
      y="372"
      font-family="monospace"
      font-size="7"
      fill="#FDE215"
      opacity=".5"
      letter-spacing=".8"
    >
      12.19 M (40FT STANDARD)
    </text>

    <!-- Glow effects -->
    <rect
      x="20"
      y="220"
      width="16"
      height="16"
      fill="#FDE215"
      opacity=".6"
      filter="blur(4px)"
    />
    <rect
      x="444"
      y="220"
      width="16"
      height="16"
      fill="#FDE215"
      opacity=".6"
      filter="blur(4px)"
    />
  `;
}

// Initialize the container pod SVG when DOM is loaded
export function initializeContainerPod() {
  const containerWrap = document.querySelector('.hero-svg-wrap');
  if (!containerWrap) return;

  // Create SVG element
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute('width', '480');
  svg.setAttribute('height', '380');
  svg.setAttribute('viewBox', '0 0 480 380');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Generate and set SVG content
  svg.innerHTML = generateContainerPodSVG();

  // Clear existing content and append new SVG
  containerWrap.innerHTML = '';
  containerWrap.appendChild(svg);
}
