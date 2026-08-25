import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  tags: ["-lintignore"],
  workspaces: {
    ".": {},
    "docs": {},
    "packages/*": {}
  },
  ignore: [
    "packages/starlight/components-internals/SidebarPersistState.ts",
    "packages/starlight/utils/createTranslationSystem.ts"
  ]
};

const suppressAstroWarnings = () => {
  const originalWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = (
    chunk: string | Uint8Array,
    encodingOrCb?: BufferEncoding | ((err?: Error | null) => void),
    cb?: (err?: Error | null) => void
  ): boolean => {
    if (typeof chunk === 'string' && chunk.includes('Missing pages directory')) {
      return true;
    }
    if (typeof encodingOrCb === 'function') {
      return originalWrite(chunk, encodingOrCb);
    }
    return originalWrite(chunk, encodingOrCb, cb);
  };

  const originalWarn = console.warn.bind(console);
  console.warn = (message?: unknown, ...optionalParams: unknown[]) => {
    if (typeof message === 'string' && message.includes('Missing pages directory')) {
      return;
    }
    originalWarn(message, ...optionalParams);
  };
};

suppressAstroWarnings();

export default config;
