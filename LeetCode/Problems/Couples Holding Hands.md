# 765. Couples Holding Hands

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/couples-holding-hands](https://leetcode.com/problems/couples-holding-hands)
**Companies:** Bloomberg, Citadel, Google, Microsoft, Squarepoint Capital

---

## Problem Description

`2n` people sit in `n` pairs of seats. Couple `k` is persons `2k` and `2k+1`. Find the minimum number of swaps to seat every couple together.

---

## Key Insight

Greedy: for each pair of seats `(i, i+1)`, if the partner isn't adjacent, swap the person at `i+1` with the partner's current location. This always resolves one couple per swap. Use a position map for O(1) partner lookup.

---

## Approach: Greedy — O(n) ✅

```
FUNCTION minSwapsCouples(row):
    pos = {val: i for i, val in enumerate(row)}
    swaps = 0

    FOR i ← 0 TO n - 1 STEP 2:
        partner = row[i] ^ 1    // partner of row[i]
        IF row[i + 1] != partner:
            j = pos[partner]
            pos[row[i+1]] = j
            pos[partner] = i + 1
            SWAP(row[i+1], row[j])
            swaps += 1

    RETURN swaps
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) for position map |

---

## Key Takeaway

> **Greedy couple pairing: scan seats left-to-right, swap the partner into place. XOR with 1 gives the partner index (2k ↔ 2k+1). Each swap fixes exactly one couple.**
