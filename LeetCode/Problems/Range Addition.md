# 370. Range Addition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-addition](https://leetcode.com/problems/range-addition)
**Companies:** Amazon, Google, Salesforce

---

```
FUNCTION getModifiedArray(length, updates):
    arr = [0] * length
    FOR [start, end, inc] IN updates:
        arr[start] += inc
        IF end + 1 < length: arr[end + 1] -= inc
    // Prefix sum
    FOR i ← 1 TO length - 1: arr[i] += arr[i-1]
    RETURN arr
```

Difference array technique — O(n + k).
