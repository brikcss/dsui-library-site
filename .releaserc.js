module.exports = {
	branch: 'master',
	channel: 'dev',
	analyzeCommits: [
		{
			preset: 'angular',
			parserOpts: {
				noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
			},
			path: '@semantic-release/commit-analyzer',
			releaseRules: [
				{
					breaking: true,
					release: 'major',
				},
				{
					scope: 'BREAKING',
					release: 'major',
				},
				{
					scope: 'MINOR',
					release: 'minor',
				},
				{
					scope: 'PATCH',
					release: 'patch',
				},
				{
					type: 'feat',
					release: 'minor',
				},
				{
					type: 'fix',
					release: 'patch',
				},
				{
					type: 'docs',
					release: 'patch',
				},
				{
					type: 'perf',
					release: 'patch',
				},
				{
					type: 'test',
					release: 'patch',
				},
				{
					type: 'build',
					release: 'patch',
				},
				{
					type: 'tools',
					release: 'patch',
				},
				{
					type: 'chore',
					release: 'patch',
				},
				{
					type: 'refactor',
					release: 'patch',
				},
				{
					type: 'revert',
					release: 'patch',
				},
				{
					type: 'style',
					release: 'patch',
				},
			],
		},
	],
	generateNotes: [
		{
			preset: 'angular',
			parserOpts: {
				noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
			},
			path: '@semantic-release/release-notes-generator',
			releaseRules: [
				{
					breaking: true,
					release: 'major',
				},
				{
					scope: 'BREAKING',
					release: 'major',
				},
				{
					scope: 'MINOR',
					release: 'minor',
				},
				{
					scope: 'PATCH',
					release: 'patch',
				},
				{
					type: 'feat',
					release: 'minor',
				},
				{
					type: 'fix',
					release: 'patch',
				},
				{
					type: 'docs',
					release: 'patch',
				},
				{
					type: 'perf',
					release: 'patch',
				},
				{
					type: 'test',
					release: 'patch',
				},
				{
					type: 'build',
					release: 'patch',
				},
				{
					type: 'tools',
					release: 'patch',
				},
				{
					type: 'chore',
					release: 'patch',
				},
				{
					type: 'refactor',
					release: 'patch',
				},
				{
					type: 'revert',
					release: 'patch',
				},
				{
					type: 'style',
					release: 'patch',
				},
			],
		},
	],
	publish: [
		'@semantic-release/github',
		{
			path: '@semantic-release/exec',
			cmd: 'npm run gh-pages',
		},
	],
};
