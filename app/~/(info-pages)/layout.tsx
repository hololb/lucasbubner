/**
 * Common layout for the bubner.me information pages.
 * @author Lucas Bubner, 2024
 */
export default function Layout({ children }: { children: React.ReactNode }) {
    // Titles are handled by the individual pages using metadata, this component will provide
    // the background and navbar which is common to all info pages.
    return children;
}