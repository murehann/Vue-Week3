/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import 'pinia'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | PersistedStateOptions
  }
}
