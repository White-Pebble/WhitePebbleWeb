/**
 * Check user provided email
 * @param email Email
 */
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

/**
 * Check user provided password
 * @param password Password
 */
export const validatePassword = (password: string) => {
  return String(password)
    .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
}

export const websiteToFull = (website: string) => website.replace('rustclash', 'RustClash').replace('clash', 'Clash')