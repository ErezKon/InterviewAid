# 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k](https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k)
**Companies:** Turing, Zscaler

---

## 1. Problem Description

Given an array starting as `[1]`, you can perform operations: either increment an element by 1, or duplicate an element. Find the minimum number of operations to make the array sum ≥ `k`.

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

**Example 1:**
```
Input: k = 5
Output: 3
Explanation:
- Increment the initial 1 to 2 (1 operation).
- Duplicate 2 → [2,2] (1 operation), sum = 4.
- Increment one 2 to 3 (1 operation), sum = 5 ≥ k.
Total operations = 3.
```

**Example 2:**
```
Input: k = 10
Output: 5
Explanation:
- Increment 1 to 3 (2 operations).
- Duplicate 3 twice: [3,3,3] (2 operations), sum = 9.
- Increment one 3 to 4 (1 operation), sum = 10.
Total operations = 5.
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
