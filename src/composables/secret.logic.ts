
export const SecretService = {

  getSalt() {
    return import.meta.env.VITE_OWNERSHIP_SALT
  },

  generateOwnershipToken(formId: string): string {
    const salt = this.getSalt()
    return btoa(`${formId}:${salt}`).split('').reverse().join('')
  },

  verifyOwnership(formId: string, token?: string): boolean {
    if (!token) return false

    const expectedToken = this.generateOwnershipToken(formId)
    return token === expectedToken
  }
}
