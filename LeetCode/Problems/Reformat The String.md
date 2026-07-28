# 1417. Reformat The String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-the-string](https://leetcode.com/problems/reformat-the-string)
**Companies:** Microsoft

---

## Problem Description
Given a string `s` consisting of lowercase letters and digits, rearrange the characters so that no two adjacent characters are of the same type (letter vs. digit). If such an arrangement is impossible, return an empty string.

## Examples
| Input | Output |
|-------|--------|
| "a0b1c2" | "0a1b2c" |
| "leetcode" | "" |
| "1229857369" | "" |
| "covid2019" | "2c0o1v9i9d" |

## Approach
1. Separate letters and digits into two lists.
2. If the size difference exceeds 1, arrangement is impossible.
3. Start with the larger list, then interleave characters from the other list.

```text
FUNCTION ReformatString(s):
    SET letters ← FILTER(s, IS_LOWERCASE_LETTER)
    SET digits ← FILTER(s, IS_DIGIT)
    IF ABS(LENGTH(letters) - LENGTH(digits)) > 1:
        RETURN ""
    SET result ← []
    IF LENGTH(letters) >= LENGTH(digits):
        SET first ← letters
        SET second ← digits
    ELSE:
        SET first ← digits
        SET second ← letters
    END IF
    FOR i ← 0 TO LENGTH(second) - 1:
        APPEND first[i] TO result
        APPEND second[i] TO result
    END FOR
    IF LENGTH(first) > LENGTH(second):
        APPEND first[-1] TO result
    END IF
    RETURN JOIN(result, "")
```

## Walkthrough
For "a0b1c2":
1. letters = [a,b,c], digits = [0,1,2]
2. Sizes equal, start with letters.
3. Interleave → a0 b1 c2 → "a0b1c2" (or start with digits for alternative).

## Complexity Analysis
Time: O(n) – single pass to separate and interleave.
Space: O(n) – storage for the two lists and result.

## Follow-Up Questions
* How would you modify the algorithm to handle uppercase letters as a separate category?
* Can you solve the problem in‑place without extra lists?
* What if the requirement changes to avoid three consecutive characters of the same type?

## Key Takeaway
Balancing the counts of letters and digits and then interleaving them yields a valid arrangement when possible.
