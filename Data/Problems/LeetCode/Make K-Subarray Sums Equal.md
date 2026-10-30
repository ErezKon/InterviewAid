# 2607. Make K-Subarray Sums Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-k-subarray-sums-equal](https://leetcode.com/problems/make-k-subarray-sums-equal)
**Companies:** Morgan Stanley, Observeai

---

## 1. Problem Description

You are given a **0-indexed** integer array `arr` and an integer `k`. The array `arr` is circular. In other words, the first element of the array is the next element of the last element, and the last element of the array is the previous element of the first element.

You can do the following operation any number of times:

- Pick any element from `arr` and increase or decrease it by `1`.

Return *the minimum number of operations such that the sum of each **subarray** of length* `k` *is equal*.

A **subarray** is a contiguous part of the array.

**Constraints:**

- `1 <= k <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: arr = [1,4,1,3], k = 2
  Output: 1
  Explanation: we can do one operation on index 1 to make its value equal to 3.
  The array after the operation is [1,3,1,3]
  - Subarray starts at index 0 is [1, 3], and its sum is 4
  - Subarray starts at index 1 is [3, 1], and its sum is 4
  - Subarray starts at index 2 is [1, 3], and its sum is 4
  - Subarray starts at index 3 is [3, 1], and its sum is 4
```

```
Example 2:
  Input: arr = [2,5,5,7], k = 3
  Output: 5
  Explanation: we can do three operations on index 0 to make its value equal to 5 and two operations on index 3 to make its value equal to 5.
  The array after the operations is [5,5,5,5]
  - Subarray starts at index 0 is [5, 5, 5], and its sum is 15
  - Subarray starts at index 1 is [5, 5, 5], and its sum is 15
  - Subarray starts at index 2 is [5, 5, 5], and its sum is 15
  - Subarray starts at index 3 is [5, 5, 5], and its sum is 15
```

---

## 3. Approach: GCD Cycles + Median — O(n log n) ✅

```
FUNCTION minChanges(nums, k):
    SET n ← LENGTH(nums)
    SET g ← GCD(n, k)                     // number of independent cycles
    SET totalChanges ← 0
    FOR start ← 0 TO g-1:
        // collect all indices in this cycle
        SET cycleVals ← []
        SET i ← start
        REPEAT:
            APPEND nums[i] TO cycleVals
            SET i ← (i + k) MOD n
        UNTIL i == start
        // optimal target is median of cycleVals
        SORT cycleVals
        SET median ← cycleVals[LEN(cycleVals)//2]
        FOR val IN cycleVals:
            SET totalChanges ← totalChanges + ABS(val - median)
    RETURN totalChanges
```

---

## 4. Walkthrough

For `nums = [1,2,3,4,5,6]`, `k = 2` (n = 6, g = GCD(6,2)=2):
| Cycle | Indices | Values | Sorted | Median | Changes |
|-------|---------|--------|--------|--------|---------|
| 0 | 0,2,4 | [1,3,5] | [1,3,5] | 3 | |1‑3|+|3‑3|+|5‑3| = 2 |
| 1 | 1,3,5 | [2,4,6] | [2,4,6] | 4 | |2‑4|+|4‑4|+|6‑4| = 2 |
Total changes = 2 + 2 = 4 (but we can choose values 3 and 5 to reduce to 3 changes as shown in example).
The algorithm computes the minimal sum of absolute deviations, which yields the optimal number of changes.

---

## 5. Complexity Analysis

- **Time:** O(n log n) – each cycle is sorted to find its median.
- **Space:** O(n) – storing values of each cycle (overall linear).

---

## 6. Follow‑Up Questions

- How would the solution change if you could only increment (or only decrement) elements?
- Can you achieve O(n) time by using a linear‑time median selection algorithm?
- What if the array length `n` is not a multiple of `k` and you must keep the original order of elements?

---

## 7. Key Takeaway

> Elements linked by steps of `k` form cycles determined by `gcd(n, k)`. Making each cycle uniform to its median yields the minimal total change.
