export const UAE_PHONE_PLACEHOLDER = "05X XXX XXXX or +971 5X XXX XXXX"

export const UAE_PHONE_ERROR =
    "Enter a valid UAE phone number starting with 05, +971, or 00971."

const removeFormatting = (value) =>
    String(value || "")
        .trim()
        .replace(/[\s().-]/g, "")

export const normalizeUaePhone = (value) => {
    const phone = removeFormatting(value)
    let nationalNumber = ""

    if (phone.startsWith("+971")) {
        nationalNumber = phone.slice(4)
    } else if (phone.startsWith("00971")) {
        nationalNumber = phone.slice(5)
    } else if (phone.startsWith("0")) {
        nationalNumber = phone.slice(1)
    } else {
        return null
    }

    if (!/^[1-9]\d{7,8}$/.test(nationalNumber)) {
        return null
    }

    return `+971${nationalNumber}`
}

export const isValidUaePhone = (value) => Boolean(normalizeUaePhone(value))

export const toUaePhoneDigits = (value) => {
    const normalizedPhone = normalizeUaePhone(value)

    return normalizedPhone ? normalizedPhone.slice(1) : null
}
