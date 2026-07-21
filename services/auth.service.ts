import {
  createUser,
  findUserByEmail,
} from "@/repositories/user.repository";

import {
  hashPassword,
  comparePassword,
} from "@/lib/password";

import {
  generateToken,
} from "@/lib/jwt";


/* ============================================================
   SIGNUP INPUT TYPE
   ============================================================ */

interface SignupData {
  name: string;
  email: string;
  password: string;
}


/* ============================================================
   LOGIN INPUT TYPE
   ============================================================ */

interface LoginData {
  email: string;
  password: string;
}


/* ============================================================
   SIGNUP
   ============================================================ */

export async function signup(
  data: SignupData
) {
  const name = data.name.trim();

  const email = data.email
    .trim()
    .toLowerCase();

  const password = data.password;


  /* Validate input */

  if (!name || !email || !password) {
    throw new Error(
      "Name, email and password are required."
    );
  }

  if (name.length < 2) {
    throw new Error(
      "Name must be at least 2 characters."
    );
  }

  if (password.length < 8) {
    throw new Error(
      "Password must be at least 8 characters."
    );
  }


  /* Check if account already exists */

  const existingUser =
    await findUserByEmail(email);

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }


  /* Hash password before storing */

  const hashedPassword =
    await hashPassword(password);


  /* Create user */

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });


  /* Generate JWT */

  const token = await generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });


  /* Never return password */

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },

    token,
  };
}


/* ============================================================
   LOGIN
   ============================================================ */

export async function login(
  data: LoginData
) {
  const email = data.email
    .trim()
    .toLowerCase();

  const password = data.password;


  /* Validate input */

  if (!email || !password) {
    throw new Error(
      "Email and password are required."
    );
  }


  /* Find account */

  const user = await findUserByEmail(email);

  if (!user || !user.password) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches = await comparePassword(
    password,
    user.password
  );
  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password."
    );
  }


  /* Generate JWT */

  const token = await generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });


  /* Never return password */

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },

    token,
  };
}