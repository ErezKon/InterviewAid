# 1955. Count Number of Special Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-special-subsequences](https://leetcode.com/problems/count-number-of-special-subsequences)
**Companies:** Amazon

---

## 1. Problem Description

Given an array `nums` consisting only of 0, 1, and 2, count the number of **special subsequences** of the form `0…0 1…1 2…2` (at least one of each value) and return the count modulo 10⁹ + 7.

---

## 2. Key Insight

> Track three DP states: `a` = subsequences using only 0s, `b` = subsequences of 0s followed by 1s, `c` = complete subsequences (0s → 1s → 2s). Each new element either starts a new subsequence of its phase or extends existing ones, doubling the possibilities.

---

## 3. Approach: Three‑State DP — O(n) ✅

```text
FUNCTION countSpecialSubsequences(nums):
    MOD ← 10^9 + 7
    a ← b ← c ← 0  // counts for phases 0, 1, 2
    FOR num IN nums DO:
        IF num == 0 THEN:
            a ← (2 * a + 1) % MOD   // start new or extend existing 0‑phase
        ELSE IF num == 1 THEN:
            b ← (2 * b + a) % MOD   // extend 1‑phase or transition from a
        ELSE:  // num == 2
            c ← (2 * c + b) % MOD   // extend 2‑phase or transition from b
    RETURN c
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[0,1,2]` | `1` | Only subsequence `0,1,2` qualifies. |
| `[0,0,1,2,2]` | `5` | Possible subsequences: `0,1,2` (choose any 0), `0,0,1,2`, `0,1,2,2`, `0,0,1,2,2`, `0,1,2,2` with different selections. |
| `[2,1,0]` | `0` | No valid ordering of 0→1→2.

---

## 5. Walkthrough

Consider `nums = [0,0,1,2]`.

1. Start with `a=b=c=0`.
2. First `0`: `a = 2*0 + 1 = 1`.
3. Second `0`: `a = 2*1 + 1 = 3` (subsequences: `[0]` from each position, plus `[0,0]`).
4. `1`: `b = 2*0 + a = 3` (each existing 0‑subsequence can either include or skip this `1`).
5. `2`: `c = 2*0 + b = 3` (each 0‑1 subsequence can either include or skip this `2`).
6. Final `c = 3` → three special subsequences: `[0,1,2]` using first 0, second 0, and the 2; `[0,0,1,2]`; `[0,1,2]` using second 0.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only three counters.

---

## 7. Follow‑Up Questions

- How would the solution change if the allowed values were `0…k` for arbitrary `k`?
- Can you extend the DP to count subsequences with at least `m` occurrences of each value?

---

## Key Takeaway

> A three‑phase DP where each element either starts, extends, or transitions its phase captures the combinatorial explosion via simple doubling.
