-- 清空现有任务数据
TRUNCATE TABLE tasks;

-- 插入模拟任务数据
INSERT INTO tasks (title, description, status, priority, due_date, user_id) VALUES
-- 智能合约开发任务
(
    '实现 ERC20 代币合约',
    '开发符合 ERC20 标准的代币合约，包括转账、授权、余额查询等基本功能。需要实现代币铸造和销毁机制，并添加暂停功能以应对紧急情况。',
    'pending',
    'high',
    CURRENT_DATE + INTERVAL '3 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '智能合约单元测试',
    '为已实现的智能合约编写完整的单元测试，覆盖所有关键功能点。包括正常操作测试、边界条件测试和异常情况处理。使用 Hardhat 测试框架。',
    'in_progress',
    'high',
    CURRENT_DATE + INTERVAL '5 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '实现代币质押机制',
    '开发代币质押合约，允许用户质押代币获取奖励。需要实现质押、解质押、奖励计算和发放等功能。确保合约安全性和gas优化。',
    'pending',
    'high',
    CURRENT_DATE + INTERVAL '7 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '合约安全审计准备',
    '准备智能合约代码审计文档，包括合约架构说明、关键功能说明、安全考虑等。整理所有合约的测试报告和覆盖率报告。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '4 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),

-- 前端开发任务
(
    '实现钱包连接功能',
    '开发支持 MetaMask 和 WalletConnect 的钱包连接模块。包括连接状态管理、账户切换处理、网络切换处理等功能。',
    'in_progress',
    'high',
    CURRENT_DATE + INTERVAL '2 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '代币转账界面开发',
    '开发代币转账的用户界面，包括转账表单、余额显示、交易确认弹窗等。需要实现输入验证和错误提示。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '6 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '质押页面开发',
    '实现代币质押的用户界面，包括质押表单、收益计算器、质押记录列表等。需要实现实时数据更新和交易状态显示。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '8 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '响应式布局优化',
    '优化所有页面的响应式布局，确保在移动端和桌面端都有良好的显示效果。包括导航栏、表单、数据展示等组件的适配。',
    'pending',
    'low',
    CURRENT_DATE + INTERVAL '10 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),

-- 后端开发任务
(
    'API 服务开发',
    '开发后端 API 服务，包括用户认证、交易记录查询、数据统计等功能。实现 RESTful API 接口和适当的缓存机制。',
    'in_progress',
    'high',
    CURRENT_DATE + INTERVAL '4 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '数据库设计优化',
    '优化数据库结构，设计合适的索引，优化查询性能。包括用户数据、交易记录、质押记录等表的设计。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '5 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '缓存系统实现',
    '实现 Redis 缓存系统，缓存常用数据和查询结果。包括缓存策略设计、缓存更新机制和缓存失效处理。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '7 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),

-- 测试任务
(
    '端到端测试用例',
    '编写完整的端到端测试用例，覆盖主要用户流程。包括钱包连接、代币转账、质押操作等关键流程的测试。',
    'pending',
    'high',
    CURRENT_DATE + INTERVAL '6 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '性能测试',
    '进行系统性能测试，包括并发用户测试、响应时间测试、数据库性能测试等。生成性能测试报告并提出优化建议。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '9 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '安全测试',
    '进行安全测试，包括 XSS、CSRF、SQL 注入等常见安全漏洞的测试。对智能合约进行漏洞扫描。',
    'pending',
    'high',
    CURRENT_DATE + INTERVAL '5 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),

-- 文档任务
(
    'API 文档编写',
    '编写完整的 API 文档，包括接口说明、参数说明、返回值说明、错误码说明等。使用 Swagger 或类似工具生成文档。',
    'in_progress',
    'medium',
    CURRENT_DATE + INTERVAL '3 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '用户使用手册',
    '编写用户使用手册，包括系统功能介绍、操作指南、常见问题解答等。需要包含截图和详细的操作步骤说明。',
    'pending',
    'low',
    CURRENT_DATE + INTERVAL '11 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '技术架构文档',
    '编写技术架构文档，包括系统架构图、技术栈说明、部署说明等。需要详细说明各个模块的职责和交互方式。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '8 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),

-- 部署和运维任务
(
    'CI/CD 流程搭建',
    '搭建持续集成和持续部署流程，包括自动化测试、代码质量检查、自动部署等。使用 GitHub Actions 或类似工具。',
    'in_progress',
    'high',
    CURRENT_DATE + INTERVAL '4 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '监控系统部署',
    '部署系统监控，包括服务器监控、应用性能监控、错误日志监控等。配置告警规则和通知机制。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '6 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '备份策略实现',
    '实现数据备份策略，包括数据库备份、配置文件备份等。设置自动备份计划和备份验证机制。',
    'pending',
    'low',
    CURRENT_DATE + INTERVAL '12 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
),
(
    '系统优化',
    '进行系统整体优化，包括代码优化、数据库优化、缓存优化等。解决性能瓶颈问题。',
    'pending',
    'medium',
    CURRENT_DATE + INTERVAL '9 days',
    'a6f84ad2-3712-473c-a86a-3f588d3023a6'
); 