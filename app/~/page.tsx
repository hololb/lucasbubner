import Collarband from "../components/scrollway/Collarband";
import DelayedBackground from "../components/scrollway/DelayedBackground";
import ScrollWarning from "../components/scrollway/ScrollWarning";
import UpReveal from "../components/scrollway/UpReveal";
import TreeLimited from "../components/TreeLimited";
import { TreeStatusProvider } from "../components/TreeStatus";
import { Stars } from "../images";

export default function Scrollway() {
    return (
        <TreeStatusProvider>
            <DelayedBackground background={Stars}>
                <div className="flex items-center justify-center h-svh">
                    <div className="text-center text-white font-extrabold text-5xl/snug">
                        <UpReveal delay={0.2} markTree>
                            I am a <span className="__text-emp-yellow">self-driven</span>,
                        </UpReveal>
                        <UpReveal delay={0.8} markTree>
                            <span className="__text-emp-yellow">young</span> software developer.
                        </UpReveal>
                    </div>
                </div>
                <ScrollWarning />
                <Collarband />
                <TreeLimited threshold={2}>
                    <div className="flex items-center justify-center my-24">
                        <div className="text-center text-white font-extrabold text-4xl/snug">
                            <UpReveal delay={0.8} onScroll>
                                <span className="__text-emp-yellow">Nationally</span> recognised.
                            </UpReveal>
                            <UpReveal delay={1.3} onScroll>
                                Academically <span className="__text-emp-yellow">accredited</span>.
                            </UpReveal>
                        </div>
                    </div>
                </TreeLimited>
            </DelayedBackground>
        </TreeStatusProvider>
    );
}
