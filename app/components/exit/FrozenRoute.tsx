import { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Higher-Order Component to slow down the app router during framer-motion exit transitions.
 * https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion
 */
export default function FrozenRoute({ children }: { children: React.ReactNode }) {
    const ctx = useContext(LayoutRouterContext);
    const frozen = useRef(ctx).current;

    // While hooking into the router context provider is not supported by Next.js, this is a workaround to freeze the router context
    // while framer-motion exit animations are playing. This is a drawback of the app router in Next.js 13/14 as described in the
    // attached StackOverflow post.
    return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}
