# 193. Valid Phone Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-phone-numbers](https://leetcode.com/problems/valid-phone-numbers)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

Given a text file `file.txt` that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers.

You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)

You may also assume each line in the text file must not contain leading or trailing white spaces.

## Examples

**Example 1:**
```
Assume that file.txt has the following content:
987-123-4567
123 456 7890
(123) 456-7890
Your script should output the following valid phone numbers:
987-123-4567
(123) 456-7890
```

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
