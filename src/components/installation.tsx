import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from "fumadocs-ui/components/codeblock";
import { cn } from "@/lib/utils";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

type InstallationProps = {
  dependencies?: string[];
  useReactSlot?: boolean;
  code: string;
  fileName: string;
  language?: string;
  className?: string;
};

function buildCommands(packages: string[]) {
  if (packages.length === 0) {
    return {
      npm: "npm install",
      pnpm: "pnpm add",
      yarn: "yarn add",
    };
  }

  const list = packages.join(" ");
  return {
    npm: `npm install ${list}`,
    pnpm: `pnpm add ${list}`,
    yarn: `yarn add ${list}`,
  };
}

export default function Installation({
  dependencies = [],
  useReactSlot = false,
  code,
  fileName,
  language = "tsx",
  className,
}: InstallationProps) {
  const packages = [
    ...dependencies,
    ...(useReactSlot ? ["@radix-ui/react-slot"] : []),
  ];
  const commands = buildCommands(packages);
  const hasDependencies = packages.length > 0;

  return (
    <div
      className={cn("mb-10 ml-3.5 mt-8 border-l border-border pl-6", className)}
    >
      {hasDependencies ? (
        <>
          <h3 className="relative mb-6 mt-8 text-sm font-semibold text-foreground">
            Install the following dependencies:
          </h3>
          <CodeBlockTabs
            defaultValue="npm"
            className="my-4 rounded-lg border bg-muted/30"
          >
            <CodeBlockTabsList className="h-12 items-center gap-4 border-b border-border px-4">
              <CodeBlockTabsTrigger value="npm">npm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="pnpm">pnpm</CodeBlockTabsTrigger>
              <CodeBlockTabsTrigger value="yarn">yarn</CodeBlockTabsTrigger>
            </CodeBlockTabsList>
            <div className="p-3">
              <CodeBlockTab value="npm">
                <DynamicCodeBlock
                  lang="bash"
                  code={commands.npm}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
              <CodeBlockTab value="pnpm">
                <DynamicCodeBlock
                  lang="bash"
                  code={commands.pnpm}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
              <CodeBlockTab value="yarn">
                <DynamicCodeBlock
                  lang="bash"
                  code={commands.yarn}
                  codeblock={{
                    title: `terminal`,
                    className:
                      "my-0 rounded-lg border bg-code-background shadow-none",
                  }}
                />
              </CodeBlockTab>
            </div>
          </CodeBlockTabs>
        </>
      ) : null}
      <h3 className="relative mt-8 text-sm font-semibold text-foreground">
        Create a{" "}
        <code className="mx-1 inline-flex whitespace-nowrap rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
          {fileName.split("/").pop()}
        </code>{" "}
        file and paste the following code into it.
      </h3>

      <DynamicCodeBlock
        lang="tsx"
        code={code}
        codeblock={{
          title: `${fileName} usage`,
          className: "m-4 rounded-2xl border bg-code-background",
        }}
      />
      <h3 className="relative mt-8 text-sm font-semibold text-foreground">
        Check the import paths to ensure they match your project setup.
      </h3>
    </div>
  );
}
