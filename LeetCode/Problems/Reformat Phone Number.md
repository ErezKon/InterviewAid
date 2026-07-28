# 1694. Reformat Phone Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-phone-number](https://leetcode.com/problems/reformat-phone-number)
**Companies:** Activision

---

## Problem Description
Given a string `number` containing digits, spaces, and hyphens, reformat it so that the digits are grouped in blocks of three separated by hyphens. If the final block would contain a single digit, split the last two blocks into groups of two digits each.

## Examples
| Input | Output |
|-------|--------|
| "1-23-45 6" | "123-456" |
| "123 4-567" | "123-45-67" |
| "123 4-5678" | "123-456-78" |

## Approach
1. Remove all non‑digit characters.
2. While more than 4 digits remain, take the next three and append a hyphen.
3. For the last 2‑4 digits, apply the rule: if 4 remain, split into two groups of two; otherwise output the remaining digits as a single block.

```text
FUNCTION ReformatPhoneNumber(numberString):
    // keep only digits
    SET digits ← FILTER(numberString, IS_DIGIT)
    SET result ← []
    WHILE LENGTH(digits) > 4:
        APPEND SUBSTRING(digits, 0, 3) TO result
        SET digits ← SUBSTRING(digits, 3)
    END WHILE
    IF LENGTH(digits) == 4:
        APPEND SUBSTRING(digits, 0, 2) TO result
        APPEND SUBSTRING(digits, 2, 2) TO result
    ELSE:
        APPEND digits TO result
    END IF
    RETURN JOIN(result, "-")
```

## Walkthrough
For "1-23-45 6":
1. Digits → "123456".
2. Length >4, take "123", result=["123"], remaining="456".
3. Remaining length 3 → append "456".
4. Join → "123-456".

## Complexity Analysis
Time: O(n) – single pass to filter and group.
Space: O(n) – storage for the digits and result list.

## Follow-Up Questions
* How would you adapt the algorithm to support custom group sizes?
* Can you perform the reformatting in‑place without extra arrays?
* What changes are needed if the separator should be a space instead of a hyphen?

## Key Takeaway
Strip non‑digit characters, then greedily emit groups of three, handling the final four digits as two groups of two.
