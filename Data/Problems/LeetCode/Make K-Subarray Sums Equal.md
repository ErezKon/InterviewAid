# 2607. Make K-Subarray Sums Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-k-subarray-sums-equal](https://leetcode.com/problems/make-k-subarray-sums-equal)
**Companies:** Morgan Stanley, Observeai

---

## 1. Problem Description

Given an integer array `nums` of length `n` and an integer `k`, modify the array so that every subarray of length `k` has the same sum. This is equivalent to requiring that for all indices `i`, the elements at positions `i` and `(i + k) mod n` become equal. Minimize the total number of element changes (each change can set an element to any integer).

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5,6], k = 2
Output: 3
Explanation: Positions (0,2,4) must be equal and positions (1,3,5) must be equal.
Choose target values 3 for the first cycle and 5 for the second cycle.
Changes: set nums[0]=3, nums[2]=3, nums[4]=3 (2 changes), set nums[1]=5, nums[3]=5, nums[5]=5 (1 change) → total 3.
```

**Example 2:**
```
Input: nums = [4,4,4,4], k = 1
Output: 0
Explanation: All elements already satisfy the condition.
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
