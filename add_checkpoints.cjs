const fs = require('fs');

const coursesPath = 'src/data/courses.js';
let content = fs.readFileSync(coursesPath, 'utf8');

// Normalize line endings for reliable matching
content = content.replace(/\r\n/g, '\n');

const level1Checkpoint = `,
          {
            id: "checkpoint-1",
            title: "Level 1 Checkpoint",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Combine the basic elements of a Statechart",
                theory: \`### Level 1 Review\\nYou've learned that a statechart consists of:\\n- **Initial State**: Where the system begins (solid filled circle).\\n- **States**: The condition or situation of the system.\\n- **Transitions**: The shift from one state to another, triggered by **Events**.\\n- **Final State**: Where the lifecycle ends (bullseye circle).\`,
                description: "Construct a complete, basic statechart by dragging the correct elements to their slots.",
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
                explanation: "A complete flow starts at Initial, transitions via Events between States (like Active), and ends at Final.",
              }
            ]
          }`;

const level2Checkpoint = `,
          {
            id: "checkpoint-2",
            title: "Level 2 Checkpoint",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Identify the syntax components of a transition",
                theory: \`### Level 2 Review\\nYou've learned about transition syntax: \\\`Event [Guard] / Action\\\`\\n- **Event**: The trigger (e.g., click).\\n- **Guard**: The condition that must be true (e.g., [isValid]).\\n- **Action**: The behavior executed during transition (e.g., / showLoader).\`,
                description: "Drag the correct syntax elements to form a complete transition definition.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Idle" },
                    { type: "transition", label: "" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "slot", index: 1, slotType: "document" },
                    { type: "slot", index: 2, slotType: "document" },
                    { type: "state", label: "Processing" }
                  ]
                },
                cards: [
                  makeCard("ans-action", "document", "/ Action"),
                  makeCard("ans-event", "document", "Event"),
                  makeCard("ans-guard", "document", "[Guard]")
                ],
                answer: ["ans-event", "ans-guard", "ans-action"],
                explanation: "The correct syntax order is: Event, followed by [Guard] condition, followed by / Action.",
              }
            ]
          }`;

const level3Checkpoint = `,
          {
            id: "checkpoint-3",
            title: "Level 3 Checkpoint",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Identify advanced statechart components",
                theory: \`### Level 3 Review\\nYou've learned about advanced concepts:\\n- **Composite State**: A state containing sub-states.\\n- **Orthogonal State**: A state with parallel, independent regions.\\n- **Choice Pseudo-state**: A dynamic conditional branch (diamond shape).\`,
                description: "Match the concept to its correct description.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Parallel Regions" },
                    { type: "transition", label: "is called" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "state", label: "Nested Sub-states" },
                    { type: "transition", label: "is called" },
                    { type: "slot", index: 1, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-composite", "document", "Composite State"),
                  makeCard("ans-choice", "document", "Choice State"),
                  makeCard("ans-orthogonal", "document", "Orthogonal State")
                ],
                answer: ["ans-orthogonal", "ans-composite"],
                explanation: "Parallel regions form an Orthogonal state, while nested sub-states form a Composite state.",
              }
            ]
          }`;

const target1 = `                explanation: "Behavioral State Machines model the internal logic and implementation details of a system component.",
              }
            ]
          }`;

const target2 = `                explanation: "'Locked' is an adjective describing the condition of the door, hence it is a State.",
              }
            ]
          }`;

const target3 = `                explanation: "By grouping sub-states into Active, we only need ONE 'on hook' arrow from the outer Active boundary instead of drawing 4 individual arrows from the 4 sub-states.",
              }
            ]
          }`;

// Check if targets exist
if (!content.includes(target1)) console.error("Target 1 not found!");
if (!content.includes(target2)) console.error("Target 2 not found!");
if (!content.includes(target3)) console.error("Target 3 not found!");

content = content.replace(target1, target1 + level1Checkpoint);
content = content.replace(target2, target2 + level2Checkpoint);
content = content.replace(target3, target3 + level3Checkpoint);

fs.writeFileSync(coursesPath, content);
console.log('Successfully injected checkpoints into lessons arrays!');
