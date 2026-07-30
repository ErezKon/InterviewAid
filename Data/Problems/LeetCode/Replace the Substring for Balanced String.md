# 1234. Replace the Substring for Balanced String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-the-substring-for-balanced-string](https://leetcode.com/problems/replace-the-substring-for-balanced-string)
**Companies:** Accolite

---

## Problem Description
Given a string `s` consisting only of characters `'Q'`, `'W'`, `'E'`, and `'R'`, you can replace any substring with any other characters. The string is *balanced* when each of the four characters appears exactly `|s|/4` times. Return the minimum length of a substring that can be replaced to make `s` balanced. It is guaranteed that `|s|` is a multiple of 4.

## Examples
- Input: `"QWER"` → Output: `0` (already balanced).
- Input: `"QQWE"` → Output: `1` (replace one `'Q'` with `'R'`).
- Input: `"QQQW"` → Output: `2` (replace two `'Q'` with `'E'` and `'R'`).

## Approach
Use a sliding window to find the smallest substring whose removal leaves the remaining characters within the required counts.

```text
FUNCTION MinReplaceLength(s):
    SET n ← LENGTH(s)
    SET required ← n / 4
    // Count total occurrences
    SET count ← MAP{'Q':0,'W':0,'E':0,'R':0}
    FOR ch IN s:
        INCREMENT count[ch]
    // If already balanced
    IF ALL count[c] ≤ required FOR c IN count:
        RETURN 0
    // Sliding window
    SET left ← 0
    SET minLen ← n
    FOR right ← 0 TO n-1:
        DECREMENT count[s[right]]
        // Shrink window while condition satisfied
        WHILE left ≤ right AND ALL count[c] ≤ required FOR c IN count:
            SET minLen ← MIN(minLen, right - left + 1)
            INCREMENT count[s[left]]
            INCREMENT left
    RETURN minLen
```

## Walkthrough
| Step | right char | count after decrement | window | condition satisfied? | minLen |
|------|------------|-----------------------|--------|----------------------|--------|
| 0 | Q | Q:2,W:1,E:1,R:1 | [0,0] | No | — |
| 1 | W | Q:2,W:0,E:1,R:1 | [0,1] | No | — |
| 2 | E | Q:2,W:0,E:0,R:1 | [0,2] | No | — |
| 3 | R | Q:2,W:0,E:0,R:0 | [0,3] | Yes (all ≤1) | 4 → shrink → minLen=2 |

## Complexity Analysis
- Time: O(n) – each character enters and leaves the window at most once.
- Space: O(1) – fixed-size count map.

## Follow‑Up Questions
1. How would the solution change if the string could contain other characters?
2. Can you extend the algorithm to return the actual substring(s) to replace?
3. What is the effect of using a different window‑shrink strategy on performance?

## Key Takeaway
A sliding window that tracks excess character counts efficiently finds the minimal substring whose replacement balances the string.
