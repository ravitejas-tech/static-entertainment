export const labelOptions = (labels: Partial<Record<string, string>>) =>
    Object.entries(labels).map(([value, label]) => ({ value, label: label ?? value }))

export const labelFor = (labels: Partial<Record<string, string>>, value: string) => labels[value] ?? value

export const labelList = (labels: Partial<Record<string, string>>, values: readonly string[]) =>
    values.map((value) => labelFor(labels, value))
