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

```text
FUNCTION findKthPositive(arr, k):
    lo ← 0
    hi ← LENGTH(arr) - 1
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        missing ← arr[mid] - (mid + 1)    // numbers missing before arr[mid]
        IF missing < k:
            lo ← mid + 1
        ELSE:
            hi ← mid - 1
    // lo is the insertion point where missing >= k
    RETURN lo + k
```

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## 4. Examples

| arr | k | Output |
|-----|---|--------|
| [2,3,4,7,11] | 5 | 9 |
| [1,2,3,4] | 2 | 6 |
| [5,6,7] | 1 | 1 |

*Explanation:* In the first example, the missing numbers are `[1,5,6,8,9,10,…]`; the 5th missing is `9`.

---

## 5. Walkthrough

Consider `arr = [2,3,4,7,11]`, `k = 5`.

1. **Initial:** lo = 0, hi = 4.
2. **mid = 2**, `arr[2] = 4`, missing = `4 - (2+1) = 1`. Since 1 < 5, set lo = 3.
3. **mid = 3**, `arr[3] = 7`, missing = `7 - (3+1) = 3`. 3 < 5 → lo = 4.
4. **mid = 4**, `arr[4] = 11`, missing = `11 - (4+1) = 6`. 6 ≥ 5 → hi = 3.
5. Loop ends (lo = 4, hi = 3). Answer = lo + k = 4 + 5 = 9.

---

## 6. Complexity Analysis

- **Time:** Each iteration halves the search space → O(log n).
- **Space:** Only a few integer variables → O(1).

---

## 7. Follow-Up Questions

- How would you solve the problem if the array were not sorted?
- Can you extend the solution to handle multiple queries for different `k` values efficiently?
- What changes are needed if the array may contain duplicates?

---

## 8. Key Takeaway

> Binary search on the "number of missing values" at each index. The answer `lo + k` works because `lo` is the number of array elements before the answer, and `k` is the count of missing values we need.
