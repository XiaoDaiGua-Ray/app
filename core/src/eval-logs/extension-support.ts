// noinspection ES6ConvertVarToLetConst

import type * as UI from '//chii/ui/legacy/legacy.ts'

import type { Plugin } from '@power-playground/core'
import { elBridgeC } from '@power-playground/core'
import sentinel from 'sentinel-js'

type ImportMap = {
  'ui/legacy/legacy.js': typeof import('//chii/ui/legacy/legacy')
  'core/common/common.js': typeof import('//chii/core/common/common')
  'ui/legacy/theme_support/theme_support.js': typeof import('//chii/ui/legacy/theme_support/theme_support')
}

export type DevtoolsWindow = Window & typeof globalThis & {
  simport: <R = never, const T extends keyof ImportMap | (string & {}) = string>(path: T) => Promise<
    [R] extends [never]
      ? T extends keyof ImportMap ? ImportMap[T] : unknown
      : R
  >
}

declare global {
  // eslint-disable-next-line no-var
  var __isFirstLoad: Promise<void> | null
  // eslint-disable-next-line no-var
  var __DEVTOOLS__: HTMLIFrameElement | null
  // eslint-disable-next-line no-var
  var __OLD_PPD_PLUGINS__: Record<string, Plugin> | null
}

const __ENABLE_HOT_MODULE_REPLACE__ = true

