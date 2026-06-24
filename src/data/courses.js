export const shapeLabels = {
  initial: "Initial",
  final: "Final",
  state: "State",
  transition: "Transition",
  fork: "Fork",
  join: "Join",
  terminator: "Start/End",
  process: "Process",
  decision: "Decision",
  data: "Data",
  document: "Document",
  arrow: "Flow Arrow",
  lane: "Lane",
  pool: "Pool",
  actor: "Actor",
  connector: "Connector",
};

const makeCard = (id, type, label, lane) => ({ id, type, label, lane });
export const MAX_LIVES = 3;
export const RESTOCK_MS = 2 * 60 * 60 * 1000;

export const courses = [
  {
    id: "state",
    title: "State Chart",
    subtitle: "Model how a system changes state after events.",
    accent: "#58cc02",
    source: "GeeksforGeeks UML state machine guide",
    lessons: [
      {
        id: "state-basics",
        title: "Notation Warm-up",
        badge: "Basics",
        questions: [
          {
            prompt: "Place the state chart notations in the usual story order.",
            description: [
              "A state machine starts, enters states, follows event-labeled transitions, and reaches a final state.",
              "A state machine starts, enters states, follows event-labeled transitions, and reaches a final state. Remember to map each step correctly.",
              "Review the prompt: A state machine starts, enters states, follows event-labeled transitions, and reaches a final state."
            ],
            slots: ["Start", "Condition", "Event link", "End"],
            cards: [
              makeCard("state-q1-a", "transition", "event / transition"),
              makeCard("state-q1-b", "initial", "filled start circle"),
              makeCard("state-q1-c", "final", "bullseye final"),
              makeCard("state-q1-d", "state", "rounded state"),
              makeCard("state-q1-x", "fork", "parallel split"),
            ],
            answer: ["state-q1-b", "state-q1-d", "state-q1-a", "state-q1-c"],
            explanation: "State diagrams focus on lifecycle: an initial node leads to a state, transitions show triggering events, and a final node closes the behavior.",
          },
          {
            prompt: "Match each notation to the small ATM login lifecycle.",
            description: [
              "The ATM waits for a card, verifies a PIN, authenticates the user, then exits.",
              "The ATM waits for a card, verifies a PIN, authenticates the user, then exits. Remember to map each step correctly.",
              "Review the prompt: The ATM waits for a card, verifies a PIN, authenticates the user, then exits."
            ],
            slots: ["Entry point", "Waiting", "PIN causes movement", "Authenticated", "Session closed"],
            cards: [
              makeCard("state-q2-a", "state", "Waiting for card"),
              makeCard("state-q2-b", "transition", "PIN entered"),
              makeCard("state-q2-c", "final", "session complete"),
              makeCard("state-q2-d", "state", "Authenticated"),
              makeCard("state-q2-e", "initial", "start"),
              makeCard("state-q2-x", "join", "merge parallel flows"),
            ],
            answer: ["state-q2-e", "state-q2-a", "state-q2-b", "state-q2-d", "state-q2-c"],
            explanation: "Events label transitions, while rounded states describe what the object is currently doing or waiting for.",
          },
          {
            prompt: "Build a simple order state machine from the description.",
            description: [
              "An order is received, becomes unprocessed, gets checked, and either ends as fulfilled or rejected.",
              "An order is received, becomes unprocessed, gets checked, and either ends as fulfilled or rejected. Remember to map each step correctly.",
              "Review the prompt: An order is received, becomes unprocessed, gets checked, and either ends as fulfilled or rejected."
            ],
            slots: ["Begin", "Order received", "Review order", "Accepted path", "Closed"],
            cards: [
              makeCard("state-q3-a", "initial", "order starts"),
              makeCard("state-q3-b", "state", "Unprocessed order"),
              makeCard("state-q3-c", "transition", "check order"),
              makeCard("state-q3-d", "state", "Fulfilled order"),
              makeCard("state-q3-e", "final", "final state"),
              makeCard("state-q3-x", "state", "Inventory archived"),
              makeCard("state-q3-y", "fork", "split into teams"),
            ],
            answer: ["state-q3-a", "state-q3-b", "state-q3-c", "state-q3-d", "state-q3-e"],
            explanation: "This mirrors a basic online order lifecycle: receive, evaluate, move to a resulting state, then finish.",
          },
          {
            prompt: "Arrange a door lock state chart.",
            description: [
              "The door begins locked. A valid code unlocks it. After timeout, it locks again. The lesson asks for the main successful path.",
              "The door begins locked. A valid code unlocks it. After timeout, it locks again. The lesson asks for the main successful path. Remember to map each step correctly.",
              "Review the prompt: The door begins locked. A valid code unlocks it. After timeout, it locks again. The lesson asks for the main successful path."
            ],
            slots: ["Initial", "Locked", "Valid code", "Unlocked", "Timeout"],
            cards: [
              makeCard("state-q4-a", "state", "Locked"),
              makeCard("state-q4-b", "transition", "valid code"),
              makeCard("state-q4-c", "state", "Unlocked"),
              makeCard("state-q4-d", "transition", "timeout"),
              makeCard("state-q4-e", "initial", "power on"),
              makeCard("state-q4-x", "document", "access log"),
            ],
            answer: ["state-q4-e", "state-q4-a", "state-q4-b", "state-q4-c", "state-q4-d"],
            explanation: "State charts can include loops: after the timeout transition, the object would return to Locked.",
          },
          {
            prompt: "Choose the right concurrent notation sequence.",
            description: [
              "A build pipeline compiles frontend and backend at the same time, then joins them before packaging.",
              "A build pipeline compiles frontend and backend at the same time, then joins them before packaging. Remember to map each step correctly.",
              "Review the prompt: A build pipeline compiles frontend and backend at the same time, then joins them before packaging."
            ],
            slots: ["Ready", "Split work", "Frontend compiling", "Backend compiling", "Merge", "Package"],
            cards: [
              makeCard("state-q5-a", "state", "Ready"),
              makeCard("state-q5-b", "fork", "fork"),
              makeCard("state-q5-c", "state", "Frontend compiling"),
              makeCard("state-q5-d", "state", "Backend compiling"),
              makeCard("state-q5-e", "join", "join"),
              makeCard("state-q5-f", "state", "Package release"),
              makeCard("state-q5-x", "decision", "yes/no choice"),
            ],
            answer: ["state-q5-a", "state-q5-b", "state-q5-c", "state-q5-d", "state-q5-e", "state-q5-f"],
            explanation: "Forks split one flow into concurrent states, while joins converge concurrent states into one continuing state.",
          },
        ],
      },
    ],
  },
  {
    id: "flow",
    title: "Flow Chart",
    subtitle: "Turn algorithms and workflows into ordered symbols.",
    accent: "#1cb0f6",
    source: "Visual Paradigm flowchart tutorial",
    lessons: [
      {
        id: "flow-basics",
        title: "Process Builder",
        badge: "Core",
        questions: [
          {
            prompt: "Sort the common flowchart symbols by their role in a basic process.",
            description: [
              "Flowcharts show steps in sequence with boxes of different meaning connected by arrows.",
              "Flowcharts show steps in sequence with boxes of different meaning connected by arrows. Remember to map each step correctly.",
              "Review the prompt: Flowcharts show steps in sequence with boxes of different meaning connected by arrows."
            ],
            slots: ["Begin or end", "Action", "Branch", "Input or output", "Direction"],
            cards: [
              makeCard("flow-q1-a", "terminator", "Start / End"),
              makeCard("flow-q1-b", "process", "Calculate total"),
              makeCard("flow-q1-c", "decision", "Is valid?"),
              makeCard("flow-q1-d", "data", "Enter value"),
              makeCard("flow-q1-e", "arrow", "next step"),
              makeCard("flow-q1-x", "state", "System condition"),
            ],
            answer: ["flow-q1-a", "flow-q1-b", "flow-q1-c", "flow-q1-d", "flow-q1-e"],
            explanation: "The conventional flowchart set includes terminators, process rectangles, decision diamonds, data parallelograms, and flow arrows.",
          },
          {
            prompt: "Build a login flowchart.",
            description: [
              "The user starts, enters credentials, the system checks them, and either opens the dashboard or shows an error.",
              "The user starts, enters credentials, the system checks them, and either opens the dashboard or shows an error. Remember to map each step correctly.",
              "Review the prompt: The user starts, enters credentials, the system checks them, and either opens the dashboard or shows an error."
            ],
            slots: ["Start", "Collect credentials", "Valid?", "Success", "Failure branch"],
            cards: [
              makeCard("flow-q2-a", "terminator", "Start"),
              makeCard("flow-q2-b", "data", "Enter username and password"),
              makeCard("flow-q2-c", "decision", "Credentials valid?"),
              makeCard("flow-q2-d", "process", "Open dashboard"),
              makeCard("flow-q2-e", "process", "Show error"),
              makeCard("flow-q2-x", "document", "Export report"),
            ],
            answer: ["flow-q2-a", "flow-q2-b", "flow-q2-c", "flow-q2-d", "flow-q2-e"],
            explanation: "A diamond is the right shape for a yes/no branch; each outgoing path should be labeled by its condition.",
          },
          {
            prompt: "Arrange a simple summation algorithm.",
            description: [
              "Start, enter a number N, initialize sum, repeat adding values, decide whether finished, then display the sum.",
              "Start, enter a number N, initialize sum, repeat adding values, decide whether finished, then display the sum. Remember to map each step correctly.",
              "Review the prompt: Start, enter a number N, initialize sum, repeat adding values, decide whether finished, then display the sum."
            ],
            slots: ["Start", "Input", "Initialize", "Loop action", "Done?", "Output"],
            cards: [
              makeCard("flow-q3-a", "terminator", "Start"),
              makeCard("flow-q3-b", "data", "Read N"),
              makeCard("flow-q3-c", "process", "sum = 0, i = 1"),
              makeCard("flow-q3-d", "process", "sum = sum + i"),
              makeCard("flow-q3-e", "decision", "i > N?"),
              makeCard("flow-q3-f", "data", "Print sum"),
              makeCard("flow-q3-x", "state", "Authenticated"),
            ],
            answer: ["flow-q3-a", "flow-q3-b", "flow-q3-c", "flow-q3-d", "flow-q3-e", "flow-q3-f"],
            explanation: "Algorithms fit flowcharts well because each operation, branch, and output can be represented in sequence.",
          },
          {
            prompt: "Draw a customer order process.",
            description: [
              "A customer places an order. The store checks stock. If available, pack and ship. If not, notify the customer.",
              "A customer places an order. The store checks stock. If available, pack and ship. If not, notify the customer. Remember to map each step correctly.",
              "Review the prompt: A customer places an order. The store checks stock. If available, pack and ship. If not, notify the customer."
            ],
            slots: ["Start", "Order data", "Stock check", "Available path", "Unavailable path", "End"],
            cards: [
              makeCard("flow-q4-a", "terminator", "Start"),
              makeCard("flow-q4-b", "data", "Receive order"),
              makeCard("flow-q4-c", "decision", "In stock?"),
              makeCard("flow-q4-d", "process", "Pack and ship"),
              makeCard("flow-q4-e", "document", "Send out-of-stock notice"),
              makeCard("flow-q4-f", "terminator", "End"),
              makeCard("flow-q4-x", "lane", "Warehouse lane"),
            ],
            answer: ["flow-q4-a", "flow-q4-b", "flow-q4-c", "flow-q4-d", "flow-q4-e", "flow-q4-f"],
            explanation: "Documents or outputs are useful when a process creates a report, receipt, notice, or other artifact.",
          },
          {
            prompt: "Select the best sequence for a profit/loss calculation.",
            description: [
              "The flow reads cost and sale price, calculates difference, decides if positive, then displays profit or loss.",
              "The flow reads cost and sale price, calculates difference, decides if positive, then displays profit or loss. Remember to map each step correctly.",
              "Review the prompt: The flow reads cost and sale price, calculates difference, decides if positive, then displays profit or loss."
            ],
            slots: ["Begin", "Input values", "Calculate", "Positive?", "Profit output", "Loss output"],
            cards: [
              makeCard("flow-q5-a", "terminator", "Begin"),
              makeCard("flow-q5-b", "data", "Read cost and sale price"),
              makeCard("flow-q5-c", "process", "difference = sale - cost"),
              makeCard("flow-q5-d", "decision", "difference >= 0?"),
              makeCard("flow-q5-e", "data", "Display profit"),
              makeCard("flow-q5-f", "data", "Display loss"),
              makeCard("flow-q5-x", "fork", "parallel split"),
            ],
            answer: ["flow-q5-a", "flow-q5-b", "flow-q5-c", "flow-q5-d", "flow-q5-e", "flow-q5-f"],
            explanation: "The decision shape controls the two possible outputs after the calculation step.",
          },
        ],
      },
    ],
  },
  {
    id: "swimlane",
    title: "Swimlane",
    subtitle: "Assign each process step to the person or team responsible.",
    accent: "#ffb020",
    source: "Process Street swim lane guide",
    lessons: [
      {
        id: "swim-basics",
        title: "Roles and Flow",
        badge: "Teams",
        questions: [
          {
            prompt: "Place the swimlane building blocks in the right planning order.",
            description: [
              "Swimlane diagrams divide a process into lanes for actors, then place actions and arrows inside those lanes.",
              "Swimlane diagrams divide a process into lanes for actors, then place actions and arrows inside those lanes. Remember to map each step correctly.",
              "Review the prompt: Swimlane diagrams divide a process into lanes for actors, then place actions and arrows inside those lanes."
            ],
            slots: ["Pool", "Actors", "Actions", "Connections", "Approval"],
            cards: [
              makeCard("swim-q1-a", "pool", "Draw pool"),
              makeCard("swim-q1-b", "actor", "Label players"),
              makeCard("swim-q1-c", "process", "Add actions"),
              makeCard("swim-q1-d", "arrow", "Add directional lines"),
              makeCard("swim-q1-e", "terminator", "Approve final map"),
              makeCard("swim-q1-x", "state", "Object lifecycle"),
            ],
            answer: ["swim-q1-a", "swim-q1-b", "swim-q1-c", "swim-q1-d", "swim-q1-e"],
            explanation: "A swimlane diagram first defines the pool and lanes, then fills them with responsible actions and directional lines.",
          },
          {
            prompt: "Map a help ticket across lanes.",
            description: [
              "A customer submits a ticket. The CSR decides whether it is new. If new, tech support investigates. The CSR responds to the customer.",
              "A customer submits a ticket. The CSR decides whether it is new. If new, tech support investigates. The CSR responds to the customer. Remember to map each step correctly.",
              "Review the prompt: A customer submits a ticket. The CSR decides whether it is new. If new, tech support investigates. The CSR responds to the customer."
            ],
            slots: ["Customer lane", "CSR lane", "CSR decision", "Tech support lane", "CSR response"],
            cards: [
              makeCard("swim-q2-a", "terminator", "Submit ticket", "Customer"),
              makeCard("swim-q2-b", "process", "Review ticket", "CSR"),
              makeCard("swim-q2-c", "decision", "New issue?", "CSR"),
              makeCard("swim-q2-d", "process", "Investigate issue", "Tech support"),
              makeCard("swim-q2-e", "document", "Reply with result", "CSR"),
              makeCard("swim-q2-x", "process", "Process payroll", "Finance"),
            ],
            answer: ["swim-q2-a", "swim-q2-b", "swim-q2-c", "swim-q2-d", "swim-q2-e"],
            explanation: "The power of swimlanes is that each task lives inside the lane of the actor responsible for it.",
          },
          {
            prompt: "Create an employee onboarding swimlane.",
            description: [
              "HR sends an offer, the candidate accepts, IT prepares accounts, the manager schedules orientation, then HR files the document.",
              "HR sends an offer, the candidate accepts, IT prepares accounts, the manager schedules orientation, then HR files the document. Remember to map each step correctly.",
              "Review the prompt: HR sends an offer, the candidate accepts, IT prepares accounts, the manager schedules orientation, then HR files the document."
            ],
            slots: ["HR", "Candidate", "IT", "Manager", "HR closing task"],
            cards: [
              makeCard("swim-q3-a", "document", "Send offer", "HR"),
              makeCard("swim-q3-b", "decision", "Accept offer?", "Candidate"),
              makeCard("swim-q3-c", "process", "Create accounts", "IT"),
              makeCard("swim-q3-d", "process", "Schedule orientation", "Manager"),
              makeCard("swim-q3-e", "document", "File signed contract", "HR"),
              makeCard("swim-q3-x", "state", "Pending order", "Warehouse"),
            ],
            answer: ["swim-q3-a", "swim-q3-b", "swim-q3-c", "swim-q3-d", "swim-q3-e"],
            explanation: "For cross-functional processes, swimlanes clarify handoffs between HR, the candidate, IT, and the manager.",
          },
          {
            prompt: "Arrange a purchase approval swimlane.",
            description: [
              "An employee requests a purchase, the manager reviews it, finance checks budget, purchasing places the order, and the employee receives it.",
              "An employee requests a purchase, the manager reviews it, finance checks budget, purchasing places the order, and the employee receives it. Remember to map each step correctly.",
              "Review the prompt: An employee requests a purchase, the manager reviews it, finance checks budget, purchasing places the order, and the employee receives it."
            ],
            slots: ["Employee", "Manager", "Finance", "Purchasing", "Employee end"],
            cards: [
              makeCard("swim-q4-a", "data", "Submit request", "Employee"),
              makeCard("swim-q4-b", "decision", "Approve request?", "Manager"),
              makeCard("swim-q4-c", "decision", "Budget available?", "Finance"),
              makeCard("swim-q4-d", "process", "Place order", "Purchasing"),
              makeCard("swim-q4-e", "terminator", "Receive item", "Employee"),
              makeCard("swim-q4-x", "process", "Compile code", "Developer"),
            ],
            answer: ["swim-q4-a", "swim-q4-b", "swim-q4-c", "swim-q4-d", "swim-q4-e"],
            explanation: "This layout shows both the chronological order and who owns each approval step.",
          },
          {
            prompt: "Pick the correct lane sequence for a bug fix.",
            description: [
              "Support records the bug, product prioritizes it, engineering fixes it, QA verifies it, and support notifies the customer.",
              "Support records the bug, product prioritizes it, engineering fixes it, QA verifies it, and support notifies the customer. Remember to map each step correctly.",
              "Review the prompt: Support records the bug, product prioritizes it, engineering fixes it, QA verifies it, and support notifies the customer."
            ],
            slots: ["Support", "Product", "Engineering", "QA", "Support closing"],
            cards: [
              makeCard("swim-q5-a", "data", "Record bug report", "Support"),
              makeCard("swim-q5-b", "decision", "Prioritize bug", "Product"),
              makeCard("swim-q5-c", "process", "Implement fix", "Engineering"),
              makeCard("swim-q5-d", "decision", "Verify fix", "QA"),
              makeCard("swim-q5-e", "document", "Notify customer", "Support"),
              makeCard("swim-q5-x", "pool", "Draw pool", "Diagram setup"),
            ],
            answer: ["swim-q5-a", "swim-q5-b", "swim-q5-c", "swim-q5-d", "swim-q5-e"],
            explanation: "A swimlane diagram makes the handoffs visible so teams can see where work moves next.",
          },
        ],
      },
    ],
  },
];

