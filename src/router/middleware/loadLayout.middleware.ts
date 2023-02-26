import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutsEnum, AppLayoutToFileMap } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta
  const normalizedLayoutName = layout || AppLayoutsEnum.default
  const fileName = AppLayoutToFileMap[normalizedLayoutName]
  const fileNameWithoutExtension = fileName.split('.vue')[0]
  console.log(fileNameWithoutExtension)

  const component = await import(
    `../../layouts/${fileNameWithoutExtension}.vue`
  )
  route.meta.layoutComponent = component.default
}
