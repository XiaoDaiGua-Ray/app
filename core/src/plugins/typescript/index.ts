import './index.scss'

import { useEffect, useMemo } from 'react'
import type { Editor } from '@power-playground/core'
import { classnames, DEFAULT_WATCH_EVENT_KEYS, makeProvider, messenger } from '@power-playground/core'
import { getDefaultStore, useAtom } from 'jotai'
import type * as monacoEditor from 'monaco-editor'
import { mergeAll, mergeDeepLeft } from 'ramda'

import { useDocumentEventListener } from '../../hooks/useDocumentEventListener'
import { definePlugin } from '..'

import { Setting } from './statusbar/Setting'
import { Versions } from './statusbar/Versions'
import { Langs } from './topbar/Langs'
import { getNamespaces } from './utils/getNamespaces'
import { compilerOptionsAtom, extraFilesAtom, extraModulesAtom } from './atoms'
import { resolveModules } from './modules'
import { use } from './use'
import { getReferencesForModule, mapModuleNameToModule } from './utils'

export interface ExtraFile {
  content: string
  filePath: string
}

declare module '@power-playground/core' {
  export interface PluginConfigures {
    typescript: {
      compilerOptions?: monacoEditor.languages.typescript.CompilerOptions
      extraFiles?: ExtraFile[]
      extraModules?: ExtraFile[]
    }
  }
}

const store = getDefaultStore()

export interface TypeScriptPluginX {
  ExtShareState: {
    typescriptVersion: string
    changeTypescriptVersion: (ts: string) => void
    language: 'javascript' | 'typescript'
    changeLanguage: (lang: 'javascript' | 'typescript') => void
  }
}

function promiseStatus(promise: Promise<any>) {
  let status = 'pending'
  return Promise.race([
    promise.then(() => status = 'fulfilled'),
    promise.catch(() => status = 'rejected'),
    new Promise(resolve => setTimeout(() => resolve(status), 0))
  ])
}

type RefForModule = ReturnType<typeof getReferencesForModule>
let resolveReferences: (value: RefForModule) => void = () => void 0
// TODO refactor as Map to reveal the promise by filePath
let referencesPromise = new Promise<RefForModule>(re => {
  resolveReferences = re
})
if (import.meta.hot) {
  const hotReferencesPromise = import.meta.hot.data['ppd:typescript:referencesPromise']
  hotReferencesPromise && (referencesPromise = hotReferencesPromise)
}
let prevRefs: RefForModule = []
if (import.meta.hot) {
  const hotPrevRefs = import.meta.hot.data['ppd:typescript:prevRefs']
  hotPrevRefs && (prevRefs = hotPrevRefs)
}

const modelDecorationIdsSymbol = '_modelDecorationIds'

const addDecorationProvider = makeProvider(editor => {
  const decorationsCollection = editor.createDecorationsCollection()

  const modelDecorationIdsConfigurableEditor = editor as unknown as {
    [modelDecorationIdsSymbol]?: Map<string, string[]>
  }
  const modelDecorationIds = modelDecorationIdsConfigurableEditor[modelDecorationIdsSymbol]
    ?? (modelDecorationIdsConfigurableEditor[modelDecorationIdsSymbol] = new Map<string, string[]>())

  let dependencyLoadErrorReason: Record<string, string>
  if (import.meta.hot) {
    const hotDependencyLoadErrorReason = import.meta.hot.data['ppd:typescript:dependencyLoadErrorReason']
    hotDependencyLoadErrorReason
      ? (dependencyLoadErrorReason = hotDependencyLoadErrorReason)
      : (dependencyLoadErrorReason = import.meta.hot.data['ppd:typescript:dependencyLoadErrorReason'] = {})
  } else {
    dependencyLoadErrorReason = {}
  }

  return { decorationsCollection, modelDecorationIds, dependencyLoadErrorReason }
}, (editor, {
  decorationsCollection,
  modelDecorationIds
}) => {
  const uri = editor.getModel()?.uri.toString()
  if (!uri) return

  const ids = modelDecorationIds.get(uri)
  if (!ids) return

  editor.removeDecorations(ids)
  modelDecorationIds.delete(uri)
  decorationsCollection.clear()
  if (import.meta.hot) {
    import.meta.hot.data['ppd:typescript:dependencyLoadErrorReason'] = {}
  }
}, {
  anytime: async () => {
    if (await promiseStatus(referencesPromise) === 'fulfilled') {
      referencesPromise = new Promise<RefForModule>(re => resolveReferences = re)
    }
  }
})

