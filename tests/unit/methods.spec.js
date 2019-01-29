import validators from '@/methods/validators'

// Email format validator

describe('Email format validator', () => {
  it('function exists', () => {
    const functionExists = (typeof validators.emailFormat === 'function')

    expect(functionExists).toBe(true)
  })

  it('works properly for marginal values', () => {
    const validMail = validators.emailFormat('aaa.aaa-aaa+aa@aaa.aa')

    const invalidMail1 = validators.emailFormat('aaa.aaa-aaa+aa@aaa')
    const invalidMail2 = validators.emailFormat('aaa.aaa-aaa+aa')
    const invalidMail3 = validators.emailFormat('aaaaa.aa')

    expect(validMail).toBe(true)
    expect(invalidMail1).toBe(false)
    expect(invalidMail2).toBe(false)
    expect(invalidMail3).toBe(false)
  })
})

// File mimetype validator

describe('File mimetype validator', () => {
  it('function exists', () => {
    const functionExists = (typeof validators.fileMimeType === 'function')

    expect(functionExists).toBe(true)
  })

  it('finds if mimetypes is set up', () => {
    const noMimeTypes = validators.fileMimeType('data:audio/aac;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IAr')
    expect(noMimeTypes).toBe(true)
  })

  it('finds if mimetypes is object', () => {
    const invalidMimeTypes = validators.fileMimeType('data:audio/aac;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IAr', 'image')
    expect(invalidMimeTypes).toBe(true)
  })

  it('works properly for marginal values', () => {
    const validFile = validators.fileMimeType('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4', ['image/png'])
    const invalidFile = validators.fileMimeType('data:audio/aac;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IAr', ['image/png'])

    expect(validFile).toBe(true)
    expect(invalidFile).toBe(false)
  })
})
