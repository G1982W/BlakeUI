import React from 'react';

export function extractCode(children: React.ReactNode): string {
    // In a professional setup with Fumadocs/MDX, we'd use a remark/rehype plugin
    // to attach the raw source code to the props of the component.
    // For this demo, we'll implement a helper that tries to reconstruct JSX 
    // or looks for a hidden `source` prop.

    if (!children) return '';

    const childrenArray = React.Children.toArray(children);

    return childrenArray.map(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return String(child);
        }

        if (React.isValidElement(child)) {
            const type = child.type as any;
            const name = type.displayName || type.name || (typeof type === 'string' ? type : 'Component');
            const props = child.props as any;

            const propsString = Object.entries(props)
                .filter(([key]) => key !== 'children')
                .map(([key, value]) => {
                    if (typeof value === 'string') return `${key}="${value}"`;
                    if (typeof value === 'boolean' && value) return key;
                    return `${key}={${JSON.stringify(value)}}`;
                })
                .join(' ');

            const childrenString = extractCode(props.children);

            if (childrenString) {
                return `<${name}${propsString ? ' ' + propsString : ''}>\n  ${childrenString}\n</${name}>`;
            }
            return `<${name}${propsString ? ' ' + propsString : ''} />`;
        }

        return '';
    }).join('\n');
}
