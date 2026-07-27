# 2149. Rearrange Array Elements by Sign

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-array-elements-by-sign](https://leetcode.com/problems/rearrange-array-elements-by-sign)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

```
FUNCTION rearrangeArray(nums):
    pos = [n for n in nums if n > 0]
    neg = [n for n in nums if n < 0]
    result = []
    FOR i ← 0 TO len(pos) - 1:
        result.ADD(pos[i])
        result.ADD(neg[i])
    RETURN result
```
