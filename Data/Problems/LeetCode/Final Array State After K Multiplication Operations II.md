# 3266. Final Array State After K Multiplication Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-ii](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-ii)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Same as Part I but with very large `k` (up to 10⁹) and results modulo 10⁹+7. Repeatedly multiply the minimum element by `multiplier`.

---

## Key Insight

> After some initial multiplications, all elements converge to similar magnitudes. At that point, remaining operations distribute evenly. Use a **min-heap** for initial rounds until convergence, then use **modular exponentiation** to distribute remaining operations.

---

## Approach: Heap + Modular Exponentiation ✅

```
FUNCTION getFinalState(nums, k, multiplier):
    MOD = 10^9 + 7
    n = LEN(nums)
    heap = MIN-HEAP of (value, index) FROM nums
    maxVal = MAX(nums)
    WHILE k > 0 AND heap.TOP().value < maxVal:
        (val, idx) = heap.POP()
        heap.PUSH((val * multiplier, idx))
        k -= 1
    base = k / n
    extra = k % n
    SORT heap BY (value, index)
    FOR i ← 0 TO n - 1:
        power = base + (1 IF i < extra ELSE 0)
        (val, idx) = heap[i]
        nums[idx] = (val % MOD) * MODPOW(multiplier, power, MOD) % MOD
    RETURN nums
```

---

## Examples

**Example 1:**
```
nums = [1,2,3], k = 5, multiplier = 2
Final array = [32, 64, 96]
```
*Explanation:* Heap operations multiply the smallest element repeatedly until all values are comparable, then remaining multiplications are batched.

**Example 2:**
```
nums = [5,5,5], k = 3, multiplier = 3
Final array = [135, 135, 135]
```
*Explanation:* All elements are equal, so each receives one multiplication; modular exponentiation handles large `k` efficiently.

---

## Walkthrough

| Step | Heap (value,index) | k remaining | Action |
|------|--------------------|-------------|--------|
| 0 | [(1,0),(2,1),(3,2)] | 5 | Initial state |
| 1 | [(2,0),(2,1),(3,2)] | 4 | Multiply 1 → 2 |
| 2 | [(2,0),(4,1),(3,2)] | 3 | Multiply 2 → 4 |
| 3 | [(3,2),(4,1),(4,0)] | 2 | Multiply 2 → 4 |
| 4 | [(4,0),(4,1),(6,2)] | 1 | Multiply 3 → 6 |
| 5 | Converged, batch remaining 1 op | 0 | Distribute via modular exponentiation |

---

## Complexity Analysis

- **Time:** `O(min(k, n log n) + n log n)` – heap operations for the first phase, then sorting and batch updates.
- **Space:** `O(n)` for the heap and result array.

---

## Follow-Up Questions

1. How would you adapt the algorithm if `multiplier` could be negative?
2. Can you extend the solution to support multiple different multipliers applied in sequence?
3. What changes are needed if the modulo is not prime?

---

## Key Takeaway

> **Two-phase approach: simulate with heap until convergence, then batch‑apply remaining ops with modular exponentiation. Handles k up to 10⁹ efficiently.**