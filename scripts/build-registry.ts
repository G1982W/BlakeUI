import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMPONENTS_DIR = path.resolve(__dirname, "../src/components/ui")
const OUTPUT_DIR = path.resolve(__dirname, "../src")
const OUTPUT_FILE = path.join(OUTPUT_DIR, "registry.json")

async function buildRegistry() {
    const registry: Record<string, any> = {}

    if (!(await fs.pathExists(COMPONENTS_DIR))) {
        console.warn(`⚠️ Components directory not found: ${COMPONENTS_DIR}`)
        return
    }

    const files = await fs.readdir(COMPONENTS_DIR)

    for (const file of files) {
        const filePath = path.join(COMPONENTS_DIR, file)
        const stat = await fs.stat(filePath)

        if (stat.isFile() && file.endsWith(".tsx")) {
            const componentName = path.basename(file, ".tsx")
            const source = await fs.readFile(filePath, "utf8")

            // Look for a corresponding meta.json if it exists (optional)
            const metaPath = path.join(COMPONENTS_DIR, `${componentName}.json`)
            let meta = {}
            if (await fs.pathExists(metaPath)) {
                meta = await fs.readJSON(metaPath)
            }

            registry[componentName] = {
                ...meta,
                name: componentName,
                source: source,
            }
        }
    }

    await fs.ensureDir(OUTPUT_DIR)
    await fs.writeJSON(OUTPUT_FILE, registry, { spaces: 2 })
    console.log(`✅ Registry built: ${OUTPUT_FILE}`)
}

buildRegistry().catch(console.error)
