import Box from "@/app/components/info-pages/Box";
import { CSharpUnity, Git, JavaKotlin, Lambda, PythonOutline, ReactTypeScript } from "@/app/images";

export const metadata = { title: "Lucas Bubner • Technology" };

/**
 * Familiar technologies page.
 * @author Lucas Bubner, 2024
 */
export default function Technology() {
    return (
        <>
            <Box src={JavaKotlin} size={100}>
                <h1>Java &amp; Kotlin</h1>
                <p>
                    Experienced with <b>advanced object-oriented design</b> and Java/Kotlin programming, in contexts of
                    <b> robotics</b> and <b>game modding</b>, namely for <b>FIRST Tech Challenge</b>,
                    <b> Minecraft Forge</b>, and <b>FIRST Robotics Competition</b>.
                </p>
            </Box>
            <Box src={ReactTypeScript} size={85}>
                <h1>React &amp; TypeScript</h1>
                <p>
                    Experienced with the <b>React</b> framework to build applications with integrations on a
                    <b> full-stack</b> level with <b>Next.js</b>. Proficient with TypeScript and manipulating the{" "}
                    <b>DOM</b> to build
                    <b> type-safe</b>, <b>well-documented</b> and <b>maintainable</b> code.
                </p>
            </Box>
            <Box src={CSharpUnity} size={105}>
                <h1>C#</h1>
                <p>
                    Fluent with the C# programming language to develop applications with the <b>Unity</b> platform,
                    expanding upon previous knowledge in <b>object-oriented design principles</b>, while expanding into
                    skills within game development.
                </p>
            </Box>
            <Box src={Lambda} size={50}>
                <h1>Programming patterns</h1>
                <p>
                    <b>Comprehensive</b> knowledge of a range of <b>programming paradigms</b>, including{" "}
                    <b>functional</b>, <b>imperative</b>, and <b>object-oriented</b> programming, to build{" "}
                    <b>flexible</b> software solutions. Proficient with <b>generics</b>, <b>lambda interfaces</b>,{" "}
                    <b>composition</b>, <b>inheritance</b>, and <b>best practices</b>.
                </p>
            </Box>
            <Box src={PythonOutline} size={50}>
                <h1>Python</h1>
                <p>
                    Experienced with the <b>Flask</b> and <b>Jinja</b> web frameworks, as well as the usage of Python to
                    develop applications with computationally-intensive complexities and <b>server-side</b> logic,
                    including <b>desktop applications</b> and <b>backend operations</b>.
                </p>
            </Box>
            <Box src={Git} size={120}>
                <h1>Services &amp; workflows</h1>
                <p>
                    Fluent with BaaS products such as <b>Firebase</b> and <b>Vercel</b> to build highly
                    <b> scalable</b> applications with <b>OAuth</b> and <b>relational databases</b>. Integrates the
                    <b> Git</b> workflow into projects and is proficient with branch, database, and end-user protection
                    rules to build <b>rigorous</b> applications.
                </p>
            </Box>
        </>
    );
}
