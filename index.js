#!/usr/bin/env node

import readline from 'readline';
import meow from 'meow';
import navert from 'naver-translate';

navert.configurePapago({
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
});

const lookupMeaning = async (query, options) => {
  const { limit, partOfSpeech, origin, ...lookupOptions } = options;
  const meanings = await navert.lookupMeanings(query, lookupOptions);
  return meanings.map(m => {
    let prefix = '';
    if (options.partOfSpeech && m.partOfSpeech2) prefix += m.partOfSpeech2;
    if (origin && m.origin) prefix += (prefix ? ' ' : '') + m.origin;
    return (prefix ? `(${prefix}) ` : '') + m.means.join(', ');
  }).slice(0, limit || meanings.length).join('; ');
};

const lookupExamples = async (query, options) => {
  const examples = await navert.lookupCombinedExamples(query, options);
  return examples.map(ex => `${ex.ko}\n${ex.en}`).join('\n\n');
};

const lookupJson = async (query, options) => {
  const data = await navert.lookup(query, options);
  return JSON.stringify(data, null, '  ');
};


const lookup = async (query, { enko, google, example, strip, simple, stem, json, limit, partOfSpeech, origin }) => {
  if (stem) return navert.lookupStem(query);
  if (example) return lookupExamples(query, { google, strip });
  if (json) return lookupJson(query, { enko, google, strip });
  return lookupMeaning(query, { enko, simple, google, strip, limit, partOfSpeech, origin });
};

const main = async () => {
  const cli = meow({
    importMeta: import.meta,
    flags: {
      enko: { type: 'boolean', default: false, alias: 'e' },
      google: { type: 'boolean', default: false, alias: 'g' },
      example: { type: 'boolean', default: false, alias: 'x' },
      strip: { type: 'boolean', default: false, alias: 'r' },
      stem: { type: 'boolean', default: false, alias: 't' },
      simple: { type: 'boolean', default: false, alias: 's' },
      json: { type: 'boolean', default: false, alias: 'j' },
      partOfSpeech: { type: 'boolean', default: false, alias: 'p' },
      origin: { type: 'boolean', default: false, alias: 'o' },
      limit: { type: 'number', default: 3, alias: 'l' },
      delimiter: { type: 'string', default: '\t', alias: 'd' },
      help: { type: 'boolean', default: false },
    }
  });

  if (cli.flags.help) {
    cli.showHelp();
  }

  if (cli.input.length > 0) {
    const query = cli.input.join(' ')?.trim();
    const result = await lookup(query, cli.flags);
    process.stdout.write(result + '\n');
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    queryinal: false,
  });

  for await (const line of rl) {
    const query = line?.trim();
    if (query) {
      const result = await lookup(query, cli.flags);
      const isExample = cli.flags.example
      process.stdout.write(`${query}${isExample ? '\n' : cli.flags.delimiter}${result?.trim()}\n`);
      if (isExample) process.stdout.write('\n');
    } else {
      process.stdout.write('\n')
    }
  }

  rl.close();
};

main().catch(error => {
  console.error('Error:', error?.message || error);
});
