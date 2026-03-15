import { useState } from 'react';
import type React from 'react';
import {
  CLOCK_SIZE,
  CLOCK_CENTER,
  HOURS_IN_DAY,
  DEGREES_PER_HOUR,
  hourToAngleDeg,
} from '../utils/clockGeometry';

const MIN_DRAG_DURATION_HOURS = 0.5;
const HALF_HOUR_SNAP = 0.5;

function snapToHalfHour(hour: number): number {
  return Math.round(hour / HALF_HOUR_SNAP) * HALF_HOUR_SNAP;
}

function svgClientToHour(clientX: number, clientY: number, svg: SVGSVGElement): number {
  const rect = svg.getBoundingClientRect();
  const scaleX = CLOCK_SIZE / rect.width;
  const scaleY = CLOCK_SIZE / rect.height;
  const svgX = (clientX - rect.left) * scaleX;
  const svgY = (clientY - rect.top) * scaleY;
  const dx = svgX - CLOCK_CENTER;
  const dy = svgY - CLOCK_CENTER;
  const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  const normalizedAngle = ((angleDeg % 360) + 360) % 360;
  return snapToHalfHour(normalizedAngle / DEGREES_PER_HOUR);
}

// 시작 시각에서 시계 방향으로 끝 시각까지의 duration을 구함
function resolveClockwiseEndHour(startHour: number, rawEndHour: number): number {
  if (rawEndHour < startHour) return rawEndHour + HOURS_IN_DAY;
  return rawEndHour;
}

interface UseDragAngleOptions {
  onDragComplete: (startHour: number, endHour: number) => void;
}

interface UseDragAngleResult {
  isDragging: boolean;
  dragStartAngle: number | null;
  dragEndAngle: number | null;
  onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp: () => void;
}

export function useDragAngle({
  onDragComplete,
}: UseDragAngleOptions): UseDragAngleResult {
  const [startHour, setStartHour] = useState<number | null>(null);
  const [currentHour, setCurrentHour] = useState<number | null>(null);

  const isDragging = startHour !== null;

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    const hour = svgClientToHour(e.clientX, e.clientY, e.currentTarget);
    setStartHour(hour);
    setCurrentHour(hour);
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (startHour === null) return;
    setCurrentHour(svgClientToHour(e.clientX, e.clientY, e.currentTarget));
  }

  function onPointerUp() {
    if (startHour !== null && currentHour !== null) {
      const endHour = resolveClockwiseEndHour(startHour, currentHour);
      if (endHour - startHour >= MIN_DRAG_DURATION_HOURS) {
        onDragComplete(startHour, endHour);
      }
    }
    setStartHour(null);
    setCurrentHour(null);
  }

  let dragStartAngle: number | null = null;
  let dragEndAngle: number | null = null;
  if (startHour !== null && currentHour !== null) {
    dragStartAngle = hourToAngleDeg(startHour);
    dragEndAngle = hourToAngleDeg(
      resolveClockwiseEndHour(startHour, currentHour),
    );
  }

  return {
    isDragging,
    dragStartAngle,
    dragEndAngle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
