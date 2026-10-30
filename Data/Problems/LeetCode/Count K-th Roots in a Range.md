# 3932. Count K-th Roots in a Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-k-th-roots-in-a-range](https://leetcode.com/problems/count-k-th-roots-in-a-range)
**Companies:** Google, Meta

---

## 1. Problem Description

You are given three integers `l`, `r`, and `k`.

An integer `y` is said to be a **perfect k^th power** if there exists an integer `x` such that `y = x^k`.

Return the number of integers `y` in the range `[l, r]` (inclusive) that are **perfect k^th powers**.

**Constraints:**
- `0 <= l <= r <= 10^9`
- `1 <= k <= 30`

---

## 2. Approach: Count via k-th Root — O(hi^(1/k)) ✅

```text
FUNCTION countKthRoots(lo, hi, k):
    // Helper to compute integer k‑th root floor
    FUNCTION intRoot(n, k):
        low ← 1
        high ← n
        WHILE low ≤ high:
            mid ← (low + high) // 2
            IF pow(mid, k) ≤ n:
                ans ← mid
                low ← mid + 1
            ELSE:
                high ← mid - 1
        RETURN ans
    
    countUpToHi ← intRoot(hi, k)
    countUpToLoMinusOne ← intRoot(lo - 1, k)
    RETURN countUpToHi - countUpToLoMinusOne
```

| Time | Space |
|------|-------|
| O(log hi) for each root calculation | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: l = 1, r = 9, k = 3
Output: 2
Explanation: The perfect cubes in the range [1, 9] are:
- 1 = 1^3
- 8 = 2^3
Hence, the answer is 2.
```

**Example 2:**
```
Input: l = 8, r = 30, k = 2
Output: 3
Explanation: The perfect squares in the range [8, 30] are:
- 9 = 3^2
- 16 = 4^2
- 25 = 5^2
Hence, the answer is 3.
```

---

## 4. Walkthrough

Take Example 1 (`lo = 1, hi = 10, k = 2`):
1. Compute `intRoot(10,2)` → binary search finds 3 because 3²=9 ≤10 and 4²=16>10.
2. Compute `intRoot(0,2)` (since lo‑1 = 0) → returns 0.
3. Result = 3 − 0 = 3, matching the three perfect squares 1,4,9.

---

## 5. Complexity Analysis

- **Time:** Each `intRoot` runs in O(log n) binary search; we call it twice → O(log hi).
- **Space:** O(1) auxiliary space.

---

## 6. Follow-Up Questions

1. How would you adapt the solution for very large `hi` where `pow(mid, k)` may overflow?
2. Can you extend the method to count numbers that are perfect powers of *any* exponent up to a given limit?
3. What if the range `[lo, hi]` is huge and you need to answer many queries efficiently?

---

## Key Takeaway

> The count of perfect k‑th powers up to `n` is `⌊n^(1/k)⌋`. Use binary search to compute the integer k‑th root safely, then subtract the counts for the lower bound.
