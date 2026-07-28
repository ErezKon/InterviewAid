# 952. Largest Component Size by Common Factor

**Difficulty:** 🔴 Hard
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an array of integers, connect any two numbers that share a common factor > 1. Return the size of the largest connected component.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [4,6,15,35]` | `4` | All numbers are connected through common factors: 4‑6 share 2, 6‑15 share 3, 15‑35 share 5, forming one component of size 4. |
| `nums = [20,50,9,63]` | `2` | `20` and `50` share factor 10, forming a component of size 2; `9` and `63` share factor 9, another component of size 2. Largest size is 2. |
| `nums = [2,3,5,7,11]` | `1` | No two numbers share a factor > 1, so each number is its own component.

---

## 3. Approach — Union‑Find by Prime Factors ✅

```text
FUNCTION largestComponentSize(nums):
    maxVal ← MAXIMUM of nums
    uf ← UNIONFIND(maxVal + 1)
    FOR each num IN nums:
        FOR each prime IN primeFactors(num):
            uf.UNION(num, prime)
    // count component sizes
    sizeMap ← EMPTY MAP
    FOR each num IN nums:
        root ← uf.FIND(num)
        INCREMENT sizeMap[root]
    RETURN MAXIMUM value in sizeMap
```

---

## 4. Walkthrough

**Example:** `nums = [4,6,15,35]`

1. `maxVal = 35`, create Union‑Find for indices `0..35`.
2. Process `4` → prime factors `{2}` → `uf.UNION(4,2)`.
3. Process `6` → primes `{2,3}` → `uf.UNION(6,2)`, `uf.UNION(6,3)`.
4. Process `15` → primes `{3,5}` → `uf.UNION(15,3)`, `uf.UNION(15,5)`.
5. Process `35` → primes `{5,7}` → `uf.UNION(35,5)`, `uf.UNION(35,7)`.
6. After unions, all numbers `4,6,15,35` share a common root, so component size = 4.
7. Count sizes via `sizeMap` and return the maximum.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(n · √M) where M is max(nums) (factorization) |
| Space | O(M) for Union‑Find structure |

---

## 6. Follow‑Up Questions

- How would you modify the algorithm if numbers could be up to 10⁹, making factorization expensive?
- Can you solve the problem without explicit Union‑Find, using graph traversal instead?
- What if the definition of connectivity required a common factor ≥ k for a given k?

---

## 7. Key Takeaway

> Union‑Find on prime factors efficiently groups numbers sharing any factor, turning a pairwise connectivity problem into near‑linear time.
