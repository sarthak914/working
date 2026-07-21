import { NextRequest } from "next/server";

import {
  meController,
} from "@/controllers/auth.controller";


export async function GET(
  request: NextRequest
) {
  return meController(request);
}