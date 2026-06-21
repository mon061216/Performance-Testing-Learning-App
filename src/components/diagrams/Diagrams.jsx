import { motion } from "motion/react";
import { polarXY, arcD, G } from "../../utils/helpers";

/* ── Speedometer ── */
export function SpeedometerDiagram() {
  const cx = 110;
  const cy = 108;
  const r = 68;
  return (
    <svg
      viewBox="0 0 220 140"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <path
        d={arcD(cx, cy, r, 210, 330)}
        fill="none"
        stroke="#1a2a3a"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={arcD(cx, cy, r, 210, 252)}
        fill="none"
        stroke={G.green}
        strokeWidth="14"
        strokeLinecap="round"
        opacity=".9"
      />
      <path
        d={arcD(cx, cy, r, 252, 288)}
        fill="none"
        stroke={G.yellow}
        strokeWidth="14"
        strokeLinecap="butt"
        opacity=".9"
      />
      <path
        d={arcD(cx, cy, r, 288, 330)}
        fill="none"
        stroke={G.red}
        strokeWidth="14"
        strokeLinecap="round"
        opacity=".9"
      />
      {[
        { a: 210, l: "Fast" },
        { a: 270, l: "OK" },
        { a: 330, l: "Slow" },
      ].map(({ a, l }) => {
        const p = polarXY(cx, cy, r + 16, a);
        return (
          <text
            key={l}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            fontSize="8"
            {...G.muted}
          >
            {l}
          </text>
        );
      })}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{ rotate: [-55, 10, 55, 10, -55] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.55, 0.8, 1],
        }}
      >
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 8}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" />
      </motion.g>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" {...G.muted}>
        Response Time
      </text>
      <text
        x={cx}
        y={cy + 35}
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="white"
      >
        <motion.tspan
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⚡
        </motion.tspan>
      </text>
    </svg>
  );
}

/* ── Load Ramp ── */
export function LoadRampDiagram() {
  const bars = [18, 34, 52, 70, 85, 92, 94];
  const bw = 22;
  const bx0 = 20;
  const base = 110;
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <line
        x1="18"
        y1="15"
        x2="18"
        y2={base}
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1={base}
        x2="210"
        y2={base}
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={bx0 + i * (bw + 4)}
          y={base}
          width={bw}
          height={0}
          animate={{ y: base - h, height: h }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
          fill={i < 5 ? G.green : G.yellow}
          rx="3"
          opacity="0.85"
        />
      ))}
      {[1, 3, 5].map((i) => {
        return (
          <motion.text
            key={i}
            x={bx0 + i * (bw + 4) + bw / 2}
            y={base - bars[i] - 6}
            textAnchor="middle"
            fontSize="9"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.5 }}
          >
            👤
          </motion.text>
        );
      })}
      <text x="114" y="130" textAnchor="middle" fontSize="8" {...G.muted}>
        Time →
      </text>
      <text
        x="10"
        y="70"
        textAnchor="middle"
        fontSize="7"
        {...G.muted}
        transform="rotate(-90,10,70)"
      >
        Users →
      </text>
      <motion.rect
        x="130"
        y="12"
        width="76"
        height="18"
        rx="4"
        fill="rgba(88,204,2,0.15)"
        stroke={G.green}
        strokeWidth="1"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text
        x="168"
        y="24"
        textAnchor="middle"
        fontSize="8"
        fill={G.green}
        fontWeight="700"
      >
        EXPECTED LOAD
      </text>
    </svg>
  );
}

/* ── Stress Break ── */
export function StressBreakDiagram() {
  const rows = [
    { label: "CPU", color: G.red },
    { label: "RAM", color: G.orange },
    { label: "NET", color: G.yellow },
  ];
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <motion.g
        animate={{ x: [0, -2, 2, -1, 1, 0] }}
        transition={{
          delay: 2,
          duration: 0.4,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <rect
          x="80"
          y="8"
          width="60"
          height="44"
          rx="6"
          fill="#162032"
          stroke="#ff4b4b"
          strokeWidth="1.5"
        />
        <text
          x="110"
          y="26"
          textAnchor="middle"
          fontSize="10"
          fill={G.red}
          fontWeight="800"
        >
          SERVER
        </text>
        <text x="110" y="42" textAnchor="middle" fontSize="16">
          💥
        </text>
      </motion.g>
      {rows.map(({ label, color }, i) => (
        <g key={label} transform={`translate(20,${72 + i * 24})`}>
          <text x="0" y="11" fontSize="8" fill="#7a9bb5" fontWeight="700">
            {label}
          </text>
          <rect x="28" y="2" width="120" height="12" rx="6" fill="#1a2a3a" />
          <motion.rect
            x="28"
            y="2"
            width="0"
            height="12"
            rx="6"
            fill={color}
            animate={{ width: [60, 120, 126, 120] }}
            transition={{
              delay: i * 0.2,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeOut",
            }}
          />
          <motion.text
            x="155"
            y="12"
            fontSize="8"
            fill={color}
            fontWeight="800"
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 1.5 + i * 0.2 }}
          >
            100%+
          </motion.text>
        </g>
      ))}
      <motion.text
        x="110"
        y="135"
        textAnchor="middle"
        fontSize="9"
        fill={G.red}
        fontWeight="700"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      >
        ⚠ BREAKING POINT
      </motion.text>
    </svg>
  );
}