const GLYPH_PREFIX = 'ppd-plugins-typescript-glyph-margin'
const createGlyph = (
  monaco: typeof monacoEditor,
  editor: monacoEditor.editor.IStandaloneCodeEditor,
  line: number, content: string,
  eleResolver?: (ele: HTMLDivElement) => void
): monacoEditor.editor.IGlyphMarginWidget => ({
  getDomNode() {
    const domNode = document.createElement('div')
    domNode.innerHTML = content
    eleResolver?.(domNode)
    return domNode
  },
  getPosition() {
    return {
      lane: monaco.editor.GlyphMarginLane.Right,
      zIndex: 100,
      range: new monaco.Range(line, 1, line, 1)
    }
  },
  getId: () => `${GLYPH_PREFIX} ${GLYPH_PREFIX}__${line}`
})

const addGlyphProvider = makeProvider((editor, monaco) => {
  const glyphMarginWidgets: monacoEditor.editor.IGlyphMarginWidget[] = []

  return {
    glyphMarginWidgets,
    addGlyph: (line: number, content: string, eleResolver?: (ele: HTMLDivElement) => void) => {
      const model = editor.getModel()
      if (!model) throw new Error('model not found')

      const widget = createGlyph(monaco, editor, line, content, eleResolver)
      editor.addGlyphMarginWidget(widget)
      glyphMarginWidgets.push(widget)
      editor.updateOptions({ glyphMargin: true })
      return widget.getId()
    },
    removeGlyph: (id: string) => {
      const index = glyphMarginWidgets.findIndex(widget => widget.getId() === id)
      if (index !== -1) {
        editor.removeGlyphMarginWidget(glyphMarginWidgets[index])
        glyphMarginWidgets.splice(index, 1)
      }
      if (glyphMarginWidgets.length === 0) {
        editor.updateOptions({ glyphMargin: false })
      }
    }
  }
}, (editor, {
  glyphMarginWidgets
}) => {
  editor.updateOptions({ glyphMargin: false })
  glyphMarginWidgets.forEach(widget => editor.removeGlyphMarginWidget(widget))
}, {
  watchEventKeys: [
    ...DEFAULT_WATCH_EVENT_KEYS,
    'onDidChangeModelDecorations'
  ]
})

