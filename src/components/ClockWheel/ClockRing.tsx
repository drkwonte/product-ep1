import {
  HOURS_IN_DAY,
  CLOCK_CENTER,
  TICK_START_RADIUS,
  TICK_MAJOR_END_RADIUS,
  TICK_MINOR_END_RADIUS,
  TICK_SPECIAL_HOUR_END_RADIUS,
  TICK_HALF_HOUR_END_RADIUS,
  NUMBER_RADIUS,
  hourToAngleDeg,
  polarToCartesian,
} from '../../utils/clockGeometry';

const MAJOR_TICK_INTERVAL = 6;
const SUBLABEL_OFFSET = 13;

function toTwelveHourLabel(hour: number): string {
  const h = hour % 12;
  return h === 0 ? '12' : String(h);
}

function getTickEndRadius(hour: number, isMajorTick: boolean): number {
  if (hour === 0 || hour === 12) return TICK_SPECIAL_HOUR_END_RADIUS;
  if (isMajorTick) return TICK_MAJOR_END_RADIUS;
  return TICK_MINOR_END_RADIUS;
}

function HalfHourTicks() {
  return (
    <>
      {Array.from({ length: HOURS_IN_DAY }, (_, i) => {
        const halfHour = i + 0.5;
        const angle = hourToAngleDeg(halfHour);
        const start = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          TICK_START_RADIUS,
          angle,
        );
        const end = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          TICK_HALF_HOUR_END_RADIUS,
          angle,
        );
        return (
          <line
            key={`half-${i}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="#c5ddf0"
            strokeWidth="1"
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

export function ClockRing() {
  return (
    <g>
      <HalfHourTicks />
      {Array.from({ length: HOURS_IN_DAY }, (_, hour) => {
        const angle = hourToAngleDeg(hour);
        const isMajorTick = hour % MAJOR_TICK_INTERVAL === 0;
        const isMidnight = hour === 0;
        const isNoon = hour === 12;
        const tickEndRadius = getTickEndRadius(hour, isMajorTick);

        const tickStart = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          TICK_START_RADIUS,
          angle,
        );
        const tickEnd = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          tickEndRadius,
          angle,
        );
        const numPos = polarToCartesian(
          CLOCK_CENTER,
          CLOCK_CENTER,
          NUMBER_RADIUS,
          angle,
        );

        return (
          <g key={hour}>
            <line
              x1={tickStart.x}
              y1={tickStart.y}
              x2={tickEnd.x}
              y2={tickEnd.y}
              stroke={isMajorTick ? '#5b8fc9' : '#a8c5e0'}
              strokeWidth={isMajorTick ? 2.5 : 1.2}
              strokeLinecap="round"
            />
            {isNoon && (
              <text
                x={numPos.x}
                y={numPos.y - SUBLABEL_OFFSET}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="600"
                fill="#e07b39"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                정오
              </text>
            )}
            <text
              x={numPos.x}
              y={numPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isMajorTick ? 14 : 10}
              fontWeight={isMajorTick ? '700' : '400'}
              fill={isMajorTick ? '#1e3a5f' : '#4a6e94'}
              fontFamily="'Noto Sans KR', sans-serif"
            >
              {toTwelveHourLabel(hour)}
            </text>
            {isMidnight && (
              <text
                x={numPos.x}
                y={numPos.y + SUBLABEL_OFFSET}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="600"
                fill="#7b5ea7"
                fontFamily="'Noto Sans KR', sans-serif"
              >
                자정
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
