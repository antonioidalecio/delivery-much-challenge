import {
  commaDelimitedStringToStringArray,
  stringArrayToCommaDelimitedString,
} from './string-helper'

describe('commaDelimitedStringToStringArray', () => {
  it('should return empty array if provided string is empty', () => {
    const emptyStrings = ['', '   ', '\t']

    for (const value of emptyStrings) {
      const result = commaDelimitedStringToStringArray(value)
      expect(result).toEqual([])
    }
  })

  it('should return empty array if provided string is undefined', () => {
    const result = commaDelimitedStringToStringArray(undefined as never)
    expect(result).toEqual([])
  })

  it('should split values delimitted by comma and return corresponding list', () => {
    const result = commaDelimitedStringToStringArray('a,b, c')
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should drop empty values when `filterEmptyValues` flag is provided as `true`', () => {
    const result = commaDelimitedStringToStringArray('a,b,,c, ', {
      filterEmptyValues: true,
    })
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should keep empty values when `filterEmptyValues` flag is provided as `false`', () => {
    const result = commaDelimitedStringToStringArray('a,b, ,c,', {
      filterEmptyValues: false,
    })
    expect(result).toEqual(['a', 'b', '', 'c', ''])
  })

  it('should trim splited values', () => {
    const result = commaDelimitedStringToStringArray('aa,bb  ,  c c')
    expect(result).toEqual(['aa', 'bb', 'c c'])
  })
})

describe('stringArrayToCommaDelimitedString', () => {
  it('should return empty string if provided string array is empty', () => {
    const result = stringArrayToCommaDelimitedString([])
    expect(result).toEqual('')
  })

  it('should join values separated by comma', () => {
    const result = stringArrayToCommaDelimitedString(['a', 'b ', ' c'])
    expect(result).toEqual('a,b , c')
  })
})
