import Collarband from "../components/scrollway/Collarband";
import DelayedBackground from "../components/scrollway/DelayedBackground";
import ScrollWarning from "../components/scrollway/ScrollWarning";
import UpReveal from "../components/scrollway/UpReveal";
import WavedBar from "../components/scrollway/WavedBar";
import TreeLimited from "../components/tree/TreeLimited";
import TreeLock from "../components/tree/TreeLock";
import { TreeStatusProvider } from "../components/tree/TreeStatus";
import { Stars } from "../images";

export default function Scrollway() {
    return (
        <TreeStatusProvider>
            <DelayedBackground background={Stars}>
                <TreeLock threshold={2} />
                <div className="flex items-center justify-center h-svh">
                    <div className="text-center text-white font-extrabold text-3xl/snug md:text-5xl/snug">
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
                    <div className="flex items-center justify-center mt-24 mb-12">
                        <div className="text-center text-white font-bold text-3xl/snug md:text-5xl/snug">
                            <UpReveal delay={0.8} onScroll>
                                <span className="__text-emp-yellow">Nationally</span> recognised.
                            </UpReveal>
                            <UpReveal delay={1.3} onScroll>
                                Academically <span className="__text-emp-yellow">accredited</span>.
                            </UpReveal>
                        </div>
                    </div>
                    <WavedBar />

                </TreeLimited>
            </DelayedBackground>
        </TreeStatusProvider>
    );
}
