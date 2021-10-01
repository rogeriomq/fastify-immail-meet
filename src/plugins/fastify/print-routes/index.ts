import { table } from 'table'
import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  RouteOptions,
} from 'fastify'
import fastifyPlugin from 'fastify-plugin'

interface RouteConfig {
  [key: string]: any
}

const methodsOrder = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'HEAD',
  'PATCH',
  'OPTIONS',
]

function getRouteConfig(r: RouteOptions): RouteConfig {
  return (r.config as RouteConfig) ?? {}
}

function printRoutes(routes: Array<RouteOptions>): void {
  if (routes.length === 0) {
    return
  }

  // Sort routes
  routes = routes
    .filter((r: RouteOptions) => getRouteConfig(r).hide !== true)
    .sort((a: RouteOptions, b: RouteOptions) => a.url.localeCompare(b.url))

  const hasDescription = routes.some(
    (r: RouteOptions) => 'description' in getRouteConfig(r)
  )

  // Build the output
  const headers = ['TYPE', 'PATH']

  if (hasDescription) {
    headers.push('Description')
  }

  const rows: Array<Array<string>> = [headers]

  for (const route of routes) {
    const methods = Array.isArray(route.method) ? route.method : [route.method]

    const row = [
      // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
      methods
        .sort(
          (a: string, b: string) =>
            methodsOrder.indexOf(a) - methodsOrder.indexOf(b)
        )
        .map((m: string) => `${m}`)
        .join(' | '),
      // eslint-disable-next-line no-useless-escape

      `${route.url.replace(/(?:[\w]+|\[:\w+\])/g, '$&')}`,
    ]

    if (hasDescription) {
      row.push(`${getRouteConfig(route).description ?? ''}`)
    }

    rows.push(row)
  }

  const output = table(rows, {
    columns: {
      0: {
        alignment: 'right',
      },
      1: {
        alignment: 'left',
      },
      2: {
        alignment: 'left',
      },
    },
    drawHorizontalLine(index: number, size: number): boolean {
      return index < 2 || index > size - 1
    },
  })

  console.log(`Available routes:\n\n${output}`)
}

export const plugin = fastifyPlugin(
  function (
    instance: FastifyInstance,
    options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ): void {
    const routes: Array<RouteOptions> = []

    // Utility to track all the RouteOptionss we add
    instance.addHook('onRoute', (route: RouteOptions) => {
      routes.push(route)
    })

    instance.addHook('onReady', (done: (error?: FastifyError) => void) => {
      printRoutes(routes)
      done()
    })

    done()
  },
  { name: 'print-routes' }
)

export default plugin
