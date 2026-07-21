import {
  verifyToken,
} from "@/lib/jwt";

import {
  findUserById,
} from "@/repositories/user.repository";

import { NextRequest, NextResponse } from "next/server";

import {
  signup,
  login,
} from "@/services/auth.service";


/* ============================================================
   COOKIE SETTINGS
   ============================================================ */

const AUTH_COOKIE_NAME = "scope_token";

const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});


/* ============================================================
   SIGNUP CONTROLLER
   ============================================================ */

export async function signupController(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
    } = body;

    const result = await signup({
      name,
      email,
      password,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: result.user,
      },
      {
        status: 201,
      }
    );

    response.cookies.set(
      AUTH_COOKIE_NAME,
      result.token,
      getAuthCookieOptions()
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create account.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      }
    );
  }
}


/* ============================================================
   LOGIN CONTROLLER
   ============================================================ */

export async function loginController(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      email,
      password,
    } = body;

    const result = await login({
      email,
      password,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: result.user,
      },
      {
        status: 200,
      }
    );

    response.cookies.set(
      AUTH_COOKIE_NAME,
      result.token,
      getAuthCookieOptions()
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to login.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 401,
      }
    );
  }
}


/* ============================================================
   LOGOUT CONTROLLER
   ============================================================ */

export async function logoutController() {
  const response = NextResponse.json(
    {
      success: true,
      message: "Logged out successfully.",
    },
    {
      status: 200,
    }
  );

  response.cookies.set(
    AUTH_COOKIE_NAME,
    "",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    }
  );

  return response;
}

/* ============================================================
   CURRENT USER CONTROLLER
   ============================================================ */

export async function meController(
  request: NextRequest
) {
  try {
    const token =
      request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session.",
        },
        {
          status: 401,
        }
      );
    }

    const user = await findUserById(
      payload.userId
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,

        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to authenticate user.",
      },
      {
        status: 500,
      }
    );
  }
}