import React, { useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';
import { List, Clock, Check, Settings as SettingsIcon } from 'lucide-react';
import './Dock.css';

export type FilterType = 'all' | 'open' | 'bought';

type DockProps = {
  active?: FilterType;
  onChange: (f: FilterType) => void;
  onSettings?: () => void;
  distance?: number;
  magnification?: number; // factor, e.g., 1.6
  spring?: SpringOptions;
  baseItemSize?: number;
  panelHeight?: number;
  dockHeight?: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  baseItemSize,
  magnification,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, baseItemSize * magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onClick={onClick}
      className={'dock-item ' + className}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
}

export default function Dock({
  active = 'all',
  onChange,
  onSettings,
  distance = 200,
  magnification = 1.6,
  spring = { mass: 0.15, stiffness: 200, damping: 20 },
  baseItemSize = 48,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { key: 'all', label: 'Alle', icon: <List /> },
    { key: 'open', label: 'Offen', icon: <Clock /> },
    { key: 'bought', label: 'Gekauft', icon: <Check /> },
  ] as const;

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // nothing for now
  }, []);

  const onPointerMove = useCallback(
    (clientX?: number) => {
      if (typeof clientX === 'number') mouseX.set(clientX);
    },
    [mouseX],
  );

  return (
    <div className="dock-outer" aria-hidden={false}>
      <div
        ref={panelRef}
        className="dock-panel"
        onMouseMove={(e) => {
          onPointerMove(e.pageX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchStart={(e) => onPointerMove(e.touches[0].clientX)}
        onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
        onTouchEnd={() => mouseX.set(Infinity)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const buttons = panelRef.current?.querySelectorAll('button');
            if (!buttons || buttons.length === 0) return;
            const active = document.activeElement;
            let idx = Array.prototype.indexOf.call(buttons, active);
            if (idx === -1) {
              (buttons[0] as HTMLElement).focus();
              e.preventDefault();
              return;
            }
            if (e.key === 'ArrowRight') idx = (idx + 1) % buttons.length;
            else idx = (idx - 1 + buttons.length) % buttons.length;
            (buttons[idx] as HTMLElement).focus();
            e.preventDefault();
          }
        }}
        role="toolbar"
        aria-label="Filter Dock"
      >
        {items.map((it) => (
          <button
            key={it.key}
            className={'dock-button'}
            onClick={() => onChange(it.key as FilterType)}
            aria-pressed={active === it.key}
            aria-label={it.label}
            title={it.label}
            style={{ background: 'transparent', border: 'none', padding: 0 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(it.key as FilterType);
              }
            }}
          >
            <DockItem
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              baseItemSize={baseItemSize}
              magnification={magnification}
              className={active === it.key ? 'active' : ''}
            >
              <div className="dock-icon" aria-hidden>
                {it.icon}
              </div>
              <div className="dock-label" aria-hidden>
                {it.label}
              </div>
            </DockItem>
          </button>
        ))}

        {/* Settings last */}
        <button
          className="dock-button"
          onClick={() => onSettings && onSettings()}
          title="Einstellungen"
          aria-label="Einstellungen öffnen"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        >
          <DockItem
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            baseItemSize={baseItemSize}
            magnification={magnification}
          >
            <div className="dock-icon">
              <SettingsIcon />
            </div>
            <div className="dock-label">Einstellungen</div>
          </DockItem>
        </button>
      </div>
    </div>
  );
}
