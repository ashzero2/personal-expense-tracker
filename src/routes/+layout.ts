import { env } from '$env/dynamic/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

	const supabaseUrl: string = env.PUBLIC_SUPABASE_URL || '';
	const supabaseKey: string = env.PUBLIC_SUPABASE_KEY || '';

  const supabase = isBrowser()
    ? createBrowserClient(supabaseUrl, supabaseKey, {
        global: {
          fetch,
        },
      })
    : createServerClient(supabaseUrl, supabaseKey, {
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