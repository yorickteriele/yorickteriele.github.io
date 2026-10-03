"use client";

import { useEffect, useRef, useState } from "react";

const GOODREADS_USER_ID = "192543272";
// The widget's internal .goodreads_container is a hardcoded 383px wide no
// matter what width param is passed, so it can't reflow on its own — we
// measure the wrapper and scale the iframe down to fit instead.
const WIDGET_WIDTH = 400;
const WIDGET_HEIGHT = 460;

export default function GoodreadsWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateScale = () => {
      setScale(Math.min(1, el.clientWidth / WIDGET_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="max-w-[420px] mx-auto">
      <div
        className="bg-card border border-border rounded-lg p-4 overflow-hidden transition-[height] duration-150"
        style={{ height: WIDGET_HEIGHT * scale + 32 }}
      >
        <div
          style={{
            width: WIDGET_WIDTH,
            height: WIDGET_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            sandbox="allow-scripts allow-popups allow-same-origin"
            title="Goodreads updates"
            src={`https://www.goodreads.com/widgets/user_update_widget?height=${WIDGET_HEIGHT}&num_updates=5&user=${GOODREADS_USER_ID}&width=${WIDGET_WIDTH}`}
            width={WIDGET_WIDTH}
            height={WIDGET_HEIGHT}
            frameBorder={0}
          />
        </div>
      </div>
    </div>
  );
}
