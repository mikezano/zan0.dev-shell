import type { FederationRuntimePlugin } from "@module-federation/runtime";

/**
 * MF runtime plugin that silences manifest fetch failures.
 * Without this, the runtime throws RUNTIME-003 at init time — before any
 * component-level .catch() can handle it — and crashes the shell.
 *
 * `errorLoadRemote` is called by the runtime whenever a remote fails to load.
 * Returning a factory that exports nothing lets the shell boot normally;
 * the component-level fallbacks (in remotes/*.tsx) handle the UI.
 */
export default function fallbackPlugin(): FederationRuntimePlugin {
  return {
    name: "shell-fallback-plugin",
    errorLoadRemote({ id, error }) {
      console.warn(
        `[MF] Remote "${id}" failed to load, using fallback.`,
        error,
      );
      // Return a factory that resolves to an empty module so the runtime
      // doesn't throw. The lazy()/import() .catch() in the component file
      // then handles rendering a user-visible fallback.
      return () => ({ __esModule: true });
    },
  };
}
