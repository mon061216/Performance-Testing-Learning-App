const fs = require('fs');
let content = fs.readFileSync('src/data/courses.js', 'utf8');

const newLevel2Lessons = `          {
            id: "components-3",
            title: "Action vs Activity",
            badge: "Lesson",
            questions: [
              {
                prompt: "Distinguish between Actions and Activities",
                theory: \`### Actions vs Activities\\n- **Action**: An instantaneous behavior executed during a transition (e.g., \\\`/ sendEmail()\\\`). It cannot be interrupted.\\n- **Activity**: An ongoing behavior executed while inside a State (e.g., \\\`do / blinkLight()\\\`). It can be interrupted if a transition fires.\`,
                description: "Drag the correct behavior type to its characteristic.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Instantaneous (Transition)" },
                    { type: "transition", label: "is an" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "state", label: "Ongoing (State)" },
                    { type: "transition", label: "is an" },
                    { type: "slot", index: 1, slotType: "document" }
                  ]
                },
                cards: [
                  makeCard("ans-action", "document", "Action"),
                  makeCard("ans-activity", "document", "Activity"),
                  makeCard("ans-event", "document", "Event")
                ],
                answer: ["ans-action", "ans-activity"],
                explanation: "Actions run quickly on transitions, while Activities run continuously while a system remains in a particular State.",
              }
            ]
          },
          {
            id: "components-5",
            title: "Guard Conditions",
            badge: "Lesson",
            questions: [
              {
                prompt: "What is a Guard Condition?",
                theory: \`### Guard Conditions\\nA **Guard** is a boolean condition enclosed in brackets \\\`[ ]\\\` on a transition.\\nWhen an Event occurs, the transition ONLY fires if the Guard evaluates to **True**.\\nIf it's False, the event is either ignored or another transition is evaluated.\`,
                description: "Construct a conditional transition.",
                interactiveDiagram: {
                  layout: "flow",
                  nodes: [
                    { type: "state", label: "Idle" },
                    { type: "transition", label: "Click" },
                    { type: "slot", index: 0, slotType: "document" },
                    { type: "state", label: "Processing" }
                  ]
                },
                cards: [
                  makeCard("ans-guard-1", "document", "[isValid]"),
                  makeCard("ans-guard-2", "document", "/isValid"),
                  makeCard("ans-guard-3", "document", "(isValid)")
                ],
                answer: ["ans-guard-1"],
                explanation: "Guards must be enclosed in square brackets [ ]. They act as gatekeepers for transitions.",
              }
            ]
          },
`;

const newLevel3Lessons = `          {
            id: "advanced-4",
            title: "History States",
            badge: "Lesson",
            questions: [
              {
                prompt: "Remembering past states",
                theory: \`### History Pseudo-state\\nSometimes you want a composite state to remember which sub-state was active before it was interrupted.\\nA **History State** (an H inside a circle) restores the last active sub-state when re-entering the composite state.\`,
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
                explanation: "The standard UML symbol for a history state is an H enclosed in a circle (often represented as (H) in plain text).",
              }
            ]
          },
          {
            id: "advanced-5",
            title: "Choice Pseudo-state",
            badge: "Lesson",
            questions: [
              {
                prompt: "Dynamic Branching",
                theory: \`### Choice Pseudo-state\\nA **Choice** (diamond symbol) is used for dynamic branching based on guards evaluated *during* the transition.\\nUnlike a static conditional branch, a Choice evaluates its guards after the incoming transition has fired.\`,
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
                explanation: "A Diamond shape is universally used in UML for Choice pseudo-states and decision nodes.",
              }
            ]
          },
`;

const target2 = `          {
            id: "checkpoint-2",`;
const target3 = `          {
            id: "checkpoint-3",`;

content = content.replace(target2, newLevel2Lessons + target2);
content = content.replace(target3, newLevel3Lessons + target3);

fs.writeFileSync('src/data/courses.js', content);
