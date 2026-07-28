# 888. Fair Candy Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fair-candy-swap](https://leetcode.com/problems/fair-candy-swap)
**Companies:** Amazon, Bloomberg, Fidessa, Google, Meta, Microsoft, Swiggy

---

## Problem Description

Alice and Bob have candy bars of different sizes. Find one bar from each to swap so both end up with the **same total**. Return `[aliceBar, bobBar]`.

---

## Examples

| Alice | Bob | Output |
|-------|-----|--------|
| [1,2,5] | [2,4] | [5,4] |
| [1,1] | [2,2] | [] (no valid swap) |

---

## Key Insight

> After swapping bar `a` (Alice) for bar `b` (Bob): `sumA - a + b = sumB - b + a` → `b = a - (sumA - sumB) / 2`. Compute the diff, then for each of Alice's bars, check if the needed Bob bar exists in a set.

---

## Approach: Set Lookup — O(n + m) ✅

```text
FUNCTION fairCandySwap(aliceSizes, bobSizes):
    SET sumA ← SUM(aliceSizes)
    SET sumB ← SUM(bobSizes)
    SET diff ← (sumA - sumB) / 2
    SET bobSet ← SET(bobSizes)
    FOR a IN aliceSizes:
        IF a - diff IN bobSet:
            RETURN [a, a - diff]
    RETURN []
```

---

## Walkthrough

1. Compute sums: `sumA = 1+2+5 = 8`, `sumB = 2+4 = 6`.
2. `diff = (8-6)/2 = 1`.
3. For each `a` in Alice:
   - a=1 → need `1-1=0` not in Bob.
   - a=2 → need `2-1=1` not in Bob.
   - a=5 → need `5-1=4` which exists in Bob → swap `[5,4]`.

---

## Complexity Analysis

- **Time:** O(n + m) – one pass to compute sums and build a set, then another pass over Alice's bars.
- **Space:** O(m) – set of Bob's sizes.

---

## Key Takeaway

> **Math reduces swap problem to a lookup: `b = a - diff`. Use a set for O(1) existence checks. Classic two-sum variant.**