const makeCard = (id, type, label, lane) => ({ id, type, label, lane });

export const MAX_LIVES = 3;
export const RESTOCK_MS = 2 * 60 * 60 * 1000;

export const courses = [
  {
    id: "perf-testing",
    title: "Performance Testing Masterclass",
    subtitle: "Lộ trình toàn diện từ cơ bản đến nâng cao",
    accent: "#58cc02",
    source: "System Design & Performance",
    lessons: [
      {
        id: "metrics-1",
        title: "Throughput (Sức tải)",
        badge: "Bài 1",
        questions: [
          {
            prompt: "Hiểu đúng về Throughput",
            theory: `
### Throughput (Băng thông / Sức tải)

Số lượng request được hệ thống xử lý thành công trong một đơn vị thời gian. 
Đây là chỉ số quan trọng để đánh giá hệ thống có thể chịu được bao nhiêu người dùng cùng lúc.

Thường được đo bằng:
- **RPS** (Requests Per Second)
- **TPS** (Transactions Per Second)
            `,
            theoryMermaid: `sequenceDiagram
            Client 1->>Server: 100 Requests
            Client 2->>Server: 200 Requests
            Note over Server: Throughput = 300 RPS
            `,
            description: "Chọn khái niệm phản ánh đúng sức tải của hệ thống.",
            slots: ["Khái niệm", "Đơn vị đo"],
            cards: [
              makeCard("m1-a", "state", "Số lượng request / s"),
              makeCard("m1-b", "state", "Thời gian phản hồi"),
              makeCard("m1-c", "state", "RPS / TPS"),
              makeCard("m1-x", "state", "Giây (s)"),
            ],
            answer: ["m1-a", "m1-c"],
            explanation: "Throughput (Sức tải) là khả năng phục vụ của server, giống như số lượng khách một nhà hàng phục vụ được trong 1 giờ. Trong IT, nó là số lượng Request hoặc Transaction được xử lý thành công trong 1 giây (RPS/TPS). Nếu Throughput của hệ thống chỉ là 100 RPS nhưng có 200 người truy cập, hệ thống sẽ bắt đầu bị chậm hoặc quá tải. Do đó, đây là chỉ số sống còn đầu tiên cần đo lường.",
            explanationMermaid: `graph LR
              Users[200 Users] -->|Gửi request| Server((Server))
              Server -->|Chỉ xử lý được| RPS[100 RPS]
              style Server fill:#fca5a5,stroke:#ef4444
            `
          }
        ],
      },
      {
        id: "metrics-2",
        title: "Response Time vs Latency",
        badge: "Bài 2",
        questions: [
          {
            prompt: "Phân biệt Latency và Response Time",
            theory: `
### Latency vs. Response Time

Nhiều người lầm tưởng hai khái niệm này là một.
- **Latency (Độ trễ):** Là thời gian byte dữ liệu đầu tiên di chuyển từ Client đến Server và quay lại. Chỉ phụ thuộc vào tốc độ mạng.
- **Response Time (Thời gian phản hồi):** Là tổng thời gian từ lúc bấm gửi cho đến khi Client nhận được byte dữ liệu cuối cùng. Nó bao gồm cả **Latency** và **Thời gian Server xử lý dữ liệu**.
            `,
            theoryMermaid: `sequenceDiagram
            Client->>Network: Bắt đầu gửi (t=0)
            Network->>Server: Đến Server (Latency = 50ms)
            Note over Server: Xử lý Logic & DB (100ms)
            Server->>Network: Trả về
            Network->>Client: Nhận được (t=200ms)
            Note over Client: Response Time = 200ms
            `,
            description: "Sắp xếp đúng định nghĩa.",
            slots: ["Chỉ đo thời gian truyền mạng", "Bao gồm cả thời gian xử lý"],
            cards: [
              makeCard("m2-a", "process", "Latency"),
              makeCard("m2-b", "process", "Response Time"),
              makeCard("m2-x", "process", "Throughput"),
            ],
            answer: ["m2-a", "m2-b"],
            explanation: "Latency chỉ đo lường khoảng cách mạng vật lý (ví dụ: cáp quang từ VN sang Mỹ mất 200ms). Nhưng Response Time bao gồm cả Latency VÀ thời gian Code/Database của bạn xử lý dữ liệu. Nếu Response Time chậm nhưng Latency thấp, tức là do code của bạn có vấn đề hoặc DB truy vấn chậm, chứ không phải do mạng lõi.",
            explanationMermaid: `graph TD
              A[Client] -- Latency --> B[Server]
              B -- Xử lý Code/DB --> B
              B -- Latency --> A
              style B fill:#bbf7d0,stroke:#22c55e
            `
          }
        ],
      },
      {
        id: "metrics-3",
        title: "Bản chất Percentiles",
        badge: "Bài 3",
        questions: [
          {
            prompt: "Tại sao không dùng Average (Trung bình)?",
            theory: `
### Bản chất của Percentiles (p50, p90, p95, p99)

**Không bao giờ dùng giá trị trung bình (Average)** để đánh giá hiệu năng vì nó che giấu các điểm dị biệt (Outliers).
Ví dụ: 99 người dùng load mất 100ms, nhưng 1 khách VIP bị kẹt mất 10s. Điểm trung bình là ~199ms trông rất đẹp, nhưng khách VIP đã rời bỏ bạn.

Sử dụng **Percentile (p99)**: Nếu p99 = 200ms, nghĩa là 99% người dùng có Response Time < 200ms.
            `,
            theoryMermaid: `pie title Phân bổ Response Time (100 Users)
            "Dưới 200ms (99 Users)" : 99
            "Trên 10 giây (1 User VIP)" : 1
            `,
            description: "Chọn cách đo lường tốt nhất để đảm bảo 99% người dùng hài lòng.",
            slots: ["Chỉ số dễ che giấu lỗi", "Chỉ số phản ánh trải nghiệm thực"],
            cards: [
              makeCard("m3-a", "decision", "Average"),
              makeCard("m3-b", "decision", "Percentiles (p99)"),
              makeCard("m3-x", "decision", "Max Time"),
            ],
            answer: ["m3-a", "m3-b"],
            explanation: "Giá trị trung bình (Average) rất dễ bị làm sai lệch nếu có 1-2 request quá chậm hoặc quá nhanh. Trong Performance Testing, chúng ta luôn dùng Percentile. Nếu p99 (Percentile 99) = 1.5s, điều này khẳng định chắc nịch rằng: Cứ 100 người dùng thì 99 người sẽ nhận được phản hồi dưới 1.5s. Nó mang lại bức tranh thực tế và khắt khe hơn rất nhiều.",
            explanationMermaid: `graph LR
              P[Percentiles p99 = 1.5s] --> A(99 Users < 1.5s)
              P --> B(1 User > 1.5s)
              style A fill:#bbf7d0,stroke:#22c55e
              style B fill:#fca5a5,stroke:#ef4444
            `
          }
        ],
      },
      {
        id: "metrics-4",
        title: "Error Rate",
        badge: "Bài 4",
        questions: [
          {
            prompt: "Nhận biết Error Rate",
            theory: `
### Error Rate (Tỷ lệ lỗi)

Tỷ lệ phần trăm các request bị lỗi trên tổng số request gửi đi.
Lỗi ở đây thường tính là:
- **HTTP 5xx:** Lỗi từ phía Server (Ví dụ: 500 Internal Server Error, 502 Bad Gateway).
- **Timeout:** Kết nối quá hạn (thường do server quá tải không kịp phản hồi).

Các lỗi HTTP 4xx (như 400 Bad Request, 404 Not Found) thường là lỗi client, ít tính vào Error Rate hiệu năng.
            `,
            theoryMermaid: `pie title Trạng thái 1000 Requests
            "200 OK (Thành công)" : 950
            "500 Internal Error" : 40
            "Timeout" : 10
            `,
            description: "Mã lỗi nào thường được tính vào Error Rate khi kiểm thử hiệu năng?",
            slots: ["Lỗi tính vào Error Rate"],
            cards: [
              makeCard("m4-a", "state", "HTTP 500 / Timeout"),
              makeCard("m4-x", "state", "HTTP 404 Not Found"),
              makeCard("m4-y", "state", "HTTP 200 OK"),
            ],
            answer: ["m4-a"],
            explanation: "Lỗi 4xx là do Client gửi sai (VD: vào nhầm link 404). Nhưng lỗi 5xx hoặc Timeout chính là dấu hiệu hệ thống của bạn đang gào thét vì cạn kiệt tài nguyên (như cạn RAM, chết tiến trình) khi đối mặt với tải cao. Do đó, theo dõi tỉ lệ HTTP 500 là vô cùng quan trọng khi tiến hành Load Testing.",
            explanationMermaid: `graph TD
              A[Lỗi 4xx] --> B(Lỗi do người dùng)
              C[Lỗi 5xx / Timeout] --> D(Server quá tải!)
              style C fill:#fca5a5,stroke:#ef4444
              style D fill:#ef4444,stroke:#991b1b,color:#fff
            `
          }
        ],
      },
      {
        id: "types-1",
        title: "Load Testing",
        badge: "Bài 5",
        questions: [
          {
            prompt: "Mục đích của Load Testing",
            theory: `
### Load Testing (Kiểm thử mức tải dự kiến)

Thử nghiệm hệ thống với lượng người dùng tăng dần cho đến **mức tối đa dự kiến trong thực tế** (Bình thường mới).
Mục tiêu chính: Xác định hệ thống có đạt chuẩn Cam kết chất lượng dịch vụ (SLA) hay không.
            `,
            theoryMermaid: `stateDiagram-v2
            [*] --> Khởi_tạo
            Khởi_tạo --> Tăng_dần_Tải_đến_SLA
            Tăng_dần_Tải_đến_SLA --> Duy_trì_ổn_định
            Duy_trì_ổn_định --> [*]
            `,
            description: "Chọn mục tiêu tương ứng.",
            slots: ["Mục tiêu chính"],
            cards: [
              makeCard("t1-a", "document", "Đạt chuẩn SLA?"),
              makeCard("t1-x", "document", "Bao giờ sập?"),
            ],
            answer: ["t1-a"],
            explanation: "Load Testing không dùng để phá hủy hệ thống. Nó giống như việc chạy rà trơn động cơ. Bạn chỉ tạo ra tải mô phỏng lượng người dùng cao nhất trong ngày bình thường (Peak Load). Mục tiêu là chứng minh hệ thống vẫn phản hồi < 2s (Đạt chuẩn SLA) khi có 10.000 user truy cập cùng lúc.",
            explanationMermaid: `graph LR
              A[Mức tải tăng dần] --> B(Đạt Peak Load: 10k Users)
              B --> C{Response < 2s?}
              C -->|Có| D[Pass SLA]
              C -->|Không| E[Fail SLA]
              style D fill:#bbf7d0,stroke:#22c55e
            `
          }
        ]
      },
      {
        id: "types-2",
        title: "Stress Testing",
        badge: "Bài 6",
        questions: [
          {
            prompt: "Mục đích của Stress Testing",
            theory: `
### Stress Testing (Kiểm thử giới hạn / Ép tải)

Tiếp tục tăng tải vượt mức thiết kế cho đến khi **hệ thống bị sập** (Break Point).
Mục tiêu: 
1. Xem khi sập hệ thống sẽ báo lỗi gì? 
2. Nó có khả năng tự phục hồi (Self-healing) khi giảm tải hay không?
            `,
            theoryMermaid: `stateDiagram-v2
            [*] --> Tăng_Tải
            Tăng_Tải --> Vượt_Ngưỡng
            Vượt_Ngưỡng --> Sập_Hệ_Thống(Break_Point)
            Sập_Hệ_Thống(Break_Point) --> Tự_Phục_Hồi?
            `,
            description: "Stress test tìm kiếm điều gì?",
            slots: ["Tìm kiếm", "Khả năng"],
            cards: [
              makeCard("t2-a", "document", "Điểm Sập (Break Point)"),
              makeCard("t2-b", "document", "Tự phục hồi"),
              makeCard("t2-x", "document", "Chuẩn SLA"),
            ],
            answer: ["t2-a", "t2-b"],
            explanation: "Ngược lại với Load Testing, Stress Testing cố tình phá hủy hệ thống. Ta đẩy tải liên tục lên 20k, 50k, 100k user cho tới khi server nổ tung (crash). Việc này giúp kỹ sư biết chính xác 'Điểm tới hạn' của server nằm ở đâu, và quan trọng nhất là xem khi sập thì mất dữ liệu không, và khi hết tải thì server có tự động khởi động lại (Self-healing) thành công hay không.",
            explanationMermaid: `graph TD
              A[Ép tải liên tục] --> B[Quá tải 100k Users]
              B --> C[Server Crash / Điểm sập]
              C -.-> D(Ngừng bơm tải)
              D --> E{Tự phục hồi?}
              style C fill:#fca5a5,stroke:#ef4444
            `
          }
        ]
      },
      {
        id: "types-3",
        title: "Endurance Testing",
        badge: "Bài 7",
        questions: [
          {
            prompt: "Mục đích của Endurance / Soak Testing",
            theory: `
### Endurance / Soak Testing (Kiểm thử độ bền)

Giữ hệ thống ở mức tải cao liên tục trong **một thời gian dài** (24 giờ, 48 giờ hoặc cả tuần).
Mục tiêu: Tìm kiếm lỗi rò rỉ bộ nhớ (Memory Leak) hoặc tràn phân vùng ổ cứng do ghi log quá nhiều.
            `,
            theoryMermaid: `graph LR
            A[Chạy liên tục] --> B(RAM: 2GB)
            B --> C(RAM: 4GB)
            C --> D(RAM: 8GB)
            D --> E(RAM: 16GB - Tràn RAM!)
            E --> F[Server Sập]
            `,
            description: "Endurance testing dùng để phát hiện lỗi ngầm nào?",
            slots: ["Lỗi phổ biến"],
            cards: [
              makeCard("t3-a", "document", "Rò rỉ bộ nhớ (Memory Leak)"),
              makeCard("t3-x", "document", "Đứt kết nối mạng"),
            ],
            answer: ["t3-a"],
            explanation: "Một số lỗi lập trình rất tinh vi (Memory Leak), RAM cứ bị ngốn thêm 1MB sau mỗi giờ. Nếu chỉ chạy Load Test 1 tiếng, bạn sẽ không bao giờ thấy server sập. Endurance testing (ngâm tải) chạy liên tục 48-72 tiếng để bóc trần những lỗi rỉ rả tài nguyên này, đảm bảo hệ thống có thể chạy hàng tháng trời mà không cần khởi động lại.",
            explanationMermaid: `sequenceDiagram
              Ngâm tải->>Server: 48 Giờ
              Note over Server: Rò rỉ RAM (Memory Leak)
              Server--xServer: Out of Memory (OOM)
            `
          }
        ]
      },
      {
        id: "types-4",
        title: "Spike Testing",
        badge: "Bài 8",
        questions: [
          {
            prompt: "Spike Testing mô phỏng hiện tượng gì?",
            theory: `
### Spike Testing (Kiểm thử đột biến)

Đột ngột tăng lượng người dùng lên gấp nhiều lần trong vài giây rồi giảm xuống (Giả lập hiệu ứng Flash Sale hoặc mở cổng đăng ký tín chỉ).
Mục tiêu: Kiểm tra xem hệ thống có bị nghẽn cổ chai tức thời hay không.
            `,
            theoryMermaid: `graph TD
            A[Bình thường: 100 users] --> B[Flash Sale: 10,000 users]
            B --> C{Auto-scaling kịp?}
            C -->|Có| D[Xử lý mượt mà]
            C -->|Không| E[Sập hệ thống]
            `,
            description: "Ghép khái niệm Spike Testing",
            slots: ["Mô phỏng sự kiện"],
            cards: [
              makeCard("t4-a", "document", "Flash Sale / Đột biến"),
              makeCard("t4-x", "document", "Lượng truy cập trung bình"),
            ],
            answer: ["t4-a"],
            explanation: "Spike Testing dành riêng cho các sự kiện như Black Friday, Flash Sale Shopee, hoặc săn vé Blackpink. Lượng người dùng tăng gấp 100 lần chỉ trong đúng 1 giây. Việc ép tải siêu tốc này kiểm tra xem cơ chế Auto-scaling (tự mở rộng server) có phản ứng kịp thời không, hay là hệ thống sẽ bị sốc và 'chết đứng' ngay lập tức.",
            explanationMermaid: `graph TD
              A[Tải tăng đột ngột x100] --> B{Auto-scale có kịp khởi động?}
              B -->|Kịp| C[Server mới chạy lên hỗ trợ]
              B -->|Không Kịp| D[Server gốc sập]
              style D fill:#fca5a5,stroke:#ef4444
            `
          }
        ]
      },
      {
        id: "bottlenecks-1",
        title: "Thread Pool",
        badge: "Bài 9",
        questions: [
          {
            prompt: "Thread Pool Exhaustion",
            theory: `
### Cạn kiệt Thread Pool (Thread Pool Exhaustion)

Mỗi Server (như Tomcat, Node.js) chỉ có một số lượng "Luồng" (Threads) nhất định để xử lý request đồng thời.
Nếu một chức năng xử lý quá lâu (ví dụ gọi API bên thứ 3 bị chậm), các Threads sẽ bị "treo" chờ đợi.

Hậu quả: Các request sau phải nằm đợi trong Hàng đợi (Queue). Càng đợi lâu thì sinh ra hiện tượng **Connection Timeout**.
            `,
            theoryMermaid: `sequenceDiagram
            Client->>Server: Gửi 1000 requests
            Note over Server: Chỉ có 200 Threads!
            Server-->>Server: 800 reqs vào Queue chờ
            Server--xClient: Chờ lâu -> Timeout!
            `,
            description: "Ghép nối nguyên nhân và hậu quả.",
            slots: ["Nguyên nhân", "Hậu quả"],
            cards: [
              makeCard("b1-a", "component", "Hết Thread xử lý"),
              makeCard("b1-b", "component", "Connection Timeout"),
              makeCard("b1-x", "component", "CPU 100%"),
            ],
            answer: ["b1-a", "b1-b"],
            explanation: "Cổ chai Thread Pool là lỗi kinh điển nhất. Server của bạn hoàn toàn khỏe mạnh (CPU chỉ 10%, RAM rất nhiều), nhưng số lượng Thread cấu hình quá thấp (ví dụ Tomcat mặc định 200). Khi có 1000 người vào, 800 người bị đẩy vào Hàng đợi và rớt mạng (Timeout). Tối ưu hệ thống đôi khi chỉ là tăng tham số cấu hình maxThreads!",
            explanationMermaid: `sequenceDiagram
              participant User
              participant Thread_Pool
              User->>Thread_Pool: 1000 Users
              Note over Thread_Pool: maxThreads=200
              Thread_Pool--xUser: 800 Users bị từ chối / Timeout
            `
          }
        ]
      },
      {
        id: "bottlenecks-2",
        title: "Database Locks",
        badge: "Bài 10",
        questions: [
          {
            prompt: "Deadlock & Table Locks",
            theory: `
### Database Locks

Khi nhiều người dùng cùng ghi vào một dòng dữ liệu (ví dụ: Tranh nhau mua 1 món hàng cuối cùng), Database sẽ khóa dòng đó lại (Lock) để xử lý tuần tự.
Nếu xử lý không khéo, các Transaction sẽ khóa lẫn nhau sinh ra **Deadlock**, hệ thống kẹt cứng.
            `,
            theoryMermaid: `sequenceDiagram
            User_A->>Database: Khóa Sản phẩm X
            User_B->>Database: Khóa Sản phẩm Y
            User_A->>Database: Đòi khóa Y -> Chờ B
            User_B->>Database: Đòi khóa X -> Chờ A
            Note over Database: DEADLOCK!
            `,
            description: "Hiện tượng gì xảy ra khi 2 người khóa chéo tài nguyên của nhau?",
            slots: ["Hiện tượng"],
            cards: [
              makeCard("b2-a", "decision", "Deadlock"),
              makeCard("b2-x", "decision", "Memory Leak"),
            ],
            answer: ["b2-a"],
            explanation: "Deadlock là bóng ma trong Database. User A giữ tài nguyên X chờ Y. User B giữ tài nguyên Y chờ X. Kết quả là cả hai chờ nhau vĩnh viễn, DB treo hoàn toàn. Khi Load Test các chức năng Thanh toán, Đặt vé xe, chúng ta sẽ bắt được các lỗi này do sự cạnh tranh dữ liệu (Concurrency) sinh ra.",
            explanationMermaid: `graph LR
              User_A -->|Khóa| X
              User_B -->|Khóa| Y
              X -.->|Cần| User_B
              Y -.->|Cần| User_A
              style X fill:#fca5a5,stroke:#ef4444
              style Y fill:#fca5a5,stroke:#ef4444
            `
          }
        ]
      },
      {
        id: "bottlenecks-3",
        title: "Network Saturation",
        badge: "Bài 11",
        questions: [
          {
            prompt: "Nghẽn Băng Thông Mạng",
            theory: `
### Băng thông mạng (Network Saturation)

Băng thông card mạng của server bị đẩy kịch trần.
Ví dụ: Trả về file ảnh/video quá lớn mà không nén (Gzip/Brotli). Mặc dù Server xử lý xong rất nhanh, nhưng dữ liệu bị kẹt ở cổng mạng tầng OS để chờ truyền qua dây cáp.
            `,
            theoryMermaid: `sequenceDiagram
            Server->>OS_Network: Trả 10GB Data
            Note over OS_Network: Băng thông cáp chỉ 1Gbps!
            OS_Network--xClient: Truyền siêu chậm
            `,
            description: "Khi nào bị Network Saturation?",
            slots: ["Nguyên nhân"],
            cards: [
              makeCard("b3-a", "component", "Dữ liệu trả về quá lớn / Chưa nén"),
              makeCard("b3-x", "component", "CPU xử lý chậm"),
            ],
            answer: ["b3-a"],
            explanation: "Một lỗi rất 'ngớ ngẩn' mà ít Dev để ý: Code rất tối ưu, Database rất nhanh, nhưng lại ném nguyên 1 file JSON dung lượng 20MB xuống Client. Server gửi dữ liệu ra card mạng quá nhiều khiến đường truyền bị nghẹt, tạo ra nút thắt cổ chai vật lý tại cổng mạng của Máy chủ. Bật nén Gzip có thể giảm 90% dung lượng và giải quyết triệt để lỗi này.",
            explanationMermaid: `graph TD
              A[Dữ liệu 10GB] --> B(Cáp mạng 1Gbps)
              B --> C[Ngẽn cổ chai vật lý]
              C -.-> D(Khách hàng chờ mòn mỏi)
              style B fill:#fca5a5,stroke:#ef4444
            `
          }
        ]
      },
      {
        id: "bottlenecks-4",
        title: "CPU Bound",
        badge: "Bài 12",
        questions: [
          {
            prompt: "Khi CPU bị quá tải",
            theory: `
### CPU Bound (Nghẽn CPU)

Hệ thống phải thực hiện các phép toán phức tạp (Mã hóa Hash, Xử lý ảnh, AI Inference) khiến CPU đạt 100%.
Cách giải quyết: Tối ưu lại thuật toán, thêm Cache, hoặc Scale số lượng nhân CPU (Vertical Scaling) / Thêm máy chủ (Horizontal Scaling).
            `,
            theoryMermaid: `stateDiagram-v2
            [*] --> Nhận_Request_Nặng
            Nhận_Request_Nặng --> CPU_100%
            CPU_100% --> Các_Request_Sau_Đợi_Queue
            Các_Request_Sau_Đợi_Queue --> Timeout
            `,
            description: "Cách khắc phục CPU Bound phổ biến?",
            slots: ["Cách xử lý"],
            cards: [
              makeCard("b4-a", "decision", "Dùng Cache / Thêm Server"),
              makeCard("b4-x", "decision", "Tăng kích thước ổ cứng"),
            ],
            answer: ["b4-a"],
            explanation: "CPU là bộ não của Server. Khi bạn viết các thuật toán phức tạp như tìm đường, tính toán mã hóa mật khẩu (Bcrypt), CPU sẽ phải gánh tải nặng. Khi CPU chạm ngưỡng 100%, tất cả các request đều phải xếp hàng đứng đợi nhân CPU rảnh rỗi. Việc sử dụng Redis Cache để lưu tạm các kết quả đã tính toán xong là phương án vàng để cứu rỗi CPU.",
          }
        ]
      }
    ]
  }
];
