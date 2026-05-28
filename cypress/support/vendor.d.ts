declare module 'cypress-mochawesome-reporter/plugin' {
  import type { PluginEvents } from 'cypress'

  const plugin: (on: PluginEvents) => void

  export default plugin
}
