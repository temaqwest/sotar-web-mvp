export enum AppLayoutsEnum {
  default = 'default',
  auth = 'auth',
  dashboard = 'dashboard',
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'AppLayoutDefault.vue',
  auth: 'AppLayoutAuth.vue',
  dashboard: 'AppLayoutDashboard.vue',
}
