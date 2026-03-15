import type { Activity } from '../../types';
import {
  CLOCK_CENTER,
  SECTOR_OUTER_RADIUS,
  SECTOR_INNER_RADIUS,
  DEGREES_PER_HOUR,
  hourToAngleDeg,
  buildArcPath,
} from '../../utils/clockGeometry';
import { createSectorFill } from '../../utils/colorUtils';

const LABEL_RADIUS = (SECTOR_OUTER_RADIUS + SECTOR_INNER_RADIUS) / 2;
const SECTOR_THICKNESS = SECTOR_OUTER_RADIUS - SECTOR_INNER_RADIUS;
const APPROX_CHAR_WIDTH_PX = 11;
const FONT_SIZE = 11;
const LINE_HEIGHT = 14;
const LABEL_TEXT_COLOR = '#2c3e50';

function buildLabelLines(name: string, spanHours: number): string[] {
  const halfAngleRad = (spanHours * DEGREES_PER_HOUR * 0.5 * Math.PI) / 180;
  const chordWidth = 2 * LABEL_RADIUS * Math.sin(halfAngleRad);
  const maxCharsPerLine = Math.max(1, Math.floor(chordWidth / APPROX_CHAR_WIDTH_PX));
  const maxLines = Math.max(1, Math.floor((SECTOR_THICKNESS * 0.65) / LINE_HEIGHT));

  const lines: string[] = [];
  let remaining = name;
  while (remaining.length > 0 && lines.length < maxLines) {
    if (remaining.length <= maxCharsPerLine) {
      lines.push(remaining);
      break;
    }
    if (lines.length === maxLines - 1) {
      lines.push(remaining.substring(0, maxCharsPerLine - 1) + '…');
      break;
    }
    lines.push(remaining.substring(0, maxCharsPerLine));
    remaining = remaining.substring(maxCharsPerLine);
  }
  return lines;
}

interface SectorProps {
  activity: Activity;
  onClick: (activity: Activity) => void;
}

export function Sector({ activity, onClick }: SectorProps) {
  const startAngle = hourToAngleDeg(activity.startHour);
  const endAngle = hourToAngleDeg(activity.endHour);
  const path = buildArcPath(
    CLOCK_CENTER,
    CLOCK_CENTER,
    SECTOR_OUTER_RADIUS,
    SECTOR_INNER_RADIUS,
    startAngle,
    endAngle,
  );

  const midAngle = hourToAngleDeg(
    (activity.startHour + activity.endHour) / 2,
  );
  const midAngleRad = (midAngle - 90) * (Math.PI / 180);
  const labelRadius = (SECTOR_OUTER_RADIUS + SECTOR_INNER_RADIUS) / 2;
  const labelX = CLOCK_CENTER + labelRadius * Math.cos(midAngleRad);
  const labelY = CLOCK_CENTER + labelRadius * Math.sin(midAngleRad);

  const spanHours = activity.endHour - activity.startHour;
  const showLabel = spanHours >= 1;
  const labelLines = showLabel ? buildLabelLines(activity.name, spanHours) : [];

  const sectorFill = createSectorFill(activity.color);

  return (
    <g onClick={() => onClick(activity)} style={{ cursor: 'pointer' }}>
      <path
        d={path}
        fill={sectorFill}
        stroke="white"
        strokeWidth="1.5"
      />
      {labelLines.length > 0 && (
        <text
          textAnchor="middle"
          fontSize={FONT_SIZE}
          fill={LABEL_TEXT_COLOR}
          fontWeight="700"
          fontFamily="'Noto Sans KR', sans-serif"
          pointerEvents="none"
        >
          {labelLines.map((line, i) => (
            <tspan
              key={i}
              x={labelX}
              y={labelY + (i - (labelLines.length - 1) / 2) * LINE_HEIGHT}
            >
              {line}
            </tspan>
          ))}
        </text>
      )}
    </g>
  );
}
