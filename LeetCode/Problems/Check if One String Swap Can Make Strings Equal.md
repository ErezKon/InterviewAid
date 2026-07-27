# 1790. Check if One String Swap Can Make Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal)
**Companies:** Amazon, Doordash, Google, Meta, Microsoft

---

```
FUNCTION areAlmostEqual(s1, s2):
    diffs = [(a, b) for a, b in zip(s1, s2) if a != b]
    RETURN len(diffs) == 0 OR (len(diffs) == 2 AND diffs[0] == diffs[1][::-1])
```
