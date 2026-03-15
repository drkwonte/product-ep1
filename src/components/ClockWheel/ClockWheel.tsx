import type React from 'react';
import type { Activity } from '../../types';
import {
  CLOCK_SIZE,
  CLOCK_CENTER,
  SECTOR_OUTER_RADIUS,
  SECTOR_INNER_RADIUS,
  HOURS_IN_DAY,
  hourToAngleDeg,
  polarToCartesian,
} from '../../utils/clockGeometry';
import { ClockRing } from './ClockRing';
import { Sector } from './Sector';
import { DragHandler } from './DragHandler';
import './ClockWheel.css';

const SEPARATOR_COLOR = 'rgba(180, 210, 235, 0.4)';
const LABEL_FONT_FAMILY = "'Noto Sans KR', sans-serif";
const LABEL_COLOR = '#2c5282';

// 이름 글자 수에 따라 폰트 크기를 조정해 내부 원 안에 맞게 표시
function getNameFontSize(nameWithSuffix: string): number {
  const charCount = nameWithSuffix.length;
  if (charCount <= 3) return 14;
  if (charCount <= 5) return 13;
  if (charCount <= 7) return 11;
  return 10;
}

interface ClockWheelProps {
  activities: Activity[];
  dragStartAngle: number | null;
  dragEndAngle: number | null;
  isPlacingSticker: boolean;
  plannerName: string;
  onPointerDown: (event: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (event: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp: () => void;
  onActivityClick: (activity: Activity) => void;
}

function HourSeparators() {
  return (
    <g>
      {Array.from({ length: HOURS_IN_DAY }, (_, hour) => {
        const angle = hourToAngleDeg(hour);
        const innerPoint = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          SECTOR_INNER_RADIUS,
          angle,
        );
        const outerPoint = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          SECTOR_OUTER_RADIUS,
          angle,
        );
        return (
          <line
            key={hour}
            x1={innerPoint.x}
            y1={innerPoint.y}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke={SEPARATOR_COLOR}
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

export function ClockWheel({
  activities,
  dragStartAngle,
  dragEndAngle,
  isPlacingSticker,
  plannerName,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onActivityClick,
}: ClockWheelProps) {
  const nameWithSuffix = plannerName ? `${plannerName}의` : '나의';
  const nameFontSize = getNameFontSize(nameWithSuffix);

  return (
    <div className="clock-wheel-wrapper">
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="clock-wheel-svg"
        style={{ cursor: isPlacingSticker ? 'copy' : 'crosshair', touchAction: 'none' }}
        onPointerDown={isPlacingSticker ? undefined : onPointerDown}
        onPointerMove={isPlacingSticker ? undefined : onPointerMove}
        onPointerUp={isPlacingSticker ? undefined : onPointerUp}
        onPointerLeave={isPlacingSticker ? undefined : onPointerUp}
      >
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={SECTOR_OUTER_RADIUS}
          fill="#eef5fb"
          stroke="#c5dcee"
          strokeWidth="1.5"
        />
        <HourSeparators />
        {activities.map((activity) => (
          <Sector
            key={activity.id}
            activity={activity}
            onClick={isPlacingSticker ? () => {} : onActivityClick}
          />
        ))}
        <DragHandler
          startAngleDeg={dragStartAngle}
          endAngleDeg={dragEndAngle}
        />
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={SECTOR_INNER_RADIUS}
          fill="white"
          stroke="#c5dcee"
          strokeWidth="1.5"
        />
        {/* 이름의 */}
        <text
          x={CLOCK_CENTER}
          y={CLOCK_CENTER - 11}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={nameFontSize}
          fontWeight="600"
          fill={LABEL_COLOR}
          fontFamily={LABEL_FONT_FAMILY}
        >
          {nameWithSuffix}
        </text>
        {/* 하루 */}
        <text
          x={CLOCK_CENTER}
          y={CLOCK_CENTER + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="700"
          fill={LABEL_COLOR}
          fontFamily={LABEL_FONT_FAMILY}
        >
          하루
        </text>
        <ClockRing />
      </svg>
    </div>
  );
}
