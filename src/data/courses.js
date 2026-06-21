export const COURSES = [
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
            "An SLA (Service Level Agreement) is a formal contract, while an SLO (Service Level Objective) is an internal target.",
          correct: true,
          explanation:
            "SLAs are external, legally binding commitments. SLOs are internal targets that help teams stay within SLA bounds.",
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
