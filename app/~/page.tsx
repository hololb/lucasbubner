import Collarband from "../components/scrollway/Collarband";
import DelayedBackground from "../components/scrollway/DelayedBackground";
import ScrollWarning from "../components/scrollway/ScrollWarning";
import UpReveal from "../components/scrollway/UpReveal";
import { TreeStatusProvider } from "../components/TreeStatus";
import { Stars } from "../images";

export default function Scrollway() {
    return (
        <TreeStatusProvider>
            <DelayedBackground background={Stars}>
                <div className="flex items-center justify-center h-svh">
                    <div className="text-center text-white font-extrabold text-5xl/snug">
                        <UpReveal delay={0.2}>
                            I am a <span className="__text-emp-yellow">self-driven</span>,
                        </UpReveal>
                        <UpReveal delay={0.8}>
                            <span className="__text-emp-yellow">young</span> software developer.
                        </UpReveal>
                    </div>
                </div>
                <ScrollWarning />
                <Collarband />
            </DelayedBackground>
        </TreeStatusProvider>
    );
}
