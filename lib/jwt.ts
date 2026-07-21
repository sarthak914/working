import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env.local");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export async function generateToken(
  payload: JwtPayload
): Promise<string> {
  return await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role || "user",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyToken(
  token: string
): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role:
        typeof payload.role === "string"
          ? payload.role
          : "user",
    };
  } catch {
    return null;
  }
}