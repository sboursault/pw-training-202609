# AGENTS.md

## Project

This repository contains TypeScript end-to-end tests for a remote French-language commerce site, using Playwright Test. The application itself is not in this repository.

## Layout

- `tests/`: Playwright test specifications.
- `support/fixtures.ts`: shared fixtures and re-exports of `test` and `expect`.
- `support/page-objects/`: page-specific navigation, locators, and assertions.
- `support/workflow.ts`: reusable cross-page workflows.
- `support/basketAPI.ts`: API helpers for basket setup and cleanup.
- `playwright.config.ts`: browser projects, base URL, and CI behavior.

Keep test scenarios in `tests/`. Put reusable browser interactions in the relevant Page Object, and reusable multi-page or API workflows in `support/`. Extend the shared fixtures in `support/fixtures.ts` when a new helper should be injected into tests.

## Conventions

- Use TypeScript, double quotes, and semicolons, consistent with the existing files.
- Write asynchronous Playwright operations with `await`; ESLint treats floating promises and awaiting non-promises as errors.
- Prefer Playwright role-, label-, and text-based locators when they describe the UI reliably. Keep locators and page-level assertions in Page Objects; keep scenario intent and expected outcomes in tests.
- Use Playwright's `expect` assertions for conditions that may become true after an action, rather than fixed sleeps.
- Import the shared `test` and `expect` from `support/fixtures` when a test uses project fixtures. Import directly from `@playwright/test` only when the built-in fixtures are sufficient.
- Keep each test independent. The configured projects run tests in parallel, and the basket is mutable remote state: clean up or otherwise isolate it when a test depends on its initial contents. Do not make tests depend on execution order or a shared account's leftover state.
- Use the existing API helper for basket setup or cleanup where appropriate; check responses and fail clearly when setup does not succeed.
- Do not commit credentials, tokens, or other secrets. Keep environment-specific values out of test source and reports.

## Running Checks

- `npm test`: TypeScript type-check, ESLint, then the Playwright suite.
- `npx tsc --noEmit`: TypeScript type-check only.
- `npx eslint`: lint the project.
- `npx playwright test`: run the tests in `tests/` against the configured remote base URL.
- `npm run test:local`: runs the same checks with variables loaded through `dotenvx` from `.env`; use only when that local environment setup is available.

Playwright is configured for Chromium desktop and mobile Chrome, with French locale. It retries on CI and writes HTML reports and test artifacts to generated directories. Tests can make real requests to the remote site, so consider remote availability and mutable test data when investigating failures; do not treat a remote-service failure as a TypeScript or lint failure.
