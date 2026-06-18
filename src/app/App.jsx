import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Flame,
  Heart,
  Star,
  Lock,
  CheckCircle2,
  X,
  ArrowLeft,
  Trophy,
  Zap,
  BarChart2,
  Wrench,
  BookOpen,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Course Data ──────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: "basics",
    title: "Performance Testing Basics",
    emoji: "🚀",
    color: "#58CC02",
    shadow: "rgba(88,204,2,0.5)",
    description:
      "Master the fundamentals: what performance testing is, why it matters, and the core test types every engineer must know.",
    lessons: [
      {
        id: "b1",
        title: "What is Performance Testing?",
        emoji: "🔍",
        xp: 10,
        diagram: "speedometer",
        content: {
          kind: "mcq",
          question:
            "Performance testing evaluates how a system behaves under a specific workload. What is its PRIMARY goal?",
          options: [
            "Find functional bugs in the code",
            "Measure speed, stability, and scalability",
            "Verify database schemas are correct",
            "Test only user interface responsiveness",
          ],
          correct: 1,
          explanation:
            "Performance testing measures speed, stability, and scalability under load — not functional correctness.",
        },
      },
      {
        id: "b2",
        title: "Load Testing",
        emoji: "⚖️",
        xp: 10,
        diagram: "load-ramp",
        content: {
          kind: "true-false",
          statement:
            "Load testing simulates the expected number of concurrent users to verify the system can handle normal traffic conditions.",
          correct: true,
          explanation:
            "Correct! Load testing validates that the system performs well under expected peak traffic — it answers 'can we handle our daily users?'",
        },
      },
      {
        id: "b3",
        title: "Stress Testing",
        emoji: "💥",
        xp: 15,
        diagram: "stress-break",
        content: {
          kind: "mcq",
          question:
            "Stress testing pushes a system BEYOND its normal operational capacity. What is its main goal?",
          options: [
            "Find the breaking point and observe failure behavior",
            "Measure average response times under normal load",
            "Simulate expected daily traffic patterns",
            "Validate database query performance",
          ],
          correct: 0,
          explanation:
            "Stress testing intentionally overloads the system to find its breaking point — and see whether it fails gracefully or catastrophically.",
        },
      },
      {
        id: "b4",
        title: "Match the Test Types",
        emoji: "🎯",
        xp: 20,
        diagram: "test-types-cards",
        content: {
          kind: "drag-match",
          instruction:
            "Match each performance test type to its correct definition.",
          pairs: [
            {
              term: "Spike Testing",
              def: "Sudden surge of load, then rapid drop",
            },
            { term: "Soak Testing", def: "Extended duration at normal load" },
            { term: "Volume Testing", def: "Large data amounts in the system" },
            {
              term: "Scalability Testing",
              def: "System grows to meet increasing load",
            },
          ],
        },
      },
      {
        id: "b5",
        title: "Response Time Standards",
        emoji: "⏱️",
        xp: 10,
        diagram: "time-compare",
        content: {
          kind: "true-false",
          statement:
            "A response time of 5 seconds is generally acceptable for most modern web applications according to industry benchmarks.",
          correct: false,
          explanation:
            "Industry benchmarks target under 2 seconds. Google shows 53% of mobile users abandon pages taking over 3 seconds to load.",
        },
      },
      {
        id: "b6",
        title: "Throughput Defined",
        emoji: "📊",
        xp: 10,
        diagram: "flow-pipe",
        content: {
          kind: "mcq",
          question: "Throughput in performance testing is best described as...",
          options: [
            "Time to receive the first byte from the server",
            "Number of requests processed per unit of time",
            "Maximum number of database connections",
            "CPU usage percentage during a test",
          ],
          correct: 1,
          explanation:
            "Throughput = requests per second. It tells you how many operations the system processes in a given timeframe.",
        },
      },
      {
        id: "b7",
        title: "The Testing Process",
        emoji: "🔧",
        xp: 20,
        diagram: "process-steps",
        content: {
          kind: "word-order",
          prompt:
            "Arrange the performance testing process steps in the correct order:",
          words: ["Execute", "Plan", "Analyze", "Design", "Results", "Test"],
          answer: ["Plan", "Design", "Test", "Execute", "Analyze", "Results"],
        },
      },
      {
        id: "b8",
        title: "Latency vs Response Time",
        emoji: "🌐",
        xp: 15,
        diagram: "latency-arrows",
        content: {
          kind: "mcq",
          question:
            "What is the key difference between LATENCY and RESPONSE TIME?",
          options: [
            "They are exactly the same metric with different names",
            "Latency is network delay only; response time includes processing",
            "Response time measures only server processing, not network",
            "Latency includes all database query time",
          ],
          correct: 1,
          explanation:
            "Latency = network round-trip delay. Response time = total time from request to full response, including server processing + latency.",
        },
      },
      {
        id: "b9",
        title: "Soak Testing Purpose",
        emoji: "⚡",
        xp: 10,
        diagram: "soak-line",
        content: {
          kind: "true-false",
          statement:
            "Soak testing (endurance testing) is specifically designed to detect memory leaks and resource degradation over long periods of time.",
          correct: true,
          explanation:
            "Soak tests run for hours or days at normal load to surface slow resource leaks, connection pool exhaustion, and gradual performance degradation.",
        },
      },
      {
        id: "b10",
        title: "Business Impact",
        emoji: "🏆",
        xp: 25,
        diagram: "business-bars",
        content: {
          kind: "drag-match",
          instruction:
            "Match each performance problem to its real business impact.",
          pairs: [
            { term: "Slow response times", def: "High user abandonment rates" },
            {
              term: "System crashes under load",
              def: "Revenue loss and brand damage",
            },
            { term: "Memory leaks", def: "Gradual performance degradation" },
            { term: "Poor scalability", def: "Cannot support business growth" },
          ],
        },
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    emoji: "🛠️",
    color: "#1CB0F6",
    shadow: "rgba(28,176,246,0.5)",
    description:
      "Explore JMeter, k6, Gatling, Locust and other industry-standard performance testing frameworks.",
    lessons: [
      {
        id: "t1",
        title: "Apache JMeter",
        emoji: "☕",
        xp: 10,
        diagram: "jmeter-tree",
        content: {
          kind: "mcq",
          question:
            "Apache JMeter is an open-source tool primarily designed for...",
          options: [
            "Unit testing Java applications",
            "Load and performance testing web apps",
            "Automated UI/browser testing",
            "Static code analysis and linting",
          ],
          correct: 1,
          explanation:
            "JMeter is Apache's open-source load testing tool built for measuring performance of web apps, REST APIs, databases, and more.",
        },
      },
      {
        id: "t2",
        title: "k6 Framework",
        emoji: "🎯",
        xp: 10,
        diagram: "k6-terminal",
        content: {
          kind: "true-false",
          statement:
            "k6 by Grafana is a developer-centric load testing tool where test scripts are written in JavaScript.",
          correct: true,
          explanation:
            "k6 uses JavaScript/TypeScript for test scripts, making it popular with developers who prefer code-first, version-controllable tests.",
        },
      },
      {
        id: "t3",
        title: "Gatling Overview",
        emoji: "🦁",
        xp: 15,
        diagram: "gatling-surge",
        content: {
          kind: "mcq",
          question: "Gatling is a performance testing tool known for its...",
          options: [
            "Drag-and-drop GUI for test creation",
            "High performance and Scala-based DSL",
            "Only supporting REST API testing",
            "Built-in AI test generation",
          ],
          correct: 1,
          explanation:
            "Gatling uses a Scala-based DSL and is known for handling massive concurrent users with minimal system resources.",
        },
      },
      {
        id: "t4",
        title: "Tool Characteristics",
        emoji: "⚔️",
        xp: 20,
        diagram: "tool-radar",
        content: {
          kind: "drag-match",
          instruction: "Match each tool to its defining characteristic.",
          pairs: [
            { term: "JMeter", def: "GUI-based, Java, Apache project" },
            { term: "k6", def: "JavaScript scripts, developer-first" },
            { term: "Locust", def: "Python scripts, web dashboard" },
            { term: "Gatling", def: "Scala DSL, high-concurrency simulation" },
          ],
        },
      },
      {
        id: "t5",
        title: "JMeter Thread Groups",
        emoji: "👥",
        xp: 10,
        diagram: "users-spawn",
        content: {
          kind: "true-false",
          statement:
            "In JMeter, Thread Groups represent virtual users who simulate real user behavior during load tests.",
          correct: true,
          explanation:
            "JMeter Thread Groups define the number of virtual users (threads), ramp-up period, and how long the test runs.",
        },
      },
      {
        id: "t6",
        title: "JMeter Hierarchy",
        emoji: "📋",
        xp: 15,
        diagram: "hierarchy-build",
        content: {
          kind: "mcq",
          question:
            "In a JMeter Test Plan, what is the correct hierarchy of elements?",
          options: [
            "Sampler → Thread Group → Test Plan",
            "Test Plan → Thread Group → Sampler",
            "Thread Group → Test Plan → Sampler",
            "Test Plan → Sampler → Thread Group",
          ],
          correct: 1,
          explanation:
            "JMeter hierarchy: Test Plan (root) → Thread Group (virtual users) → Samplers (requests). Listeners attach at Thread Group level.",
        },
      },
      {
        id: "t7",
        title: "CI/CD Integration",
        emoji: "🔄",
        xp: 20,
        diagram: "pipeline-flow",
        content: {
          kind: "word-order",
          prompt:
            "Arrange the CI/CD performance testing pipeline steps in the correct order:",
          words: [
            "Alert",
            "Code",
            "Run",
            "Commit",
            "Tests",
            "Compare",
            "Baselines",
          ],
          answer: [
            "Commit",
            "Code",
            "Run",
            "Tests",
            "Compare",
            "Baselines",
            "Alert",
          ],
        },
      },
      {
        id: "t8",
        title: "Distributed Testing",
        emoji: "🌍",
        xp: 15,
        diagram: "distributed-nodes",
        content: {
          kind: "mcq",
          question:
            "Why is distributed load testing necessary for large-scale performance tests?",
          options: [
            "A single machine cannot generate enough network traffic",
            "It is faster to write distributed test scripts",
            "Distributed tests automatically find more bugs",
            "Cloud providers require distributed testing by default",
          ],
          correct: 0,
          explanation:
            "A single machine has limited CPU, memory, and network I/O. Distributed testing spreads load generation across many nodes to simulate millions of real users.",
        },
      },
      {
        id: "t9",
        title: "Locust Features",
        emoji: "🦗",
        xp: 10,
        diagram: "locust-dash",
        content: {
          kind: "true-false",
          statement:
            "Locust allows you to define test scenarios in Python and provides a real-time web UI to monitor running tests.",
          correct: true,
          explanation:
            "Locust is Python-based with a built-in live web dashboard showing metrics like requests/sec, failure count, and response time distribution.",
        },
      },
      {
        id: "t10",
        title: "Choose the Right Tool",
        emoji: "🏅",
        xp: 25,
        diagram: "decision-flow",
        content: {
          kind: "drag-match",
          instruction:
            "Match the use case to the most appropriate tool choice.",
          pairs: [
            { term: "Python-first team", def: "Locust" },
            { term: "Non-developers need GUI", def: "JMeter" },
            { term: "JS/Node.js CI pipeline", def: "k6" },
            { term: "Maximum concurrency at scale", def: "Gatling" },
          ],
        },
      },
    ],
  },
  {
    id: "metrics",
    title: "Metrics & Analysis",
    emoji: "📈",
    color: "#FF9600",
    shadow: "rgba(255,150,0,0.5)",
    description:
      "Master key performance metrics, SLAs, percentiles, bottleneck identification, and how to interpret test results like a pro.",
    lessons: [
      {
        id: "m1",
        title: "Response Time Percentiles",
        emoji: "📉",
        xp: 10,
        diagram: "percentile-bell",
        content: {
          kind: "mcq",
          question:
            "A p95 response time of 800ms means what about system performance?",
          options: [
            "95% of requests fail within 800ms",
            "95% of requests complete within 800ms",
            "The average response time is 800ms",
            "800ms is the maximum possible response time",
          ],
          correct: 1,
          explanation:
            "p95 = 95th percentile. 95% of all requests complete within 800ms. The remaining 5% take longer. p95 is a key SLA metric.",
        },
      },
      {
        id: "m2",
        title: "Acceptable Error Rates",
        emoji: "❌",
        xp: 10,
        diagram: "error-traffic",
        content: {
          kind: "true-false",
          statement:
            "An error rate of 0.1% is generally considered acceptable for most high-availability production web applications.",
          correct: true,
          explanation:
            "Most SLAs target error rates below 0.1%–1%. Higher error rates indicate system instability under load and require investigation.",
        },
      },
      {
        id: "m3",
        title: "TTFB Explained",
        emoji: "⏱️",
        xp: 15,
        diagram: "waterfall-bars",
        content: {
          kind: "mcq",
          question: "TTFB (Time To First Byte) specifically measures...",
          options: [
            "Total page load time including all assets",
            "Time from request sent to first byte received from server",
            "Time for JavaScript to finish executing",
            "Time to complete the TCP three-way handshake",
          ],
          correct: 1,
          explanation:
            "TTFB measures server responsiveness — from when the browser sends the request to when it receives the very first byte of the server's response.",
        },
      },
      {
        id: "m4",
        title: "Metric Definitions",
        emoji: "🎯",
        xp: 20,
        diagram: "metrics-dash",
        content: {
          kind: "drag-match",
          instruction: "Match each performance metric to what it measures.",
          pairs: [
            { term: "Throughput", def: "Requests processed per second" },
            { term: "Latency", def: "Network round-trip delay" },
            { term: "Apdex Score", def: "User satisfaction index (0–1)" },
            { term: "Concurrency", def: "Simultaneous active users" },
          ],
        },
      },
      {
        id: "m5",
        title: "Identifying Bottlenecks",
        emoji: "🔎",
        xp: 15,
        diagram: "bottleneck-cpu",
        content: {
          kind: "mcq",
          question:
            "During a load test, CPU hits 100% but memory and network are normal. The bottleneck is most likely...",
          options: [
            "Inefficient database queries",
            "Network bandwidth limitation",
            "CPU-bound application code",
            "Memory leaks in the application",
          ],
          correct: 2,
          explanation:
            "If CPU maxes out first while other resources are fine, the application has CPU-bound operations — inefficient algorithms or poor threading.",
        },
      },
      {
        id: "m6",
        title: "SLA vs SLO",
        emoji: "📄",
        xp: 10,
        diagram: "sla-circles",
        content: {
          kind: "true-false",
          statement:
            "An SLA (Service Level Agreement) is a formal customer contract, while an SLO (Service Level Objective) is an internal performance target.",
          correct: true,
          explanation:
            "SLAs are external, legally binding commitments to customers. SLOs are internal targets that help teams stay within SLA bounds.",
        },
      },
      {
        id: "m7",
        title: "Apdex Score",
        emoji: "😊",
        xp: 15,
        diagram: "apdex-gauge",
        content: {
          kind: "mcq",
          question: "An Apdex score of 1.0 means what about user experience?",
          options: [
            "50% of users are satisfied with response times",
            "All users are satisfied — everyone got fast responses",
            "The system is perfectly optimized for performance",
            "100 requests per second throughput achieved",
          ],
          correct: 1,
          explanation:
            "Apdex (Application Performance Index) ranges 0–1. Score of 1.0 = all users satisfied. Below 0.7 signals a poor experience.",
        },
      },
      {
        id: "m8",
        title: "Analysis Workflow",
        emoji: "🔬",
        xp: 20,
        diagram: "cycle-steps",
        content: {
          kind: "word-order",
          prompt:
            "Arrange the performance bottleneck analysis steps in the correct order:",
          words: [
            "Identify",
            "Baseline",
            "Measure",
            "Optimize",
            "Bottleneck",
            "Re-test",
          ],
          answer: [
            "Baseline",
            "Measure",
            "Identify",
            "Bottleneck",
            "Optimize",
            "Re-test",
          ],
        },
      },
      {
        id: "m9",
        title: "APM Tool Vendors",
        emoji: "🛰️",
        xp: 15,
        diagram: "apm-stack",
        content: {
          kind: "drag-match",
          instruction: "Match each APM tool to its correct vendor description.",
          pairs: [
            { term: "New Relic", def: "Full-stack observability platform" },
            { term: "Datadog", def: "Monitoring, security, and analytics" },
            { term: "Dynatrace", def: "AI-powered observability (Davis AI)" },
            { term: "Prometheus", def: "CNCF open-source metrics & alerting" },
          ],
        },
      },
      {
        id: "m10",
        title: "Final Assessment",
        emoji: "🏅",
        xp: 30,
        diagram: "variance-dist",
        content: {
          kind: "mcq",
          question:
            "A system shows p50=200ms, p95=2,000ms, p99=8,000ms. What does this large gap indicate?",
          options: [
            "System performance is consistently fast for all users",
            "High variance — most users are fast but some hit very slow responses",
            "The system needs more servers added immediately",
            "All metrics are within industry-acceptable ranges",
          ],
          correct: 1,
          explanation:
            "A large gap between p50 and p95/p99 reveals high variance. While 50% of users are fast, 5% wait 2+ seconds and 1% wait 8+ seconds — intermittent slowdowns.",
        },
      },
    ],
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cn(...cs) {
  return cs.filter(Boolean).join(" ");
}

function polarXY(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcD(cx, cy, r, start, end) {
  const s = polarXY(cx, cy, r, start);
  const e = polarXY(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

// ─── CONCEPT DIAGRAMS ─────────────────────────────────────────────────────────

const G = {
  // shared style shortcuts
  text: { fill: "#e2e8f0", fontFamily: "Nunito,sans-serif" },
  muted: { fill: "#7a9bb5" },
  green: "#58CC02",
  blue: "#1CB0F6",
  yellow: "#FFD900",
  red: "#ff4b4b",
  orange: "#FF9600",
};

/* ── Speedometer ── */
function SpeedometerDiagram() {
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
function LoadRampDiagram() {
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
        const p = polarXY(0, 0, 0, 0);
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
function StressBreakDiagram() {
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
function TestTypesCardsDiagram() {
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
function TimeCompareDiagram() {
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
        width="0"
        height="18"
        rx="9"
        fill={G.green}
        animate={{ width: 72 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <text x="20" y="29" fontSize="8" fill={G.green} fontWeight="700">
        ✓ 2s — Industry Target
      </text>
      <text x="97" y="49" fontSize="8" fill="white" fontWeight="700">
        2s
      </text>

      {/* 5s bar */}
      <rect x="20" y="72" width="180" height="18" rx="9" fill="#1a2a3a" />
      <motion.rect
        x="20"
        y="72"
        width="0"
        height="18"
        rx="9"
        fill={G.red}
        animate={{ width: 180 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
      <text x="20" y="66" fontSize="8" fill={G.red} fontWeight="700">
        ✗ 5s — Users Abandon
      </text>
      <text x="205" y="86" fontSize="8" fill="white" fontWeight="700">
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
function FlowPipeDiagram() {
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
function ProcessStepsDiagram() {
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
function LatencyArrowsDiagram() {
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
            width={w}
            height={12}
            rx="3"
            fill={color}
            opacity="0.7"
            initial={{ width: 0 }}
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
function SoakLineDiagram() {
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
function BusinessBarsDiagram() {
  const bars = [
    { label: "Abandonment", value: 92, color: G.red },
    { label: "Revenue Loss", value: 76, color: G.orange },
    { label: "Degradation", value: 55, color: G.yellow },
    { label: "Can't Scale", value: 88, color: G.red },
  ];
  const bh = 18;
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
function JMeterTreeDiagram() {
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
function K6TerminalDiagram() {
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
function GatlingSurgeDiagram() {
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
function ToolRadarDiagram() {
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
function UsersSpawnDiagram() {
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
function HierarchyBuildDiagram() {
  return <JMeterTreeDiagram />;
}

/* ── Pipeline Flow ── */
function PipelineFlowDiagram() {
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
function DistributedNodesDiagram() {
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
function LocustDashDiagram() {
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
function DecisionFlowDiagram() {
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
function PercentileBellDiagram() {
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
function ErrorTrafficDiagram() {
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
function WaterfallBarsDiagram() {
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
function MetricsDashDiagram() {
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
function BottleneckCPUDiagram() {
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
function SLACirclesDiagram() {
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
function ApdexGaugeDiagram() {
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
function CycleStepsDiagram() {
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
function APMStackDiagram() {
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
function VarianceDistDiagram() {
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

/* ── Concept Diagram Dispatcher ── */
const DIAGRAM_MAP = {
  speedometer: SpeedometerDiagram,
  "load-ramp": LoadRampDiagram,
  "stress-break": StressBreakDiagram,
  "test-types-cards": TestTypesCardsDiagram,
  "time-compare": TimeCompareDiagram,
  "flow-pipe": FlowPipeDiagram,
  "process-steps": ProcessStepsDiagram,
  "latency-arrows": LatencyArrowsDiagram,
  "soak-line": SoakLineDiagram,
  "business-bars": BusinessBarsDiagram,
  "jmeter-tree": JMeterTreeDiagram,
  "k6-terminal": K6TerminalDiagram,
  "gatling-surge": GatlingSurgeDiagram,
  "tool-radar": ToolRadarDiagram,
  "users-spawn": UsersSpawnDiagram,
  "hierarchy-build": HierarchyBuildDiagram,
  "pipeline-flow": PipelineFlowDiagram,
  "distributed-nodes": DistributedNodesDiagram,
  "locust-dash": LocustDashDiagram,
  "decision-flow": DecisionFlowDiagram,
  "percentile-bell": PercentileBellDiagram,
  "error-traffic": ErrorTrafficDiagram,
  "waterfall-bars": WaterfallBarsDiagram,
  "metrics-dash": MetricsDashDiagram,
  "bottleneck-cpu": BottleneckCPUDiagram,
  "sla-circles": SLACirclesDiagram,
  "apdex-gauge": ApdexGaugeDiagram,
  "cycle-steps": CycleStepsDiagram,
  "apm-stack": APMStackDiagram,
  "variance-dist": VarianceDistDiagram,
};

function ConceptDiagram({ id }) {
  const D = DIAGRAM_MAP[id];
  if (!D)
    return (
      <div className="text-muted-foreground text-xs text-center">
        No diagram
      </div>
    );
  return <D />;
}

// ─── Interactive Lesson Components ───────────────────────────────────────────

function MCQLesson({ content, onReady, checked }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    setSel(null);
  }, [content]);
  function pick(i) {
    if (checked) return;
    setSel(i);
    onReady(i === content.correct);
  }
  const stateCls = (i) => {
    if (!checked)
      return sel === i
        ? "border-[#58CC02] bg-[#58CC02]/15"
        : "border-white/10 bg-white/[0.04] hover:border-[#58CC02]/50 hover:bg-[#58CC02]/08";
    if (i === content.correct) return "border-[#58CC02] bg-[#58CC02]/20";
    if (i === sel) return "border-[#ff4b4b] bg-[#ff4b4b]/20";
    return "border-white/05 bg-white/[0.02] opacity-50";
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-bold text-foreground leading-snug">
        {content.question}
      </p>
      <div className="grid grid-cols-1 gap-2.5 mt-1">
        {content.options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => pick(i)}
            whileTap={!checked ? { scale: 0.98 } : {}}
            className={cn(
              "w-full text-left px-4 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-150 cursor-pointer backdrop-blur-sm",
              stateCls(i),
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0",
                  !checked && sel === i
                    ? "border-[#58CC02] text-[#58CC02]"
                    : checked && i === content.correct
                      ? "border-[#58CC02] text-[#58CC02]"
                      : checked && i === sel
                        ? "border-[#ff4b4b] text-[#ff4b4b]"
                        : "border-white/20 text-white/40",
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-foreground">{opt}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TrueFalseLesson({ content, onReady, checked }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    setSel(null);
  }, [content]);
  function pick(v) {
    if (checked) return;
    setSel(v);
    onReady(v === content.correct);
  }
  const cls = (v) => {
    if (!checked)
      return sel === v
        ? "border-[#58CC02] bg-[#58CC02]/15"
        : "border-white/10 bg-white/[0.04] hover:border-[#58CC02]/40";
    if (v === content.correct) return "border-[#58CC02] bg-[#58CC02]/20";
    if (v === sel) return "border-[#ff4b4b] bg-[#ff4b4b]/20";
    return "border-white/05 opacity-40";
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-2xl border border-white/08 bg-white/[0.03] backdrop-blur-sm">
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          {content.statement}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => (
          <motion.button
            key={String(v)}
            onClick={() => pick(v)}
            whileTap={!checked ? { scale: 0.96 } : {}}
            className={cn(
              "py-5 rounded-2xl border-2 font-black text-lg transition-all duration-150 cursor-pointer backdrop-blur-sm",
              cls(v),
            )}
          >
            {v ? "✅ True" : "❌ False"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function DragMatchLesson({ content, onReady }) {
  const [terms] = useState(() => shuffle(content.pairs.map((p) => p.term)));
  const [defs] = useState(() => shuffle(content.pairs.map((p) => p.def)));
  const [selTerm, setSelTerm] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongDef, setWrongDef] = useState(null);
  const correct = Object.fromEntries(content.pairs.map((p) => [p.term, p.def]));

  function clickTerm(t) {
    if (t in matched) return;
    setSelTerm((s) => (s === t ? null : t));
  }
  function clickDef(d) {
    if (Object.values(matched).includes(d) || !selTerm) return;
    if (correct[selTerm] === d) {
      const m2 = { ...matched, [selTerm]: d };
      setMatched(m2);
      setSelTerm(null);
      if (Object.keys(m2).length === content.pairs.length) onReady(true);
    } else {
      setWrongDef(d);
      setTimeout(() => {
        setWrongDef(null);
        setSelTerm(null);
      }, 700);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
        {content.instruction}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mb-0.5">
            Terms
          </p>
          {terms.map((t) => {
            const m = t in matched;
            const isSel = selTerm === t;
            return (
              <motion.button
                key={t}
                onClick={() => clickTerm(t)}
                whileTap={!m ? { scale: 0.96 } : {}}
                animate={m ? { opacity: 0.5 } : {}}
                className={cn(
                  "px-3 py-2 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer backdrop-blur-sm",
                  m
                    ? "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02]"
                    : isSel
                      ? "border-[#58CC02] bg-[#58CC02]/20 text-foreground shadow-lg"
                      : "border-white/10 bg-white/[0.04] text-foreground hover:border-[#58CC02]/50",
                )}
              >
                {m && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                {t}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mb-0.5">
            Definitions
          </p>
          {defs.map((d) => {
            const m = Object.values(matched).includes(d);
            const isWrong = wrongDef === d;
            return (
              <motion.button
                key={d}
                onClick={() => clickDef(d)}
                animate={isWrong ? { x: [0, -8, 8, -5, 0] } : {}}
                transition={{ duration: 0.35 }}
                className={cn(
                  "px-3 py-2 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer backdrop-blur-sm",
                  m
                    ? "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02]"
                    : isWrong
                      ? "border-[#ff4b4b] bg-[#ff4b4b]/20 text-[#ff4b4b]"
                      : selTerm
                        ? "border-[#1CB0F6]/60 bg-[#1CB0F6]/08 text-foreground hover:border-[#1CB0F6] cursor-pointer"
                        : "border-white/10 bg-white/[0.04] text-foreground cursor-pointer",
                )}
              >
                {m && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                {d}
              </motion.button>
            );
          })}
        </div>
      </div>
      {Object.keys(matched).length < content.pairs.length && (
        <p className="text-[10px] text-muted-foreground text-center">
          {selTerm
            ? `"${selTerm}" selected — tap a definition`
            : "Tap a term to start matching"}
        </p>
      )}
    </div>
  );
}

function WordOrderLesson({ content, onReady, checked }) {
  const [avail, setAvail] = useState(() => shuffle(content.words));
  const [placed, setPlaced] = useState([]);
  useEffect(() => {
    setAvail(shuffle(content.words));
    setPlaced([]);
  }, [content]);

  function place(w) {
    if (checked) return;
    const i = avail.indexOf(w);
    if (i === -1) return;
    const na = [...avail];
    na.splice(i, 1);
    const np = [...placed, w];
    setAvail(na);
    setPlaced(np);
    if (np.length === content.answer.length)
      onReady(np.join("|") === content.answer.join("|"));
  }
  function remove(i) {
    if (checked) return;
    const w = placed[i];
    const np = [...placed];
    np.splice(i, 1);
    setPlaced(np);
    setAvail((a) => [...a, w]);
  }
  const iC = (i) => checked && placed[i] === content.answer[i];
  const iW = (i) => checked && placed[i] !== content.answer[i];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold text-foreground">{content.prompt}</p>
      <div className="min-h-[52px] rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-2.5 flex flex-wrap gap-2 items-center">
        <AnimatePresence>
          {placed.length === 0 && (
            <span className="text-muted-foreground text-xs font-semibold">
              Tap words below to build the sequence…
            </span>
          )}
          {placed.map((w, i) => (
            <motion.button
              key={`${i}-${w}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              onClick={() => remove(i)}
              className={cn(
                "px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors",
                iC(i)
                  ? "border-[#58CC02] bg-[#58CC02]/20 text-[#58CC02]"
                  : iW(i)
                    ? "border-[#ff4b4b] bg-[#ff4b4b]/20 text-[#ff4b4b]"
                    : "border-[#1CB0F6] bg-[#1CB0F6]/15 text-foreground cursor-pointer",
              )}
            >
              {w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {avail.map((w, i) => (
            <motion.button
              key={`${w}-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => place(w)}
              disabled={checked}
              className="px-3 py-1.5 rounded-lg border-2 border-white/12 bg-white/[0.05] text-xs font-bold text-foreground hover:border-[#58CC02]/60 hover:bg-[#58CC02]/08 transition-colors cursor-pointer backdrop-blur-sm disabled:opacity-40"
            >
              {w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function ProgressBar({ value, color = "#58CC02" }) {
  return (
    <div
      className="h-2.5 w-full rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

function HeartsDisplay({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Heart
          key={i}
          className={cn(
            "w-4 h-4",
            i < count
              ? "fill-[#ff4b4b] text-[#ff4b4b]"
              : "text-white/10 fill-white/10",
          )}
        />
      ))}
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(88,204,2,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(28,176,246,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 w-[500px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
}

// ─── Trail ────────────────────────────────────────────────────────────────────

const TRAIL = [
  { x: 140, y: 70 },
  { x: 200, y: 160 },
  { x: 226, y: 255 },
  { x: 200, y: 348 },
  { x: 140, y: 438 },
  { x: 80, y: 528 },
  { x: 54, y: 620 },
  { x: 80, y: 712 },
  { x: 140, y: 800 },
  { x: 200, y: 890 },
];

function buildPath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1];
    const c = nodes[i];
    d += ` C ${p.x} ${p.y + 42} ${c.x} ${c.y - 42} ${c.x} ${c.y}`;
  }
  return d;
}

// ─── HOME VIEW ────────────────────────────────────────────────────────────────

function HomeView({ xp, hearts, streak, completedLessons, onSelectCourse }) {
  const courseIcon = { basics: BookOpen, tools: Wrench, metrics: BarChart2 };
  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10">
        {/* Nav */}
        <header
          className="sticky top-0 z-20 border-b border-white/[0.06]"
          style={{
            background: "rgba(13,27,42,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #58CC02, #4aa800)",
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-black text-white tracking-tight">
                PerfLearn
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#FF9600] font-black text-sm">
                <Flame className="w-4 h-4 fill-[#FF9600]" />
                {streak}
              </div>
              <HeartsDisplay count={hearts} />
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,217,0,0.12)",
                  border: "1px solid rgba(255,217,0,0.25)",
                }}
              >
                <Star className="w-3.5 h-3.5 text-[#FFD900] fill-[#FFD900]" />
                <span className="text-[#FFD900] font-black text-xs">
                  {xp} XP
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Hero */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🚦
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black mb-2"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #58CC02 60%, #1CB0F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Master Performance Testing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-semibold text-sm"
            >
              Interactive lessons with animated concept diagrams. Learn by
              doing.
            </motion.p>
          </div>

          {/* XP bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/[0.08] p-4 mb-8 flex items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,217,0,0.15)",
                border: "1px solid rgba(255,217,0,0.3)",
              }}
            >
              <Trophy className="w-5 h-5 text-[#FFD900]" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-black text-foreground uppercase tracking-wider">
                  Overall Progress
                </span>
                <span className="text-xs font-black text-[#58CC02]">
                  {xp} / 500 XP
                </span>
              </div>
              <ProgressBar value={(xp / 500) * 100} />
            </div>
          </motion.div>

          {/* Courses */}
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-4">
            Your Courses
          </h2>
          <div className="flex flex-col gap-4">
            {COURSES.map((course, idx) => {
              const Icon = courseIcon[course.id];
              const done = (completedLessons[course.id] || []).length;
              const pct = (done / course.lessons.length) * 100;
              return (
                <motion.button
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full text-left rounded-3xl border border-white/[0.08] overflow-hidden transition-all duration-200 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(20px)",
                    boxShadow: `0 4px 30px rgba(0,0,0,0.3)`,
                  }}
                >
                  {/* color stripe */}
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${course.color}, transparent)`,
                    }}
                  />
                  <div className="p-5 flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: `${course.color}18`,
                        border: `1.5px solid ${course.color}40`,
                      }}
                    >
                      {course.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-black text-sm text-foreground group-hover:text-[#58CC02] transition-colors">
                          {course.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#58CC02] transition-colors shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground font-semibold mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <ProgressBar value={pct} color={course.color} />
                        <span
                          className="text-[10px] font-black shrink-0"
                          style={{ color: course.color }}
                        >
                          {done}/{course.lessons.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              {
                label: "Completed",
                value: Object.values(completedLessons).flat().length,
                icon: "✅",
              },
              { label: "Total XP", value: xp, icon: "⭐" },
              { label: "Streak Days", value: streak, icon: "🔥" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded-2xl border border-white/[0.08] p-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-xl mb-0.5">{s.icon}</div>
                <div className="text-xl font-black text-foreground">
                  {s.value}
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── COURSE VIEW ──────────────────────────────────────────────────────────────

function CourseView({
  course,
  completedLessons,
  xp,
  hearts,
  streak,
  onBack,
  onSelectLesson,
}) {
  const done = completedLessons.length;
  const totalH = TRAIL[9].y + 80;
  const trailPath = buildPath(TRAIL);
  const completedPath =
    done > 0
      ? buildPath(TRAIL.slice(0, Math.min(done + 1, TRAIL.length)))
      : null;

  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10">
        <header
          className="sticky top-0 z-20 border-b border-white/[0.06]"
          style={{
            background: "rgba(13,27,42,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#FF9600] font-black text-sm">
                <Flame className="w-4 h-4 fill-[#FF9600]" />
                {streak}
              </div>
              <HeartsDisplay count={hearts} />
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-6">
          {/* Course info card */}
          <div
            className="rounded-3xl border border-white/[0.08] p-5 mb-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              borderTop: `2px solid ${course.color}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: `${course.color}18`,
                  border: `1.5px solid ${course.color}40`,
                }}
              >
                {course.emoji}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-black text-foreground mb-0.5">
                  {course.title}
                </h1>
                <p className="text-xs text-muted-foreground font-semibold mb-3">
                  {course.description}
                </p>
                <div className="flex items-center gap-3">
                  <ProgressBar
                    value={(done / course.lessons.length) * 100}
                    color={course.color}
                  />
                  <span
                    className="text-xs font-black shrink-0"
                    style={{ color: course.color }}
                  >
                    {done}/{course.lessons.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trail */}
          <div
            className="relative mx-auto"
            style={{ width: "280px", height: `${totalH}px` }}
          >
            <svg
              className="absolute inset-0"
              width="280"
              height={totalH}
              style={{ pointerEvents: "none", overflow: "visible" }}
            >
              {/* Background path */}
              <path
                d={trailPath}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Flowing dashes on completed */}
              {completedPath && (
                <motion.path
                  d={completedPath}
                  fill="none"
                  stroke={course.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="12 8"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  opacity="0.7"
                />
              )}
            </svg>

            {/* Lesson nodes */}
            {course.lessons.map((lesson, i) => {
              const pos = TRAIL[i];
              const isCompleted = completedLessons.includes(i);
              const isCurrent = i === done;
              const isLocked = i > done;
              return (
                <motion.div
                  key={lesson.id}
                  className="absolute"
                  style={{ left: pos.x - 28, top: pos.y - 28 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <button
                    onClick={() => !isLocked && onSelectLesson(i)}
                    disabled={isLocked}
                    className="relative group"
                  >
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: course.color }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center text-lg border-4 transition-all font-bold",
                      )}
                      style={
                        isCompleted
                          ? {
                              borderColor: "#58CC02",
                              background: "#58CC02",
                              boxShadow: "0 4px 20px rgba(88,204,2,0.5)",
                            }
                          : isCurrent
                            ? {
                                borderColor: course.color,
                                background: course.color,
                                boxShadow: `0 4px 24px ${course.shadow}`,
                              }
                            : {
                                borderColor: "rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.04)",
                              }
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5 text-white/30" />
                      ) : (
                        <span>{lesson.emoji}</span>
                      )}
                    </div>
                    {/* Tooltip */}
                    {!isLocked && (
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-xs font-bold border border-white/[0.08] shadow-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: "rgba(13,27,42,0.95)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        <div className="text-white">{lesson.title}</div>
                        <div className="text-[#58CC02]">+{lesson.xp} XP</div>
                      </div>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center pb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,217,0,0.1)",
                border: "1px solid rgba(255,217,0,0.2)",
              }}
            >
              <Star className="w-3.5 h-3.5 text-[#FFD900] fill-[#FFD900]" />
              <span className="text-[#FFD900] font-black text-xs">
                Total XP: {xp}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── RESULT BANNER ────────────────────────────────────────────────────────────

function ResultBanner({ isCorrect, explanation, onContinue }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-4 pb-8"
      style={{
        background: isCorrect ? "rgba(20,60,10,0.97)" : "rgba(60,10,10,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: `3px solid ${isCorrect ? "#58CC02" : "#ff4b4b"}`,
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-3 mb-4">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-[#58CC02] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-[#ff4b4b] shrink-0 mt-0.5" />
          )}
          <div>
            <p
              className={cn(
                "font-black text-base",
                isCorrect ? "text-[#58CC02]" : "text-[#ff4b4b]",
              )}
            >
              {isCorrect ? "Excellent! 🎉" : "Not quite ❌"}
            </p>
            <p className="text-xs font-semibold text-white/70 mt-0.5 leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl font-black text-sm text-white transition-all active:scale-[0.98]"
          style={{
            background: isCorrect ? "#58CC02" : "#ff4b4b",
            boxShadow: `0 4px 20px ${isCorrect ? "rgba(88,204,2,0.4)" : "rgba(255,75,75,0.4)"}`,
          }}
        >
          {isCorrect ? "Continue →" : "Got it, continue"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── LESSON VIEW ──────────────────────────────────────────────────────────────

function LessonView({
  course,
  lesson,
  lessonIndex,
  totalLessons,
  hearts,
  onClose,
  onComplete,
}) {
  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDragDone, setIsDragDone] = useState(false);
  const content = lesson.content;
  const progress = (lessonIndex / totalLessons) * 100;

  const canCheck = content.kind === "drag-match" ? isDragDone : answer !== null;

  function handleCheck() {
    if (!canCheck) return;
    setChecked(true);
    setShowResult(true);
    if (content.kind === "drag-match" || answer === true) {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#58CC02", "#FFD900", "#1CB0F6"],
        disableForReducedMotion: true,
      });
    }
  }

  function handleDragReady(correct) {
    setIsDragDone(true);
    setAnswer(correct);
    setChecked(true);
    setShowResult(true);
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#58CC02", "#FFD900", "#1CB0F6"],
      disableForReducedMotion: true,
    });
  }

  function handleContinue() {
    onComplete(content.kind === "drag-match" ? true : answer);
  }

  const explanation =
    content.kind === "mcq"
      ? content.explanation
      : content.kind === "true-false"
        ? content.explanation
        : content.kind === "drag-match"
          ? "All pairs matched correctly! Great pattern recognition."
          : answer
            ? "Correct sequence! You understand the process flow."
            : "Not quite — review the order and try remembering the logical progression.";

  const isCorrect = content.kind === "drag-match" ? true : answer === true;

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10 flex flex-col flex-1">
        {/* Top bar */}
        <header
          className="border-b border-white/[0.06]"
          style={{
            background: "rgba(13,27,42,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <ProgressBar value={progress} color={course.color} />
            </div>
            <HeartsDisplay count={hearts} />
          </div>
        </header>

        {/* Main content — split pane */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-5 pb-32 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-5">
          {/* LEFT: Animated diagram */}
          <div className="flex flex-col">
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(88,204,2,0.07) 0%, rgba(28,176,246,0.05) 100%)",
                border: `1.5px solid ${course.color}30`,
                backdropFilter: "blur(20px)",
                minHeight: "220px",
                flex: 1,
              }}
            >
              {/* Breathing border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: `1px solid ${course.color}` }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Lesson type badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                style={{
                  background: `${course.color}20`,
                  border: `1px solid ${course.color}40`,
                  color: course.color,
                }}
              >
                {content.kind === "mcq"
                  ? "Multiple Choice"
                  : content.kind === "true-false"
                    ? "True / False"
                    : content.kind === "drag-match"
                      ? "Match Pairs"
                      : "Word Order"}
              </div>
              <div className="w-full h-full p-4 pt-10">
                <ConceptDiagram id={lesson.diagram} />
              </div>
            </div>
          </div>

          {/* RIGHT: Question */}
          <div className="flex flex-col gap-4">
            {/* Lesson header */}
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                style={{ background: course.color }}
              >
                {course.title}
              </div>
              <span className="text-[10px] text-muted-foreground font-bold">
                Lesson {lessonIndex + 1} of {totalLessons}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{lesson.emoji}</span>
              <h2 className="text-lg font-black text-foreground">
                {lesson.title}
              </h2>
            </div>

            {/* Interactive content */}
            <div className="flex-1">
              {content.kind === "mcq" && (
                <MCQLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
              {content.kind === "true-false" && (
                <TrueFalseLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
              {content.kind === "drag-match" && (
                <DragMatchLesson content={content} onReady={handleDragReady} />
              )}
              {content.kind === "word-order" && (
                <WordOrderLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
            </div>
          </div>
        </div>

        {/* Check button (fixed bottom, for non-drag-match) */}
        {!showResult && content.kind !== "drag-match" && (
          <div
            className="fixed bottom-0 left-0 right-0 p-4 z-20"
            style={{
              background: "rgba(13,27,42,0.9)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="max-w-5xl mx-auto">
              <motion.button
                onClick={handleCheck}
                disabled={!canCheck}
                whileTap={canCheck ? { scale: 0.98 } : {}}
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-sm transition-all duration-200",
                  canCheck
                    ? "text-white cursor-pointer"
                    : "text-white/30 cursor-not-allowed",
                )}
                style={
                  canCheck
                    ? {
                        background: course.color,
                        boxShadow: `0 4px 24px ${course.shadow}`,
                      }
                    : { background: "rgba(255,255,255,0.06)" }
                }
              >
                CHECK
              </motion.button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showResult && (
            <ResultBanner
              isCorrect={isCorrect}
              explanation={explanation}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── XP OVERLAY ──────────────────────────────────────────────────────────────

function XPOverlay({ xpGained, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(13,27,42,0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.5, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center"
      >
        <div className="text-6xl mb-3">⭐</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-[#FFD900]"
        >
          +{xpGained} XP
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── COURSE COMPLETE VIEW ─────────────────────────────────────────────────────

function CourseCompleteView({ course, xpGained, onContinue }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          🎊
        </motion.div>
        <h1 className="text-3xl font-black text-white mb-2">
          Course Complete!
        </h1>
        <p className="text-muted-foreground font-semibold mb-8 text-sm">
          You finished{" "}
          <span className="text-white font-black">{course.title}</span>
        </p>
        <div className="flex gap-4 justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            >
              <Star className="w-14 h-14 text-[#FFD900] fill-[#FFD900]" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/[0.08] p-6 mb-8 inline-block"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="text-4xl font-black text-[#FFD900] mb-1">
            +{xpGained} XP
          </div>
          <div className="text-muted-foreground font-semibold text-xs">
            Experience earned
          </div>
        </motion.div>
        <div>
          <button
            onClick={onContinue}
            className="px-8 py-4 rounded-2xl font-black text-sm text-white transition-all active:scale-[0.98]"
            style={{
              background: "#58CC02",
              boxShadow: "0 4px 24px rgba(88,204,2,0.4)",
            }}
          >
            Continue Learning →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("home");
  const [courseId, setCourseId] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState({});
  const [xp, setXp] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [streak] = useState(3);
  const [showXp, setShowXp] = useState(false);
  const [lastXp, setLastXp] = useState(0);
  const [courseXp, setCourseXp] = useState(0);

  const currentCourse = COURSES.find((c) => c.id === courseId) ?? null;
  const currentLesson = currentCourse?.lessons[lessonIndex] ?? null;

  const handleSelectCourse = useCallback((id) => {
    setCourseId(id);
    setView("course");
  }, []);
  const handleSelectLesson = useCallback(
    (i) => {
      if (hearts <= 0) {
        setView("out-of-hearts");
        return;
      }
      setLessonIndex(i);
      setView("lesson");
    },
    [hearts],
  );

  const handleLessonComplete = useCallback(
    (correct) => {
      if (!currentCourse || !currentLesson) return;
      const gained = correct
        ? currentLesson.xp
        : Math.max(2, Math.floor(currentLesson.xp * 0.2));
      if (!correct) setHearts((h) => Math.max(0, h - 1));
      setXp((x) => x + gained);
      setLastXp(gained);
      setCompletedLessons((prev) => {
        const ex = prev[currentCourse.id] || [];
        return ex.includes(lessonIndex)
          ? prev
          : { ...prev, [currentCourse.id]: [...ex, lessonIndex] };
      });
      setShowXp(true);
    },
    [currentCourse, currentLesson, lessonIndex],
  );

  const handleXpDone = useCallback(() => {
    setShowXp(false);
    if (!currentCourse) return;
    if (hearts <= 0) {
      setView("out-of-hearts");
      return;
    }
    const next = lessonIndex + 1;
    if (next >= currentCourse.lessons.length) {
      setCourseXp(currentCourse.lessons.reduce((s, l) => s + l.xp, 0));
      setView("course-complete");
    } else {
      setLessonIndex(next);
    }
  }, [currentCourse, lessonIndex, hearts]);

  return (
    <div style={{ fontFamily: "Nunito,sans-serif" }}>
      <AnimatePresence>
        {showXp && <XPOverlay xpGained={lastXp} onDone={handleXpDone} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HomeView
              xp={xp}
              hearts={hearts}
              streak={streak}
              completedLessons={completedLessons}
              onSelectCourse={handleSelectCourse}
            />
          </motion.div>
        )}
        {view === "course" && currentCourse && !showXp && (
          <motion.div
            key="course"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <CourseView
              course={currentCourse}
              completedLessons={completedLessons[currentCourse.id] || []}
              xp={xp}
              hearts={hearts}
              streak={streak}
              onBack={() => setView("home")}
              onSelectLesson={handleSelectLesson}
            />
          </motion.div>
        )}
        {view === "lesson" && currentCourse && currentLesson && !showXp && (
          <motion.div
            key={`lesson-${lessonIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
          >
            <LessonView
              course={currentCourse}
              lesson={currentLesson}
              lessonIndex={lessonIndex}
              totalLessons={currentCourse.lessons.length}
              hearts={hearts}
              onClose={() => setView("course")}
              onComplete={handleLessonComplete}
            />
          </motion.div>
        )}
        {view === "course-complete" && currentCourse && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CourseCompleteView
              course={currentCourse}
              xpGained={courseXp}
              onContinue={() => setView("home")}
            />
          </motion.div>
        )}
        {view === "out-of-hearts" && (
          <motion.div
            key="out-of-hearts"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <OutOfHeartsView
              onRefill={() => {
                setHearts(5);
                setView("home");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── OUT OF HEARTS VIEW ───────────────────────────────────────────────────────

function OutOfHeartsView({ onRefill }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          💔
        </motion.div>
        <h1 className="text-3xl font-black text-white mb-2">Out of Hearts!</h1>
        <p className="text-muted-foreground font-semibold mb-8 text-sm">
          You need hearts to continue learning.
        </p>
        <button
          onClick={onRefill}
          className="px-8 py-4 rounded-2xl font-black text-sm text-white transition-transform active:scale-95"
          style={{
            background: "#1CB0F6",
            boxShadow: "0 4px 24px rgba(28,176,246,0.4)",
          }}
        >
          Refill Hearts (+5)
        </button>
      </div>
    </div>
  );
}
