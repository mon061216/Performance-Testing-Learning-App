const makeCard = (id, type, label, lane) => ({ id, type, label, lane });

export const MAX_LIVES = 3;
export const RESTOCK_MS = 2 * 60 * 60 * 1000;

export const courses = [
  {
    id: "statechart-uml",
    title: "UML Statechart Masterclass",
    subtitle: "Tìm hiểu chi tiết về biểu đồ trạng thái trong UML",
    accent: "#3b82f6",
    source: "Software Architecture & Design",
    levels: [
      {
        title: "Mở đầu khóa học",
        lessons: [
          {
        id: "intro-1",
        title: "Định nghĩa Biểu đồ",
        badge: "Bài 1",
        questions: [
          {
            prompt: "Biểu đồ trạng thái mô hình hóa điều gì?",
            theory: `
### Biểu đồ trạng thái trong UML là gì?

Biểu đồ trạng thái là một trong năm biểu đồ UML được sử dụng để mô hình hóa **bản chất động** của hệ thống.
Nó mô tả các thông tin về các trạng thái khác nhau của đối tượng, thể hiện các đối tượng chuyển từ trạng thái này sang trạng thái khác như thế nào, và hoạt động của đối tượng trong mỗi trạng thái ra sao.

Biểu đồ mô tả:
- Các **trạng thái** mà các đối tượng có thể có.
- Các **sự kiện**: tác động lên trạng thái để làm biến đổi chúng.
            `,
            theoryMermaid: `stateDiagram-v2
            direction LR
            [*] --> Idle
            Idle --> Processing : triggerEvent()
            Processing --> Completed : finish()
            Processing --> Error : fail()
            Error --> Idle : retry()
            Completed --> [*]
            `,
            description: "Chọn đáp án đúng về mục đích chính của biểu đồ trạng thái.",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "initial" },
                { type: "transition" },
                { type: "state", label: "Đối tượng" },
                { type: "transition", label: "sở hữu" },
                { type: "slot", index: 0, slotType: "state" },
                { type: "transition" },
                { type: "final" }
              ]
            },
            cards: [
              makeCard("i1-a", "state", "Bản chất động (Dynamic)"),
              makeCard("i1-x", "state", "Cấu trúc tĩnh (Static)"),
              makeCard("i1-y", "state", "Cơ sở dữ liệu"),
            ],
            answer: ["i1-a"],
            explanation: "Biểu đồ trạng thái (Statechart Diagram) là giải pháp tốt nhất để mô hình hóa hành vi động của các lớp đối tượng, thể hiện chu kỳ hoạt động của đối tượng từ khi được tạo ra cho đến khi kết thúc.",
            explanationMermaid: `graph TD
              A[Object Instance] -->|Possesses| B(Dynamic Behavior)
              A -->|Has a| C(Lifecycle)
              B --> D[States & Transitions]
              C --> D
              style B fill:#bbf7d0,stroke:#22c55e
              style C fill:#bbf7d0,stroke:#22c55e
              style D fill:#fef08a,stroke:#eab308
            `
          }
        ],
      },
      {
        id: "intro-2",
        title: "Trạng thái & Sự kiện",
        badge: "Bài 2",
        questions: [
          {
            prompt: "Sự thay đổi trạng thái xảy ra khi nào?",
            theory: `
### Trạng thái và Sự biến đổi trạng thái

Mọi đối tượng trong hệ thống đều có chu kỳ sống và mỗi thời điểm đều có một **trạng thái** nào đó.
VD: Hóa đơn (đối tượng) -> đã được trả tiền (trạng thái).

Một đối tượng sẽ thay đổi trạng thái khi có 1 việc nào đó xảy ra, gọi là **sự kiện** (Event). Khía cạnh động có hai chiều không gian:
- **Tương tác**: đối ngoại, giao tiếp với đối tượng khác.
- **Sự biến đổi trạng thái nội bộ**: đối tượng thay đổi trạng thái ra sao trước các sự kiện.
            `,
            theoryMermaid: `stateDiagram-v2
            direction LR
            Unpaid --> Processing : pay(amount)
            Processing --> Paid : confirm()
            Processing --> Unpaid : reject()
            Paid --> Shipped : ship()
            note right of Unpaid : Initial object state
            `,
            description: "Yếu tố nào làm đối tượng thay đổi trạng thái?",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Trạng thái A" },
                { type: "transition" },
                { type: "slot", index: 0, slotType: "state" },
                { type: "transition" },
                { type: "state", label: "Trạng thái B" }
              ]
            },
            cards: [
              makeCard("i2-a", "process", "Sự kiện (Event)"),
              makeCard("i2-x", "process", "Thuộc tính (Attribute)"),
              makeCard("i2-y", "process", "Tên lớp (Class Name)"),
            ],
            answer: ["i2-a"],
            explanation: "Sự kiện (Event) là tác nhân khiến đối tượng thay đổi từ trạng thái này sang trạng thái khác (gọi là sự biến đổi trạng thái nội bộ). Ví dụ: sự kiện 'trả tiền' làm hóa đơn chuyển trạng thái sang 'đã thanh toán'.",
            explanationMermaid: `graph LR
              A[Current State] -- "Event Occurs" --> B[Next State]
              B -- "Another Event" --> C[Final State]
              style A fill:#fef08a,stroke:#eab308
              style B fill:#bbf7d0,stroke:#22c55e
              style C fill:#bfdbfe,stroke:#3b82f6
            `
          }
        ],
      },
      {
        id: "intro-3",
        title: "Phân loại Biểu đồ",
        badge: "Bài 3",
        questions: [
          {
            prompt: "Phân biệt 2 loại biểu đồ trạng thái",
            theory: `
### Hai loại biểu đồ trạng thái trong UML

1. **Biểu đồ trạng thái hành vi (Behavioral):**
- Nắm bắt hành vi của một thực thể.
- Đại diện cho việc triển khai cụ thể của một phần tử.

2. **Biểu đồ trạng thái giao thức (Protocol):**
- Nắm bắt hành vi của một giao thức.
- Biểu thị cách trạng thái thay đổi liên quan đến sự kiện.
- **Không** đại diện cho việc triển khai cụ thể.
            `,
            theoryMermaid: `graph TD
            A[Statechart Diagram] --> B(Behavioral State Machine)
            A --> C(Protocol State Machine)
            B -->|Models| D[Specific Implementation]
            C -->|Models| E[Protocol & Rules]
            C -.->|No implementation| D
            style B fill:#fed7aa,stroke:#f97316
            style C fill:#e9d5ff,stroke:#a855f7
            `,
            description: "Loại biểu đồ nào ĐẠI DIỆN cho việc triển khai cụ thể?",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Mô hình hóa" },
                { type: "transition", label: "Chi tiết" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("i3-a", "decision", "Biểu đồ hành vi"),
              makeCard("i3-x", "decision", "Biểu đồ giao thức"),
            ],
            answer: ["i3-a"],
            explanation: "Biểu đồ trạng thái hành vi được sử dụng để đại diện cho việc triển khai cụ thể của một phần tử, trong khi biểu đồ trạng thái giao thức chỉ biểu thị cách trạng thái giao thức thay đổi mà không quan tâm đến triển khai chi tiết.",
            explanationMermaid: `stateDiagram-v2
            state "Behavioral" as B
            state "Protocol" as P
            B : Details internal implementation
            P : Focuses on valid transitions
            `
          }
        ]
      }
    ]
  },
  {
    title: "Cấu tạo & Nguyên lý",
    lessons: [
          {
            id: "usage-1",
        title: "Ứng dụng Biểu đồ",
        badge: "Bài 4",
        questions: [
          {
            prompt: "Khi nào cần sử dụng biểu đồ trạng thái?",
            theory: `
### Khi nào sử dụng biểu đồ trạng thái?

Biểu đồ trạng thái được sử dụng để mô tả **trừu tượng về hoạt động của hệ thống**. Các trường hợp sử dụng chính:
- Để mô hình hóa các trạng thái đối tượng của một hệ thống.
- Để mô hình hóa **hệ thống phản ứng** (Reactive system).
- Để xác định các sự kiện chịu trách nhiệm cho các thay đổi trạng thái.
            `,
            theoryMermaid: `graph TD
              A[Statecharts Applications] --> B(Modeling Objects)
              A --> C(Reactive Systems)
              A --> D(Defining Events)
              B --> B1[Lifecycles]
              B --> B2[Internal States]
              C --> C1[Event-driven Apps]
              D --> D1[Triggers & Transitions]
            `,
            description: "Chọn một trong những ứng dụng của biểu đồ trạng thái.",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Hệ thống Event-driven" },
                { type: "transition", label: "Mô hình hóa bởi" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("u1-a", "document", "Mô hình hóa hệ thống phản ứng"),
              makeCard("u1-x", "document", "Thiết kế giao diện người dùng"),
              makeCard("u1-y", "document", "Tối ưu hóa cơ sở dữ liệu"),
            ],
            answer: ["u1-a"],
            explanation: "Biểu đồ trạng thái cực kỳ hữu ích khi thiết kế các hệ thống phản ứng (Reactive systems), nơi hệ thống liên tục lắng nghe và phản ứng lại các sự kiện từ bên ngoài bằng cách thay đổi trạng thái nội bộ.",
            explanationMermaid: `graph LR
              User[User Input] -->|Event| System(Reactive System)
              System -->|State Change| UI[Update UI]
              System -->|State Change| DB[(Database)]
              style System fill:#bbf7d0,stroke:#22c55e,stroke-width:2px
            `
          }
        ],
      },
      {
        id: "components-1",
        title: "Thành phần cấu tạo",
        badge: "Bài 5",
        questions: [
          {
            prompt: "Nhận diện các thành phần cơ bản",
            theory: `
### Các thành phần cấu tạo nên biểu đồ trạng thái

1. **Initial state (Trạng thái ban đầu):** Chỉ ra sự bắt đầu (ký hiệu chấm tròn đen).
2. **State-box (Hộp trạng thái):** Biểu thị bằng hình chữ nhật góc tròn, định nghĩa một thời điểm cụ thể.
3. **Decision-box (Hộp quyết định):** Chứa một điều kiện bảo vệ, rẽ nhánh luồng.
4. **Transition (Chuyển tiếp):** Sự thay đổi từ trạng thái này sang trạng thái khác (mũi tên).
5. **Final-state (Trạng thái kết thúc):** Sự kết thúc của biểu đồ (chấm tròn có viền).
            `,
            theoryMermaid: `stateDiagram-v2
            direction LR
            [*] --> Auth_Check : Initial State
            state Auth_Check <<choice>>
            Auth_Check --> Logged_In : [isValid = true]
            Auth_Check --> Rejected : [isValid = false]
            Logged_In --> [*] : Logout (Final State)
            Rejected --> [*] : End
            `,
            description: "Ghép nối thành phần với hình dáng ký hiệu của nó.",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "slot", index: 1, slotType: "state" },
                { type: "transition", label: "biểu diễn" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("c1-a", "component", "Trạng thái ban đầu"),
              makeCard("c1-b", "component", "Chấm tròn đen"),
              makeCard("c1-x", "component", "Hình chữ nhật góc nhọn"),
            ],
            answer: ["c1-a", "c1-b"],
            explanation: "Trạng thái ban đầu (Initial state) luôn được biểu diễn bằng một dấu chấm tròn đen đặc. Các trạng thái thông thường (State-box) được biểu diễn bằng hình chữ nhật có góc bo tròn.",
            explanationMermaid: `graph TD
              A(( )) -->|Initial Node| B(State Node)
              B -->|Transition Arrow| C{Decision Node}
              C -->|Condition 1| D((( )))
              C -->|Condition 2| E((( )))
              D -.->|Final Node| F
              style A fill:#000,stroke:#000
              style D fill:#fff,stroke:#000,stroke-width:4px
              style E fill:#fff,stroke:#000,stroke-width:4px
            `
          }
        ]
      },
      {
        id: "components-2",
        title: "Cấu trúc của Trạng thái",
        badge: "Bài 6",
        questions: [
          {
            prompt: "Ba loại sự kiện chuẩn hóa",
            theory: `
### Cấu trúc chi tiết của một Trạng thái
Một trạng thái thường bao gồm ba thành phần:
1. **Tên gọi trạng thái (Name)**: Thường bắt đầu bằng động từ, ví dụ: *chờ (waiting)*, *đã thanh toán (paid)*.
2. **Biến trạng thái (State variables)**: Lưu trữ các giá trị hiện tại của trạng thái hoặc các biến đếm tạm thời.
3. **Hoạt động (Activities)**: Hành vi đối tượng thực hiện khi ở trạng thái đó.

**Có ba loại sự kiện chuẩn hóa cho hoạt động:**
- **entry** (đi vào): Các hành động khởi nhập trạng thái (VD: gán giá trị biến, gửi thông điệp).
- **exit** (đi ra): Hành động xảy ra khi rời bỏ trạng thái.
- **do** (thực hiện): Hành động thực hiện xuyên suốt trong trạng thái (VD: chờ, tính toán, gửi thông điệp).
            `,
            theoryMermaid: `stateDiagram-v2
            state StateName {
              [*] --> Activities
              note right of Activities : entry / action<br/>do / action<br/>exit / action
            }
            `,
            description: "Ghép nối đúng 3 loại sự kiện chuẩn hóa với thời điểm kích hoạt của chúng.",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Khởi nhập" },
                { type: "transition" },
                { type: "slot", index: 0, slotType: "state" },
                { type: "transition", label: "Trong khi" },
                { type: "slot", index: 1, slotType: "state" },
                { type: "transition", label: "Rời khỏi" },
                { type: "slot", index: 2, slotType: "state" }
              ]
            },
            cards: [
              makeCard("ev-do", "process", "do (Thực hiện)"),
              makeCard("ev-entry", "process", "entry (Đi vào)"),
              makeCard("ev-exit", "process", "exit (Đi ra)"),
            ],
            answer: ["ev-entry", "ev-do", "ev-exit"],
            explanation: "Quy trình của một trạng thái là: Bắt đầu đi vào (entry) -> Đang ở trong và thực hiện (do) -> Cuối cùng là thoát ra (exit).",
            explanationMermaid: `graph LR
              A[entry] --> B[do]
              B --> C[exit]
              style A fill:#bbf7d0
              style B fill:#fef08a
              style C fill:#fecaca
            `
          }
        ]
      },
      {
        id: "components-3",
        title: "Hoạt động & Cú pháp",
        badge: "Bài 7",
        questions: [
          {
            prompt: "Cú pháp và Biến đổi trạng thái nội bộ",
            theory: `
### Cú pháp hoạt động của trạng thái

Hoạt động của trạng thái được mô tả hình thức như sau:
\`event_name argument_list '/' action_exp\`

Trong đó:
- \`event_name\`: Tên sự kiện (có thể là sự kiện chuẩn: *exit, entry, do*).
- \`action_exp\`: Hoạt động cần thực hiện (VD: gọi hàm, thao tác trên biến).

Ví dụ trong trạng thái Login: \`exit / login(UserName, Password)\` có nghĩa là "khi thoát ra khỏi trạng thái, hệ thống sẽ thực hiện gọi hàm login".

### Biến đổi trạng thái không cần sự kiện ngoài
Một sự biến đổi trạng thái có thể diễn ra mà không cần bất kỳ sự kiện nào tác động từ bên ngoài. Điều này xảy ra khi **tất cả các hành động nội bộ (do) trong trạng thái đã được thực hiện xong**.
Ví dụ: Trạng thái Boot (\`do / run bios program\`) tự động chuyển sang Starting OS (\`do / load OS\`).
            `,
            theoryMermaid: `stateDiagram-v2
            direction LR
            Boot --> Starting_OS
            Starting_OS --> Starting_Applications
            note right of Boot: do / run bios program
            note right of Starting_OS: do / load OS
            note right of Starting_Applications: do / load applications
            `,
            description: "Kéo thả để tạo thành cú pháp gọi hàm login() khi RỜI KHỎI trạng thái.",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "slot", index: 0, slotType: "state" },
                { type: "transition", label: "/" },
                { type: "slot", index: 1, slotType: "state" },
              ]
            },
            cards: [
              makeCard("syn-login", "process", "login(UserName)"),
              makeCard("syn-entry", "process", "entry"),
              makeCard("syn-exit", "process", "exit"),
            ],
            answer: ["syn-exit", "syn-login"],
            explanation: "Sự kiện rời khỏi trạng thái là 'exit'. Cú pháp yêu cầu tên sự kiện đứng trước, sau đó là dấu '/' và cuối cùng là tên hành động (lời gọi hàm login).",
            explanationMermaid: `graph LR
              A(exit) --> B{/}
              B --> C(login)
              style A fill:#fecaca,stroke:#ef4444
              style C fill:#bfdbfe,stroke:#3b82f6
            `
          }
        ]
      },
      {
        id: "components-4",
        title: "Nhận biết Trạng thái",
        badge: "Bài 8",
        questions: [
          {
            prompt: "Cách xác định Trạng thái và Sự kiện",
            theory: `
### Kỹ thuật xác định Trạng thái và Sự kiện

Để xác định chính xác các trạng thái và sự kiện của một đối tượng, chúng ta cần đặt ra các câu hỏi trọng tâm:
1. Một đối tượng có thể ở **những trạng thái nào**? (Liệt kê tất cả trạng thái).
2. **Những sự kiện nào** có thể làm biến đổi trạng thái?
3. **Những trạng thái mới nào** sẽ xuất hiện khi có sự kiện?
4. **Hành vi** của đối tượng ở mỗi trạng thái là gì?
5. Sự **tương tác** giữa các đối tượng ra sao?
6. Những chuyển đổi nào là **không hợp lệ**? (VD: Khách mua hàng trả bằng thẻ tín dụng không hợp lệ thì phiên bán đó sẽ không thể thực hiện).
            `,
            theoryMermaid: `stateDiagram-v2
            direction LR
            [*] --> Unverified
            Unverified --> Processing : valid card
            Unverified --> Rejected : invalid card
            Processing --> [*]
            Rejected --> [*]
            `,
            description: "Phân loại yếu tố sau thành Trạng thái hoặc Sự kiện",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Thẻ không hợp lệ" },
                { type: "transition", label: "là một" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("nb-event", "process", "Sự kiện (Event)"),
              makeCard("nb-state", "process", "Trạng thái (State)"),
              makeCard("nb-act", "process", "Hành động (Action)"),
            ],
            answer: ["nb-event"],
            explanation: "Việc 'thẻ tín dụng không hợp lệ' là một sự kiện (event) từ bên ngoài hoặc từ hệ thống kiểm tra. Sự kiện này làm chuyển đổi trạng thái của giao dịch sang trạng thái 'Bị từ chối' (Rejected).",
            explanationMermaid: `graph LR
              A((Thẻ không hợp lệ)) -->|Kích hoạt| B{Giao dịch bị từ chối}
              style A fill:#fef08a,stroke:#eab308
            `
          }
        ]
      }
    ]
  },
  {
    title: "Phân tích Nâng cao",
    lessons: [
          {
            id: "adv-1",
        title: "Nguyên tắc vẽ Biểu đồ",
        badge: "Bài 9",
        questions: [
          {
            prompt: "Các bước và quy tắc vẽ Biểu đồ Trạng thái",
            theory: `
### Cách vẽ biểu đồ trạng thái trong UML
Việc xây dựng biểu đồ trạng thái phải tuân thủ trình tự sau:
1. **Bước 1**: Xác định trạng thái ban đầu và trạng thái kết thúc cuối cùng.
2. **Bước 2**: Xác định các trạng thái khả dĩ mà đối tượng có thể tồn tại (dựa vào các thuộc tính liên quan của đối tượng).
3. **Bước 3**: Gắn nhãn các sự kiện kích hoạt các chuyển đổi này.

### Các quy tắc quan trọng:
- Tên của mỗi chuyển trạng thái phải là **duy nhất**.
- Chỉ xây dựng biểu đồ cho những đối tượng có **nhiều hoạt động quan trọng** trong hệ thống.
- Dựa vào các **Use case (ca sử dụng)** để xây dựng biểu đồ, vì nó mô tả cách đối tượng phản ứng lại với các kịch bản của hệ thống.
            `,
            theoryMermaid: `graph TD
              A[Bước 1: Xác định Bắt đầu/Kết thúc] --> B[Bước 2: Xác định các Trạng thái]
              B --> C[Bước 3: Gắn nhãn Sự kiện]
              style A fill:#bfdbfe,stroke:#3b82f6
              style B fill:#bbf7d0,stroke:#22c55e
              style C fill:#fef08a,stroke:#eab308
            `,
            description: "Biểu đồ trạng thái KHÔNG NÊN được xây dựng dựa vào yếu tố nào?",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Cơ sở xây dựng biểu đồ" },
                { type: "transition", label: "KHÔNG DÙNG cho" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("rule-usecase", "document", "Ca sử dụng (Use case)"),
              makeCard("rule-attr", "document", "Thuộc tính đối tượng"),
              makeCard("rule-code", "document", "Mã nguồn sinh tự động"),
            ],
            answer: ["rule-code"],
            explanation: "Biểu đồ trạng thái được xây dựng dựa trên Ca sử dụng (Use case) và các thuộc tính quan trọng của đối tượng, không được sử dụng để sinh mã tự động ở khâu lập trình sau này.",
            explanationMermaid: `graph LR
              A(Biểu đồ trạng thái) -->|Đúng| B[Ca sử dụng]
              A -->|Đúng| C[Thuộc tính]
              A -.->|Sai| D[Sinh mã tự động]
              style D fill:#fecaca,stroke:#ef4444
            `
          }
        ]
      },
      {
        id: "adv-2",
        title: "Phân tích Thang máy",
        badge: "Bài 10",
        questions: [
          {
            prompt: "Hoàn thiện biểu đồ trạng thái Thang máy",
            theory: `
### Ví dụ: Hệ thống Thang máy (Elevator)

Hãy phân tích lớp **Thangmay**.
Thang máy bắt đầu hoạt động từ tầng 1 (\`On First Floor\`). 
- Nếu có người ở tầng trên bấm nút yêu cầu (\`goUp(floorNum)\`), nó chuyển sang trạng thái chuyển lên (\`Moving Up\`).
- Ở trạng thái \`Moving Up\`, thang máy liên tục thực hiện hành động: \`do / moving to floor\`.
- Khi đến nơi (\`arrived\`), nó dừng lại mở cửa ở trạng thái nghỉ (\`Idle\`).
- Nếu hết giờ chờ (\`time-out\`), nó sẽ tự động quay về tầng 1.
            `,
            theoryMermaid: `stateDiagram-v2
              [*] --> On_First_Floor
              On_First_Floor --> Moving_Up : goUp(floorNum)
              Moving_Up --> Idle : arrived
              Idle --> On_First_Floor : time-out
              note right of Moving_Up : do / moving to floor
            `,
            description: "Kéo thả sự kiện làm thang máy tự động di chuyển về tầng 1 từ trạng thái Nghỉ (Idle)?",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Nghỉ (Idle)" },
                { type: "transition", label: "Sự kiện?" },
                { type: "slot", index: 0, slotType: "state" },
                { type: "transition", label: "chuyển về" },
                { type: "state", label: "Tầng 1 (On First Floor)" }
              ]
            },
            cards: [
              makeCard("el-goup", "process", "goUp()"),
              makeCard("el-timeout", "process", "time-out"),
              makeCard("el-arrived", "process", "arrived"),
            ],
            answer: ["el-timeout"],
            explanation: "Sự kiện time-out (hết thời gian chờ) sẽ làm thang máy tự động rời khỏi trạng thái Idle và quay trở về tầng 1 (On First Floor).",
            explanationMermaid: `graph LR
              A(Idle) -->|time-out| B(On First Floor)
              style A fill:#fef08a,stroke:#eab308
              style B fill:#bbf7d0,stroke:#22c55e
            `
          }
        ]
      },
      {
        id: "adv-3",
        title: "Trạng thái Phức hợp",
        badge: "Bài 11",
        questions: [
          {
            prompt: "Hiểu về Trạng thái phức hợp (Composite State)",
            theory: `
### Khái niệm Trạng thái phức hợp

Trạng thái của một đối tượng đôi khi rất phức tạp và có thể chứa các **trạng thái con lồng bên trong** nó. Khái niệm này gọi là Trạng thái phức hợp (Composite State).

Ví dụ trong ca sử dụng "Gọi điện thoại":
Điện thoại có 2 trạng thái chính: **Idle** (Rảnh rỗi) và **Active** (Hoạt động).
Tuy nhiên, trạng thái **Active** không hề đơn giản, nó bao gồm một loạt các trạng thái con:
1. **PlayingDialTone** (Phát âm mời gọi)
2. **Dialing** (Đang quay số)
3. **Connecting** (Đang kết nối)
4. **Talking** (Đang đàm thoại)

Việc nhóm chúng vào chung trạng thái **Active** giúp biểu đồ gọn gàng hơn. Chỉ cần một mũi tên sự kiện \`on hook\` (gác máy) vẽ từ viền ngoài của trạng thái Active là đủ để biểu diễn việc ngắt kết nối từ bất kỳ trạng thái con nào bên trong nó.
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
            description: "Sử dụng trạng thái phức hợp trong biểu đồ Máy điện thoại giúp ích gì trong việc ngắt kết nối (on hook)?",
            interactiveDiagram: {
              layout: "flow",
              nodes: [
                { type: "state", label: "Trạng thái phức hợp" },
                { type: "transition", label: "giúp" },
                { type: "slot", index: 0, slotType: "state" }
              ]
            },
            cards: [
              makeCard("comp-1", "process", "Gộp chung sự kiện on hook"),
              makeCard("comp-2", "process", "Loại bỏ trạng thái Idle"),
              makeCard("comp-3", "process", "Làm biểu đồ phức tạp hơn"),
            ],
            answer: ["comp-1"],
            explanation: "Bằng cách gộp các trạng thái con vào Active, ta chỉ cần vẽ MỘT mũi tên 'on hook' duy nhất từ viền ngoài của Active thay vì phải vẽ 4 mũi tên 'on hook' từ 4 trạng thái con riêng lẻ.",
            explanationMermaid: `graph TD
              A[Trạng thái phức hợp] -->|Lợi ích| B(Đơn giản hóa biểu đồ)
              B --> C(Gộp chung các sự kiện thoát)
              style A fill:#e9d5ff,stroke:#a855f7
            `
          }
        ]
      }
    ]
  }
]
}
];
