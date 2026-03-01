#!/usr/bin/env node
import { spawn } from 'child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const BOROUGH_MCP_URL = 'https://borough.qwady.app/mcp';

export function getRemoteArgs(apiKey: string): string[] {
	return [
		'-y',
		'mcp-remote',
		BOROUGH_MCP_URL,
		'--header',
		`Authorization:Bearer ${apiKey}`,
	];
}

export function resolveApiKey(env = process.env): string {
	const apiKey = env.BOROUGH_API_KEY;
	if (!apiKey) {
		throw new Error(
			'BOROUGH_API_KEY environment variable is required. Get your free API key at https://docs.qwady.app/tiers-and-pricing'
		);
	}
	return apiKey;
}

export async function run(spawnFn = spawn): Promise<void> {
	const apiKey = resolveApiKey();
	const child = spawnFn('npx', getRemoteArgs(apiKey), { stdio: 'inherit' });
	await new Promise<void>((resolvePromise) => {
		child.on('exit', (code) => process.exit(code ?? 0));
		child.on('close', () => resolvePromise());
	});
}

const isDirectExecution =
	process.argv[1] != null &&
	fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isDirectExecution) {
	await run();
}
