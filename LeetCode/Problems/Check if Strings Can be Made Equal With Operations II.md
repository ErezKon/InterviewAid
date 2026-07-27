# 2840. Check if Strings Can be Made Equal With Operations II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii)
**Companies:** Amazon, Citrix, Google, Microsoft

---

```
FUNCTION checkStrings(s1, s2):
    // Even-indexed chars can be rearranged among themselves, same for odd
    RETURN sorted(s1[::2]) == sorted(s2[::2]) AND sorted(s1[1::2]) == sorted(s2[1::2])
```
