import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const serverJson = JSON.parse(
	readFileSync(new URL('../server.json', import.meta.url), 'utf8'),
);
const packageJson = JSON.parse(
	readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

test('server.json metadata stays aligned with package metadata', () => {
	assert.equal(serverJson.version, packageJson.version);
	assert.equal(serverJson.packages[0].identifier, packageJson.name);
	assert.equal(serverJson.remotes[0].url, 'https://borough.qwady.app/mcp');
});

test('server.json advertises Borough-branded docs and required env var', () => {
	assert.equal(serverJson.websiteUrl, 'https://docs.qwady.app');
	assert.equal(serverJson.packages[0].environmentVariables[0].name, 'BOROUGH_API_KEY');
	assert.equal(serverJson.packages[0].environmentVariables[0].isRequired, true);
});
