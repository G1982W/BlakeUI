import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMPONENTS_DIR = path.resolve(__dirname, "../src/components/ui")
const OUTPUT_DIR = path.resolve(__dirname, "../src")
const OUTPUT_FILE = path.join(OUTPUT_DIR, "registry.json")

const EXTRA_SOURCES: Record<string, string> = {
    "bar-chart": "src/components/bar-chart-demo.tsx",
    "line-chart": "src/components/line-chart-demo.tsx",
}

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

    for (const [key, rel] of Object.entries(EXTRA_SOURCES)) {
        const abs = path.resolve(__dirname, "..", rel)
        if (!(await fs.pathExists(abs))) {
            console.warn(`⚠️ Extra source not found: ${rel}`)
            continue
        }
        registry[key] = {
            name: key,
            source: await fs.readFile(abs, "utf8"),
        }
    }

    await fs.ensureDir(OUTPUT_DIR)
    await fs.writeJSON(OUTPUT_FILE, registry, { spaces: 2 })
    console.log(`✅ Registry built: ${OUTPUT_FILE}`)
}

buildRegistry().catch(console.error)