const editor: Editor<TypeScriptPluginX> = {
  use,
  useShare({
    curFilePath, language, typescriptVersion
  }, monaco) {
    const [compilerOptions] = useAtom(compilerOptionsAtom)
    const defaults = useMemo(() => {
      if (!monaco || !typescriptVersion) return

      if (language === 'javascript') {
        return monaco.languages.typescript.javascriptDefaults
      } else {
        return monaco.languages.typescript.typescriptDefaults
      }
    }, [language, monaco, typescriptVersion])
    useEffect(() => {
      if (!defaults || !monaco) return

      defaults.setCompilerOptions({ ...defaults.getCompilerOptions(), ...compilerOptions })

      console.group('monaco detail data')
      console.log('typescript.version', monaco.languages.typescript.typescriptVersion)
      console.log('typescript.CompilerOptions', monaco.languages.typescript.typescriptDefaults.getCompilerOptions())
      console.groupEnd()
    }, [compilerOptions, defaults, monaco])

    const [extraFiles] = useAtom(extraFilesAtom)
    const [extraModules] = useAtom(extraModulesAtom)
    useEffect(() => {
      if (!defaults || !monaco) return

      extraFiles.forEach(({ content, filePath }) => {
        monaco.editor.createModel(
          content,
          language === 'javascript' ? 'javascript' : 'typescript',
          monaco.Uri.parse(filePath)
        )
      })
      extraModules.forEach(({ content, filePath }) => {
        monaco.editor.createModel(
          content,
          language === 'javascript' ? 'javascript' : 'typescript',
          monaco.Uri.parse(`file:///node_modules/${filePath}`)
        )
      })

      return () => {
        monaco.editor.getModels().forEach(model => {
          if (model.uri.path !== curFilePath) model.dispose()
        })
      }
    }, [monaco, curFilePath, language, defaults, extraFiles, extraModules])

    useDocumentEventListener('mousedown', e => {
      if (e.target instanceof HTMLElement && e.target.classList.contains('ts__button-decoration')) {
        messenger.then(m => m.display('warning', 'Switching dependency version is not supported yet'))
      }
    })
  },
  preload(monaco) {
    return function (disposes: (() => void)[]) {
      return () => disposes.forEach(dispose => dispose())
    }([
      monaco.editor.addCommand({
        id: 'typescript-imports',
        run() {
          messenger.then(m => m.display('warning', 'Switching dependency version is not supported yet'))
        }
      }).dispose,
      monaco.languages.registerCodeLensProvider(['javascript', 'typescript'], {
        async provideCodeLenses(model, cancelToken) {
          if (model.isDisposed()) return
          const references = await referencesPromise
          if (cancelToken.isCancellationRequested) return

          const lenses: monacoEditor.languages.CodeLens[] = []
          references.forEach(ref => {
            const [start] = ref.position
            const startP = model.getPositionAt(start)
            const range = new monaco.Range(startP.lineNumber, startP.column, startP.lineNumber, startP.column)
            lenses.push({
              range,
              id: 'typescript-imports',
              command: {
                id: 'typescript-imports',
                title: 'Switch @latest',
                arguments: [ref.module, 'latest']
              }
            }, {
              range,
              id: 'typescript-imports',
              command: {
                id: 'typescript-imports',
                title: '@beta',
                arguments: [ref.module, 'beta']
              }
            }, {
              range,
              command: {
                id: 'typescript-imports',
                title: `[${ref.module}]`,
                arguments: [ref.module]
              }
            })
          })
          return { lenses, dispose: () => void 0 }
        }
      }).dispose
      // TODO support inline completion version
    ])
  },
  load: (editor, monaco) => {
    const re = require as unknown as (id: string[], cb: (...args: any[]) => void) => void
    let typescript: typeof import('typescript') | undefined = undefined
    const lazyTS = new Promise<typeof import('typescript')>(resolve => {
      if (typescript === undefined) {
        re(['vs/language/typescript/tsWorker'], () => {
          // @ts-ignore
          typescript = window.ts
          // @ts-ignore
          resolve(window.ts as unknown as typeof import('typescript'))
        })
      } else {
        resolve(typescript)
      }
    })

    type ProviderDefaultParams = Parameters<ReturnType<typeof makeProvider>> extends [
      ...infer T, infer _Ignore
    ] ? T : never
    const providerDefaultParams: ProviderDefaultParams = [monaco, editor, { languages: ['javascript', 'typescript'] }]
    return [
      addDecorationProvider(
        ...providerDefaultParams, async (model, { mountInitValue: {
          modelDecorationIds,
          decorationsCollection,
          dependencyLoadErrorReason
        }, isCancel }) => {
          const uri = model.uri.toString()
          const ids = modelDecorationIds.get(uri)
            ?? modelDecorationIds.set(uri, []).get(uri)!

          const content = model.getValue()
          const ts = await lazyTS

          const extraModules = store.get(extraModulesAtom).reduce((acc, { filePath }) => {
            const name = /((?:@[^/]*\/)?[^/]+)/.exec(filePath)?.[1]
            if (name && !acc.includes(name)) {
              acc.push(name)
            }
            return acc
          }, [] as string[])
          const references = getReferencesForModule(ts, content)
            .filter(ref => !ref.module.startsWith('.'))
            .filter(ref => !extraModules.includes(ref.module))
            .map(ref => ({
              ...ref,
              module: mapModuleNameToModule(ref.module)
            }))
            .reduce((acc, cur) => {
              const index = acc.findIndex(({ module }) => module === cur.module)
              if (index === -1) {
                acc.push(cur)
              }
              return acc
            }, [] as RefForModule)
          let resolveModulesFulfilled = () => void 0
          resolveModules(monaco, prevRefs, references, {
            onDepLoadError({ depName, error }) {
              dependencyLoadErrorReason[depName] = `⚠️ ${error.message}`
            }
          })
            .then(() => {
              if (isCancel.value) return
              resolveModulesFulfilled()
            })
          prevRefs = references
          if (import.meta.hot) {
            import.meta.hot.data['ppd:typescript:prevRefs'] = prevRefs
          }
          resolveReferences(references)
          if (import.meta.hot) {
            import.meta.hot.data['ppd:typescript:referencesPromise'] = referencesPromise
          }
          editor.removeDecorations(ids)
          const loadingDecorations: (
            & { loadedVersion: string, loadModule: string }
            & monacoEditor.editor.IModelDeltaDecoration
            )[] = references.map(ref => {
              const [start, end] = ref.position
              const startP = model.getPositionAt(start)
              const endP = model.getPositionAt(end)
              const range = new monaco.Range(
                startP.lineNumber,
                startP.column + 1,
                endP.lineNumber,
                endP.column + 1
              )
              const inlineClassName = `ts__button-decoration ts__button-decoration__position-${start}__${end}`
              return {
                loadModule: ref.module,
                loadedVersion: ref.version ?? 'latest',
                range,
                options: {
                  isWholeLine: true,
                  after: {
                    content: '⚡️ Downloading...',
                    inlineClassName
                  }
                }
              }
            })
          const newIds = decorationsCollection.set(loadingDecorations)
          modelDecorationIds.set(uri, newIds)

          resolveModulesFulfilled = () => {
            editor.removeDecorations(newIds)
            const loadedDecorations = loadingDecorations.map(d => {
              const error = dependencyLoadErrorReason[`${d.loadModule}@${d.loadedVersion}`]
              return mergeDeepLeft({
                options: { after: { content: error ?? `@${d.loadedVersion}` } }
              }, d)
            })
            const loadedIds = decorationsCollection.set(loadedDecorations)
            modelDecorationIds.set(uri, loadedIds)
          }
          return () => void 0
        }),
      addGlyphProvider(
        ...providerDefaultParams, async (model, { mountInitValue: {
          addGlyph, removeGlyph
        } }) => {
          const ts = await lazyTS
          const namespaces = getNamespaces(ts, editor.getValue())
          const visibleRanges = editor.getVisibleRanges()

          const gids: string[] = []
          Object.entries(namespaces)
            .filter(([name]) => ['describe', 'it'].some(n => name.startsWith(n)))
            .map(([name, ns]) => {
              type FlatItem = [number, string, ReturnType<typeof getNamespaces>['describe'][0]]
              return ns
                .reduce((acc, namespace) => {
                  const realLine = model.getPositionAt(namespace.top.pos).lineNumber
                  let line = realLine
                  let inFold = false
                  let prevVisibleEndLineNumber = 1
                  visibleRanges.forEach(({ startLineNumber, endLineNumber }) => {
                    if (realLine >= endLineNumber && realLine <= startLineNumber) {
                      inFold = true
                      return
                    }
                    if (realLine <= startLineNumber)
                      return

                    const offset = startLineNumber - prevVisibleEndLineNumber
                    line -= offset === 0 ? 0 : offset - 1
                    prevVisibleEndLineNumber = endLineNumber
                  })
                  if (inFold) return acc
                  return acc.concat([
                    [line, name, namespace]
                  ])
                }, [] as FlatItem[])
                .flat() as FlatItem
            })
            .forEach(([line, name, namespace]) => {
              const isDescribe = name.startsWith('describe')
              gids.push(addGlyph(line, `<span class='${classnames('codicon', `codicon-run${isDescribe ? '-all' : ''}`)}'></span>`, ele => {
                ele.onclick = () => {
                  messenger.then(m => m.display('warning', 'Running test is not supported yet'))
                  // ele.innerHTML = `<span class="${
                  //   classnames('codicon', `codicon-check${isDescribe ? '-all' : ''}`)
                  // }"></span>`
                  ele.innerHTML = `<span class="${
                    classnames('codicon', 'codicon-run-errors')
                  }"></span>`
                }
              }))
            })
          return () => gids.forEach(id => removeGlyph(id))
        })
    ]
  },
  topbar: [Langs],
  statusbar: [Versions, Setting]
}

export default definePlugin<'typescript', TypeScriptPluginX>('typescript', conf => {
  if (conf?.compilerOptions) {
    store.set(compilerOptionsAtom, mergeAll([
      compilerOptionsAtom.init,
      conf.compilerOptions
    ]))
  }
  if (conf?.extraFiles) {
    store.set(extraFilesAtom, conf.extraFiles)
  }
  if (conf?.extraModules) {
    store.set(extraModulesAtom, conf.extraModules)
  }

  return { editor }
})
