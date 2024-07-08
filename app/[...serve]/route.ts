/**
 * Redirect all /serve/* paths to the serve.bubner.me domain
 * @author Lucas Bubner, 2024
 */
import { NextResponse } from "next/server";

export function GET(req: Request) {
    const { pathname, search, hash } = new URL(req.url);
    const targetPath = pathname.split("/serve/")[1] ?? "";
    const href = `https://serve.bubner.me/${targetPath}${search}${hash}`;

    return NextResponse.redirect(href);
}
