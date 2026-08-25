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

export default config;
