# 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k](https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k)
**Companies:** Turing, Zscaler

---

## 1. Problem Description

You are given a **positive** integer `k`. Initially, you have an array `nums = [1]`.

You can perform **any** of the following operations on the array **any** number of times (**possibly zero**):

- Choose any element in the array and **increase** its value by `1`.
- Duplicate any element in the array and add it to the end of the array.

Return *the **minimum** number of operations required to make the **sum** of elements of the final array greater than or equal to* `k`.

**Constraints:**
- `1 ≤ k ≤ 10⁵`

---

## 2. Key Insight

> It's optimal to increment a single element first (from 1 to some value `v`), then duplicate it. With `v-1` increments and `⌈k/v⌉ - 1` duplicates, the total ops = `(v-1) + (⌈k/v⌉ - 1)`. Minimize over `v`.

---

## 3. Approach: Math Optimization — O(√k) ✅

```text
FUNCTION minOperations(k):
    IF k <= 1:
        RETURN 0
    best ← k - 1  // worst case: increment k‑1 times
    FOR v FROM 1 TO k:
        copies ← CEIL(k / v) - 1
        ops ← (v - 1) + copies
        best ← MIN(best, ops)
        IF v * v >= k:
            BREAK  // optimal is near √k
        END IF
    END FOR
    RETURN best
```

---

## Examples

```
Example 1:
  Input: k = 11
  Output: 5
  Explanation: We can do the following operations on the array nums = [1]:
  - Increase the element by 1 three times. The resulting array is nums = [4].
  - Duplicate the element two times. The resulting array is nums = [4,4,4].
  The sum of the final array is 4 + 4 + 4 = 12 which is greater than or equal to k = 11.
  The total number of operations performed is 3 + 2 = 5.

Example 2:
  Input: k = 1
  Output: 0
  Explanation: The sum of the original array is already greater than or equal to 1, so no operations are needed.
```

---

## Walkthrough

Consider `k = 10`:
| Step | Array | Operation | Sum |
|------|-------|-----------|-----|
| Start | `[1]` | – | 1 |
| Increment 1→2 | `[2]` | +1 | 2 |
| Duplicate 2 | `[2,2]` | duplicate | 4 |
| Increment one 2→3 | `[3,2]` | +1 | 5 |
| Duplicate 3 | `[3,3,2]` | duplicate | 8 |
| Increment one 2→3 | `[3,3,3]` | +1 | 9 |
| Increment one 3→4 | `[4,3,3]` | +1 | 10 |

The sequence uses 5 operations, matching the optimal count.

---

## Complexity Analysis

- **Time:** O(√k) – the loop stops once `v` reaches √k because the optimal `v` lies near the square root of `k`.
- **Space:** O(1) – only a few scalar variables are used.

---

## Follow-Up Questions

1. How would the solution change if you could also decrement elements?
2. What if the array could start with an arbitrary initial value instead of `[1]`?
3. Can you extend the approach to handle a target sum with a weighted cost for increment vs. duplicate operations?

---

## Key Takeaway

> Increment‑then‑duplicate problems have an optimal balance point near `√k`: increment to `√k`, then duplicate `√k` times, giving ~`2√k` total operations.
