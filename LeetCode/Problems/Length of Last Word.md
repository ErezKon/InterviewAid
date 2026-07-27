# 58. Length of Last Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/length-of-last-word](https://leetcode.com/problems/length-of-last-word)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Qualcomm, Tcs

---

## 1. Problem Description

Return the length of the last word in a string (words separated by spaces).

---

## 2. Approach — O(n) ✅

```
FUNCTION lengthOfLastWord(s):
    RETURN len(s.strip().split()[-1])
```

Or iterate from the end: skip trailing spaces, count non-space characters.

| Time | Space |
|------|-------|
| O(n) | O(1) with reverse scan |

---

## 3. Key Takeaway

> Strip trailing spaces, then count characters backward until a space. One-liner with `split()` also works.
