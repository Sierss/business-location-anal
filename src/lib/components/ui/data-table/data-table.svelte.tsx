import {
  type RowData,
  type TableOptions,
  type TableOptionsResolved,
  type TableState,
  createTable,
} from "@tanstack/table-core"
import { $state, $effect } from "svelte/store" // Assuming these are the correct imports

console.log("[v0] Loading data-table.svelte.tsx")

/**
 * Creates a reactive TanStack table object for Svelte.
 * @param options Table options to create the table with.
 * @returns A reactive table object.
 * @example
 * \`\`\`svelte
 * <script>
 *   const table = createSvelteTable({ ... })
 * </script>
 *
 * <table>
 *   <thead>
 *     {#each table.getHeaderGroups() as headerGroup}
 *       <tr>
 *         {#each headerGroup.headers as header}
 *           <th colspan={header.colSpan}>
 *         	   <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
 *         	 </th>
 *         {/each}
 *       </tr>
 *     {/each}
 *   </thead>
 * 	 <!-- ... -->
 * </table>
 * \`\`\`
 */
export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
  console.log("[v0] Creating Svelte table with options:", options)

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
  let state = $state<Partial<TableState>>(table.initialState)

  function updateOptions() {
    console.log("[v0] Updating table options")
    table.setOptions((prev) => {
      return mergeObjects(prev, options, {
        state: mergeObjects(state, options.state || {}),
        onStateChange: (updater: any) => {
          if (updater instanceof Function) state = updater(state)
          else state = mergeObjects(state, updater)

          options.onStateChange?.(updater)
        },
      })
    })
  }

  updateOptions()

  $effect.pre(() => {
    updateOptions()
  })

  return table
}

type MaybeThunk<T extends object> = T | (() => T | null | undefined)
type Intersection<T extends readonly unknown[]> = (T extends [infer H, ...infer R] ? H & Intersection<R> : unknown) & {}

/**
 * Lazily merges several objects (or thunks) while preserving
 * getter semantics from every source.
 *
 * Proxy-based to avoid known WebKit recursion issue.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeObjects<Sources extends readonly MaybeThunk<any>[]>(
  ...sources: Sources
): Intersection<{ [K in keyof Sources]: Sources[K] }> {
  console.log("[v0] Merging objects, sources count:", sources.length)

  const resolve = <T extends object>(src: MaybeThunk<T>): T | undefined =>
    typeof src === "function" ? (src() ?? undefined) : src

  const findSourceWithKey = (key: PropertyKey) => {
    console.log("[v0] Finding source with key:", key)
    for (let i = sources.length - 1; i >= 0; i--) {
      console.log("[v0] Checking source at index:", i)
      const obj = resolve(sources[i])
      if (obj && key in obj) {
        console.log("[v0] Found key in source at index:", i)
        return obj
      }
    }
    console.log("[v0] Key not found in any source:", key)
    return undefined
  }

  return new Proxy(Object.create(null), {
    get(_, key) {
      console.log("[v0] Proxy get called for key:", key)
      const src = findSourceWithKey(key)
      const result = src?.[key as never]
      console.log("[v0] Proxy get result:", result)
      return result
    },

    has(_, key) {
      console.log("[v0] Proxy has called for key:", key)
      const result = !!findSourceWithKey(key)
      console.log("[v0] Proxy has result:", result)
      return result
    },

    ownKeys(): (string | symbol)[] {
      console.log("[v0] Proxy ownKeys called")
      const all = new Set<string | symbol>()
      for (let sourceIndex = 0; sourceIndex < sources.length; sourceIndex++) {
        console.log("[v0] Processing source at index:", sourceIndex)
        const obj = resolve(sources[sourceIndex])
        if (obj) {
          const keys = Reflect.ownKeys(obj) as (string | symbol)[]
          console.log("[v0] Found keys in source:", keys)
          for (const k of keys) {
            all.add(k)
          }
        }
      }
      const result = [...all]
      console.log("[v0] Proxy ownKeys result:", result)
      return result
    },

    getOwnPropertyDescriptor(_, key) {
      console.log("[v0] Proxy getOwnPropertyDescriptor called for key:", key)
      const src = findSourceWithKey(key)
      if (!src) {
        console.log("[v0] No source found for key:", key)
        return undefined
      }
      const descriptor = {
        configurable: true,
        enumerable: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (src as any)[key],
        writable: true,
      }
      console.log("[v0] Proxy getOwnPropertyDescriptor result:", descriptor)
      return descriptor
    },
  }) as Intersection<{ [K in keyof Sources]: Sources[K] }>
}
