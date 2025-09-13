import {
  type RowData,
  type TableOptions,
  type TableOptionsResolved,
  type TableState,
  createTable,
} from "@tanstack/table-core"
import { writable } from "svelte/store"
import { effect } from "svelte"

function mergeObjects<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  const result = {} as T

  for (const obj of objects) {
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (value !== undefined) {
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
              result[key] = mergeObjects(result[key] || {}, value)
            } else {
              result[key] = value
            }
          }
        }
      }
    }
  }

  return result
}

/**
 * Creates a reactive TanStack table object for Svelte.
 * @param options Table options to create the table with.
 * @returns A reactive table object.
 */
export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
  const resolvedOptions: TableOptionsResolved<TData> = mergeObjects(
    {
      state: {},
      onStateChange() {},
      renderFallbackValue: null,
      mergeOptions: (defaultOptions: TableOptions<TData>, options: Partial<TableOptions<TData>>) => {
        return mergeObjects(defaultOptions, options)
      },
    },
    options,
  )

  const table = createTable(resolvedOptions)
  const { subscribe, set } = writable<Partial<TableState>>(table.initialState)
  let state: Partial<TableState> = table.initialState

  effect(() => {
    updateOptions()
  })

  function updateOptions() {
    table.setOptions((prev) => {
      return mergeObjects(prev, options, {
        state: mergeObjects(state, options.state || {}),
        onStateChange: (updater: any) => {
          if (updater instanceof Function) state = updater(state)
          else state = mergeObjects(state, updater)

          set(state)
          options.onStateChange?.(updater)
        },
      })
    })
  }

  updateOptions()

  return {
    table,
    subscribe,
  }
}
