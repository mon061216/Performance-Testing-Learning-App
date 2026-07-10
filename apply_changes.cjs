const fs = require('fs');

const coursesPath = 'src/data/courses.js';
let content = fs.readFileSync(coursesPath, 'utf8');
content = content.replace(/\r\n/g, '\n');

// LEVEL 1 CHECKPOINT
const cp1 = `,
          {
            id: "checkpoint-1",
            title: "Level 1 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Combine the basic elements of a Statechart",
                theory: \`### Level 1 Review\\nYou've learned that a statechart consists of:\\n- **Initial State**: Where the system begins.\\n- **States**: The condition or situation of the system.\\n- **Transitions**: The shift from one state to another.\\n- **Final State**: Where the lifecycle ends.\`,
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
          }`;

// LEVEL 2 CHECKPOINT (3 questions)
const cp2 = `,
          {
            id: "checkpoint-2",
            title: "Level 2 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Action vs Activity",
                theory: \`### Actions vs Activities\\n- **Action**: Instantaneous behavior on transition (\`/ sendEmail()\`).\\n- **Activity**: Ongoing behavior inside a State (\`do / blinkLight()\`).\`,
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
                theory: \`### Guard Conditions\\nA **Guard** \`[condition]\` must be true for the transition to fire.\\nEvaluated at the exact moment the event occurs.\`,
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
                theory: \`### Level 2 Review\\nYou've learned about:\\n- **State & Activity**: \\\`do / Activity\\\` runs continuously.\\n- **Transition Syntax**: \\\`Event [Guard] / Action\\\`.\\nLet's combine them into a single workflow.\`,
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
          }`;

// LEVEL 3 CHECKPOINT (3 questions)
const cp3 = `,
          {
            id: "checkpoint-3",
            title: "Level 3 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Remembering past states",
                theory: \`### History Pseudo-state\\nRestores the last active sub-state when re-entering a composite state.\`,
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
                theory: \`### Choice Pseudo-state\\nA **Choice** (diamond symbol) is used for dynamic branching based on guards evaluated *during* the transition.\`,
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
                theory: \`### Level 3 Review\\nYou've learned about:\\n- **Composite States**: Nested sub-states.\\n- **Choice Pseudo-states**: Dynamic branching.\\n- **History States**: Remembering the last active sub-state.\\nLet's review these advanced concepts.\`,
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

if (!content.includes(target1)) console.error("Target 1 not found!");
if (!content.includes(target2)) console.error("Target 2 not found!");
if (!content.includes(target3)) console.error("Target 3 not found!");

content = content.replace(target1, target1 + cp1);
content = content.replace(target2, target2 + cp2);
content = content.replace(target3, target3 + cp3);

fs.writeFileSync(coursesPath, content);
console.log('Successfully generated complete checkpoints!');
