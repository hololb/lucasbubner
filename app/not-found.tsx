import { redirect } from "next/navigation";

/**
 * Redirect all 404 requests to the home page.
 */
export default function NotFound() {
    redirect("/");
}
