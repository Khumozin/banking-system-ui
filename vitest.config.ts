import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    globals: false,
    browser: {
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});