---
title: "Model Context Protocol (MCP) Explained for Web Developers: Giving Tools to AI Agents"
description: "MCP is one of the fastest-growing topics in developer search queries right now; establishing an early article here builds high search authority."
date: "2026-09-18"
tags: ["ai", "mcp", "agents", "python", "typescript"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "mcp-model-context-protocol-web-dev"
---

Until recently, connecting an LLM to your database or internal API meant writing proprietary, bespoke function-calling wrappers. Every AI client (OpenAI, Anthropic, LangChain) had a different schema format, and reusing tools across platforms required endless adapter boilerplate.

Enter the **Model Context Protocol (MCP)**, open-sourced by Anthropic. MCP is rapidly becoming the **USB-C of AI development**: an open standard that allows any AI agent to discover and invoke tools, inspect databases, and query business systems securely.

In this guide, we'll explain how MCP works and walk through building your first MCP server in TypeScript.

---

## 1. The MCP Client-Server Model

MCP standardizes how an AI Host (Claude Desktop, Cursor, Antigravity) talks to external tools through lightweight JSON-RPC over Standard I/O (`stdio`) or Server-Sent Events (`sse`):

```text
[AI Host / Agent]
        │  (JSON-RPC protocol)
        ▼
   [MCP Server]
   ├── Prompts: Pre-packaged prompt workflows
   ├── Resources: File contents, logs, documentation
   └── Tools: Executable functions (e.g. `query_database`, `create_invoice`)
```

---

## 2. Building an MCP Server in 40 Lines of TypeScript

Let's build an MCP server that exposes a database query tool to an AI agent using the official `@modelcontextprotocol/sdk`:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

const server = new Server(
  { name: 'enterprise-crm-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

// 1. Declare available tools to the AI Agent
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'query_customer_invoices',
        description: 'Lookup outstanding customer invoices and balance by customer ID',
        inputSchema: {
          type: 'object',
          properties: {
            customerId: { type: 'string', description: 'Customer identifier (e.g. CUST-1042)' },
            minAmount: { type: 'number', description: 'Optional minimum invoice amount filter' }
          },
          required: ['customerId']
        }
      }
    ]
  }
})

// 2. Handle tool execution requested by the LLM
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'query_customer_invoices') {
    const { customerId, minAmount = 0 } = request.params.arguments as any
    const invoices = await db.invoices.findMany({
      where: { customerId, amount: { gte: minAmount } }
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(invoices, null, 2)
        }
      ]
    }
  }

  throw new Error(`Tool ${request.params.name} not found`)
})

// 3. Connect via Standard I/O
const transport = new StdioServerTransport()
await server.connect(transport)
```

---

## 3. Human-in-the-Loop (HITL) Safeguards

When designing MCP tools that execute **write or financial operations** (e.g. `send_payment_reminder`, `refund_transaction` — as in my **OpérIA** copilot project), never execute the write immediately.

Instead, have the MCP tool return a **Staged Action Object**:
```json
{
  "action": "DISPUTE_CREDIT",
  "status": "STAGED",
  "recipient": "client@enterprise.com",
  "amount": 450.00,
  "requiresApproval": true
}
```

The operator reviews and confirms the staged payload in the UI before the system commits the transaction to production.
