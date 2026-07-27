# 2053. Kth Distinct String in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kth-distinct-string-in-an-array](https://leetcode.com/problems/kth-distinct-string-in-an-array)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given a string array `arr`, return the **k-th distinct** string (appearing exactly once). Return `""` if fewer than k distinct strings exist.

---

## 2. Approach: Counter + Linear Scan — O(n) ✅

```
FUNCTION kthDistinct(arr, k):
    count = Counter(arr)
    FOR s IN arr:
        IF count[s] == 1:
            k -= 1
            IF k == 0: RETURN s
    RETURN ""
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Count frequencies, then scan in original order for strings with count == 1. Return the k-th one found. Order matters — scan `arr`, not the counter keys.
