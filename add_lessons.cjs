const fs = require('fs');

let content = fs.readFileSync('src/data/courses.js', 'utf8');
const codeToEval = content.replace('export const courses = ', 'module.exports.courses = ');
fs.writeFileSync('temp_courses.cjs', codeToEval);
const { courses } = require('./temp_courses.cjs');

const newLevel1Lessons = [
  {
    id: "l1-m1",
    title: "Introduction to Statecharts",
    badge: "Checkpoint",
    questions: [
      {
        prompt: "What does a Statechart model?",
        theory: "### What is a Statechart?\n\nA Statechart is a diagram used to model the **dynamic behavior** of a single object (or a system) over time.\n\n- It describes the various **states** an object can be in.\n- It shows how the object transitions from one state to another in response to **events**.\n- It is heavily used in designing reactive systems like UI components, games, embedded systems, etc.",
        theoryMermaid: "stateDiagram-v2\n  [*] --> Idle\n  Idle --> Processing : Receive Task\n  Processing --> Idle : Task Completed\n  Processing --> Error : Task Failed\n  Error --> Idle : Reset",
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
          { id: "def-dynamic", type: "document", label: "Dynamic behavior" },
          { id: "def-static", type: "document", label: "Static structure" },
          { id: "def-db", type: "document", label: "Database schema" }
        ],
        answer: ["def-dynamic"],
        explanation: "A Statechart models dynamic behavior (how an object changes over time), unlike a Class Diagram which models static structure.",
        explanationMermaid: "graph LR\n  A(Statechart) -->|Correct| B(Dynamic behavior)\n  A -.->|Incorrect| C(Static structure)\n  style B fill:#bbf7d0,stroke:#22c55e"
      },
      {
        prompt: "Identify the States",
        theory: "### Recognizing States\n\nIn a statechart, states are typically represented by boxes with rounded corners. Events or transitions are represented by arrows connecting these states.",
        description: "Select all the boxes that represent a state. You must select at least 2 states.",
        selectableDiagram: {
          layout: "flow",
          minSelection: 2,
          nodes: [
            { id: "init", type: "initial", label: "Start", isSelectable: false },
            { id: "e-init", type: "transition", isSelectable: false },
            { id: "s-idle", type: "state", label: "Idle", isSelectable: true },
            { id: "e-receive", type: "transition", label: "Receive Task", direction: "right", isSelectable: true },
            { id: "s-processing", type: "state", label: "Processing", isSelectable: true },
            { id: "e-fail", type: "transition", label: "Task Failed", direction: "right", isSelectable: true },
            { id: "s-error", type: "state", label: "Error", isSelectable: true }
          ]
        },
        answer: ["s-idle", "s-processing", "s-error"],
        explanation: "Idle, Processing, and Error are states. The arrows (Receive Task, Task Failed) are transitions/events."
      },
      {
        prompt: "What are the applications of Statecharts?",
        theory: "### Statechart Applications\n\nStatecharts are heavily used to model complex, dynamic behaviors in systems. Common applications include designing reactive User Interfaces, controlling NPC Artificial Intelligence in games, and managing hardware logic in Embedded Systems.",
        description: "Drag and drop the correct applications of statecharts.",
        interactiveDiagram: {
          layout: "brainstorm",
          nodes: [
            { type: "state", label: "Statechart Applications" },
            { type: "slot", index: 0, slotType: "process" },
            { type: "slot", index: 1, slotType: "process" },
            { type: "slot", index: 2, slotType: "process" }
          ]
        },
        cards: [
          { id: "app-ui", type: "process", label: "Reactive UIs" },
          { id: "app-ai", type: "process", label: "NPC AI" },
          { id: "app-db", type: "process", label: "Database Schema" },
          { id: "app-hw", type: "process", label: "Hardware Control" },
          { id: "app-static", type: "process", label: "Static Models" }
        ],
        answer: ["app-ui", "app-ai", "app-hw"],
        explanation: "Statecharts model dynamic behavior, making them perfect for UIs, game AI, and hardware. Databases and static models use ER or Class diagrams instead."
      },
      {
        prompt: "Who uses Statecharts?",
        theory: "### Applications of Statecharts\n\nStatecharts are highly visual and intuitive. They are heavily used by:\n- **Software Engineers** to design reactive UIs and backend logic.\n- **Game Developers** to control NPC AI behavior.\n- **Embedded Systems Engineers** for hardware control (like microwaves or ATMs).",
        description: "Which of the following is a prime candidate for a Statechart?",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "state", label: "Best Candidate" },
            { type: "transition", label: "is" },
            { type: "slot", index: 0, slotType: "state" }
          ]
        },
        cards: [
          { id: "ans-ui", type: "process", label: "A reactive login form" },
          { id: "ans-math", type: "process", label: "A math sorting algorithm" },
          { id: "ans-dto", type: "process", label: "A simple Data Transfer Object" }
        ],
        answer: ["ans-ui"],
        explanation: "A reactive login form has multiple states (Idle, Submitting, Success, Error) triggered by user events, making it a perfect fit."
      }
    ]
  },
  {
    id: "l1-m2",
    title: "States & Events",
    badge: "Checkpoint",
    questions: [
      {
        prompt: "When does a state change occur?",
        theory: "### State Transitions\n\nA state change (transition) happens when the object receives a specific **event** (or message). \nIf the event is valid for the current state, the object will execute any associated actions and move to the target state.",
        description: "Select the component that represents an **event** causing a state transition.",
        selectableDiagram: {
          layout: "vertical",
          minSelection: 1,
          nodes: [
            { id: "s-idle", type: "state", label: "Idle", isSelectable: true },
            { id: "t-start", type: "transition", label: "StartButton", direction: "down", isSelectable: true },
            { id: "s-washing", type: "state", label: "Washing", isSelectable: true }
          ]
        },
        answer: ["t-start"],
        explanation: "Transitions are triggered by events (e.g., button clicks, timer expirations, messages from other components). Here, 'StartButton' is the event."
      },
      {
        prompt: "What defines a State?",
        theory: "### Concept of a State\n\nA **State** represents a condition or situation during the life of an object during which it satisfies some condition, performs some activity, or waits for some event.\nNames of states are usually adjectives or noun phrases (e.g., `Idle`, `Processing`, `Error`).",
        description: "Identify a good name for a State.",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "state", label: "Good State Name" },
            { type: "transition", label: "like" },
            { type: "slot", index: 0, slotType: "process" }
          ]
        },
        cards: [
          { id: "ans-s1", type: "process", label: "Processing" },
          { id: "ans-s2", type: "process", label: "CalculateTotal" },
          { id: "ans-s3", type: "process", label: "User clicks button" }
        ],
        answer: ["ans-s1"],
        explanation: "States are usually adjectives or noun phrases describing a condition. 'CalculateTotal' is an action, and 'User clicks button' is an event."
      },
      {
        prompt: "How are Events named?",
        theory: "### Concept of an Event\n\nAn **Event** is a significant occurrence that has a location in time and space. In Statecharts, events are the triggers that cause state transitions.\nNames of events are usually verbs or actions (e.g., `click`, `timeout`, `submit`).",
        description: "Select 4 correct Event names from the options below.",
        selectableDiagram: {
          layout: "flow",
          minSelection: 4,
          nodes: [
            { id: "ans-e1", type: "state", label: "onSubmit", isSelectable: true },
            { id: "ans-s1", type: "state", label: "Loading", isSelectable: true },
            { id: "ans-e2", type: "state", label: "onClick", isSelectable: true },
            { id: "ans-s2", type: "state", label: "Pending", isSelectable: true },
            { id: "ans-s3", type: "state", label: "Idle", isSelectable: true },
            { id: "ans-e3", type: "state", label: "timeout", isSelectable: true },
            { id: "ans-s4", type: "state", label: "Processing", isSelectable: true },
            { id: "ans-e4", type: "state", label: "initialize", isSelectable: true },
            { id: "ans-s5", type: "state", label: "Error", isSelectable: true },
            { id: "ans-s6", type: "state", label: "Active", isSelectable: true }
          ]
        },
        answer: ["ans-e1", "ans-e2", "ans-e3", "ans-e4"],
        explanation: "Events are usually verbs or trigger names like 'onSubmit', 'onClick', 'timeout', and 'initialize'. The others ('Loading', 'Pending', 'Idle', etc.) are conditions or states."
      }
    ]
  },
  {
    id: "l1-m3",
    title: "Advanced Basic Concepts",
    badge: "Checkpoint",
    questions: [
      {
        prompt: "Distinguish 2 types of Statecharts",
        theory: "### Behavioral vs. Protocol Statecharts\n\n1. **Behavioral State Machine**: Used to specify the exact behavior (implementation) of a part of a system.\n2. **Protocol State Machine**: Used to specify the valid sequences of events that an object may receive, without defining its exact behavior. Often used for interfaces or network protocols.",
        theoryMermaid: "graph TD\n  A[Statechart] --> B(Behavioral)\n  A --> C(Protocol)\n  B --> D[Implementation Details]\n  C --> E[Valid Event Sequences]\n  style B fill:#bfdbfe\n  style C fill:#bbf7d0",
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
          { id: "type-behav", type: "document", label: "Behavioral" },
          { id: "type-proto", type: "document", label: "Protocol" },
          { id: "type-struct", type: "document", label: "Structural" }
        ],
        answer: ["type-behav"],
        explanation: "Behavioral State Machines model the internal logic and implementation details of a system component."
      },
      {
        prompt: "Guard Conditions - Basic Idea",
        theory: "### Guard Conditions\n\nSometimes an event occurs, but we only want to change state if a specific condition is true. This is called a **Guard**.\nA guard is a boolean expression evaluated dynamically when the event is triggered. If false, the transition does not occur.",
        description: "What determines if an event is allowed to cause a transition?",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "state", label: "Allows Transition" },
            { type: "transition", label: "checked by" },
            { type: "slot", index: 0, slotType: "document" }
          ]
        },
        cards: [
          { id: "ans-g1", type: "document", label: "Guard Condition" },
          { id: "ans-g2", type: "document", label: "Event Name" },
          { id: "ans-g3", type: "document", label: "State Parameter" }
        ],
        answer: ["ans-g1"],
        explanation: "A Guard Condition must evaluate to true for the transition to proceed when the event fires."
      },
      {
        prompt: "Actions vs Transitions",
        theory: "### Actions\n\nWhen a transition occurs, it can trigger an **Action**. An action is an instantaneous, uninterruptible behavior (like updating a variable, or sending a quick message) that happens while moving between states.",
        description: "What happens during a transition?",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "transition", label: "Transition triggers" },
            { type: "slot", index: 0, slotType: "process" }
          ]
        },
        cards: [
          { id: "ans-a1", type: "process", label: "Action" },
          { id: "ans-a2", type: "process", label: "Another Event" },
          { id: "ans-a3", type: "process", label: "Class creation" }
        ],
        answer: ["ans-a1"],
        explanation: "A transition can trigger an Action to be executed as the object moves from one state to another."
      }
    ]
  },
  {
    id: "l1-m4",
    title: "Level 1 Final Review",
    badge: "Checkpoint",
    questions: [
      {
        prompt: "Combine the basic elements of a Statechart",
        theory: "### Level 1 Review\nYou've learned that a statechart consists of:\n- **Initial State**: Where the system begins.\n- **States**: The condition or situation of the system.\n- **Transitions**: The shift from one state to another.\n- **Final State**: Where the lifecycle ends.",
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
          { id: "ans-init", type: "initial-state", label: "Initial" },
          { id: "ans-final", type: "final-state", label: "Final" },
          { id: "ans-event", type: "process", label: "Event" },
          { id: "ans-state", type: "state", label: "Active" }
        ],
        answer: ["ans-init", "ans-state", "ans-final"],
        explanation: "Starts at Initial, transitions via Events between States, and ends at Final."
      },
      {
        prompt: "Identify parts of a transition",
        theory: "### Quick Recap\n\nA full transition label often looks like this conceptually: `Event [Guard] / Action`.\nLet's see if you can identify which is which.",
        description: "In the phrase `click [isValid] / submitForm()`, what is `submitForm()`?",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "process", label: "submitForm()" },
            { type: "transition", label: "is the" },
            { type: "slot", index: 0, slotType: "document" }
          ]
        },
        cards: [
          { id: "ans-p1", type: "document", label: "Action" },
          { id: "ans-p2", type: "document", label: "Event" },
          { id: "ans-p3", type: "document", label: "Guard" }
        ],
        answer: ["ans-p1"],
        explanation: "`submitForm()` is the Action that gets executed if the `click` event occurs and the `isValid` guard is true."
      },
      {
        prompt: "True or False: Statecharts model static class fields",
        theory: "### The Core Purpose\n\nRemember, Statecharts are specifically designed for dynamic, reactive logic over time, tracking states, events, and transitions.",
        description: "Statecharts are used to document the static fields and database schema of an application.",
        interactiveDiagram: {
          layout: "flow",
          nodes: [
            { type: "state", label: "Statement is" },
            { type: "transition", label: "?" },
            { type: "slot", index: 0, slotType: "document" }
          ]
        },
        cards: [
          { id: "ans-f1", type: "document", label: "False" },
          { id: "ans-f2", type: "document", label: "True" }
        ],
        answer: ["ans-f1"],
        explanation: "False! Statecharts model dynamic behavior, while Class Diagrams model static fields and schemas."
      }
    ]
  }
];

courses[0].levels[0].lessons = newLevel1Lessons;

let newContent = 'export const courses = ' + JSON.stringify(courses, null, 2) + ';';
fs.writeFileSync('src/data/courses.js', newContent);
console.log("Added more checkpoints to Level 1!");
