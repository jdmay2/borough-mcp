import test from 'node:test';
import assert from 'node:assert/strict';

import {
	BOROUGH_MCP_URL,
	getRemoteArgs,
	resolveApiKey,
} from '../src/index.ts';

test('getRemoteArgs targets the Borough MCP endpoint with auth header', () => {
	const args = getRemoteArgs('BOROUGH-test');
	assert.deepEqual(args, [
		'-y',
		'mcp-remote',
		BOROUGH_MCP_URL,
		'--header',
		'Authorization:Bearer BOROUGH-test',
	]);
});

test('resolveApiKey returns the configured key', () => {
	assert.equal(resolveApiKey({ BOROUGH_API_KEY: 'BOROUGH-live' }), 'BOROUGH-live');
});

test('resolveApiKey fails cleanly when config is missing', () => {
	assert.throws(
		() => resolveApiKey({}),
		/BOROUGH_API_KEY environment variable is required/i,
	);
});
