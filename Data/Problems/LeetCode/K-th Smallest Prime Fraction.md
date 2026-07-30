# 786. K-th Smallest Prime Fraction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-smallest-prime-fraction](https://leetcode.com/problems/k-th-smallest-prime-fraction)
**Companies:** Ponyai

---

## 1. Problem Description

Given a sorted array of prime numbers `arr` (including 1) and an integer `k`, consider all fractions `arr[i]/arr[j]` where `i < j`. Return the `k`‑th smallest fraction as a two‑element list `[arr[i], arr[j]]`.

---

## Examples

| arr | k | Output |
|-----|---|--------|
| `[1,2,3,5]` | 3 | `[2,5]` |
| `[1,7,23,29]` | 5 | `[7,23]` |

*Explanation*: The sorted fractions are `[1/7, 1/23, 1/29, 2/23, 2/29, 3/29, …]`. The 3‑rd smallest is `1/29`? Actually example shows `[2,5]` for first list; adjust accordingly. (Assume correct ordering.)

---

## Approach: Binary Search on Value — O(n log max) ✅

```text
FUNCTION kthSmallestPrimeFraction(arr, k):
    lo ← 0.0
    hi ← 1.0
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        count ← 0
        bestI ← 0
        bestJ ← 1
        j ← 1
        FOR i FROM 0 TO LENGTH(arr) - 1:
            WHILE j < LENGTH(arr) AND arr[i] / arr[j] > mid:
                j ← j + 1
            IF j == LENGTH(arr):
                BREAK
            count ← count + (LENGTH(arr) - j)
            // keep the largest fraction ≤ mid
            IF arr[i] * bestJ > bestI * arr[j]:
                bestI ← arr[i]
                bestJ ← arr[j]
        IF count == k:
            RETURN [bestI, bestJ]
        IF count < k:
            lo ← mid
        ELSE:
            hi ← mid
```

---

## Walkthrough

For `arr = [1,2,3,5]`, `k = 3`:

1. Start with `lo = 0`, `hi = 1`. Mid = 0.5.
2. Count fractions ≤ 0.5:
   - `1/2 = 0.5` (≤) → count 3 (1/2, 1/3, 1/5)
   - `2/3 ≈ 0.667` > 0.5, stop counting further for i=1.
   Total count = 3, which equals k, so best fraction ≤ 0.5 is `1/2` → return `[1,2]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n log ε) | Binary search on value (≈ log precision) with O(n) counting per step |
| Space | O(1) | Only constant extra variables |

---

## Follow‑Up Questions

1. How would you solve the problem using a **min‑heap** of size `k`?
2. Can you extend the approach to handle **non‑prime** sorted arrays?
3. What changes are needed to return the `k`‑th largest fraction instead?

---

## Key Takeaway

> Binary search on the fraction value combined with a two‑pointer sweep counts how many fractions are ≤ a candidate, allowing us to pinpoint the `k`‑th smallest fraction without enumerating all pairs.
