import { createApp } from 'vue'

// Helpful for testing composables that rely on vue reactivity
export function withSetup(composable, plugin) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })
  app.use(plugin)
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide/unmount
  return [result, app]
}