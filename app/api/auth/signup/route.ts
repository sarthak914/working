import { NextRequest } from "next/server";

import {
  signupController,
} from "@/controllers/auth.controller";


export async function POST(
  request: NextRequest
) {
  return signupController(request);
}