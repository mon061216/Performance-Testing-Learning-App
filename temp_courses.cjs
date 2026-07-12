module.exports.courses = [
  {
    "id": "statechart-uml",
    "title": "UML Statecharts",
    "subtitle": "Master the art of reactive system design",
    "accent": "#3b82f6",
    "levels": [
      {
        "title": "The Basics",
        "lessons": [
          {
            "id": "l1-m1",
            "title": "Introduction to Statecharts",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "What does a Statechart model?",
                "theory": "### What is a Statechart?\n\nA Statechart is a diagram used to model the **dynamic behavior** of a single object (or a system) over time.\n\n- It describes the various **states** an object can be in.\n- It shows how the object transitions from one state to another in response to **events**.\n- It is heavily used in designing reactive systems like UI components, games, embedded systems, etc.",
                "theoryMermaid": "stateDiagram-v2\n  [*] --> Idle\n  Idle --> Processing : Receive Task\n  Processing --> Idle : Task Completed\n  Processing --> Error : Task Failed\n  Error --> Idle : Reset",
                "description": "Identify the main purpose of a Statechart among the options below.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Statechart"
                    },
                    {
                      "type": "transition",
                      "label": "used to model"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "def-dynamic",
                    "type": "document",
                    "label": "Dynamic behavior"
                  },
                  {
                    "id": "def-static",
                    "type": "document",
                    "label": "Static structure"
                  },
                  {
                    "id": "def-db",
                    "type": "document",
                    "label": "Database schema"
                  }
                ],
                "answer": [
                  "def-dynamic"
                ],
                "explanation": "A Statechart models dynamic behavior (how an object changes over time), unlike a Class Diagram which models static structure.",
                "explanationMermaid": "graph LR\n  A(Statechart) -->|Correct| B(Dynamic behavior)\n  A -.->|Incorrect| C(Static structure)\n  style B fill:#bbf7d0,stroke:#22c55e"
              },
              {
                "prompt": "Identify the States",
                "theory": "### Recognizing States\n\nIn a statechart, states are typically represented by boxes with rounded corners. Events or transitions are represented by arrows connecting these states.",
                "description": "Select all the boxes that represent a state. You must select at least 2 states.",
                "selectableDiagram": {
                  "layout": "flow",
                  "minSelection": 2,
                  "nodes": [
                    {
                      "id": "init",
                      "type": "initial",
                      "label": "Start",
                      "isSelectable": false
                    },
                    {
                      "id": "e-init",
                      "type": "transition",
                      "isSelectable": false
                    },
                    {
                      "id": "s-idle",
                      "type": "state",
                      "label": "Idle",
                      "isSelectable": true
                    },
                    {
                      "id": "e-receive",
                      "type": "transition",
                      "label": "Receive Task",
                      "direction": "right",
                      "isSelectable": true
                    },
                    {
                      "id": "s-processing",
                      "type": "state",
                      "label": "Processing",
                      "isSelectable": true
                    },
                    {
                      "id": "e-fail",
                      "type": "transition",
                      "label": "Task Failed",
                      "direction": "right",
                      "isSelectable": true
                    },
                    {
                      "id": "s-error",
                      "type": "state",
                      "label": "Error",
                      "isSelectable": true
                    }
                  ]
                },
                "answer": [
                  "s-idle",
                  "s-processing",
                  "s-error"
                ],
                "explanation": "Idle, Processing, and Error are states. The arrows (Receive Task, Task Failed) are transitions/events."
              },
              {
                "prompt": "What are the applications of Statecharts?",
                "theory": "### Statechart Applications\n\nStatecharts are heavily used to model complex, dynamic behaviors in systems. Common applications include designing reactive User Interfaces, controlling NPC Artificial Intelligence in games, and managing hardware logic in Embedded Systems.",
                "description": "Drag and drop the correct applications of statecharts.",
                "interactiveDiagram": {
                  "layout": "brainstorm",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Statechart Applications"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "process"
                    },
                    {
                      "type": "slot",
                      "index": 1,
                      "slotType": "process"
                    },
                    {
                      "type": "slot",
                      "index": 2,
                      "slotType": "process"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "app-ui",
                    "type": "process",
                    "label": "Reactive UIs"
                  },
                  {
                    "id": "app-ai",
                    "type": "process",
                    "label": "NPC AI"
                  },
                  {
                    "id": "app-db",
                    "type": "process",
                    "label": "Database Schema"
                  },
                  {
                    "id": "app-hw",
                    "type": "process",
                    "label": "Hardware Control"
                  },
                  {
                    "id": "app-static",
                    "type": "process",
                    "label": "Static Models"
                  }
                ],
                "answer": [
                  "app-ui",
                  "app-ai",
                  "app-hw"
                ],
                "explanation": "Statecharts model dynamic behavior, making them perfect for UIs, game AI, and hardware. Databases and static models use ER or Class diagrams instead."
              },
              {
                "prompt": "Who uses Statecharts?",
                "theory": "### Applications of Statecharts\n\nStatecharts are highly visual and intuitive. They are heavily used by:\n- **Software Engineers** to design reactive UIs and backend logic.\n- **Game Developers** to control NPC AI behavior.\n- **Embedded Systems Engineers** for hardware control (like microwaves or ATMs).",
                "description": "Which of the following is a prime candidate for a Statechart?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Best Candidate"
                    },
                    {
                      "type": "transition",
                      "label": "is"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-ui",
                    "type": "process",
                    "label": "A reactive login form"
                  },
                  {
                    "id": "ans-math",
                    "type": "process",
                    "label": "A math sorting algorithm"
                  },
                  {
                    "id": "ans-dto",
                    "type": "process",
                    "label": "A simple Data Transfer Object"
                  }
                ],
                "answer": [
                  "ans-ui"
                ],
                "explanation": "A reactive login form has multiple states (Idle, Submitting, Success, Error) triggered by user events, making it a perfect fit."
              }
            ]
          },
          {
            "id": "l1-m2",
            "title": "States & Events",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "When does a state change occur?",
                "theory": "### State Transitions\n\nA state change (transition) happens when the object receives a specific **event** (or message). \nIf the event is valid for the current state, the object will execute any associated actions and move to the target state.",
                "description": "Select the component that represents an **event** causing a state transition.",
                "selectableDiagram": {
                  "layout": "flow",
                  "minSelection": 1,
                  "nodes": [
                    {
                      "id": "s-idle",
                      "type": "state",
                      "label": "Idle",
                      "isSelectable": true
                    },
                    {
                      "id": "t-start",
                      "type": "transition",
                      "label": "StartButton",
                      "direction": "right",
                      "isSelectable": true
                    },
                    {
                      "id": "s-washing",
                      "type": "state",
                      "label": "Washing",
                      "isSelectable": true
                    }
                  ]
                },
                "answer": [
                  "t-start"
                ],
                "explanation": "Transitions are triggered by events (e.g., button clicks, timer expirations, messages from other components). Here, 'StartButton' is the event."
              },
              {
                "prompt": "What defines a State?",
                "theory": "### Concept of a State\n\nA **State** represents a condition or situation during the life of an object during which it satisfies some condition, performs some activity, or waits for some event.\nNames of states are usually adjectives or noun phrases (e.g., `Idle`, `Processing`, `Error`).",
                "description": "Identify a good name for a State.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Good State Name"
                    },
                    {
                      "type": "transition",
                      "label": "like"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "process"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-s1",
                    "type": "process",
                    "label": "Processing"
                  },
                  {
                    "id": "ans-s2",
                    "type": "process",
                    "label": "CalculateTotal"
                  },
                  {
                    "id": "ans-s3",
                    "type": "process",
                    "label": "User clicks button"
                  }
                ],
                "answer": [
                  "ans-s1"
                ],
                "explanation": "States are usually adjectives or noun phrases describing a condition. 'CalculateTotal' is an action, and 'User clicks button' is an event."
              },
              {
                "prompt": "How are Events named?",
                "theory": "### Concept of an Event\n\nAn **Event** is a significant occurrence that has a location in time and space. In Statecharts, events are the triggers that cause state transitions.\nNames of events are usually verbs or actions (e.g., `click`, `timeout`, `submit`).",
                "description": "Select 4 correct Event names from the options below.",
                "selectableDiagram": {
                  "layout": "flow",
                  "minSelection": 4,
                  "nodes": [
                    {
                      "id": "ans-e1",
                      "type": "state",
                      "label": "onSubmit",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s1",
                      "type": "state",
                      "label": "Loading",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-e2",
                      "type": "state",
                      "label": "onClick",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s2",
                      "type": "state",
                      "label": "Pending",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s3",
                      "type": "state",
                      "label": "Idle",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-e3",
                      "type": "state",
                      "label": "timeout",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s4",
                      "type": "state",
                      "label": "Processing",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-e4",
                      "type": "state",
                      "label": "initialize",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s5",
                      "type": "state",
                      "label": "Error",
                      "isSelectable": true
                    },
                    {
                      "id": "ans-s6",
                      "type": "state",
                      "label": "Active",
                      "isSelectable": true
                    }
                  ]
                },
                "answer": [
                  "ans-e1",
                  "ans-e2",
                  "ans-e3",
                  "ans-e4"
                ],
                "explanation": "Events are usually verbs or trigger names like 'onSubmit', 'onClick', 'timeout', and 'initialize'. The others ('Loading', 'Pending', 'Idle', etc.) are conditions or states."
              }
            ]
          },
          {
            "id": "l1-m3",
            "title": "Advanced Basic Concepts",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "Distinguish 2 types of Statecharts",
                "theory": "### Behavioral vs. Protocol Statecharts\n\n1. **Behavioral State Machine**: Used to specify the exact behavior (implementation) of a part of a system.\n2. **Protocol State Machine**: Used to specify the valid sequences of events that an object may receive, without defining its exact behavior. Often used for interfaces or network protocols.",
                "theoryMermaid": "graph TD\n  A[Statechart] --> B(Behavioral)\n  A --> C(Protocol)\n  B --> D[Implementation Details]\n  C --> E[Valid Event Sequences]\n  style B fill:#bfdbfe\n  style C fill:#bbf7d0",
                "description": "Which type of statechart describes implementation details?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Implementation Details"
                    },
                    {
                      "type": "transition",
                      "label": "modeled by"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "type-behav",
                    "type": "document",
                    "label": "Behavioral"
                  },
                  {
                    "id": "type-proto",
                    "type": "document",
                    "label": "Protocol"
                  },
                  {
                    "id": "type-struct",
                    "type": "document",
                    "label": "Structural"
                  }
                ],
                "answer": [
                  "type-behav"
                ],
                "explanation": "Behavioral State Machines model the internal logic and implementation details of a system component."
              },
              {
                "prompt": "Guard Conditions - Basic Idea",
                "theory": "### Guard Conditions\n\nSometimes an event occurs, but we only want to change state if a specific condition is true. This is called a **Guard**.\nA guard is a boolean expression evaluated dynamically when the event is triggered. If false, the transition does not occur.",
                "description": "What determines if an event is allowed to cause a transition?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Allows Transition"
                    },
                    {
                      "type": "transition",
                      "label": "checked by"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-g1",
                    "type": "document",
                    "label": "Guard Condition"
                  },
                  {
                    "id": "ans-g2",
                    "type": "document",
                    "label": "Event Name"
                  },
                  {
                    "id": "ans-g3",
                    "type": "document",
                    "label": "State Parameter"
                  }
                ],
                "answer": [
                  "ans-g1"
                ],
                "explanation": "A Guard Condition must evaluate to true for the transition to proceed when the event fires."
              },
              {
                "prompt": "Actions vs Transitions",
                "theory": "### Actions\n\nWhen a transition occurs, it can trigger an **Action**. An action is an instantaneous, uninterruptible behavior (like updating a variable, or sending a quick message) that happens while moving between states.",
                "description": "What happens during a transition?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "transition",
                      "label": "Transition triggers"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "process"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-a1",
                    "type": "process",
                    "label": "Action"
                  },
                  {
                    "id": "ans-a2",
                    "type": "process",
                    "label": "Another Event"
                  },
                  {
                    "id": "ans-a3",
                    "type": "process",
                    "label": "Class creation"
                  }
                ],
                "answer": [
                  "ans-a1"
                ],
                "explanation": "A transition can trigger an Action to be executed as the object moves from one state to another."
              }
            ]
          },
          {
            "id": "l1-m4",
            "title": "Level 1 Final Review",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "Combine the basic elements of a Statechart",
                "theory": "### Level 1 Review\nYou've learned that a statechart consists of:\n- **Initial State**: Where the system begins.\n- **States**: The condition or situation of the system.\n- **Transitions**: The shift from one state to another.\n- **Final State**: Where the lifecycle ends.",
                "description": "Construct a complete, basic statechart by dragging the correct elements.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "initial-state"
                    },
                    {
                      "type": "transition"
                    },
                    {
                      "type": "state",
                      "label": "Idle"
                    },
                    {
                      "type": "transition",
                      "label": "?"
                    },
                    {
                      "type": "slot",
                      "index": 1,
                      "slotType": "state"
                    },
                    {
                      "type": "transition",
                      "label": "?"
                    },
                    {
                      "type": "slot",
                      "index": 2,
                      "slotType": "final-state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-init",
                    "type": "initial-state",
                    "label": "Initial"
                  },
                  {
                    "id": "ans-final",
                    "type": "final-state",
                    "label": "Final"
                  },
                  {
                    "id": "ans-event",
                    "type": "process",
                    "label": "Event"
                  },
                  {
                    "id": "ans-state",
                    "type": "state",
                    "label": "Active"
                  }
                ],
                "answer": [
                  "ans-init",
                  "ans-state",
                  "ans-final"
                ],
                "explanation": "Starts at Initial, transitions via Events between States, and ends at Final."
              },
              {
                "prompt": "Identify parts of a transition",
                "theory": "### Quick Recap\n\nA full transition label often looks like this conceptually: `Event [Guard] / Action`.\nLet's see if you can identify which is which.",
                "description": "In the phrase `click [isValid] / submitForm()`, what is `submitForm()`?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "process",
                      "label": "submitForm()"
                    },
                    {
                      "type": "transition",
                      "label": "is the"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-p1",
                    "type": "document",
                    "label": "Action"
                  },
                  {
                    "id": "ans-p2",
                    "type": "document",
                    "label": "Event"
                  },
                  {
                    "id": "ans-p3",
                    "type": "document",
                    "label": "Guard"
                  }
                ],
                "answer": [
                  "ans-p1"
                ],
                "explanation": "`submitForm()` is the Action that gets executed if the `click` event occurs and the `isValid` guard is true."
              },
              {
                "prompt": "True or False: Statecharts model static class fields",
                "theory": "### The Core Purpose\n\nRemember, Statecharts are specifically designed for dynamic, reactive logic over time, tracking states, events, and transitions.",
                "description": "Statecharts are used to document the static fields and database schema of an application.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Statement is"
                    },
                    {
                      "type": "transition",
                      "label": "?"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-f1",
                    "type": "document",
                    "label": "False"
                  },
                  {
                    "id": "ans-f2",
                    "type": "document",
                    "label": "True"
                  }
                ],
                "answer": [
                  "ans-f1"
                ],
                "explanation": "False! Statecharts model dynamic behavior, while Class Diagrams model static fields and schemas."
              }
            ]
          }
        ]
      },
      {
        "title": "Components & Syntax",
        "lessons": [
          {
            "id": "l2-m1",
            "title": "Usage & Basic Components",
            "badge": "Lesson 2",
            "questions": [
              {
                "prompt": "When should you use a Statechart?",
                "theory": "\n### When is a Statechart necessary?\n\nYou should use a statechart when an object has **many distinct states** and its behavior changes drastically depending on its current state.\nExample: A Microwave (Idle, Heating, Paused, Error) is a great candidate.\nA simple `User` class with just getters/setters (Name, Age) does **not** need a statechart.\n                ",
                "theoryMermaid": "graph LR\n                  A[Complex Object] -->|Yes| B(Statechart)\n                  C[Simple Data Class] -->|No| D(Don't use)\n                  style B fill:#bbf7d0,stroke:#22c55e\n                  style D fill:#fecaca,stroke:#ef4444\n                ",
                "description": "Select the most appropriate case to use a Statechart.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Statechart Use Case"
                    },
                    {
                      "type": "transition",
                      "label": "applies to"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "use-complex",
                    "type": "document",
                    "label": "Objects with complex states"
                  },
                  {
                    "id": "use-data",
                    "type": "document",
                    "label": "Data Transfer Objects (DTO)"
                  },
                  {
                    "id": "use-algo",
                    "type": "document",
                    "label": "Mathematical algorithms"
                  }
                ],
                "answer": [
                  "use-complex"
                ],
                "explanation": "Statecharts are best for objects with complex reactive behavior depending on their current state."
              },
              {
                "prompt": "Identify basic components",
                "theory": "\n### Core Components\n\n1. **State**: A condition or situation during the life of an object.\n2. **Transition**: A relationship between two states indicating that an object will perform certain actions and enter the second state.\n3. **Event**: An occurrence that triggers a transition.\n4. **Initial/Final State**: Special markers showing where the machine starts and ends.\n                ",
                "theoryMermaid": "stateDiagram-v2\n                  [*] --> Active\n                  Active --> [*]\n                  Active --> Paused : PauseEvent\n                  Paused --> Active : ResumeEvent\n                ",
                "description": "What represents the occurrence that triggers a state transition?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Triggers Transition"
                    },
                    {
                      "type": "transition",
                      "label": "is called"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "comp-event",
                    "type": "process",
                    "label": "Event"
                  },
                  {
                    "id": "comp-state",
                    "type": "process",
                    "label": "State"
                  },
                  {
                    "id": "comp-action",
                    "type": "process",
                    "label": "Action"
                  }
                ],
                "answer": [
                  "comp-event"
                ],
                "explanation": "An Event is what triggers a transition from one state to another."
              },
              {
                "prompt": "Three standard events",
                "theory": "\n### Internal Actions inside a State\n\nWithin a state, there are 3 standard predefined events:\n- **entry**: Action executed as soon as the object enters the state.\n- **exit**: Action executed just before the object leaves the state.\n- **do**: Action executed continuously (or a long-running activity) while the object remains in the state.\n                ",
                "theoryMermaid": "stateDiagram-v2\n                  state \"Typing\" as T\n                  note right of T\n                    entry / startTimer\n                    do / blinkCursor\n                    exit / saveDraft\n                  end note\n                ",
                "description": "Which action runs continuously while staying in a state?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Continuous Action"
                    },
                    {
                      "type": "transition",
                      "label": "keyword"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "process"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "evt-do",
                    "type": "process",
                    "label": "do"
                  },
                  {
                    "id": "evt-entry",
                    "type": "process",
                    "label": "entry"
                  },
                  {
                    "id": "evt-exit",
                    "type": "process",
                    "label": "exit"
                  }
                ],
                "answer": [
                  "evt-do"
                ],
                "explanation": "The 'do' activity runs continuously as long as the state is active."
              }
            ]
          },
          {
            "id": "l2-m2",
            "title": "Transition Syntax & Elements",
            "badge": "Lesson 3",
            "questions": [
              {
                "prompt": "Syntax & Internal Transitions",
                "theory": "\n### Transition Syntax\n\nThe standard format for a transition label is:\n`Event [Guard] / Action`\n- **Event**: What triggered it.\n- **Guard**: A boolean condition that MUST be true for the transition to happen.\n- **Action**: A quick, uninterruptible behavior executed during the transition.\n\n### Internal Transition\nIf an event happens but the state **doesn't change** (it stays in the same state), it's an internal transition. (e.g. `typeKey / updateDisplay`).\n                ",
                "theoryMermaid": "stateDiagram-v2\n                  Idle --> Processing : clickBtn [isValid] / showLoader\n                ",
                "description": "What part of the syntax determines if a transition is allowed to proceed?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Condition check"
                    },
                    {
                      "type": "transition",
                      "label": "keyword"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "process"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "syn-guard",
                    "type": "process",
                    "label": "[Guard]"
                  },
                  {
                    "id": "syn-event",
                    "type": "process",
                    "label": "Event"
                  },
                  {
                    "id": "syn-action",
                    "type": "process",
                    "label": "/ Action"
                  }
                ],
                "answer": [
                  "syn-guard"
                ],
                "explanation": "The Guard is a boolean condition in brackets that must evaluate to true."
              },
              {
                "prompt": "How to identify States and Events",
                "theory": "\n### Tips for Requirements Analysis\n\nWhen reading a system requirement document:\n- **States** usually correspond to **adjectives** or conditions describing the object (e.g., *empty*, *running*, *pending*).\n- **Events** usually correspond to **verbs** or actions happening to the object (e.g., *click*, *expire*, *submit*).\n                ",
                "theoryMermaid": "graph LR\n                  A[Adjectives] -->|become| B(States)\n                  C[Verbs] -->|become| D(Events)\n                  style B fill:#bfdbfe\n                  style D fill:#fef08a\n                ",
                "description": "In 'The door is locked until unlocked by the user', what is 'locked'?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "process",
                      "label": "'locked'"
                    },
                    {
                      "type": "transition",
                      "label": "maps to"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "map-state",
                    "type": "state",
                    "label": "State"
                  },
                  {
                    "id": "map-event",
                    "type": "process",
                    "label": "Event"
                  },
                  {
                    "id": "map-action",
                    "type": "process",
                    "label": "Action"
                  }
                ],
                "answer": [
                  "map-state"
                ],
                "explanation": "'Locked' is an adjective describing the condition of the door, hence it is a State."
              }
            ]
          },
          {
            "id": "checkpoint-2",
            "title": "Level 2 Review",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "Action vs Activity",
                "theory": "### Actions vs Activities\n- **Action**: Instantaneous behavior on transition (`/ sendEmail()`).\n- **Activity**: Ongoing behavior inside a State (`do / blinkLight()`).",
                "description": "Drag the behaviors to their correct categories.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Instantaneous (Transition)"
                    },
                    {
                      "type": "transition",
                      "label": "is called"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    },
                    {
                      "type": "state",
                      "label": "Ongoing (State)"
                    },
                    {
                      "type": "transition",
                      "label": "is called"
                    },
                    {
                      "type": "slot",
                      "index": 1,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-act-1",
                    "type": "document",
                    "label": "Action"
                  },
                  {
                    "id": "ans-act-2",
                    "type": "document",
                    "label": "Activity"
                  }
                ],
                "answer": [
                  "ans-act-1",
                  "ans-act-2"
                ],
                "explanation": "Action happens during transition. Activity runs while inside a state."
              },
              {
                "prompt": "Guard Conditions",
                "theory": "### Guard Conditions\nA **Guard** `[condition]` must be true for the transition to fire.\nEvaluated at the exact moment the event occurs.",
                "description": "Select the correct syntax for a Guard.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Guard Syntax"
                    },
                    {
                      "type": "transition",
                      "label": "uses format"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-g-1",
                    "type": "document",
                    "label": "[isValid]"
                  },
                  {
                    "id": "ans-g-2",
                    "type": "document",
                    "label": "(isValid)"
                  },
                  {
                    "id": "ans-g-3",
                    "type": "document",
                    "label": "{isValid}"
                  }
                ],
                "answer": [
                  "ans-g-1"
                ],
                "explanation": "Guards are enclosed in square brackets [ ]."
              },
              {
                "prompt": "Build a complete Transition & State logic",
                "theory": "### Level 2 Review\nYou've learned about:\n- **State & Activity**: `do / Activity` runs continuously.\n- **Transition Syntax**: `Event [Guard] / Action`.\nLet's combine them into a single workflow.",
                "description": "Construct the full statechart by dragging elements.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    },
                    {
                      "type": "transition",
                      "label": "do /"
                    },
                    {
                      "type": "slot",
                      "index": 1,
                      "slotType": "document"
                    },
                    {
                      "type": "transition",
                      "label": "trigger:"
                    },
                    {
                      "type": "slot",
                      "index": 2,
                      "slotType": "document"
                    },
                    {
                      "type": "slot",
                      "index": 3,
                      "slotType": "document"
                    },
                    {
                      "type": "slot",
                      "index": 4,
                      "slotType": "document"
                    },
                    {
                      "type": "state",
                      "label": "Completed"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-cp2-1",
                    "type": "state",
                    "label": "Processing"
                  },
                  {
                    "id": "ans-cp2-2",
                    "type": "document",
                    "label": "calculate()"
                  },
                  {
                    "id": "ans-cp2-3",
                    "type": "document",
                    "label": "Submit"
                  },
                  {
                    "id": "ans-cp2-4",
                    "type": "document",
                    "label": "[isValid]"
                  },
                  {
                    "id": "ans-cp2-5",
                    "type": "document",
                    "label": "/ save()"
                  }
                ],
                "answer": [
                  "ans-cp2-1",
                  "ans-cp2-2",
                  "ans-cp2-3",
                  "ans-cp2-4",
                  "ans-cp2-5"
                ],
                "explanation": "The Processing state performs calculate(). When Submit occurs and [isValid] is true, it executes / save()."
              }
            ]
          }
        ]
      },
      {
        "title": "Advanced Concepts",
        "lessons": [
          {
            "id": "l3-m1",
            "title": "Drawing & Composite States",
            "badge": "Lesson 4",
            "questions": [
              {
                "prompt": "Steps and Rules for Drawing",
                "theory": "\n### How to draw a UML Statechart\nBuilding a statechart must follow this sequence:\n1. **Step 1**: Identify the initial and final states.\n2. **Step 2**: Identify all possible states the object can exist in (based on relevant attributes).\n3. **Step 3**: Label the events that trigger these transitions.\n\n### Important Rules:\n- The name of each transition must be **unique**.\n- Only build diagrams for objects with **significant dynamic behavior**.\n- Base the diagram on **Use cases**, as they describe how the object reacts to system scenarios.\n                ",
                "theoryMermaid": "graph TD\n                  A[Step 1: Init/Final] --> B[Step 2: States]\n                  B --> C[Step 3: Events]\n                  style A fill:#bfdbfe,stroke:#3b82f6\n                  style B fill:#bbf7d0,stroke:#22c55e\n                  style C fill:#fef08a,stroke:#eab308\n                ",
                "description": "What should NOT be the basis for building a statechart?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Statechart Basis"
                    },
                    {
                      "type": "transition",
                      "label": "NOT used for"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "rule-usecase",
                    "type": "document",
                    "label": "Use cases"
                  },
                  {
                    "id": "rule-attr",
                    "type": "document",
                    "label": "Object attributes"
                  },
                  {
                    "id": "rule-code",
                    "type": "document",
                    "label": "Auto-generating code"
                  }
                ],
                "answer": [
                  "rule-code"
                ],
                "explanation": "Statecharts are built based on Use cases and important object attributes, not primarily for auto-generating code during implementation."
              },
              {
                "prompt": "Complete the Elevator statechart",
                "theory": "\n### Example: Elevator System\n\nLet's analyze the **Elevator** class.\nThe elevator starts at floor 1 (`On First Floor`). \n- If a user presses a request button (`goUp(floorNum)`), it transitions to the `Moving Up` state.\n- In the `Moving Up` state, it continuously executes: `do / moving to floor`.\n- When it arrives (`arrived`), it stops and enters the `Idle` state.\n- If a timeout occurs (`time-out`), it automatically returns to floor 1.\n                ",
                "theoryMermaid": "stateDiagram-v2\n                  [*] --> On_First_Floor\n                  On_First_Floor --> Moving_Up : goUp(floorNum)\n                  Moving_Up --> Idle : arrived\n                  Idle --> On_First_Floor : time-out\n                  note right of Moving_Up : do / moving to floor\n                ",
                "description": "Drag the event that makes the elevator return to floor 1 from Idle.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Idle"
                    },
                    {
                      "type": "transition",
                      "label": "Event?"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    },
                    {
                      "type": "transition",
                      "label": "returns to"
                    },
                    {
                      "type": "state",
                      "label": "On First Floor"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "el-goup",
                    "type": "process",
                    "label": "goUp()"
                  },
                  {
                    "id": "el-timeout",
                    "type": "process",
                    "label": "time-out"
                  },
                  {
                    "id": "el-arrived",
                    "type": "process",
                    "label": "arrived"
                  }
                ],
                "answer": [
                  "el-timeout"
                ],
                "explanation": "The 'time-out' event causes the elevator to leave the Idle state and return to On First Floor automatically."
              },
              {
                "prompt": "Understand Composite States",
                "theory": "\n### Concept of Composite States\n\nSometimes the state of an object is very complex and can contain **nested sub-states**. This is called a Composite State.\n\nFor example, in a \"Phone Call\" use case:\nThe phone has 2 main states: **Idle** and **Active**.\nHowever, **Active** is not simple; it contains a sequence of sub-states:\n1. **PlayingDialTone**\n2. **Dialing**\n3. **Connecting**\n4. **Talking**\n\nGrouping them into the **Active** composite state simplifies the diagram. A single `on hook` event arrow drawn from the outer boundary of Active is enough to represent disconnection from any of its sub-states.\n                ",
                "theoryMermaid": "stateDiagram-v2\n                  [*] --> Idle\n                  Idle --> Active : off hook\n                  state Active {\n                    [*] --> PlayingDialTone\n                    PlayingDialTone --> Dialing : digit\n                    Dialing --> Connecting : completed\n                    Connecting --> Talking : connected\n                  }\n                  Active --> Idle : on hook\n                ",
                "description": "How does using a composite state help in the Phone example regarding the 'on hook' event?",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Composite State"
                    },
                    {
                      "type": "transition",
                      "label": "helps to"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "state"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "comp-1",
                    "type": "process",
                    "label": "Group the 'on hook' event"
                  },
                  {
                    "id": "comp-2",
                    "type": "process",
                    "label": "Remove the Idle state"
                  },
                  {
                    "id": "comp-3",
                    "type": "process",
                    "label": "Make diagram more complex"
                  }
                ],
                "answer": [
                  "comp-1"
                ],
                "explanation": "By grouping sub-states into Active, we only need ONE 'on hook' arrow from the outer Active boundary instead of drawing 4 individual arrows from the 4 sub-states."
              }
            ]
          },
          {
            "id": "checkpoint-3",
            "title": "Level 3 Review",
            "badge": "Checkpoint",
            "questions": [
              {
                "prompt": "Remembering past states",
                "theory": "### History Pseudo-state\nRestores the last active sub-state when re-entering a composite state.",
                "description": "Identify the History State symbol.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Remembers past state"
                    },
                    {
                      "type": "transition",
                      "label": "uses symbol"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-hist-1",
                    "type": "document",
                    "label": "( H )"
                  },
                  {
                    "id": "ans-hist-2",
                    "type": "document",
                    "label": "[ H ]"
                  },
                  {
                    "id": "ans-hist-3",
                    "type": "document",
                    "label": "{ H }"
                  }
                ],
                "answer": [
                  "ans-hist-1"
                ],
                "explanation": "The standard UML symbol for a history state is an H enclosed in a circle."
              },
              {
                "prompt": "Dynamic Branching",
                "theory": "### Choice Pseudo-state\nA **Choice** (diamond symbol) is used for dynamic branching based on guards evaluated *during* the transition.",
                "description": "Select the shape used for Choice pseudo-states.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Choice / Branching"
                    },
                    {
                      "type": "transition",
                      "label": "uses shape"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-choice-1",
                    "type": "document",
                    "label": "Diamond"
                  },
                  {
                    "id": "ans-choice-2",
                    "type": "document",
                    "label": "Rectangle"
                  },
                  {
                    "id": "ans-choice-3",
                    "type": "document",
                    "label": "Circle"
                  }
                ],
                "answer": [
                  "ans-choice-1"
                ],
                "explanation": "A Diamond shape is universally used in UML for Choice pseudo-states."
              },
              {
                "prompt": "Identify Advanced Statechart Features",
                "theory": "### Level 3 Review\nYou've learned about:\n- **Composite States**: Nested sub-states.\n- **Choice Pseudo-states**: Dynamic branching.\n- **History States**: Remembering the last active sub-state.\nLet's review these advanced concepts.",
                "description": "Match the advanced feature to its correct position in the flow.",
                "interactiveDiagram": {
                  "layout": "flow",
                  "nodes": [
                    {
                      "type": "state",
                      "label": "Evaluate"
                    },
                    {
                      "type": "transition",
                      "label": "branch via"
                    },
                    {
                      "type": "slot",
                      "index": 0,
                      "slotType": "document"
                    },
                    {
                      "type": "transition",
                      "label": "success"
                    },
                    {
                      "type": "slot",
                      "index": 1,
                      "slotType": "document"
                    },
                    {
                      "type": "transition",
                      "label": "resume later via"
                    },
                    {
                      "type": "slot",
                      "index": 2,
                      "slotType": "document"
                    }
                  ]
                },
                "cards": [
                  {
                    "id": "ans-cp3-1",
                    "type": "document",
                    "label": "Choice Diamond"
                  },
                  {
                    "id": "ans-cp3-2",
                    "type": "document",
                    "label": "Composite State"
                  },
                  {
                    "id": "ans-cp3-3",
                    "type": "document",
                    "label": "History (H)"
                  }
                ],
                "answer": [
                  "ans-cp3-1",
                  "ans-cp3-2",
                  "ans-cp3-3"
                ],
                "explanation": "We branch using a Choice Diamond, enter a complex Composite State, and can resume it later using a History State."
              }
            ]
          }
        ]
      }
    ]
  }
];