const makeCard = (id, type, label, lane) => ({ id, type, label, lane });

export const courses = [
  {
    id: "statechart-uml",
    title: "UML Statecharts",
    subtitle: "Master the art of reactive system design",
    accent: "#3b82f6",
    levels: [
      {
        title: "The Basics",
        lessons: [
          {
            id: "intro-1",
            title: "Definition & Purpose",
            badge: "Lesson 1",
            questions: [
              {
                prompt: "What does a Statechart model?",
                theory: `
### What is a Statechart?

A Statechart is a diagram used to model the **dynamic behavior** of a single object (or a system) over time.

- It describes the various **states** an object can be in.
- It shows how the object transitions from one state to another in response to **events**.
- It is heavily used in designing reactive systems like UI components, games, embedded systems, etc.
                `,
                theoryMermaid: `stateDiagram-v2
                  [*] --> Idle
                  Idle --> Processing : Receive Task
                  Processing --> Idle : Task Completed
                  Processing --> Error : Task Failed
                  Error --> Idle : Reset
                `,
                description: "Identify the main purpose of a Statechart among the options below.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Statechart" },
                    { type: "transition", label: "used to model" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("def-dynamic", "document", "Dynamic behavior"),
                  makeCard("def-static", "document", "Static structure"),
                  makeCard("def-db", "document", "Database schema"),
                ],
                answer: ["def-dynamic"],
                explanation: "A Statechart models dynamic behavior (how an object changes over time), unlike a Class Diagram which models static structure.",
                explanationMermaid: `graph LR
                  A(Statechart) -->|Correct| B(Dynamic behavior)
                  A -.->|Incorrect| C(Static structure)
                  style B fill:#bbf7d0,stroke:#22c55e
                `
              }
            ]
          },
          {
            id: "intro-2",
            title: "State Changes",
            badge: "Lesson 2",
            questions: [
              {
                prompt: "When does a state change occur?",
                theory: `
### State Transitions

A state change (transition) happens when the object receives a specific **event** (or message). 
If the event is valid for the current state, the object will execute any associated actions and move to the target state.

For example, a washing machine only transitions from \`Idle\` to \`Washing\` when the \`StartButton\` event occurs.
                `,
                theoryMermaid: `stateDiagram-v2
                  Idle --> Washing : StartButton
                `,
                description: "Drag the factor that causes a state transition.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Current State" },
                    { type: "transition", label: "?" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("chg-event", "process", "Event/Message"),
                  makeCard("chg-time", "process", "Class instantiation"),
                  makeCard("chg-attr", "process", "Attribute change"),
                ],
                answer: ["chg-event"],
                explanation: "Transitions are triggered by events (e.g., button clicks, timer expirations, messages from other components).",
              }
            ]
          },
          {
            id: "intro-3",
            title: "Types of Statecharts",
            badge: "Lesson 3",
            questions: [
              {
                prompt: "Distinguish 2 types of Statecharts",
                theory: `
### Behavioral vs. Protocol Statecharts

1. **Behavioral State Machine**: Used to specify the exact behavior (implementation) of a part of a system.
2. **Protocol State Machine**: Used to specify the valid sequences of events that an object may receive, without defining its exact behavior. Often used for interfaces or network protocols.
                `,
                theoryMermaid: `graph TD
                  A[Statechart] --> B(Behavioral)
                  A --> C(Protocol)
                  B --> D[Implementation Details]
                  C --> E[Valid Event Sequences]
                  style B fill:#bfdbfe
                  style C fill:#bbf7d0
                `,
                description: "Which type of statechart describes implementation details?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Implementation Details" },
                    { type: "transition", label: "modeled by" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("type-behav", "document", "Behavioral"),
                  makeCard("type-proto", "document", "Protocol"),
                  makeCard("type-struct", "document", "Structural"),
                ],
                answer: ["type-behav"],
                explanation: "Behavioral State Machines model the internal logic and implementation details of a system component.",
              }
            ]
          },
          {
            id: "checkpoint-1",
            title: "Level 1 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Combine the basic elements of a Statechart",
                theory: `### Level 1 Review\nYou've learned that a statechart consists of:\n- **Initial State**: Where the system begins.\n- **States**: The condition or situation of the system.\n- **Transitions**: The shift from one state to another.\n- **Final State**: Where the lifecycle ends.`,
                description: "Construct a complete, basic statechart by dragging the correct elements.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "slot", index: 0, slotType: "initial-state" },
                    { type: "transition" },
                    { type: "state", label: "Idle" },
                    { type: "transition", label: "?" },
                    { type: "slot", index: 1, slotType: "state" },
                    { type: "transition", label: "?" },
                    { type: "slot", index: 2, slotType: "final-state" }
                  ]
                },
                cards: [
                  makeCard("ans-init", "initial-state", "Initial"),
                  makeCard("ans-final", "final-state", "Final"),
                  makeCard("ans-event", "process", "Event"),
                  makeCard("ans-state", "state", "Active")
                ],
                answer: ["ans-init", "ans-state", "ans-final"],
                explanation: "Starts at Initial, transitions via Events between States, and ends at Final.",
              }
            ]
          }
        ]
      },
      {
        title: "Components & Syntax",
        lessons: [
          {
            id: "usage-1",
            title: "When to Use",
            badge: "Lesson 4",
            questions: [
              {
                prompt: "When should you use a Statechart?",
                theory: `
### When is a Statechart necessary?

You should use a statechart when an object has **many distinct states** and its behavior changes drastically depending on its current state.
Example: A Microwave (Idle, Heating, Paused, Error) is a great candidate.
A simple \`User\` class with just getters/setters (Name, Age) does **not** need a statechart.
                `,
                theoryMermaid: `graph LR
                  A[Complex Object] -->|Yes| B(Statechart)
                  C[Simple Data Class] -->|No| D(Don't use)
                  style B fill:#bbf7d0,stroke:#22c55e
                  style D fill:#fecaca,stroke:#ef4444
                `,
                description: "Select the most appropriate case to use a Statechart.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Statechart Use Case" },
                    { type: "transition", label: "applies to" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("use-complex", "document", "Objects with complex states"),
                  makeCard("use-data", "document", "Data Transfer Objects (DTO)"),
                  makeCard("use-algo", "document", "Mathematical algorithms"),
                ],
                answer: ["use-complex"],
                explanation: "Statecharts are best for objects with complex reactive behavior depending on their current state.",
              }
            ]
          },
          {
            id: "components-1",
            title: "Basic Components",
            badge: "Lesson 5",
            questions: [
              {
                prompt: "Identify basic components",
                theory: `
### Core Components

1. **State**: A condition or situation during the life of an object.
2. **Transition**: A relationship between two states indicating that an object will perform certain actions and enter the second state.
3. **Event**: An occurrence that triggers a transition.
4. **Initial/Final State**: Special markers showing where the machine starts and ends.
                `,
                theoryMermaid: `stateDiagram-v2
                  [*] --> Active
                  Active --> [*]
                  Active --> Paused : PauseEvent
                  Paused --> Active : ResumeEvent
                `,
                description: "What represents the occurrence that triggers a state transition?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Triggers Transition" },
                    { type: "transition", label: "is called" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("comp-event", "process", "Event"),
                  makeCard("comp-state", "process", "State"),
                  makeCard("comp-action", "process", "Action"),
                ],
                answer: ["comp-event"],
                explanation: "An Event is what triggers a transition from one state to another.",
              }
            ]
          },
          {
            id: "components-2",
            title: "Standard Events",
            badge: "Lesson 6",
            questions: [
              {
                prompt: "Three standard events",
                theory: `
### Internal Actions inside a State

Within a state, there are 3 standard predefined events:
- **entry**: Action executed as soon as the object enters the state.
- **exit**: Action executed just before the object leaves the state.
- **do**: Action executed continuously (or a long-running activity) while the object remains in the state.
                `,
                theoryMermaid: `stateDiagram-v2
                  state "Typing" as T
                  note right of T
                    entry / startTimer
                    do / blinkCursor
                    exit / saveDraft
                  end note
                `,
                description: "Which action runs continuously while staying in a state?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Continuous Action" },
                    { type: "transition", label: "keyword" },
                    { type: "slot", index: 0, slotType: "process" }
                  ]
                },
                cards: [
                  makeCard("evt-do", "process", "do"),
                  makeCard("evt-entry", "process", "entry"),
                  makeCard("evt-exit", "process", "exit"),
                ],
                answer: ["evt-do"],
                explanation: "The 'do' activity runs continuously as long as the state is active.",
              }
            ]
          },
          {
            id: "components-3",
            title: "Transition Syntax",
            badge: "Lesson 7",
            questions: [
              {
                prompt: "Syntax & Internal Transitions",
                theory: `
### Transition Syntax

The standard format for a transition label is:
\`Event [Guard] / Action\`
- **Event**: What triggered it.
- **Guard**: A boolean condition that MUST be true for the transition to happen.
- **Action**: A quick, uninterruptible behavior executed during the transition.

### Internal Transition
If an event happens but the state **doesn't change** (it stays in the same state), it's an internal transition. (e.g. \`typeKey / updateDisplay\`).
                `,
                theoryMermaid: `stateDiagram-v2
                  Idle --> Processing : clickBtn [isValid] / showLoader
                `,
                description: "What part of the syntax determines if a transition is allowed to proceed?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Condition check" },
                    { type: "transition", label: "keyword" },
                    { type: "slot", index: 0, slotType: "process" }
                  ]
                },
                cards: [
                  makeCard("syn-guard", "process", "[Guard]"),
                  makeCard("syn-event", "process", "Event"),
                  makeCard("syn-action", "process", "/ Action"),
                ],
                answer: ["syn-guard"],
                explanation: "The Guard is a boolean condition in brackets that must evaluate to true.",
              }
            ]
          },
          {
            id: "components-4",
            title: "Identifying Elements",
            badge: "Lesson 8",
            questions: [
              {
                prompt: "How to identify States and Events",
                theory: `
### Tips for Requirements Analysis

When reading a system requirement document:
- **States** usually correspond to **adjectives** or conditions describing the object (e.g., *empty*, *running*, *pending*).
- **Events** usually correspond to **verbs** or actions happening to the object (e.g., *click*, *expire*, *submit*).
                `,
                theoryMermaid: `graph LR
                  A[Adjectives] -->|become| B(States)
                  C[Verbs] -->|become| D(Events)
                  style B fill:#bfdbfe
                  style D fill:#fef08a
                `,
                description: "In 'The door is locked until unlocked by the user', what is 'locked'?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "process", label: "'locked'" },
                    { type: "transition", label: "maps to" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("map-state", "state", "State"),
                  makeCard("map-event", "process", "Event"),
                  makeCard("map-action", "process", "Action"),
                ],
                answer: ["map-state"],
                explanation: "'Locked' is an adjective describing the condition of the door, hence it is a State.",
              }
            ]
          },
          {
            id: "checkpoint-2",
            title: "Level 2 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Action vs Activity",
                theory: `### Actions vs Activities\n- **Action**: Instantaneous behavior on transition (\`/ sendEmail()\`).\n- **Activity**: Ongoing behavior inside a State (\`do / blinkLight()\`).`,
                description: "Drag the behaviors to their correct categories.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Instantaneous (Transition)" },
                    { type: "transition", label: "is called" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "state", label: "Ongoing (State)" },
                    { type: "transition", label: "is called" },
                    { type: "slot", index: 1, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-act-1", "document", "Action"),
                  makeCard("ans-act-2", "document", "Activity")
                ],
                answer: ["ans-act-1", "ans-act-2"],
                explanation: "Action happens during transition. Activity runs while inside a state."
              },
              {
                prompt: "Guard Conditions",
                theory: `### Guard Conditions\nA **Guard** \`[condition]\` must be true for the transition to fire.\nEvaluated at the exact moment the event occurs.`,
                description: "Select the correct syntax for a Guard.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Guard Syntax" },
                    { type: "transition", label: "uses format" },
                    { type: "slot", index: 0, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-g-1", "document", "[isValid]"),
                  makeCard("ans-g-2", "document", "(isValid)"),
                  makeCard("ans-g-3", "document", "{isValid}")
                ],
                answer: ["ans-g-1"],
                explanation: "Guards are enclosed in square brackets [ ]."
              },
              {
                prompt: "Build a complete Transition & State logic",
                theory: `### Level 2 Review\nYou've learned about:\n- **State & Activity**: \`do / Activity\` runs continuously.\n- **Transition Syntax**: \`Event [Guard] / Action\`.\nLet's combine them into a single workflow.`,
                description: "Construct the full statechart by dragging elements.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "slot", index: 0, slotType: "state" },
                    { type: "transition", label: "do /" },
                    { type: "slot", index: 1, slotType: "document" },
                    { type: "transition", label: "trigger:" },
                    { type: "slot", index: 2, slotType: "document" },
                    { type: "slot", index: 3, slotType: "document" },
                    { type: "slot", index: 4, slotType: "document" },
                    { type: "state", label: "Completed" }
                  ]
                },
                cards: [
                  makeCard("ans-cp2-1", "state", "Processing"),
                  makeCard("ans-cp2-2", "document", "calculate()"),
                  makeCard("ans-cp2-3", "document", "Submit"),
                  makeCard("ans-cp2-4", "document", "[isValid]"),
                  makeCard("ans-cp2-5", "document", "/ save()")
                ],
                answer: ["ans-cp2-1", "ans-cp2-2", "ans-cp2-3", "ans-cp2-4", "ans-cp2-5"],
                explanation: "The Processing state performs calculate(). When Submit occurs and [isValid] is true, it executes / save()."
              }
            ]
          }
        ]
      },
      {
        title: "Advanced Concepts",
        lessons: [
          {
            id: "adv-1",
            title: "Drawing Steps",
            badge: "Lesson 9",
            questions: [
              {
                prompt: "Steps and Rules for Drawing",
                theory: `
### How to draw a UML Statechart
Building a statechart must follow this sequence:
1. **Step 1**: Identify the initial and final states.
2. **Step 2**: Identify all possible states the object can exist in (based on relevant attributes).
3. **Step 3**: Label the events that trigger these transitions.

### Important Rules:
- The name of each transition must be **unique**.
- Only build diagrams for objects with **significant dynamic behavior**.
- Base the diagram on **Use cases**, as they describe how the object reacts to system scenarios.
                `,
                theoryMermaid: `graph TD
                  A[Step 1: Init/Final] --> B[Step 2: States]
                  B --> C[Step 3: Events]
                  style A fill:#bfdbfe,stroke:#3b82f6
                  style B fill:#bbf7d0,stroke:#22c55e
                  style C fill:#fef08a,stroke:#eab308
                `,
                description: "What should NOT be the basis for building a statechart?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Statechart Basis" },
                    { type: "transition", label: "NOT used for" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("rule-usecase", "document", "Use cases"),
                  makeCard("rule-attr", "document", "Object attributes"),
                  makeCard("rule-code", "document", "Auto-generating code"),
                ],
                answer: ["rule-code"],
                explanation: "Statecharts are built based on Use cases and important object attributes, not primarily for auto-generating code during implementation.",
              }
            ]
          },
          {
            id: "adv-2",
            title: "Elevator Case Study",
            badge: "Lesson 10",
            questions: [
              {
                prompt: "Complete the Elevator statechart",
                theory: `
### Example: Elevator System

Let's analyze the **Elevator** class.
The elevator starts at floor 1 (\`On First Floor\`). 
- If a user presses a request button (\`goUp(floorNum)\`), it transitions to the \`Moving Up\` state.
- In the \`Moving Up\` state, it continuously executes: \`do / moving to floor\`.
- When it arrives (\`arrived\`), it stops and enters the \`Idle\` state.
- If a timeout occurs (\`time-out\`), it automatically returns to floor 1.
                `,
                theoryMermaid: `stateDiagram-v2
                  [*] --> On_First_Floor
                  On_First_Floor --> Moving_Up : goUp(floorNum)
                  Moving_Up --> Idle : arrived
                  Idle --> On_First_Floor : time-out
                  note right of Moving_Up : do / moving to floor
                `,
                description: "Drag the event that makes the elevator return to floor 1 from Idle.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Idle" },
                    { type: "transition", label: "Event?" },
                    { type: "slot", index: 0, slotType: "state" },
                    { type: "transition", label: "returns to" },
                    { type: "state", label: "On First Floor" }
                  ]
                },
                cards: [
                  makeCard("el-goup", "process", "goUp()"),
                  makeCard("el-timeout", "process", "time-out"),
                  makeCard("el-arrived", "process", "arrived"),
                ],
                answer: ["el-timeout"],
                explanation: "The 'time-out' event causes the elevator to leave the Idle state and return to On First Floor automatically.",
              }
            ]
          },
          {
            id: "adv-3",
            title: "Composite States",
            badge: "Lesson 11",
            questions: [
              {
                prompt: "Understand Composite States",
                theory: `
### Concept of Composite States

Sometimes the state of an object is very complex and can contain **nested sub-states**. This is called a Composite State.

For example, in a "Phone Call" use case:
The phone has 2 main states: **Idle** and **Active**.
However, **Active** is not simple; it contains a sequence of sub-states:
1. **PlayingDialTone**
2. **Dialing**
3. **Connecting**
4. **Talking**

Grouping them into the **Active** composite state simplifies the diagram. A single \`on hook\` event arrow drawn from the outer boundary of Active is enough to represent disconnection from any of its sub-states.
                `,
                theoryMermaid: `stateDiagram-v2
                  [*] --> Idle
                  Idle --> Active : off hook
                  state Active {
                    [*] --> PlayingDialTone
                    PlayingDialTone --> Dialing : digit
                    Dialing --> Connecting : completed
                    Connecting --> Talking : connected
                  }
                  Active --> Idle : on hook
                `,
                description: "How does using a composite state help in the Phone example regarding the 'on hook' event?",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Composite State" },
                    { type: "transition", label: "helps to" },
                    { type: "slot", index: 0, slotType: "state" }
                  ]
                },
                cards: [
                  makeCard("comp-1", "process", "Group the 'on hook' event"),
                  makeCard("comp-2", "process", "Remove the Idle state"),
                  makeCard("comp-3", "process", "Make diagram more complex"),
                ],
                answer: ["comp-1"],
                explanation: "By grouping sub-states into Active, we only need ONE 'on hook' arrow from the outer Active boundary instead of drawing 4 individual arrows from the 4 sub-states.",
              }
            ]
          },
          {
            id: "checkpoint-3",
            title: "Level 3 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Remembering past states",
                theory: `### History Pseudo-state\nRestores the last active sub-state when re-entering a composite state.`,
                description: "Identify the History State symbol.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Remembers past state" },
                    { type: "transition", label: "uses symbol" },
                    { type: "slot", index: 0, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-hist-1", "document", "( H )"),
                  makeCard("ans-hist-2", "document", "[ H ]"),
                  makeCard("ans-hist-3", "document", "{ H }")
                ],
                answer: ["ans-hist-1"],
                explanation: "The standard UML symbol for a history state is an H enclosed in a circle."
              },
              {
                prompt: "Dynamic Branching",
                theory: `### Choice Pseudo-state\nA **Choice** (diamond symbol) is used for dynamic branching based on guards evaluated *during* the transition.`,
                description: "Select the shape used for Choice pseudo-states.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Choice / Branching" },
                    { type: "transition", label: "uses shape" },
                    { type: "slot", index: 0, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-choice-1", "document", "Diamond"),
                  makeCard("ans-choice-2", "document", "Rectangle"),
                  makeCard("ans-choice-3", "document", "Circle")
                ],
                answer: ["ans-choice-1"],
                explanation: "A Diamond shape is universally used in UML for Choice pseudo-states."
              },
              {
                prompt: "Identify Advanced Statechart Features",
                theory: `### Level 3 Review\nYou've learned about:\n- **Composite States**: Nested sub-states.\n- **Choice Pseudo-states**: Dynamic branching.\n- **History States**: Remembering the last active sub-state.\nLet's review these advanced concepts.`,
                description: "Match the advanced feature to its correct position in the flow.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Evaluate" },
                    { type: "transition", label: "branch via" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "transition", label: "success" },
                    { type: "slot", index: 1, slotType: "document" },
                    { type: "transition", label: "resume later via" },
                    { type: "slot", index: 2, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-cp3-1", "document", "Choice Diamond"),
                  makeCard("ans-cp3-2", "document", "Composite State"),
                  makeCard("ans-cp3-3", "document", "History (H)")
                ],
                answer: ["ans-cp3-1", "ans-cp3-2", "ans-cp3-3"],
                explanation: "We branch using a Choice Diamond, enter a complex Composite State, and can resume it later using a History State."
              }
            ]
          }
        ]
      }
    ]
  }
];
