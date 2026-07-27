# 2414. Length of the Longest Alphabetical Continuous Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring](https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring)
**Companies:** Amazon, Tiktok

---

## 1. Problem Description

Find the longest substring of consecutive alphabetical characters (e.g., "abc", "xyz").

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION longestContinuousSubstring(s):
    maxLen = 1; curr = 1
    FOR i ← 1 TO len(s) - 1:
        IF ord(s[i]) == ord(s[i-1]) + 1:
            curr += 1
            maxLen = MAX(maxLen, curr)
        ELSE:
            curr = 1
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track current streak of consecutive letters. Reset when the chain breaks. Classic single-pass counting.