/* ── Test Types Cards ── */
export function TestTypesCardsDiagram() {
  const types = [
    { name: "Spike", icon: "⚡", color: G.yellow, desc: "Sudden surge" },
    { name: "Soak", icon: "🏊", color: G.blue, desc: "Long duration" },
    { name: "Volume", icon: "📦", color: G.green, desc: "Massive data" },
    { name: "Scale", icon: "📈", color: G.orange, desc: "Grow capacity" },
  ];
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      {types.map(({ name, icon, color, desc }, i) => {
        const x = (i % 2) * 108 + 6;
        const y = Math.floor(i / 2) * 66 + 4;
        return (
          <motion.g
            key={name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
          >
            <rect
              x={x}
              y={y}
              width="100"
              height="56"
              rx="10"
              fill="rgba(255,255,255,0.04)"
              stroke={color}
              strokeWidth="1.5"
            />
            <text x={x + 14} y={y + 22} fontSize="16">
              {icon}
            </text>
            <text
              x={x + 36}
              y={y + 22}
              fontSize="11"
              fontWeight="800"
              fill="white"
            >
              {name}
            </text>
            <text x={x + 14} y={y + 42} fontSize="9" {...G.muted}>
              {desc}
            </text>
            <motion.rect
              x={x}
              y={y}
              width="100"
              height="56"
              rx="10"
              fill="none"
              stroke={color}
              strokeWidth="2"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ delay: i * 0.2, duration: 2.5, repeat: Infinity }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Time Compare ── */
export function TimeCompareDiagram() {
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      {/* 2s bar */}
      <text x="110" y="22" textAnchor="middle" fontSize="9" {...G.muted}>
        Response Time Comparison
      </text>
      <rect x="20" y="35" width="180" height="18" rx="9" fill="#1a2a3a" />
      <motion.rect
        x="20"
        y="35"
        width="72"
        height="18"
        rx="9"
        fill={G.green}
        initial={{ width: 0 }}
        animate={{ width: 72 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <text x="20" y="29" fontSize="8" fill={G.green} fontWeight="700">
        ✓ 2s — Industry Target
      </text>
      <text x="97" y="47" fontSize="8" fill="white" fontWeight="700">
        2s
      </text>

      {/* 5s bar */}
      <rect x="20" y="72" width="180" height="18" rx="9" fill="#1a2a3a" />
      <motion.rect
        x="20"
        y="72"
        width="180"
        height="18"
        rx="9"
        fill={G.red}
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
      <text x="20" y="66" fontSize="8" fill={G.red} fontWeight="700">
        ✗ 5s — Users Abandon
      </text>
      <text x="205" y="84" fontSize="8" fill="white" fontWeight="700">
        5s
      </text>

      <motion.text
        x="110"
        y="118"
        textAnchor="middle"
        fontSize="9"
        fill={G.yellow}
        fontWeight="700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        53% abandon after 3 seconds
      </motion.text>
      <text x="110" y="134" textAnchor="middle" fontSize="8" {...G.muted}>
        — Google Research
      </text>
    </svg>
  );
}

/* ── Flow Pipe (Throughput) ── */
export function FlowPipeDiagram() {
  const dots = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <text
        x="110"
        y="18"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="white"
      >
        THROUGHPUT
      </text>
      {/* Pipe */}
      <rect
        x="14"
        y="50"
        width="192"
        height="40"
        rx="20"
        fill="#162032"
        stroke={G.green}
        strokeWidth="1.5"
      />
      {/* Flowing dots */}
      {dots.map((i) => (
        <motion.circle
          key={i}
          cy="70"
          r="5"
          fill={G.green}
          opacity="0.85"
          animate={{ cx: [14, 206] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
      {/* IN / OUT labels */}
      <text x="14" y="110" fontSize="9" {...G.muted}>
        IN
      </text>
      <text x="196" y="110" fontSize="9" {...G.muted}>
        OUT
      </text>
      {/* Counter */}
      <motion.text
        x="110"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fill={G.green}
        fontWeight="900"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        156 req/s
      </motion.text>
      <text x="110" y="138" textAnchor="middle" fontSize="8" {...G.muted}>
        Requests per second
      </text>
    </svg>
  );
}

/* ── Process Steps ── */
export function ProcessStepsDiagram() {
  const steps = ["Plan", "Design", "Test", "Execute", "Analyze", "Results"];
  const cols = 3;
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      {steps.map((s, i) => {
        const x = (i % cols) * 72 + 8;
        const y = Math.floor(i / cols) * 54 + 10;
        return (
          <motion.g
            key={s}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.18 }}
          >
            <rect
              x={x}
              y={y}
              width="64"
              height="38"
              rx="8"
              fill="rgba(255,255,255,0.04)"
              stroke={i < 3 ? G.green : G.blue}
              strokeWidth="1.5"
            />
            <text x={x + 32} y={y + 14} textAnchor="middle" fontSize="11">
              {["📋", "✏️", "🧪", "▶️", "🔍", "📊"][i]}
            </text>
            <text
              x={x + 32}
              y={y + 30}
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="700"
            >
              {s}
            </text>
            {i < steps.length - 1 && i % cols < cols - 1 && (
              <motion.text
                x={x + 68}
                y={y + 22}
                fontSize="10"
                fill={G.green}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
              >
                ›
              </motion.text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Latency Arrows ── */
export function LatencyArrowsDiagram() {
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      {/* Client */}
      <rect
        x="6"
        y="44"
        width="54"
        height="36"
        rx="8"
        fill="#162032"
        stroke={G.blue}
        strokeWidth="1.5"
      />
      <text
        x="33"
        y="60"
        textAnchor="middle"
        fontSize="9"
        fill={G.blue}
        fontWeight="700"
      >
        CLIENT
      </text>
      <text x="33" y="74" textAnchor="middle" fontSize="13">
        💻
      </text>
      {/* Server */}
      <rect
        x="160"
        y="44"
        width="54"
        height="36"
        rx="8"
        fill="#162032"
        stroke={G.green}
        strokeWidth="1.5"
      />
      <text
        x="187"
        y="60"
        textAnchor="middle"
        fontSize="9"
        fill={G.green}
        fontWeight="700"
      >
        SERVER
      </text>
      <text x="187" y="74" textAnchor="middle" fontSize="13">
        🖥️
      </text>
      {/* Request arrow */}
      <motion.line
        x1="62"
        y1="57"
        x2="157"
        y2="57"
        stroke={G.yellow}
        strokeWidth="2"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <polygon points="157,53 165,57 157,61" fill={G.yellow} />
      <text
        x="110"
        y="50"
        textAnchor="middle"
        fontSize="8"
        fill={G.yellow}
        fontWeight="700"
      >
        REQUEST
      </text>
      {/* Response arrow */}
      <motion.line
        x1="157"
        y1="74"
        x2="62"
        y2="74"
        stroke={G.green}
        strokeWidth="2"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
          delay: 0.5,
        }}
      />
      <polygon points="62,70 54,74 62,78" fill={G.green} />
      <text
        x="110"
        y="88"
        textAnchor="middle"
        fontSize="8"
        fill={G.green}
        fontWeight="700"
      >
        RESPONSE
      </text>
      {/* Timing breakdown */}
      <rect
        x="14"
        y="100"
        width="192"
        height="32"
        rx="6"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      {[
        { x: 14, w: 48, color: G.yellow, label: "Latency" },
        { x: 78, w: 64, color: G.blue, label: "Processing" },
        { x: 158, w: 48, color: G.yellow, label: "Latency" },
      ].map(({ x, w, color, label }, i) => (
        <g key={i}>
          <motion.rect
            x={x + 4}
            y={104}
            width={0}
            height={12}
            rx="3"
            fill={color}
            opacity="0.7"
            animate={{ width: w }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
          />
          <text
            x={x + 4 + w / 2}
            y={128}
            textAnchor="middle"
            fontSize="7"
            {...G.muted}
          >
            {label}
          </text>
        </g>
      ))}
      <text
        x="110"
        y="120"
        textAnchor="middle"
        fontSize="7"
        fill="rgba(255,255,255,0.3)"
      >
        = Response Time
      </text>
    </svg>
  );
}

/* ── Soak Line (Degradation) ── */
export function SoakLineDiagram() {
  const pts = "20,30 60,28 100,28 130,34 155,45 175,62 190,88 200,108";
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        24-Hour Soak Test
      </text>
      <line
        x1="18"
        y1="18"
        x2="18"
        y2="118"
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="118"
        x2="210"
        y2="118"
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      {["0h", "6h", "12h", "18h", "24h"].map((l, i) => (
        <text
          key={l}
          x={18 + i * 46}
          y={128}
          textAnchor="middle"
          fontSize="7"
          {...G.muted}
        >
          {l}
        </text>
      ))}
      <text
        x="10"
        y="70"
        textAnchor="middle"
        fontSize="7"
        {...G.muted}
        transform="rotate(-90,10,70)"
      >
        Perf %
      </text>
      <text x="22" y="32" fontSize="7" fill={G.green}>
        100%
      </text>
      {/* Background fill under curve */}
      <motion.path
        d={`M 20,30 ${pts.split(" ").slice(1).join(" ")} L 200,118 L 20,118 Z`}
        fill={`url(#soakGrad)`}
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />
      <defs>
        <linearGradient id="soakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={G.green} />
          <stop offset="100%" stopColor={G.red} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.polyline
        points={pts}
        fill="none"
        stroke={G.green}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />
      <motion.circle
        cx="190"
        cy="88"
        r="4"
        fill={G.red}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.text
        x="145"
        y="80"
        fontSize="8"
        fill={G.red}
        fontWeight="700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Memory Leak ↘
      </motion.text>
    </svg>
  );
}

/* ── Business Bars ── */
export function BusinessBarsDiagram() {
  const bars = [
    { label: "Abandonment", value: 92, color: G.red },
    { label: "Revenue Loss", value: 76, color: G.orange },
    { label: "Degradation", value: 55, color: G.yellow },
    { label: "Can't Scale", value: 88, color: G.red },
  ];
  const base = 125;
  const bw = 40;
  return (
    <svg viewBox="0 0 220 145" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Business Impact of Poor Perf
      </text>
      {bars.map(({ label, value, color }, i) => (
        <g key={label} transform={`translate(${10 + i * 52},0)`}>
          <rect
            x="6"
            y={base - 90}
            width={bw}
            height={90}
            rx="4"
            fill="#1a2535"
          />
          <motion.rect
            x="6"
            y={base}
            width={bw}
            height={0}
            rx="4"
            fill={color}
            opacity="0.85"
            animate={{
              y: base - (value * 90) / 100,
              height: (value * 90) / 100,
            }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
          />
          <motion.text
            x={bw / 2 + 6}
            y={base - (value * 90) / 100 - 4}
            textAnchor="middle"
            fontSize="8"
            fill={color}
            fontWeight="800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.6 }}
          >
            {value}%
          </motion.text>
          <text
            x={bw / 2 + 6}
            y={base + 14}
            textAnchor="middle"
            fontSize="7"
            {...G.muted}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── JMeter Tree ── */
export function JMeterTreeDiagram() {
  const nodes = [
    { x: 110, y: 20, label: "Test Plan", color: G.orange, level: 0 },
    { x: 110, y: 56, label: "Thread Group", color: G.yellow, level: 1 },
    { x: 55, y: 96, label: "HTTP Sampler", color: G.green, level: 2 },
    { x: 165, y: 96, label: "Listener", color: G.blue, level: 2 },
    { x: 55, y: 130, label: "Assertion", color: G.red, level: 3 },
    { x: 165, y: 130, label: "Timer", color: "#a78bfa", level: 3 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 5],
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y + 10}
          x2={nodes[b].x}
          y2={nodes[b].y - 10}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.2 }}
        />
      ))}
      {nodes.map(({ x, y, label, color }, i) => (
        <motion.g
          key={label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.12, type: "spring" }}
        >
          <rect
            x={x - 42}
            y={y - 12}
            width="84"
            height="22"
            rx="11"
            fill={`${color}22`}
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            fontSize="8"
            fill={color}
            fontWeight="700"
          >
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ── k6 Terminal ── */
export function K6TerminalDiagram() {
  const lines = [
    { text: "import http from 'k6/http';", color: G.blue },
    { text: "export const options = {", color: G.yellow },
    { text: "  vus: 100, duration: '30s'", color: G.green },
    { text: "};", color: G.yellow },
    { text: "export default function() {", color: G.orange },
    { text: "  http.get('https://api.test');", color: G.green },
    { text: "}", color: G.orange },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <rect
        x="6"
        y="4"
        width="208"
        height="140"
        rx="10"
        fill="#0d1117"
        stroke="#30363d"
        strokeWidth="1.5"
      />
      <rect x="6" y="4" width="208" height="22" rx="10" fill="#1c2128" />
      <circle cx="22" cy="15" r="4" fill="#ff5f56" />
      <circle cx="34" cy="15" r="4" fill="#ffbd2e" />
      <circle cx="46" cy="15" r="4" fill="#27c93f" />
      <text x="110" y="19" textAnchor="middle" fontSize="8" {...G.muted}>
        k6 test script
      </text>
      {lines.map(({ text, color }, i) => (
        <motion.text
          key={i}
          x="14"
          y={38 + i * 15}
          fontSize="7.5"
          fill={color}
          fontFamily="JetBrains Mono,monospace"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          {text}
        </motion.text>
      ))}
      <motion.rect
        x="6"
        y="138"
        width="10"
        height="6"
        rx="1"
        fill="white"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  );
}

/* ── Gatling Surge ── */
export function GatlingSurgeDiagram() {
  const waves = [60, 80, 95, 110, 130, 160, 190];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Gatling — Concurrent Users
      </text>
      {waves.map((users, i) => (
        <motion.circle
          key={i}
          cx="110"
          cy="80"
          fill="none"
          stroke={G.blue}
          r={0}
          opacity="0"
          animate={{ r: users / 2, opacity: [0.6, 0] }}
          transition={{
            delay: i * 0.4,
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      <circle
        cx="110"
        cy="80"
        r="22"
        fill={`${G.blue}22`}
        stroke={G.blue}
        strokeWidth="2"
      />
      <text
        x="110"
        y="77"
        textAnchor="middle"
        fontSize="10"
        fill={G.blue}
        fontWeight="900"
      >
        10K
      </text>
      <text x="110" y="91" textAnchor="middle" fontSize="8" {...G.muted}>
        concurrent
      </text>
      <motion.text
        x="110"
        y="134"
        textAnchor="middle"
        fontSize="9"
        fill={G.blue}
        fontWeight="700"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        High-performance Scala DSL
      </motion.text>
    </svg>
  );
}

/* ── Tool Radar ── */
export function ToolRadarDiagram() {
  const tools = [
    { name: "JMeter", scores: [9, 5, 8, 4], color: G.orange },
    { name: "k6", scores: [7, 9, 6, 9], color: G.green },
  ];
  const axes = ["Ease", "Dev-Friendly", "GUI", "CI/CD"];
  const cx = 110;
  const cy = 72;
  const R = 52;
  function scoreToXY(score, axisIdx) {
    const angle = (axisIdx * Math.PI * 2) / 4 - Math.PI / 2;
    const r = (score / 10) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      {[1, 2, 3].map((ring) => (
        <polygon
          key={ring}
          points={[0, 1, 2, 3]
            .map((i) => {
              const a = (i * Math.PI * 2) / 4 - Math.PI / 2;
              const r = (ring / 3) * R;
              return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {axes.map((axis, i) => {
        const a = (i * Math.PI * 2) / 4 - Math.PI / 2;
        const lx = cx + (R + 14) * Math.cos(a);
        const ly = cy + (R + 14) * Math.sin(a);
        return (
          <g key={axis}>
            <line
              x1={cx}
              y1={cy}
              x2={cx + R * Math.cos(a)}
              y2={cy + R * Math.sin(a)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <text x={lx} y={ly} textAnchor="middle" fontSize="7.5" {...G.muted}>
              {axis}
            </text>
          </g>
        );
      })}
      {tools.map(({ name, scores, color }, ti) => (
        <motion.g
          key={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ti * 0.4 }}
        >
          <motion.polygon
            points={scores
              .map((s, i) => {
                const p = scoreToXY(s, i);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill={`${color}30`}
            stroke={color}
            strokeWidth="1.8"
          />
          <text
            x={ti === 0 ? 30 : 190}
            y={134}
            textAnchor="middle"
            fontSize="8"
            fill={color}
            fontWeight="700"
          >
            {name}
          </text>
          <rect
            x={ti === 0 ? 16 : 176}
            y={126}
            width="8"
            height="8"
            fill={color}
            rx="2"
          />
        </motion.g>
      ))}
    </svg>
  );
}

/* ── Users Spawn ── */
export function UsersSpawnDiagram() {
  const grid = Array.from({ length: 20 }, (_, i) => ({
    x: (i % 5) * 36 + 18,
    y: Math.floor(i / 5) * 32 + 28,
  }));
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Virtual Users (Thread Group)
      </text>
      {grid.map(({ x, y }, i) => (
        <motion.text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          fontSize="18"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
        >
          👤
        </motion.text>
      ))}
      <motion.text
        x="110"
        y="140"
        textAnchor="middle"
        fontSize="12"
        fill={G.green}
        fontWeight="900"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        20 → 100 → 1,000 users
      </motion.text>
    </svg>
  );
}

/* ── Hierarchy Build ── */
export function HierarchyBuildDiagram() {
  return <JMeterTreeDiagram />;
}

/* ── Pipeline Flow ── */
export function PipelineFlowDiagram() {
  const stages = ["Commit", "Build", "Test", "Deploy", "Alert"];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        CI/CD Performance Pipeline
      </text>
      {stages.map((s, i) => {
        const x = 10 + i * 42;
        return (
          <g key={s}>
            <motion.rect
              x={x}
              y="38"
              width="36"
              height="56"
              rx="8"
              fill="rgba(88,204,2,0.08)"
              stroke={G.green}
              strokeWidth="1.5"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ delay: i * 0.6, duration: 3, repeat: Infinity }}
            />
            <text x={x + 18} y="62" textAnchor="middle" fontSize="15">
              {["📝", "🔨", "🧪", "🚀", "🔔"][i]}
            </text>
            <text
              x={x + 18}
              y="82"
              textAnchor="middle"
              fontSize="7.5"
              fill="white"
              fontWeight="700"
            >
              {s}
            </text>
            {i < stages.length - 1 && (
              <motion.text
                x={x + 40}
                y="68"
                fontSize="12"
                fill={G.green}
                animate={{ x: [x + 38, x + 44, x + 38] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              >
                ›
              </motion.text>
            )}
          </g>
        );
      })}
      {/* moving runner */}
      <motion.circle
        cy="94"
        r="5"
        fill={G.yellow}
        animate={{ cx: [10, 210] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.5,
        }}
      />
      <text x="110" y="128" textAnchor="middle" fontSize="8" {...G.muted}>
        Automated perf gate at each stage
      </text>
    </svg>
  );
}

/* ── Distributed Nodes ── */
export function DistributedNodesDiagram() {
  const workers = [
    { x: 110, y: 30, main: true },
    { x: 36, y: 72 },
    { x: 184, y: 72 },
    { x: 60, y: 120 },
    { x: 160, y: 120 },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      {workers.slice(1).map((w, i) => (
        <motion.line
          key={i}
          x1={workers[0].x}
          y1={workers[0].y + 14}
          x2={w.x}
          y2={w.y - 12}
          stroke={G.blue}
          strokeWidth="1.5"
          strokeDasharray="5 4"
          opacity="0.5"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
      {workers.map(({ x, y, main }, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          <circle
            cx={x}
            cy={y}
            r={main ? 18 : 12}
            fill={main ? `${G.blue}22` : `${G.green}18`}
            stroke={main ? G.blue : G.green}
            strokeWidth="1.5"
          />
          <text x={x} y={y + 4} textAnchor="middle" fontSize={main ? 12 : 10}>
            {main ? "🎮" : "⚙️"}
          </text>
          {!main && (
            <motion.circle
              cx={x}
              cy={y}
              r={12}
              fill="none"
              stroke={G.green}
              strokeWidth="1"
              animate={{ r: [12, 20], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          )}
        </motion.g>
      ))}
      <text x="110" y="143" textAnchor="middle" fontSize="8" {...G.muted}>
        1 Controller + 4 Load Generators
      </text>
    </svg>
  );
}

/* ── Locust Dashboard ── */
export function LocustDashDiagram() {
  const bars2 = [30, 55, 72, 86, 94, 88, 79, 82];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <rect
        x="4"
        y="4"
        width="212"
        height="140"
        rx="10"
        fill="#0d1117"
        stroke="#30363d"
        strokeWidth="1"
      />
      <rect x="4" y="4" width="212" height="20" rx="8" fill="#1c2128" />
      <text
        x="110"
        y="18"
        textAnchor="middle"
        fontSize="8"
        fill={G.green}
        fontWeight="700"
      >
        🦗 Locust — Live Dashboard
      </text>
      {[
        { label: "Requests/s", val: "248", x: 38 },
        { label: "Failures", val: "0.1%", x: 110 },
        { label: "p95 (ms)", val: "284", x: 182 },
      ].map(({ label, val, x }) => (
        <g key={label}>
          <text
            x={x}
            y="40"
            textAnchor="middle"
            fontSize="12"
            fill="white"
            fontWeight="900"
          >
            {val}
          </text>
          <text x={x} y="52" textAnchor="middle" fontSize="7" {...G.muted}>
            {label}
          </text>
        </g>
      ))}
      <line
        x1="12"
        y1="60"
        x2="208"
        y2="60"
        stroke="#30363d"
        strokeWidth="0.5"
      />
      {bars2.map((h, i) => (
        <motion.rect
          key={i}
          x={12 + i * 24}
          y={60}
          width="18"
          height={0}
          animate={{ y: 60 + (50 - (h * 50) / 100), height: (h * 50) / 100 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          fill={i === 4 ? G.orange : G.green}
          rx="2"
          opacity="0.8"
        />
      ))}
      <text x="110" y="130" textAnchor="middle" fontSize="7" {...G.muted}>
        Response time distribution
      </text>
    </svg>
  );
}

/* ── Decision Flow ── */
export function DecisionFlowDiagram() {
  const nodes = [
    { x: 110, y: 18, text: "Choose Tool?", type: "q" },
    { x: 50, y: 64, text: "Python team?", type: "q" },
    { x: 170, y: 64, text: "Need GUI?", type: "q" },
    { x: 30, y: 110, text: "Locust", type: "a", color: G.green },
    { x: 100, y: 110, text: "Gatling", type: "a", color: G.blue },
    { x: 170, y: 110, text: "JMeter", type: "a", color: G.orange },
    { x: 110, y: 132, text: "k6", type: "a", color: G.yellow },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y + 12}
          x2={nodes[b].x}
          y2={nodes[b].y - 12}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.15 }}
        />
      ))}
      {nodes.map(({ x, y, text, type, color }, i) => (
        <motion.g
          key={text}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.12, type: "spring" }}
        >
          {type === "q" ? (
            <>
              <rect
                x={x - 36}
                y={y - 12}
                width="72"
                height="24"
                rx="12"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.2"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="8"
                fill="white"
                fontWeight="700"
              >
                {text}
              </text>
            </>
          ) : (
            <>
              <rect
                x={x - 28}
                y={y - 12}
                width="56"
                height="24"
                rx="6"
                fill={`${color}22`}
                stroke={color}
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="9"
                fill={color}
                fontWeight="800"
              >
                {text}
              </text>
            </>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

/* ── Percentile Bell ── */
export function PercentileBellDiagram() {
  const bPath =
    "M 10,115 Q 30,115 50,100 Q 70,85 90,50 Q 110,15 130,50 Q 150,85 170,100 Q 190,115 210,115";
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <defs>
        <clipPath id="bellClip">
          <path d={bPath} />
        </clipPath>
        <linearGradient id="p95grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={G.green} stopOpacity="0.3" />
          <stop offset="100%" stopColor={G.yellow} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d={bPath}
        fill="rgba(88,204,2,0.1)"
        stroke={G.green}
        strokeWidth="2"
      />
      {/* Vertical markers */}
      {[
        { x: 100, label: "p50", val: "200ms", color: G.green },
        { x: 155, label: "p95", val: "800ms", color: G.yellow },
        { x: 185, label: "p99", val: "2s", color: G.red },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <motion.line
            x1={x}
            y1="115"
            x2={x}
            y2="20"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ y1: 115, y2: 115 }}
            animate={{ y2: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <rect
            x={x - 14}
            y="5"
            width="28"
            height="14"
            rx="7"
            fill={`${color}30`}
          />
          <text
            x={x}
            y="15"
            textAnchor="middle"
            fontSize="8"
            fill={color}
            fontWeight="800"
          >
            {label}
          </text>
          <text x={x} y="130" textAnchor="middle" fontSize="7.5" fill={color}>
            {val}
          </text>
        </g>
      ))}
      <text x="110" y="108" textAnchor="middle" fontSize="7" {...G.muted}>
        Response time distribution
      </text>
    </svg>
  );
}

/* ── Error Traffic Light ── */
export function ErrorTrafficDiagram() {
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Error Rate Thresholds
      </text>
      <rect
        x="80"
        y="24"
        width="60"
        height="116"
        rx="14"
        fill="#111827"
        stroke="#374151"
        strokeWidth="2"
      />
      {[
        {
          cy: 58,
          color: G.red,
          label: ">1%",
          status: "Critical",
          active: false,
        },
        {
          cy: 92,
          color: G.yellow,
          label: "0.5%",
          status: "Warning",
          active: false,
        },
        { cy: 126, color: G.green, label: "<0.1%", status: "OK", active: true },
      ].map(({ cy, color, label, status, active }) => (
        <g key={status}>
          <motion.circle
            cx="110"
            cy={cy}
            r="18"
            fill={color}
            animate={active ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.15 }}
            transition={active ? { duration: 1.2, repeat: Infinity } : {}}
          />
          <text x="148" y={cy - 4} fontSize="9" fill={color} fontWeight="700">
            {label}
          </text>
          <text x="148" y={cy + 8} fontSize="8" {...G.muted}>
            {status}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Waterfall Bars (TTFB) ── */
export function WaterfallBarsDiagram() {
  const rows = [
    { label: "DNS Lookup", ms: 18, color: "#a78bfa", width: 22 },
    { label: "TCP Connect", ms: 42, color: G.blue, width: 52 },
    { label: "TTFB", ms: 185, color: G.orange, width: 130, highlight: true },
    { label: "Download", ms: 320, color: G.green, width: 90 },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        HTTP Request Waterfall
      </text>
      {rows.map(({ label, ms, color, width, highlight }, i) => (
        <g key={label} transform={`translate(0,${22 + i * 30})`}>
          <text x="66" y="20" textAnchor="end" fontSize="8" {...G.muted}>
            {label}
          </text>
          <rect x="70" y="8" width="142" height="16" rx="3" fill="#1a2535" />
          <motion.rect
            x="70"
            y="8"
            width={0}
            height="16"
            rx="3"
            fill={color}
            opacity={highlight ? 1 : 0.7}
            animate={{ width: width }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
          />
          {highlight && (
            <motion.rect
              x="70"
              y="8"
              width={width}
              height="16"
              rx="3"
              fill="none"
              stroke={color}
              strokeWidth="2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <motion.text
            x={70 + width + 4}
            y="20"
            fontSize="8"
            fill={color}
            fontWeight={highlight ? "800" : "600"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.5 }}
          >
            {ms}ms{highlight ? " ← TTFB" : ""}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

/* ── Metrics Dashboard ── */
export function MetricsDashDiagram() {
  const metrics = [
    { label: "Throughput", val: "248 req/s", color: G.green, icon: "📊" },
    { label: "Latency", val: "42ms", color: G.blue, icon: "⚡" },
    { label: "Apdex", val: "0.94", color: G.yellow, icon: "😊" },
    { label: "Concurrency", val: "1,200", color: G.orange, icon: "👥" },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Live Metrics Dashboard
      </text>
      {metrics.map(({ label, val, color, icon }, i) => {
        const x = (i % 2) * 106 + 6;
        const y = Math.floor(i / 2) * 60 + 22;
        return (
          <motion.g
            key={label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <rect
              x={x}
              y={y}
              width="100"
              height="50"
              rx="10"
              fill="rgba(255,255,255,0.04)"
              stroke={color}
              strokeWidth="1.2"
            />
            <text x={x + 10} y={y + 20} fontSize="14">
              {icon}
            </text>
            <text
              x={x + 30}
              y={y + 20}
              fontSize="11"
              fill="white"
              fontWeight="900"
            >
              {val}
            </text>
            <text
              x={x + 10}
              y={y + 38}
              fontSize="8"
              fill={color}
              fontWeight="600"
            >
              {label}
            </text>
            <motion.rect
              x={x}
              y={y}
              width="100"
              height="50"
              rx="10"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Bottleneck CPU ── */
export function BottleneckCPUDiagram() {
  const components = [
    { label: "CPU", icon: "🔥", pct: 100, color: G.red, glow: true },
    { label: "Memory", icon: "💾", pct: 45, color: G.green },
    { label: "Network", icon: "🌐", pct: 38, color: G.green },
    { label: "Database", icon: "🗃️", pct: 62, color: G.yellow },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Bottleneck Identification
      </text>
      {components.map(({ label, icon, pct, color, glow }, i) => {
        const y = 22 + i * 30;
        return (
          <g key={label} transform={`translate(0,${y})`}>
            <text x="12" y="17" fontSize="13">
              {icon}
            </text>
            <text x="30" y="17" fontSize="9" fill={color} fontWeight="700">
              {label}
            </text>
            <rect x="70" y="5" width="118" height="16" rx="8" fill="#1a2535" />
            <motion.rect
              x="70"
              y="5"
              width={0}
              height="16"
              rx="8"
              fill={color}
              animate={{ width: (pct / 100) * 118 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            />
            {glow && (
              <motion.rect
                x="70"
                y="5"
                width={(pct / 100) * 118}
                height="16"
                rx="8"
                fill="none"
                stroke={G.red}
                strokeWidth="2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
            <motion.text
              x="195"
              y="17"
              fontSize="8"
              fill={color}
              fontWeight="800"
              animate={glow ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
              transition={glow ? { duration: 0.8, repeat: Infinity } : {}}
            >
              {pct}%{glow ? " 🚨" : ""}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── SLA Circles ── */
export function SLACirclesDiagram() {
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        SLA / SLO / SLI Relationship
      </text>
      {[
        {
          r: 58,
          color: G.red,
          label: "SLA",
          sub: "Customer Contract",
          delay: 0,
        },
        {
          r: 40,
          color: G.yellow,
          label: "SLO",
          sub: "Internal Target",
          delay: 0.2,
        },
        {
          r: 22,
          color: G.green,
          label: "SLI",
          sub: "Actual Metric",
          delay: 0.4,
        },
      ].map(({ r, color, label, sub, delay }) => (
        <motion.g
          key={label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay, type: "spring" }}
        >
          <circle
            cx="110"
            cy="82"
            r={r}
            fill={`${color}10`}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray={r === 22 ? "0" : "5 3"}
          />
          <motion.circle
            cx="110"
            cy="82"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="1"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5 + delay, repeat: Infinity }}
          />
          <text
            x={110 + r - 4}
            y="79"
            fontSize="8"
            fill={color}
            fontWeight="800"
          >
            {label}
          </text>
          <text x={110 + r - 4} y="90" fontSize="7" {...G.muted}>
            {sub}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ── Apdex Gauge ── */
export function ApdexGaugeDiagram() {
  const cx = 110;
  const cy = 100;
  const r = 66;
  const zones = [
    { start: 210, end: 258, color: G.red, label: "Critical" },
    { start: 258, end: 282, color: G.orange, label: "Poor" },
    { start: 282, end: 306, color: G.yellow, label: "Fair" },
    { start: 306, end: 330, color: G.green, label: "Good" },
  ];
  return (
    <svg viewBox="0 0 220 140" className="w-full h-full">
      <path
        d={arcD(cx, cy, r, 210, 330)}
        fill="none"
        stroke="#1a2535"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {zones.map(({ start, end, color }) => (
        <path
          key={start}
          d={arcD(cx, cy, r, start, end)}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="butt"
          opacity="0.85"
        />
      ))}
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={{ rotate: [0, 38, 80, 38, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.55, 0.75, 1],
        }}
      >
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 8}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" />
      </motion.g>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="8" {...G.muted}>
        Apdex Score
      </text>
      <motion.text
        x={cx}
        y={cy + 34}
        textAnchor="middle"
        fontSize="22"
        fill={G.green}
        fontWeight="900"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        0.94
      </motion.text>
    </svg>
  );
}

/* ── Cycle Steps (Analysis) ── */
export function CycleStepsDiagram() {
  const steps = [
    { label: "Baseline", angle: -90, color: G.blue },
    { label: "Measure", angle: -30, color: G.green },
    { label: "Identify", angle: 30, color: G.yellow },
    { label: "Bottleneck", angle: 90, color: G.orange },
    { label: "Optimize", angle: 150, color: G.red },
    { label: "Re-test", angle: -150, color: G.blue },
  ];
  const cx = 110;
  const cy = 74;
  const R = 52;
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x={cx}
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Analysis Cycle
      </text>
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={G.green}
        strokeWidth="1.5"
        strokeDasharray="10 316"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {steps.map(({ label, angle, color }, i) => {
        const rad = (angle * Math.PI) / 180;
        const nx = cx + R * Math.cos(rad);
        const ny = cy + R * Math.sin(rad);
        return (
          <motion.g
            key={label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <circle
              cx={nx}
              cy={ny}
              r="13"
              fill={`${color}20`}
              stroke={color}
              strokeWidth="1.5"
            />
            <text
              x={nx}
              y={ny + 4}
              textAnchor="middle"
              fontSize="6.5"
              fill={color}
              fontWeight="700"
            >
              {label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── APM Stack ── */
export function APMStackDiagram() {
  const tools = [
    { name: "New Relic", color: G.green, icon: "🟢" },
    { name: "Datadog", color: "#9B59B6", icon: "🐶" },
    { name: "Dynatrace", color: G.blue, icon: "🔷" },
    { name: "Prometheus", color: G.orange, icon: "🔥" },
  ];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        APM Tool Ecosystem
      </text>
      <text x="110" y="28" textAnchor="middle" fontSize="8" {...G.muted}>
        Application Performance Monitoring
      </text>
      {tools.map(({ name, color, icon }, i) => {
        const x = (i % 2) * 106 + 6;
        const y = Math.floor(i / 2) * 52 + 34;
        return (
          <motion.g
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <rect
              x={x}
              y={y}
              width="100"
              height="42"
              rx="10"
              fill="rgba(255,255,255,0.04)"
              stroke={color}
              strokeWidth="1.5"
            />
            <text x={x + 12} y={y + 22} fontSize="16">
              {icon}
            </text>
            <text
              x={x + 34}
              y={y + 20}
              fontSize="9.5"
              fill="white"
              fontWeight="800"
            >
              {name}
            </text>
            <text x={x + 12} y={y + 36} fontSize="7" fill={color}>
              Full observability
            </text>
            <motion.rect
              x={x}
              y={y}
              width="100"
              height="42"
              rx="10"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Variance Distribution ── */
export function VarianceDistDiagram() {
  const heights = [6, 14, 28, 50, 80, 90, 78, 50, 28, 14, 8, 4, 6, 18, 40, 22];
  return (
    <svg viewBox="0 0 220 148" className="w-full h-full">
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontSize="9"
        fill="white"
        fontWeight="700"
      >
        Response Time Distribution
      </text>
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="112"
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      <line
        x1="12"
        y1="112"
        x2="212"
        y2="112"
        stroke="#1e3a4a"
        strokeWidth="1.5"
      />
      {heights.map((h, i) => {
        const x = 14 + i * 12.4;
        const color = i < 9 ? G.green : i < 13 ? G.yellow : G.red;
        return (
          <motion.rect
            key={i}
            x={x}
            y={112}
            width="10"
            height={0}
            animate={{ y: 112 - h, height: h }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            fill={color}
            rx="2"
            opacity="0.85"
          />
        );
      })}
      {[
        { x: 66, label: "p50\n200ms", color: G.green },
        { x: 132, label: "p95\n2s", color: G.yellow },
        { x: 186, label: "p99\n8s", color: G.red },
      ].map(({ x, label, color }) => (
        <g key={label}>
          <motion.line
            x1={x}
            y1="112"
            x2={x}
            y2="16"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ y2: 112 }}
            animate={{ y2: 16 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <rect
            x={x - 14}
            y="118"
            width="28"
            height="24"
            rx="4"
            fill={`${color}20`}
          />
          <text
            x={x}
            y="127"
            textAnchor="middle"
            fontSize="7"
            fill={color}
            fontWeight="700"
          >
            {label.split("\n")[0]}
          </text>
          <text x={x} y="137" textAnchor="middle" fontSize="7" fill={color}>
            {label.split("\n")[1]}
          </text>
        </g>
      ))}
    </svg>
  );
}
