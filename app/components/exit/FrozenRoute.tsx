/**
 * Higher-Order Component to slow down the app router during framer-motion exit transitions.
 * https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion
 */
import { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function FrozenRoute({ children }: { children: React.ReactNode }) {
    const ctx = useContext(LayoutRouterContext);
    const frozen = useRef(ctx).current;

    return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}