!async function () {
  let resolve: Function | null = null
  let DEVTOOLS: HTMLIFrameElement | null = null
  if (import.meta.hot && __ENABLE_HOT_MODULE_REPLACE__) {
    if (window.__isFirstLoad === undefined) {
      window.__isFirstLoad = new Promise(re => resolve = re)
    } else {
      await window.__isFirstLoad
    }
    import.meta.hot.accept(() => {
      window.__OLD_PPD_PLUGINS__ = (window.parent as any).PPD_PLUGINS
      // 当模块被 hot replaced 时，接下来的代码会被触发
      // 在这里我们可以将上一个模块的状态保存下来
      // 以便在新模块加载完成后恢复
      window.__DEVTOOLS__ = DEVTOOLS!
      // 同时我们将上一个模块的设置的阻塞 Promise 完成，让新模块继续执行
      // 这样子新模块就能处理上一个模块的状态，并将它们恢复
      resolve?.()
      __DEBUG__ && console.debug('extension-support.ts: hot accept')
    })
    if (window.__DEVTOOLS__) {
      DEVTOOLS = window.__DEVTOOLS__
    }
  }

  if (!DEVTOOLS) {
    DEVTOOLS = await new Promise(
      re => sentinel.on('iframe', devtools => re(devtools as HTMLIFrameElement))
    ) as HTMLIFrameElement
  }
  if (DEVTOOLS === null) {
    throw new Error('Cannot find devtools')
  }
  const devtools = DEVTOOLS

  const devtoolsWindow: DevtoolsWindow = devtools.contentWindow! as DevtoolsWindow
  const devtoolsDocument = devtools.contentDocument!

  // devtoolsWindow.eval(`window.simport = path => import(\`https://cdn.jsdelivr.net/npm/chii/public/front_end/\${path}\`)`)
  __DEBUG__ && console.debug('devtools', devtoolsWindow, devtoolsDocument)
  __DEBUG__ && console.debug('readyState', devtoolsDocument.readyState)

  // @ts-ignore
  const ALL_PLUGINS: Record<string, Plugin> = window.parent.PPD_PLUGINS ?? {}

  const DEVTOOLS_PLUGINS = Object.entries(ALL_PLUGINS)
    .filter(
      <T>(entry: [string, {
        devtools?: T | undefined
      }]): entry is [string, { devtools: T }] => (
        entry[1].devtools !== undefined
      )
    )
    .filter(([id, plugin]) => {
      if (!import.meta.hot) return true
      return plugin !== window.__OLD_PPD_PLUGINS__?.[id]
    })
    .map(([id, { devtools }]) => {
      __DEBUG__ && console.debug('loading plugin', `[${id}]\n`, devtools)
      if (typeof devtools === 'function') {
        return Promise.resolve<
          ReturnType<typeof devtools>
        >((0, eval)(devtools.toString())())
      }
      return Promise.resolve(devtools)
    })

  // eslint-disable-next-line no-unused-labels
  beforeMount: {
    DEVTOOLS_PLUGINS
      .forEach(devtools => devtools.then(({ beforeMount }) => beforeMount?.({ devtoolsWindow })))
  }

  // eslint-disable-next-line no-unused-labels
  resolveElBridgeC: {
    let uiTheme = JSON.parse(localStorage.getItem('uiTheme') ?? '""')
    // TODO resolve hot module replace logic
    elBridgeC.on('update:localStorage', ([key, value]) => {
      if (key === 'uiTheme' && uiTheme !== value) {
        // TODO Setting page select value is wrong
        const html = devtools.contentDocument!.querySelector('html')!
        if (value === 'dark') {
          html.classList.add('-theme-with-dark-background')
        }
        if (value === 'default') {
          html.classList.remove('-theme-with-dark-background')
        }
        uiTheme = value
      }
    })
  }

  function registerPlugins(realUI: typeof UI, inspectorView: UI.InspectorView.InspectorView) {
    const { tabbedPane, ...inspector } = inspectorView
    const drawerTabbedPane: UI.TabbedPane.TabbedPane =
      // @ts-ignore
      inspector.drawerTabbedPane
    DEVTOOLS_PLUGINS.forEach(
      devtools => devtools.then(({ panels, drawerPanels }) => {
        panels?.forEach(panel => {
          const Widget = panel(devtoolsWindow, realUI)
          const widget = new Widget()
          if (!tabbedPane.hasTab(panel.id)) {
            tabbedPane?.appendTab(panel.id, panel.title, widget)
          }
        })
        drawerPanels?.forEach(panel => {
          const Widget = panel(devtoolsWindow, realUI)
          const widget = new Widget()

          if (!drawerTabbedPane.hasTab(panel.id)) {
            drawerTabbedPane?.appendTab(panel.id, panel.title, widget)
          }
        })
      })
    )
  }

  let runIsCalled = false

  const runnable = () => ({
    run: async () => {
      if (runIsCalled) return
      runIsCalled = true

      const realUI = await devtoolsWindow.simport('ui/legacy/legacy.js')
      const inspectorView = realUI.InspectorView.InspectorView.instance()

      DEVTOOLS_PLUGINS.forEach(devtools => devtools.then(({ load }) => {
        load?.({ UI: realUI, inspectorView, devtoolsWindow })
      }))
      registerPlugins(realUI, inspectorView)
    }
  })

  async function main() {
    await new Promise<void>(re => {
      if (devtoolsDocument.readyState === 'complete' && devtoolsWindow.simport!) {
        re()
      }
      devtoolsWindow.addEventListener('load', () => re())
    })
    const realCommon = await devtoolsWindow.simport('core/common/common.js')
    realCommon.Runnable.registerEarlyInitializationRunnable(runnable)

    const { MainImpl } = await devtoolsWindow
      .simport<typeof import('//chii/entrypoints/main/main')>(
        'entrypoints/main/main.js'
      )
    let initializeTargetResolver: () => void
    const initializeTargetPromise = new Promise<void>(re => initializeTargetResolver = re)
    const _timeend = MainImpl.MainImpl.timeEnd
    MainImpl.MainImpl.timeEnd = function (label: string) {
      _timeend.call(MainImpl.MainImpl, label)
      if ([
        'Main._initializeTarget',
        'Main._lateInitialization'
      ].includes(label)) {
        initializeTargetResolver()
      }
    }
    const instance = MainImpl.MainImpl.instanceForTest
    if (instance === null) return

    const lateInitDonePromise = (instance as any).lateInitDonePromise as Promise<void>
    if (lateInitDonePromise === undefined) {
      await initializeTargetPromise
    } else {
      await lateInitDonePromise
    }
    try {
      await runnable().run()
    } catch (e) {
      runIsCalled = false
      console.debug(e)
    }
  }

  main()
}()
