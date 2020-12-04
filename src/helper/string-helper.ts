export function commaDelimitedStringToStringArray(
  commaDelimitedString = '',
  parseOptions = { filterEmptyValues: true }
): string[] {
  if (!commaDelimitedString.trim()) {
    return []
  }
  return commaDelimitedString
    .split(',')
    .map((value) => value.trim())
    .filter((value) => {
      if (parseOptions.filterEmptyValues && !value.trim()) {
        return false
      }
      return true
    })
}

export function stringArrayToCommaDelimitedString(values: string[]): string {
  if (!values.length) {
    return ''
  }
  return values.join(',')
}
