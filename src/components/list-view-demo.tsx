"use client"

import { FileText } from "lucide-react"
import { List, ListItem } from "@/components/ui/list-view"

const shared = {
  icon: <FileText />,
  title: "Title",
  secondary: "Secondary info",
  value: "Value",
}

export function ListViewDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-8">
      <List header="Variants">
        <ListItem
          variant="iconTitleSecondaryValue"
          icon={shared.icon}
          title={shared.title}
          secondary={shared.secondary}
          value={shared.value}
        />
        <ListItem
          variant="titleSecondaryValue"
          title={shared.title}
          secondary={shared.secondary}
          value={shared.value}
        />
        <ListItem
          variant="iconTitleValue"
          icon={shared.icon}
          title={shared.title}
          value={shared.value}
        />
        <ListItem variant="titleValue" title={shared.title} value={shared.value} />
        <ListItem variant="valueOnly" value={shared.value} />
      </List>
      <List header="With background">
        <ListItem
          variant="iconTitleSecondaryValue"
          withBackground
          icon={shared.icon}
          title={shared.title}
          secondary={shared.secondary}
          value={shared.value}
        />
        <ListItem
          variant="titleSecondaryValue"
          withBackground
          title={shared.title}
          secondary={shared.secondary}
          value={shared.value}
        />
        <ListItem
          variant="iconTitleValue"
          withBackground
          icon={shared.icon}
          title={shared.title}
          value={shared.value}
        />
        <ListItem
          variant="titleValue"
          withBackground
          title={shared.title}
          value={shared.value}
        />
        <ListItem variant="valueOnly" withBackground value={shared.value} />
      </List>
    </div>
  )
}