const storyLessons = {
  state: [
    {
      id: "state-payment",
      title: "Payment Lifecycle",
      badge: "Story",
      questions: [
        {
          prompt: "Arrange the payment state chart.",
          description: [
            "A payment starts as idle. When checkout begins it waits for card details, then moves to authorizing. If the bank approves it, the payment becomes captured and then reaches a final state.",
            "A payment starts as idle. When checkout begins it waits for card details, then moves to authorizing. If the bank approves it, the payment becomes captured and then reaches a final state. Remember to map each step correctly.",
            "Review the prompt: A payment starts as idle. When checkout begins it waits for card details, then moves to authorizing. If the bank approves it, the payment becomes captured and then reaches a final state."
          ],
          slots: ["Start", "Idle", "Checkout begins", "Authorizing", "Approved state", "End"],
          cards: [
            makeCard("state-payment-a", "initial", "start"),
            makeCard("state-payment-b", "state", "Idle"),
            makeCard("state-payment-c", "transition", "checkout begins"),
            makeCard("state-payment-d", "state", "Authorizing"),
            makeCard("state-payment-e", "state", "Captured"),
            makeCard("state-payment-f", "final", "payment complete"),
            makeCard("state-payment-x", "process", "Print receipt"),
          ],
          answer: ["state-payment-a", "state-payment-b", "state-payment-c", "state-payment-d", "state-payment-e", "state-payment-f"],
          explanation: "A state chart shows the payment object's lifecycle and the event that moves it from one state to the next.",
        },
      ],
    },
    {
      id: "state-upload",
      title: "File Upload",
      badge: "Practice",
      questions: [
        {
          prompt: "Build the file upload states.",
          description: [
            "The uploader begins ready. Selecting a file moves it to validating. A valid file starts uploading. When the upload finishes, it becomes completed and exits.",
            "The uploader begins ready. Selecting a file moves it to validating. A valid file starts uploading. When the upload finishes, it becomes completed and exits. Remember to map each step correctly.",
            "Review the prompt: The uploader begins ready. Selecting a file moves it to validating. A valid file starts uploading. When the upload finishes, it becomes completed and exits."
          ],
          slots: ["Initial", "Ready", "File selected", "Validating", "Uploading", "Completed"],
          cards: [
            makeCard("state-upload-a", "initial", "app loaded"),
            makeCard("state-upload-b", "state", "Ready"),
            makeCard("state-upload-c", "transition", "file selected"),
            makeCard("state-upload-d", "state", "Validating"),
            makeCard("state-upload-e", "state", "Uploading"),
            makeCard("state-upload-f", "final", "Completed"),
            makeCard("state-upload-x", "decision", "file size?"),
          ],
          answer: ["state-upload-a", "state-upload-b", "state-upload-c", "state-upload-d", "state-upload-e", "state-upload-f"],
          explanation: "The rounded state shapes describe the uploader at each moment; transitions name the event that causes movement.",
        },
      ],
    },
    {
      id: "state-traffic",
      title: "Traffic Light",
      badge: "Loop",
      questions: [
        {
          prompt: "Arrange the traffic light cycle.",
          description: [
            "The controller starts at red, then timer events move it to green, yellow, and back toward red. Place the main cycle in order.",
            "The controller starts at red, then timer events move it to green, yellow, and back toward red. Place the main cycle in order. Remember to map each step correctly.",
            "Review the prompt: The controller starts at red, then timer events move it to green, yellow, and back toward red. Place the main cycle in order."
          ],
          slots: ["Start", "Stop state", "Timer", "Go state", "Warning state", "Loop event"],
          cards: [
            makeCard("state-traffic-a", "initial", "power on"),
            makeCard("state-traffic-b", "state", "Red"),
            makeCard("state-traffic-c", "transition", "timer expires"),
            makeCard("state-traffic-d", "state", "Green"),
            makeCard("state-traffic-e", "state", "Yellow"),
            makeCard("state-traffic-f", "transition", "return to red"),
            makeCard("state-traffic-x", "document", "daily report"),
          ],
          answer: ["state-traffic-a", "state-traffic-b", "state-traffic-c", "state-traffic-d", "state-traffic-e", "state-traffic-f"],
          explanation: "Loops are common in state charts when a system returns to a previous state after an event.",
        },
      ],
    },
    {
      id: "state-player",
      title: "Media Player",
      badge: "Events",
      questions: [
        {
          prompt: "Place the media player states.",
          description: [
            "The player is stopped. Pressing play changes it to playing. Pressing pause changes it to paused. Pressing stop returns the player to stopped.",
            "The player is stopped. Pressing play changes it to playing. Pressing pause changes it to paused. Pressing stop returns the player to stopped. Remember to map each step correctly.",
            "Review the prompt: The player is stopped. Pressing play changes it to playing. Pressing pause changes it to paused. Pressing stop returns the player to stopped."
          ],
          slots: ["Initial", "Stopped", "Play event", "Playing", "Pause event", "Paused"],
          cards: [
            makeCard("state-player-a", "initial", "open player"),
            makeCard("state-player-b", "state", "Stopped"),
            makeCard("state-player-c", "transition", "press play"),
            makeCard("state-player-d", "state", "Playing"),
            makeCard("state-player-e", "transition", "press pause"),
            makeCard("state-player-f", "state", "Paused"),
            makeCard("state-player-x", "data", "song title"),
          ],
          answer: ["state-player-a", "state-player-b", "state-player-c", "state-player-d", "state-player-e", "state-player-f"],
          explanation: "State charts are useful for UI behavior because user actions trigger visible state changes.",
        },
      ],
    },
    {
      id: "state-review",
      title: "Document Review",
      badge: "Branch",
      isBranched: true,
      questions: [
        {
          prompt: "Arrange the branching document review.",
          description: [
            "A draft is submitted. It goes to Legal and Marketing simultaneously. Once both approve, it becomes Published.",
            "A draft is submitted. It goes to Legal and Marketing simultaneously. Once both approve, it becomes Published. Remember to map each step correctly.",
            "Review the prompt: A draft is submitted. It goes to Legal and Marketing simultaneously. Once both approve, it becomes Published."
          ],
          slots: ["Draft", "Parallel split", "Legal Review", "Marketing Review", "Merge approvals", "Published"],
          cards: [
            makeCard("state-review-a", "state", "Draft"),
            makeCard("state-review-b", "fork", "Parallel split"),
            makeCard("state-review-c", "state", "Legal Review"),
            makeCard("state-review-d", "state", "Marketing Review"),
            makeCard("state-review-e", "join", "Merge approvals"),
            makeCard("state-review-f", "state", "Published"),
            makeCard("state-review-x", "final", "app loaded"),
          ],
          answer: ["state-review-a", "state-review-b", "state-review-c", "state-review-d", "state-review-e", "state-review-f"],
          explanation: "Forks and joins allow statecharts to show parallel states happening at the same time.",
        },
      ],
    },
    {
      id: "state-auth",
      title: "OAuth Flow",
      badge: "Mastery",
      isBranched: true,
      questions: [
        {
          prompt: "Build the OAuth login branch.",
          description: [
            "The user clicks login. The flow branches to either Google or GitHub auth. Both return to the Authenticated state.",
            "The user clicks login. The flow branches to either Google or GitHub auth. Both return to the Authenticated state. Remember to map each step correctly.",
            "Review the prompt: The user clicks login. The flow branches to either Google or GitHub auth. Both return to the Authenticated state."
          ],
          slots: ["Start", "Choose Provider", "Google Auth", "GitHub Auth", "Token received", "Authenticated"],
          cards: [
            makeCard("state-auth-a", "initial", "Start"),
            makeCard("state-auth-b", "decision", "Choose Provider"),
            makeCard("state-auth-c", "state", "Google Auth"),
            makeCard("state-auth-d", "state", "GitHub Auth"),
            makeCard("state-auth-e", "transition", "Token received"),
            makeCard("state-auth-f", "state", "Authenticated"),
            makeCard("state-auth-x", "document", "Error log"),
          ],
          answer: ["state-auth-a", "state-auth-b", "state-auth-c", "state-auth-d", "state-auth-e", "state-auth-f"],
          explanation: "Branches show alternate paths that converge back into the main flow.",
        },
      ],
    },
  ],
  flow: [
    {
      id: "flow-password",
      title: "Password Reset",
      badge: "Story",
      questions: [
        {
          prompt: "Arrange the password reset flowchart.",
          description: [
            "The user starts a reset, enters an email, the system checks the account, sends a reset link if found, then ends.",
            "The user starts a reset, enters an email, the system checks the account, sends a reset link if found, then ends. Remember to map each step correctly.",
            "Review the prompt: The user starts a reset, enters an email, the system checks the account, sends a reset link if found, then ends."
          ],
          slots: ["Start", "Input", "Decision", "Action", "End"],
          cards: [
            makeCard("flow-password-a", "terminator", "Start reset"),
            makeCard("flow-password-b", "data", "Enter email"),
            makeCard("flow-password-c", "decision", "Account found?"),
            makeCard("flow-password-d", "process", "Send reset link"),
            makeCard("flow-password-e", "terminator", "End"),
            makeCard("flow-password-x", "state", "Logged in"),
          ],
          answer: ["flow-password-a", "flow-password-b", "flow-password-c", "flow-password-d", "flow-password-e"],
          explanation: "Flowcharts use data shapes for input and decision diamonds for branch points.",
        },
      ],
    },
    {
      id: "flow-grade",
      title: "Grade Result",
      badge: "Branch",
      questions: [
        {
          prompt: "Build the grade decision flow.",
          description: [
            "Start, read the score, compare it with the pass mark, display pass if it is high enough, otherwise display fail.",
            "Start, read the score, compare it with the pass mark, display pass if it is high enough, otherwise display fail. Remember to map each step correctly.",
            "Review the prompt: Start, read the score, compare it with the pass mark, display pass if it is high enough, otherwise display fail."
          ],
          slots: ["Begin", "Read score", "Compare", "Pass output", "Fail output", "Stop"],
          cards: [
            makeCard("flow-grade-a", "terminator", "Begin"),
            makeCard("flow-grade-b", "data", "Read score"),
            makeCard("flow-grade-c", "decision", "score >= 50?"),
            makeCard("flow-grade-d", "data", "Display pass"),
            makeCard("flow-grade-e", "data", "Display fail"),
            makeCard("flow-grade-f", "terminator", "Stop"),
            makeCard("flow-grade-x", "fork", "split states"),
          ],
          answer: ["flow-grade-a", "flow-grade-b", "flow-grade-c", "flow-grade-d", "flow-grade-e", "flow-grade-f"],
          explanation: "A decision diamond creates the two possible outputs after the score is checked.",
        },
      ],
    },
    {
      id: "flow-checkout",
      title: "Checkout",
      badge: "Workflow",
      questions: [
        {
          prompt: "Arrange the checkout process.",
          description: [
            "The shopper opens checkout, enters shipping information, pays, the store creates an order, and the receipt is shown.",
            "The shopper opens checkout, enters shipping information, pays, the store creates an order, and the receipt is shown. Remember to map each step correctly.",
            "Review the prompt: The shopper opens checkout, enters shipping information, pays, the store creates an order, and the receipt is shown."
          ],
          slots: ["Start", "Shipping info", "Payment", "Create order", "Receipt"],
          cards: [
            makeCard("flow-checkout-a", "terminator", "Start checkout"),
            makeCard("flow-checkout-b", "data", "Enter shipping info"),
            makeCard("flow-checkout-c", "process", "Process payment"),
            makeCard("flow-checkout-d", "process", "Create order"),
            makeCard("flow-checkout-e", "document", "Show receipt"),
            makeCard("flow-checkout-x", "lane", "Customer lane"),
          ],
          answer: ["flow-checkout-a", "flow-checkout-b", "flow-checkout-c", "flow-checkout-d", "flow-checkout-e"],
          explanation: "This is a straight-line workflow, so process and data shapes can be arranged in order.",
        },
      ],
    },
    {
      id: "flow-support",
      title: "Support Triage",
      badge: "Choice",
      questions: [
        {
          prompt: "Build the support triage flow.",
          description: [
            "A ticket arrives, the agent checks severity, urgent tickets are escalated, normal tickets are added to the queue, then the flow ends.",
            "A ticket arrives, the agent checks severity, urgent tickets are escalated, normal tickets are added to the queue, then the flow ends. Remember to map each step correctly.",
            "Review the prompt: A ticket arrives, the agent checks severity, urgent tickets are escalated, normal tickets are added to the queue, then the flow ends."
          ],
          slots: ["Start", "Ticket arrives", "Severity check", "Urgent path", "Normal path", "End"],
          cards: [
            makeCard("flow-support-a", "terminator", "Start"),
            makeCard("flow-support-b", "data", "Receive ticket"),
            makeCard("flow-support-c", "decision", "Urgent?"),
            makeCard("flow-support-d", "process", "Escalate now"),
            makeCard("flow-support-e", "process", "Add to queue"),
            makeCard("flow-support-f", "terminator", "End"),
            makeCard("flow-support-x", "final", "state final"),
          ],
          answer: ["flow-support-a", "flow-support-b", "flow-support-c", "flow-support-d", "flow-support-e", "flow-support-f"],
          explanation: "Branches should be placed immediately after the decision so the reader sees the alternatives.",
        },
      ],
    },
    {
      id: "flow-attendance",
      title: "Attendance",
      badge: "Branch",
      isBranched: true,
      questions: [
        {
          prompt: "Arrange the branching attendance check.",
          description: [
            "Input ID. If valid, record attendance. If invalid, print error. Both paths end the process.",
            "Input ID. If valid, record attendance. If invalid, print error. Both paths end the process. Remember to map each step correctly.",
            "Review the prompt: Input ID. If valid, record attendance. If invalid, print error. Both paths end the process."
          ],
          slots: ["Scan ID", "Valid ID?", "Record attendance", "Print error", "Merge paths", "Finish"],
          cards: [
            makeCard("flow-attendance-a", "data", "Scan ID"),
            makeCard("flow-attendance-b", "decision", "Valid ID?"),
            makeCard("flow-attendance-c", "process", "Record attendance"),
            makeCard("flow-attendance-d", "document", "Print error"),
            makeCard("flow-attendance-e", "connector", "Merge paths"),
            makeCard("flow-attendance-f", "terminator", "Finish"),
            makeCard("flow-attendance-x", "join", "merge states"),
          ],
          answer: ["flow-attendance-a", "flow-attendance-b", "flow-attendance-c", "flow-attendance-d", "flow-attendance-e", "flow-attendance-f"],
          explanation: "Decision diamonds split the flow, which can merge back using a connector before ending.",
        },
      ],
    },
    {
      id: "flow-shipping",
      title: "Shipping Choice",
      badge: "Mastery",
      isBranched: true,
      questions: [
        {
          prompt: "Build the shipping decision flow.",
          description: [
            "Order packed. Is it express? If yes, send via Air. If no, send via Ground. End process.",
            "Order packed. Is it express? If yes, send via Air. If no, send via Ground. End process. Remember to map each step correctly.",
            "Review the prompt: Order packed. Is it express? If yes, send via Air. If no, send via Ground. End process."
          ],
          slots: ["Order packed", "Express?", "Ship Air", "Ship Ground", "Paths converge", "End"],
          cards: [
            makeCard("flow-shipping-a", "process", "Order packed"),
            makeCard("flow-shipping-b", "decision", "Express?"),
            makeCard("flow-shipping-c", "process", "Ship Air"),
            makeCard("flow-shipping-d", "process", "Ship Ground"),
            makeCard("flow-shipping-e", "connector", "Paths converge"),
            makeCard("flow-shipping-f", "terminator", "End"),
            makeCard("flow-shipping-x", "data", "Invoice"),
          ],
          answer: ["flow-shipping-a", "flow-shipping-b", "flow-shipping-c", "flow-shipping-d", "flow-shipping-e", "flow-shipping-f"],
          explanation: "Branching lets you model 'If/Else' logic clearly.",
        },
      ],
    },
  ],
  swimlane: [
    {
      id: "swim-expense",
      title: "Expense Claim",
      badge: "Story",
      questions: [
        {
          prompt: "Arrange the expense claim swimlane.",
          description: [
            "The employee submits a claim. The manager approves it. Finance checks policy. Payroll reimburses the employee.",
            "The employee submits a claim. The manager approves it. Finance checks policy. Payroll reimburses the employee. Remember to map each step correctly.",
            "Review the prompt: The employee submits a claim. The manager approves it. Finance checks policy. Payroll reimburses the employee."
          ],
          slots: ["Employee", "Manager", "Finance", "Payroll", "Employee closing"],
          cards: [
            makeCard("swim-expense-a", "data", "Submit claim", "Employee"),
            makeCard("swim-expense-b", "decision", "Approve claim?", "Manager"),
            makeCard("swim-expense-c", "decision", "Policy ok?", "Finance"),
            makeCard("swim-expense-d", "process", "Reimburse", "Payroll"),
            makeCard("swim-expense-e", "terminator", "Receive payment", "Employee"),
            makeCard("swim-expense-x", "state", "Draft"),
          ],
          answer: ["swim-expense-a", "swim-expense-b", "swim-expense-c", "swim-expense-d", "swim-expense-e"],
          explanation: "Each task belongs to the lane of the role responsible for that step.",
        },
      ],
    },
    {
      id: "swim-library",
      title: "Library Loan",
      badge: "Roles",
      questions: [
        {
          prompt: "Map the library loan process.",
          description: [
            "A student requests a book, the librarian checks availability, the system records the loan, and the student receives the book.",
            "A student requests a book, the librarian checks availability, the system records the loan, and the student receives the book. Remember to map each step correctly.",
            "Review the prompt: A student requests a book, the librarian checks availability, the system records the loan, and the student receives the book."
          ],
          slots: ["Student", "Librarian", "Decision", "System", "Student end"],
          cards: [
            makeCard("swim-library-a", "data", "Request book", "Student"),
            makeCard("swim-library-b", "process", "Search catalog", "Librarian"),
            makeCard("swim-library-c", "decision", "Available?", "Librarian"),
            makeCard("swim-library-d", "process", "Record loan", "System"),
            makeCard("swim-library-e", "terminator", "Receive book", "Student"),
            makeCard("swim-library-x", "pool", "Draw pool", "Setup"),
          ],
          answer: ["swim-library-a", "swim-library-b", "swim-library-c", "swim-library-d", "swim-library-e"],
          explanation: "The swimlane layout makes the handoff from student to librarian to system visible.",
        },
      ],
    },
    {
      id: "swim-incident",
      title: "Security Incident",
      badge: "Handoff",
      questions: [
        {
          prompt: "Arrange the incident response swimlane.",
          description: [
            "An employee reports an incident, IT triages it, security investigates, leadership approves communication, and IT closes the ticket.",
            "An employee reports an incident, IT triages it, security investigates, leadership approves communication, and IT closes the ticket. Remember to map each step correctly.",
            "Review the prompt: An employee reports an incident, IT triages it, security investigates, leadership approves communication, and IT closes the ticket."
          ],
          slots: ["Employee", "IT", "Security", "Leadership", "IT closing"],
          cards: [
            makeCard("swim-incident-a", "data", "Report incident", "Employee"),
            makeCard("swim-incident-b", "decision", "Triage severity", "IT"),
            makeCard("swim-incident-c", "process", "Investigate", "Security"),
            makeCard("swim-incident-d", "decision", "Approve message?", "Leadership"),
            makeCard("swim-incident-e", "terminator", "Close ticket", "IT"),
            makeCard("swim-incident-x", "document", "Menu"),
          ],
          answer: ["swim-incident-a", "swim-incident-b", "swim-incident-c", "swim-incident-d", "swim-incident-e"],
          explanation: "Swimlanes are strong for processes that cross several responsible groups.",
        },
      ],
    },
    {
      id: "swim-content",
      title: "Content Publish",
      badge: "Review",
      questions: [
        {
          prompt: "Build the content publishing swimlane.",
          description: [
            "The writer drafts an article, the editor reviews it, design prepares images, legal approves it, and marketing publishes it.",
            "The writer drafts an article, the editor reviews it, design prepares images, legal approves it, and marketing publishes it. Remember to map each step correctly.",
            "Review the prompt: The writer drafts an article, the editor reviews it, design prepares images, legal approves it, and marketing publishes it."
          ],
          slots: ["Writer", "Editor", "Design", "Legal", "Marketing"],
          cards: [
            makeCard("swim-content-a", "document", "Draft article", "Writer"),
            makeCard("swim-content-b", "decision", "Review draft", "Editor"),
            makeCard("swim-content-c", "process", "Prepare images", "Design"),
            makeCard("swim-content-d", "decision", "Approve copy", "Legal"),
            makeCard("swim-content-e", "terminator", "Publish post", "Marketing"),
            makeCard("swim-content-x", "transition", "play event"),
          ],
          answer: ["swim-content-a", "swim-content-b", "swim-content-c", "swim-content-d", "swim-content-e"],
          explanation: "The order shows chronology, while lane labels show ownership.",
        },
      ],
    },
    {
      id: "swim-return",
      title: "Product Return",
      badge: "Final",
      questions: [
        {
          prompt: "Arrange the product return swimlane.",
          description: [
            "The customer requests a return, support validates the request, warehouse receives the item, finance issues the refund, and support confirms completion.",
            "The customer requests a return, support validates the request, warehouse receives the item, finance issues the refund, and support confirms completion. Remember to map each step correctly.",
            "Review the prompt: The customer requests a return, support validates the request, warehouse receives the item, finance issues the refund, and support confirms completion."
          ],
          slots: ["Customer", "Support", "Warehouse", "Finance", "Support close"],
          cards: [
            makeCard("swim-return-a", "data", "Request return", "Customer"),
            makeCard("swim-return-b", "decision", "Return valid?", "Support"),
            makeCard("swim-return-c", "process", "Receive item", "Warehouse"),
            makeCard("swim-return-d", "process", "Issue refund", "Finance"),
            makeCard("swim-return-e", "document", "Confirm completion", "Support"),
            makeCard("swim-return-x", "fork", "parallel compile"),
          ],
          answer: ["swim-return-a", "swim-return-b", "swim-return-c", "swim-return-d", "swim-return-e"],
          explanation: "This swimlane highlights each department responsible for the return path.",
        },
      ],
    },
  ],
};

