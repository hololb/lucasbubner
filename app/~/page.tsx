import DelayedBackground from "../components/scrollway/DelayedBackground";
import UpReveal from "../components/scrollway/UpReveal";
import { TreeStatusProvider } from "../components/TreeStatus";
import { Stars } from "../images";

export default function Scrollway() {
    return (
        <TreeStatusProvider>
            <DelayedBackground background={Stars}>
                <div className="flex items-center justify-center h-svh">
                    <div className="text-center text-white font-extrabold text-5xl/tight">
                        <UpReveal delay={0.2}>
                            I am a <span className="__text-emp-yellow">self-driven</span>,
                        </UpReveal>
                        <UpReveal delay={0.8}>
                            <span className="__text-emp-yellow">young</span> software developer.
                        </UpReveal>
                    </div>
                </div>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
                <p>This is content!!!!!</p>
            </DelayedBackground>
        </TreeStatusProvider>
    );
}
