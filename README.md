# @borough/mcp

Remote MCP bridge package for [Borough](https://borough.qwady.app), a read-only NYC real estate connector for Claude, ChatGPT, Cursor, VS Code, and other MCP-compatible clients.

Borough MCP gives AI tools authenticated access to:

- rental and sales search across the five boroughs
- area and neighborhood discovery
- market snapshots and trends
- property and building detail tools for paid tiers

## Preferred Connection Model

For hosted MCP clients, use Borough's remote MCP endpoint:

```text
https://borough.qwady.app/mcp
```

OAuth-capable clients should prefer the built-in Borough OAuth flow. That is the primary connector path for Claude and other hosted remote MCP clients.

Docs:

- Setup guide: [https://docs.qwady.app/mcp/add-to-claude](https://docs.qwady.app/mcp/add-to-claude)
- MCP overview: [https://docs.qwady.app/mcp/overview](https://docs.qwady.app/mcp/overview)
- Tools reference: [https://docs.qwady.app/mcp/tools-reference](https://docs.qwady.app/mcp/tools-reference)

## Remote Connector URL

```text
https://borough.qwady.app/mcp
```

Discovery metadata:

```text
https://borough.qwady.app/.well-known/mcp/server.json
```

## Tool Access By Tier

### Authenticated Free

- `search_rentals`
- `search_sales`
- `list_areas`
- `get_market_snapshot`
- `get_market_trends`
- `compare_neighborhoods`

### Starter And Above

- `get_property`
- `get_property_by_url`
- `get_building`
- `get_building_listings`

All Borough MCP tools are read-only.

## Claude And Remote Clients

If your MCP client supports remote connectors and OAuth, use the hosted endpoint directly and complete the Borough sign-in flow when prompted.

For Claude-specific steps:

- [Add Borough to Claude](https://docs.qwady.app/mcp/add-to-claude)

## Direct Bearer-Token Usage

For MCP clients that do not support Borough's OAuth flow, use a Borough API key in the `Authorization` header:

```text
Authorization: Bearer BOROUGH-<your_key>
```

Examples:

### Cursor

```json
{
  "mcpServers": {
    "borough": {
      "url": "https://borough.qwady.app/mcp",
      "headers": {
        "Authorization": "Bearer BOROUGH-<your_key>"
      }
    }
  }
}
```

### VS Code

```json
{
  "servers": {
    "borough": {
      "type": "http",
      "url": "https://borough.qwady.app/mcp",
      "headers": {
        "Authorization": "Bearer BOROUGH-<your_key>"
      }
    }
  }
}
```

## `npx` Bridge Usage

This package is mainly useful when you want to bridge the hosted Borough MCP endpoint into a stdio-only client.

```bash
BOROUGH_API_KEY=BOROUGH-<your_key> npx @borough/mcp
```

`BOROUGH_API_KEY` is required for the direct stdio bridge path.

## Example Questions

Ask your AI client:

- "Find me 2-bedroom apartments in Williamsburg under $4,000"
- "Compare rents between Astoria, Park Slope, and the East Village"
- "Show me current market stats for Long Island City"
- "Get details for property 4961849"
- "Which buildings in Chelsea have the most active listings?"

## Get Access

- Pricing and tiers: [https://docs.qwady.app/tiers-and-pricing](https://docs.qwady.app/tiers-and-pricing)
- Customer portal: [https://polar.sh/qwady-solutions-llc/portal](https://polar.sh/qwady-solutions-llc/portal)

## Support

For support, contact [api@qwady.com](mailto:api@qwady.com).
