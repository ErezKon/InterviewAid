# 3352. Count K-Reducible Numbers Less Than N

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-k-reducible-numbers-less-than-n](https://leetcode.com/problems/count-k-reducible-numbers-less-than-n)
**Companies:** Schneider Electric

---

## 1. Problem Description

You are given a **binary** string `s` representing a number `n` in its binary form.

You are also given an integer `k`.

An integer `x` is called **k-reducible** if performing the following operation **at most** `k` times reduces it to 1:

- Replace `x` with the **count** of set bits in its binary representation.

For example, the binary representation of 6 is `"110"`. Applying the operation once reduces it to 2 (since `"110"` has two set bits). Applying the operation again to 2 (binary `"10"`) reduces it to 1 (since `"10"` has one set bit).

Return an integer denoting the number of positive integers **less** than `n` that are **k-reducible**.

Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 800`
- `s` has no leading zeros.
- `s` consists only of the characters `'0'` and `'1'`.
- `1 <= k <= 5`

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

```
Example 1:
  Input: s = "111", k = 1
  Output: 3
  Explanation: n = 7. The 1-reducible integers less than 7 are 1, 2, and 4.
```

```
Example 2:
  Input: s = "1000", k = 2
  Output: 6
  Explanation: n = 8. The 2-reducible integers less than 8 are 1, 2, 3, 4, 5, and 6.
```

```
Example 3:
  Input: s = "1", k = 3
  Output: 0
  Explanation: There are no positive integers less than n = 1, so the answer is 0.
```

---

## 5. Walkthrough

Take `n = "1010"` (10) and `k = 2`:
1. Precompute steps: popcount(1)=1 → steps[1]=0, popcount(2)=1 → steps[2]=1, popcount(3)=2 → steps[2]=1 → steps[3]=2, etc.
2. For each possible popcount `b` (1-4), check if `steps[b] ≤ 2`.
3. Use digit DP to count numbers < 1010 with exactly `b` set bits. Sum those counts → 4.

---

## 6. Complexity Analysis

- **Time:** `O(L²)` where `L` is the length of the binary string (digit DP) plus `O(L)` for pre-computation.
- **Space:** `O(L²)` for DP table.

---

## 7. Follow-Up Questions

- How would the solution change if `k` were large (e.g., up to 30)?
- Can you extend the DP to handle a range `[L, R]` instead of `[1, n)`?
- What if the reduction operation were defined using the number of trailing zeros instead of popcount?

---

## Key Takeaway

> Combine a small pre-computation of popcount-reduction steps with digit DP on the binary representation to efficiently count k-reducible numbers.
