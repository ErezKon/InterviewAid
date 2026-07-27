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
    n = len(nums)
    heap = min-heap of (value, index)

    // Phase 1: simulate until all elements ≥ max(nums)
    maxVal = MAX(nums)
    WHILE k > 0 AND heap.TOP().value < maxVal:
        (val, idx) = heap.POP()
        heap.PUSH((val * multiplier, idx))
        k -= 1

    // Phase 2: distribute remaining k ops evenly
    // Each element gets k/n or k/n+1 more multiplications
    base = k / n; extra = k % n
    SORT heap by (value, index)
    FOR i ← 0 TO n - 1:
        power = base + (1 IF i < extra ELSE 0)
        nums[heap[i].idx] = heap[i].val % MOD * MODPOW(multiplier, power, MOD) % MOD

    RETURN nums
```

---

## Key Takeaway

> **Two-phase approach: simulate with heap until convergence, then batch-apply remaining ops with modular exponentiation. Handles k up to 10⁹ efficiently.**
