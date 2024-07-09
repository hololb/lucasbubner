import Background from "./components/Background";
import Writer from "./components/Writer";

/**
 * bubner.me
 * @author Lucas Bubner, 2024
 */
export default function Index() {
    return (
        <div>
            <Background />
            <div className="w-full h-dvh flex items-center justify-center absolute">
                <Writer />
            </div>
        </div>
    );
}
