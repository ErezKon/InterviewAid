# 3352. Count K-Reducible Numbers Less Than N

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-k-reducible-numbers-less-than-n](https://leetcode.com/problems/count-k-reducible-numbers-less-than-n)
**Companies:** Schneider Electric

---

## 1. Problem Description

A number is k-reducible if, after repeatedly replacing it with its popcount (number of set bits), it reaches 1 in at most `k` steps. Count numbers less than `n` (given in binary) that are k-reducible.

---

## 2. Key Insight

> First, precompute `steps[x]` = number of popcount reductions to reach 1, for small `x` (up to ~800, the max popcount of n). Then use **digit DP** on the binary representation of `n` to count numbers with a given popcount, and sum over valid popcounts.

---

## 3. Approach: Digit DP — O(len(n)²) ✅

```text
FUNCTION countKReducible(s, k):
    n ← LENGTH(s)
    // Precompute steps to reach 1 for possible popcounts
    steps[0] ← 0
    FOR i FROM 1 TO n:
        steps[i] ← steps[popcount(i)] + 1
    
    result ← 0
    // Digit DP: count numbers < s with exactly b set bits
    FOR b FROM 1 TO n:
        IF steps[b] ≤ k:
            result ← result + countWithExactBits(s, b)
    RETURN result MOD 1_000_000_007
```

---

## 4. Examples

| `n` (binary) | `k` | Output | Explanation |
|--------------|-----|--------|-------------|
| `"1010"` (10) | 2 | 4 | Numbers < 10 that become 1 within 2 popcount steps: 1,2,3,5 |
| `"111"` (7) | 1 | 2 | Only 1 and 2 reduce to 1 in a single step.

---

## 5. Walkthrough

Take `n = "1010"` (10) and `k = 2`:
1. Precompute steps: popcount(1)=1 → steps[1]=0, popcount(2)=1 → steps[2]=1, popcount(3)=2 → steps[2]=1 → steps[3]=2, etc.
2. For each possible popcount `b` (1‑4), check if `steps[b] ≤ 2`.
3. Use digit DP to count numbers < 1010 with exactly `b` set bits. Sum those counts → 4.

---

## 6. Complexity Analysis

- **Time:** `O(L²)` where `L` is the length of the binary string (digit DP) plus `O(L)` for pre‑computation.
- **Space:** `O(L²)` for DP table.

---

## 7. Follow‑Up Questions

- How would the solution change if `k` were large (e.g., up to 30)?
- Can you extend the DP to handle a range `[L, R]` instead of `[1, n)`?
- What if the reduction operation were defined using the number of trailing zeros instead of popcount?

---

## Key Takeaway

> Combine a small pre‑computation of popcount‑reduction steps with digit DP on the binary representation to efficiently count k‑reducible numbers.
