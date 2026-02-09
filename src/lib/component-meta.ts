export interface ComponentMeta {
    name: string
    dependencies: string[]
    tailwind: boolean
}

export async function getComponentMeta(name: string): Promise<ComponentMeta | null> {
    try {
        // In a real monorepo, we'd read from packages/ui/src/components/[name]/meta.json
        // But for the docs app, we might want to bundle these or use a specific import.
        // We'll use a dynamic import for now.
        const meta = await import(`@ui-lib/ui/src/components/${name}/meta.json`)
        return meta.default
    } catch (e) {
        console.error(`Failed to load meta for ${name}`, e)
        return null
    }
}
