import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const isAuthPage = path === "/login" || path === "/signup";
  const isProtectedRoute = path.startsWith("/invoices");
  const isProfileSetupPage = path === "/profile/setup";

  if (!user && (isProtectedRoute || isProfileSetupPage)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/invoices";
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, designation, signature_url")
      .eq("id", user.id)
      .single();

    const profileIncomplete =
      !profile?.full_name || !profile?.designation || !profile?.signature_url;

    if (profileIncomplete && isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/profile/setup";
      return NextResponse.redirect(url);
    }

    if (!profileIncomplete && isProfileSetupPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/invoices";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/invoices/:path*", "/profile/setup"],
};