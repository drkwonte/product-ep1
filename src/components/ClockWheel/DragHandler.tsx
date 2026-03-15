import {
  CLOCK_CENTER,
  SECTOR_OUTER_RADIUS,
  SECTOR_INNER_RADIUS,
  buildArcPath,
} from '../../utils/clockGeometry';

interface DragHandlerProps {
  startAngleDeg: number | null;
  endAngleDeg: number | null;
}

export function DragHandler({ startAngleDeg, endAngleDeg }: DragHandlerProps) {
  if (startAngleDeg === null || endAngleDeg === null) return null;

  const path = buildArcPath(
    CLOCK_CENTER,
    CLOCK_CENTER,
    SECTOR_OUTER_RADIUS,
    SECTOR_INNER_RADIUS,
    startAngleDeg,
    endAngleDeg,
  );

  return (
    <path
      d={path}
      fill="rgba(91, 143, 201, 0.35)"
      stroke="rgba(91, 143, 201, 0.8)"
      strokeWidth="2"
      pointerEvents="none"
    />
  );
}
