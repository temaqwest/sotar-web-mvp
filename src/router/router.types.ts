import type { AppLayoutsEnum } from '@/layouts/layouts.types'
import type { VueElement } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: VueElement
  }
}

export enum RoutePaths {
  home = 'home',
  auth = 'auth',
  about = 'about',
  profile = 'profile',
  teams = 'teams',
  events = 'events',
  search = 'search',
  settings = 'settings',
  faq = 'faq',
  question = 'question',
}
