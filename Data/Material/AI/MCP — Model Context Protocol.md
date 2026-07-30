## 10. MCP — Model Context Protocol

### 10.1 Definition

**MCP (Model Context Protocol)** is an open standard (introduced by Anthropic, now
broadly adopted) that defines a **universal interface for connecting AI models to
external data sources and tools**. Think of it as the "USB-C for AI" — a standard
plug that lets any AI model connect to any data source or tool.

### 10.2 The Problem MCP Solves

Before MCP, every AI tool integration was custom:

```mermaid
flowchart TB
    subgraph Before[BEFORE MCP (N×M integrations)]
        ClaudeB[Claude]
        ChatGPTB[ChatGPT]
        CursorB[Cursor]
        WindsurfB[Windsurf]

        GitHubB[GitHub]

        ClaudeB -->|Custom integration| GitHubB
        ChatGPTB -->|Different custom integration| GitHubB
        CursorB -->|Yet another integration| GitHubB
        WindsurfB -->|And another...| GitHubB
    end

    subgraph After[AFTER MCP (N+M integrations)]
        ClaudeA[Claude]
        ChatGPTA[ChatGPT]
        CursorA[Cursor]
        WindsurfA[Windsurf]

        MCP[MCP Protocol]

        GitHubA[GitHub]
        SlackA[Slack]
        JiraA[Jira]
        PostgresA[Postgres]

        ClaudeA --> MCP
        ChatGPTA --> MCP
        CursorA --> MCP
        WindsurfA --> MCP

        MCP --> GitHubA
        MCP --> SlackA
        MCP --> JiraA
        MCP --> PostgresA
    end
```

### 10.3 Architecture

```mermaid
flowchart LR
    Host[MCP HOST\n(Claude, Cursor, IDE)]
    Client[MCP CLIENT\n(Protocol handler)]
    Server[MCP SERVER\n(GitHub, Postgres, Slack)]

    Host -->|1:many| Client -->|1:1| Server

    note right of Server
      The HOST creates CLIENT instances
      that connect to SERVERs.
    end note
```

### 10.4 MCP Capabilities (Primitives)

| Primitive | Direction | Description | Example |
|---|---|---|---|
| **Tools** | Server → Client (model-invoked) | Functions the LLM can call | `create_github_issue()` |
| **Resources** | Server → Client (app-controlled) | Data the server exposes | File contents, DB schemas |
| **Prompts** | Server → Client (user-invoked) | Pre-built prompt templates | "Summarize this PR" template |
| **Sampling** | Client → Server | Server can request LLM completions | Server asks the LLM to analyze data |

### 10.5 Example: Building an MCP Server

```python
# Simple MCP server using the Python SDK
from mcp.server import Server, stdio_server
from mcp.types import Tool, TextContent

server = Server("my-project-server")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_project_structure",
            description="Returns the file/folder structure of the project",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Root path to scan"
                    }
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="run_tests",
            description="Runs the project test suite",
            inputSchema={
                "type": "object",
                "properties": {
                    "test_path": {
                        "type": "string",
                        "description": "Specific test file or directory"
                    }
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_project_structure":
        structure = scan_directory(arguments["path"])
        return [TextContent(type="text", text=structure)]
    elif name == "run_tests":
        result = run_test_suite(arguments.get("test_path", "."))
        return [TextContent(type="text", text=result)]

async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write)
```

### 10.6 MCP Configuration (in Claude Desktop / Cursor)

```json
// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    }
  }
}
```

### 10.7 Pros and Cons

| Pros | Cons |
|---|---|
| Universal standard — write once, use everywhere | Still evolving — breaking changes possible |
| Growing ecosystem of pre-built servers | Security surface area — agents get tool access |
| Open source and vendor-neutral | Debugging can be complex (stdio/SSE transport) |
| Reduces integration overhead dramatically | Not all AI platforms fully support it yet |
| Enables powerful agentic workflows | Performance overhead for simple use cases |
