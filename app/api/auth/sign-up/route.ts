import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type SignUpPayload = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: SignUpPayload;

  try {
    payload = (await request.json()) as SignUpPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const name = getString(payload.name);
  const email = getString(payload.email).toLowerCase();
  const password = getString(payload.password);

  if (!isValidEmail(email) || password.length < 6) {
    return NextResponse.json(
      { message: "Enter a valid email and a password with at least 6 characters." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const userMetadata = name ? { name } : undefined;
    const existingUsers = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });

    if (existingUsers.error) {
      return NextResponse.json(
        { message: existingUsers.error.message },
        { status: 500 },
      );
    }

    const existingUser = existingUsers.data.users.find(
      (user) => user.email?.toLowerCase() === email,
    );

    if (existingUser?.email_confirmed_at) {
      return NextResponse.json(
        { message: "An account already exists. Please sign in instead." },
        { status: 409 },
      );
    }

    if (existingUser) {
      const { error } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        {
          password,
          email_confirm: true,
          user_metadata: userMetadata,
        },
      );

      if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: userMetadata,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create account right now.",
      },
      { status: 500 },
    );
  }
}