const shapeLessons = {
  state: {
    id: "state-basics",
    title: "Shape Meanings",
    badge: "Basics",
    questions: [
      {
        prompt: "Match the basic state chart symbols.",
        description: [
          "Before drawing a state chart, learn the symbols that describe where a system starts, where it can rest, and where it finishes.",
          "Before drawing a state chart, learn the symbols that describe where a system starts, where it can rest, and where it finishes. Remember to map each step correctly.",
          "Review the prompt: Before drawing a state chart, learn the symbols that describe where a system starts, where it can rest, and where it finishes."
        ],
        slots: ["Filled start circle", "Rounded state box"],
        cards: [
          makeCard("state-shape-1-a", "initial", "The object's lifecycle begins here."),
          makeCard("state-shape-1-b", "state", "A condition or mode the object can be in."),
          makeCard("state-shape-1-x", "decision", "A yes/no branch in a process."),
        ],
        answer: ["state-shape-1-a", "state-shape-1-b"],
        explanation: "State diagrams begin at an initial node, pause in named states, and may finish at a final node.",
      },
      {
        prompt: "Recognize movement in a state chart.",
        description: [
          "A state chart is not only boxes. The important story is how an event makes the object move from one state to another.",
          "A state chart is not only boxes. The important story is how an event makes the object move from one state to another. Remember to map each step correctly.",
          "Review the prompt: A state chart is not only boxes. The important story is how an event makes the object move from one state to another."
        ],
        slots: ["Transition arrow", "Bullseye final circle"],
        cards: [
          makeCard("state-shape-2-a", "transition", "Shows movement between states."),
          makeCard("state-shape-2-c", "final", "The lifecycle ends here."),
          makeCard("state-shape-2-x", "document", "A printed report."),
        ],
        answer: ["state-shape-2-a", "state-shape-2-c"],
        explanation: "Transitions connect states. The final node closes the behavior.",
      }
    ],
  },
  flow: {
    id: "flow-basics",
    title: "Shape Meanings",
    badge: "Basics",
    questions: [
      {
        prompt: "Match the first flowchart symbols.",
        description: [
          "Flowcharts use different shapes so readers can quickly tell whether a step starts, performs work, or asks a question.",
          "Flowcharts use different shapes so readers can quickly tell whether a step starts, performs work, or asks a question. Remember to map each step correctly.",
          "Review the prompt: Flowcharts use different shapes so readers can quickly tell whether a step starts, performs work, or asks a question."
        ],
        slots: ["Terminator", "Process", "Decision"],
        cards: [
          makeCard("flow-shape-1-a", "terminator", "Marks the start or end of the flow."),
          makeCard("flow-shape-1-b", "process", "Shows an action or calculation."),
          makeCard("flow-shape-1-c", "decision", "Branches on a condition."),
        ],
        answer: ["flow-shape-1-a", "flow-shape-1-b", "flow-shape-1-c"],
        explanation: "Start/end, action, and decision are the backbone of most simple flowcharts.",
      },
      {
        prompt: "Recognize input and output shapes.",
        description: [
          "Many workflows collect information, display results, or produce documents. These outputs need symbols that are distinct from process steps.",
          "Many workflows collect information, display results, or produce documents. These outputs need symbols that are distinct from process steps. Remember to map each step correctly.",
          "Review the prompt: Many workflows collect information, display results, or produce documents. These outputs need symbols that are distinct from process steps."
        ],
        slots: ["Data", "Document", "Flow arrow"],
        cards: [
          makeCard("flow-shape-2-a", "data", "Represents input or output."),
          makeCard("flow-shape-2-b", "document", "Represents a generated document or report."),
          makeCard("flow-shape-2-c", "arrow", "Shows direction to the next step."),
        ],
        answer: ["flow-shape-2-a", "flow-shape-2-b", "flow-shape-2-c"],
        explanation: "Data and document symbols help separate information handling from ordinary actions.",
      }
    ],
  },
  swimlane: {
    id: "swim-basics",
    title: "Shape Meanings",
    badge: "Basics",
    questions: [
      {
        prompt: "Match swimlane structure symbols.",
        description: [
          "A swimlane diagram is still a process diagram, but its first job is to show who is responsible for each step.",
          "A swimlane diagram is still a process diagram, but its first job is to show who is responsible for each step. Remember to map each step correctly.",
          "Review the prompt: A swimlane diagram is still a process diagram, but its first job is to show who is responsible for each step."
        ],
        slots: ["Pool", "Lane", "Actor"],
        cards: [
          makeCard("swim-shape-1-a", "pool", "The full process boundary."),
          makeCard("swim-shape-1-b", "lane", "A responsibility area for a role or team."),
          makeCard("swim-shape-1-c", "actor", "The person, team, or system owning work."),
        ],
        answer: ["swim-shape-1-a", "swim-shape-1-b", "swim-shape-1-c"],
        explanation: "Pools and lanes organize process steps by responsibility.",
      },
      {
        prompt: "Match process symbols inside swimlanes.",
        description: [
          "Inside the lanes, swimlane diagrams often reuse ordinary flowchart symbols for actions, choices, and direction.",
          "Inside the lanes, swimlane diagrams often reuse ordinary flowchart symbols for actions, choices, and direction. Remember to map each step correctly.",
          "Review the prompt: Inside the lanes, swimlane diagrams often reuse ordinary flowchart symbols for actions, choices, and direction."
        ],
        slots: ["Action in a lane", "Decision in a lane"],
        cards: [
          makeCard("swim-shape-2-a", "process", "A task owned by that lane."),
          makeCard("swim-shape-2-b", "decision", "A branch owned by that lane."),
          makeCard("swim-shape-2-x", "final", "End a state chart."),
        ],
        answer: ["swim-shape-2-a", "swim-shape-2-b"],
        explanation: "A swimlane step should make both sequence and responsibility visible.",
      }
    ],
  },
};

const scenarioText = `Green University is building a new web-based Course Registration System (CRS) for its 8,000 students to replace slow, error-prone paper forms. Students will browse courses, check prerequisites, and enroll or join waitlists. Lecturers will manage rosters and grades. Staff will set timetables and quotas. The system must support 1,000 concurrent users, be highly responsive (under 3 seconds), ensure role-based security, and remain 99.5% available during the semester.`;

const scenarioIntro = {
  state: scenarioText + "\n\n",
  flow: scenarioText + "\n\n",
  swimlane: scenarioText + "\n\n",
};

// Initialize the courses array logic
courses.forEach((course) => {
  course.lessons[0] = shapeLessons[course.id];
  course.lessons.push(...storyLessons[course.id]);
  course.lessons.slice(1).forEach((lesson, index) => {
    lesson.questions.forEach((question) => {
      question.scenario = scenarioIntro[course.id];
    });
    lesson.badge = index < 2 ? "Practice" : index < 4 ? "Challenge" : "Mastery";
  });
});
