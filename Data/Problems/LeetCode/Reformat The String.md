# 1417. Reformat The String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-the-string](https://leetcode.com/problems/reformat-the-string)
**Companies:** Microsoft

---

## Problem Description
You are given an alphanumeric string `s`. (**Alphanumeric string** is a string consisting of lowercase English letters and digits).

You have to find a permutation of the string where no letter is followed by another letter and no digit is followed by another digit. That is, no two adjacent characters have the same type.

Return *the reformatted string* or return **an empty string** if it is impossible to reformat the string.

**Constraints:**

- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters and/or digits.

## Examples

```
Example 1:
  Input: s = "a0b1c2"
  Output: "0a1b2c"
  Explanation: No two adjacent characters have the same type in "0a1b2c". "a0b1c2", "0a1b2c", "0c2a1b" are also valid permutations.
```

```
Example 2:
  Input: s = "leetcode"
  Output: ""
  Explanation: "leetcode" has only characters so we cannot separate them by digits.
```

```
Example 3:
  Input: s = "1229857369"
  Output: ""
  Explanation: "1229857369" has only digits so we cannot separate them by characters.
```

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
    IF LENGTH(digits) >= LENGTH(letters):   // ties start with a digit
        SET first ← digits
        SET second ← letters
    ELSE:
        SET first ← letters
        SET second ← digits
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
Example 1: `s = "a0b1c2"`
1. letters = [a,b,c], digits = [0,1,2]; |3 - 3| = 0 ≤ 1, so it is possible.
2. Sizes equal → first = digits, second = letters.
3. Interleave: i=0 → "0a", i=1 → "0a1b", i=2 → "0a1b2c".
4. No leftover → return "0a1b2c" (expected output).

Example 2 (`"leetcode"`): 8 letters vs 0 digits, difference > 1 → "".

## Complexity Analysis
Time: O(n) – single pass to separate and interleave.
Space: O(n) – storage for the two lists and result.

## Follow-Up Questions
* How would you modify the algorithm to handle uppercase letters as a separate category?
* Can you solve the problem in-place without extra lists?
* What if the requirement changes to avoid three consecutive characters of the same type?

## Key Takeaway
Balancing the counts of letters and digits and then interleaving them yields a valid arrangement when possible.
