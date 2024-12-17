import { SUPABASE_URL, SUPABASE_KEY } from '$env/dynamic/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(SUPABASE_URL, SUPABASE_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(SUPABASE_URL, SUPABASE_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}