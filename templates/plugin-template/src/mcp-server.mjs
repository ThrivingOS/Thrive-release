#!/usr/bin/env node

import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function send(id, result) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`);
}

function sendError(id, code, message) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } })}\n`);
}

const tools = [
  {
    name: 'example_echo',
    description: 'Echoes a short message for template testing.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        message: {
          type: 'string',
          maxLength: 200,
        },
      },
      required: ['message'],
    },
  },
];

rl.on('line', (line) => {
  if (!line.trim()) return;
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    sendError(null, -32700, 'Parse error');
    return;
  }

  if (request.method === 'initialize') {
    send(request.id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'thrive-plugin-template', version: '0.1.0' },
    });
    return;
  }

  if (request.method === 'tools/list') {
    send(request.id, { tools });
    return;
  }

  if (request.method === 'tools/call') {
    const name = request.params?.name;
    const args = request.params?.arguments || {};
    if (name !== 'example_echo') {
      sendError(request.id, -32601, `Unknown tool: ${name}`);
      return;
    }
    send(request.id, {
      content: [
        {
          type: 'text',
          text: String(args.message || ''),
        },
      ],
    });
    return;
  }

  if (request.id != null) {
    sendError(request.id, -32601, `Unknown method: ${request.method}`);
  }
});
