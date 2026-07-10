const fs = require('fs');
let content = fs.readFileSync('src/data/courses.js', 'utf8');

const level2Replacement = `          {
            id: "checkpoint-2",
            title: "Level 2 Review",
            badge: "Checkpoint",
            questions: [
              {
                prompt: "Build a complete Transition & State logic",
                theory: \`### Level 2 Review\\nYou've learned about:\\n- **State & Activity**: \`do / Activity\` runs continuously.\\n- **Transition Syntax**: \`Event [Guard] / Action\`.\\nLet's combine them into a single workflow.\`,
                description: "Construct the full statechart by dragging elements to their correct positions.",
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
                explanation: "The Processing state performs a continuous calculate() Activity. When Submit occurs and [isValid] is true, it executes / save() and transitions to Completed.",
              }
            ]
          }`;

const level3Replacement = `          {
            id: "checkpoint-3",
            title: "Level 3 Review",
            badge: "Checkpoint",
            questions: [
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
                explanation: "We branch using a Choice Diamond, enter a complex Composite State, and can resume it later using a History State.",
              }
            ]
          }`;

// Replace Level 2 Checkpoint
content = content.replace(/\{\s*id:\s*"checkpoint-2"[\s\S]*?(?=\s*\}\s*\]\s*\}\s*,|\s*\}\s*\]\s*\}\s*\])/, level2Replacement.trim());

// Replace Level 3 Checkpoint
content = content.replace(/\{\s*id:\s*"checkpoint-3"[\s\S]*?(?=\s*\}\s*\]\s*\}\s*,|\s*\}\s*\]\s*\}\s*\])/, level3Replacement.trim());

fs.writeFileSync('src/data/courses.js', content);
