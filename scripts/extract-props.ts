import * as docgen from "react-docgen-typescript"
import * as fs from "fs-extra"
import * as path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMPONENTS_DIR = path.resolve(__dirname, "../src/components/ui")
const OUTPUT_FILE = path.resolve(__dirname, "../src/props.json")

const parser = docgen.withCustomConfig(path.resolve(__dirname, "../tsconfig.json"), {
    propFilter: (prop) => {
        if (prop.parent) {
            if (prop.parent.fileName.includes("node_modules")) {
                return ["type", "placeholder", "disabled"].includes(prop.name)
            }
        }
        return true
    },
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    savePropValueAsString: true,
})

const TYPE_MAPPINGS: Record<string, string> = {
    HTMLInputTypeAttribute:
        '"button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"',
}

async function extractProps() {
    if (!(await fs.pathExists(COMPONENTS_DIR))) {
        console.warn(`⚠️ Components directory not found: ${COMPONENTS_DIR}`)
        return
    }

    const files = (await fs.readdir(COMPONENTS_DIR))
        .filter((file) => file.endsWith(".tsx"))
        .map((file) => path.join(COMPONENTS_DIR, file))

    console.log(`🔍 Extracting props from ${files.length} components...`)

    const componentDocs = parser.parse(files)
    const propsMetadata: Record<string, any> = {}

    for (const doc of componentDocs) {
        propsMetadata[doc.displayName] = Object.values(doc.props).map((prop) => {
            const typeInfo = prop.type as any
            let typeName = typeInfo.name?.trim()

            // Check for manual mappings (reproducible way to expand complex React types)
            if (typeName && TYPE_MAPPINGS[typeName]) {
                typeName = TYPE_MAPPINGS[typeName]
            } else if (typeInfo.value && Array.isArray(typeInfo.value)) {
                // If it's a union, try to get the raw values
                typeName = typeInfo.value.map((v: any) => v.value).join(" | ")
            } else if (typeInfo.raw && typeInfo.name === "enum") {
                typeName = typeInfo.raw
            }

            return {
                name: prop.name,
                type: typeName,
                defaultValue: prop.defaultValue?.value,
                description: prop.description,
                required: prop.required,
            }
        })
    }

    await fs.writeJSON(OUTPUT_FILE, propsMetadata, { spaces: 2 })
    console.log(`✅ Prop metadata saved to: ${OUTPUT_FILE}`)
}

extractProps().catch(console.error)
