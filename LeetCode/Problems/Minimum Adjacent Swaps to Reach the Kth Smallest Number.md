# 1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number](https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number)
**Companies:** Google, Meta

---

## Key Insight

> Find the k-th **next permutation** of the number string. Then count minimum adjacent swaps to transform the original into that permutation (greedy: find each target character and bubble it into place).

---

## Approach: Next Permutation + Greedy Swaps ✅

```
FUNCTION getMinSwaps(num, k):
    original ← LIST(num)
    target ← LIST(num)
    
    // Apply next_permutation k times
    FOR _ ← 1 TO k DO
        nextPermutation(target)
    
    // Count swaps to transform original → target
    swaps ← 0
    FOR i ← 0 TO LEN(original) - 1 DO
        IF original[i] ≠ target[i] THEN
            j ← i + 1
            WHILE original[j] ≠ target[i] DO j ← j + 1
            WHILE j > i DO
                SWAP(original[j], original[j-1])
                j ← j - 1
                swaps ← swaps + 1
    
    RETURN swaps
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| k × next_perm + O(n²) swaps | **O(kn + n²)** | **O(n)** |

---

## Key Takeaway

> **Next permutation + swap counting** — generate the target permutation, then greedily count adjacent swaps to reach it.

---
