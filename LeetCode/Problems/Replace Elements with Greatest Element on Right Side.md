# 1299. Replace Elements with Greatest Element on Right Side

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side)
**Companies:** Amazon, Google, Meta, Zoho

---

```
FUNCTION replaceElements(arr):
    maxRight = -1
    FOR i ← len(arr) - 1 DOWN TO 0:
        arr[i], maxRight = maxRight, MAX(maxRight, arr[i])
    RETURN arr
```
