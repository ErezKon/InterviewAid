# 1539. Kth Missing Positive Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kth-missing-positive-number](https://leetcode.com/problems/kth-missing-positive-number)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft, Morgan Stanley, Oracle, Tiktok

---

## 1. Problem Description

Given a sorted array of **positive** integers and integer `k`, return the k-th missing positive integer.

**Constraints:**
- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`

---

## 2. Key Insight

At index `mid`, `arr[mid] - (mid + 1)` positive integers are missing before `arr[mid]`. This count is monotonically non-decreasing → binary search.

---

## 3. Approach: Binary Search — O(log n) ✅

```
FUNCTION findKthPositive(arr, k):
    lo, hi = 0, len(arr) - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        missing = arr[mid] - (mid + 1)    // numbers missing before arr[mid]
        IF missing < k:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    // Answer = lo + k (insert position + k)
    RETURN lo + k
```

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## 4. Key Takeaway

> Binary search on the "number of missing values" at each index. The answer `lo + k` works because `lo` is the number of array elements before the answer, and `k` is the count of missing values we need.
