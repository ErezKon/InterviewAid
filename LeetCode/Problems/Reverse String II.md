# 541. Reverse String II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-string-ii](https://leetcode.com/problems/reverse-string-ii)
**Companies:** Accenture, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

```
FUNCTION reverseStr(s, k):
    arr = list(s)
    FOR i ← 0 TO n - 1 STEP 2*k:
        REVERSE(arr[i : i + k])
    RETURN JOIN(arr)
```

Every 2k characters, reverse the first k.
