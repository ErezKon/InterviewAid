# 193. Valid Phone Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-phone-numbers](https://leetcode.com/problems/valid-phone-numbers)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a string `phoneNumber`, determine if it matches one of the two valid US phone number formats: `XXX-XXX-XXXX` or `(XXX) XXX-XXXX`, where `X` is a digit from `0` to `9`. Return `true` if the format is valid, otherwise return `false`.

## Examples
- Input: `"123-456-7890"` → Output: `true` // matches first format.
- Input: `"(123) 456-7890"` → Output: `true` // matches second format.
- Input: `"1234567890"` → Output: `false` // missing separators.

## Approach
Use a regular expression to capture the two allowed patterns. The regex checks for either three digits followed by a hyphen, three digits, another hyphen, and four digits, **or** an opening parenthesis, three digits, a closing parenthesis, a space, three digits, a hyphen, and four digits.

```text
FUNCTION isValidPhoneNumber(phoneNumber):
    SET pattern ← "^(\\d{3}-\\d{3}-\\d{4}$)|(^\\(\\d{3}\\) \\d{3}-\\d{4}$)"
    RETURN MATCHES(phoneNumber, pattern)
```

## Walkthrough
| Step | phoneNumber               | Action                                 | Result |
|------|---------------------------|----------------------------------------|--------|
| 1    | "123-456-7890"           | Apply regex – first alternative matches| true   |
| 2    | "(123) 456-7890"         | Apply regex – second alternative matches| true   |
| 3    | "1234567890"             | No alternative matches                 | false  |

## Complexity Analysis
- **Time:** O(n) – scanning the string once for regex matching, where n is the length of `phoneNumber`.
- **Space:** O(1) – only constant extra space is used.

## Follow-Up Questions
- How would you extend the validation to support international phone numbers?
- Can you validate phone numbers without using regular expressions?
- How would you handle optional country code prefixes like `+1`?

## Key Takeaway
A concise regular expression can efficiently validate fixed-format phone numbers with constant‑time checks.
