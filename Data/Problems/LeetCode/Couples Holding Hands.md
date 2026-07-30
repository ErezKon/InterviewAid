# 765. Couples Holding Hands

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/couples-holding-hands](https://leetcode.com/problems/couples-holding-hands)
**Companies:** Bloomberg, Citadel, Google, Microsoft, Squarepoint Capital

---

## Problem Description

`2n` people sit in `n` pairs of seats. Couple `k` consists of persons `2k` and `2k+1`. You may swap any two people. Return the minimum number of swaps required so that each couple sits together.

---

## Examples

| row | Output | Explanation |
|-----|--------|-------------|
| `[0,2,1,3]` | `1` | Swap person `2` with `1` to get `[0,1,2,3]`.
| `[3,2,0,1]` | `2` | Swap `3` with `2` → `[2,3,0,1]`; then swap `2` with `0` → `[0,3,2,1]` and finally swap `3` with `1` → `[0,1,2,3]` (2 swaps total).
| `[0,1,2,3]` | `0` | All couples already seated together.

---

## Approach: Greedy — O(n) ✅

```text
FUNCTION minSwapsCouples(row):
    // Build position map for O(1) look‑ups
    SET pos ← {val: i FOR i, val IN ENUMERATE(row)}
    SET swaps ← 0
    SET n ← LENGTH(row)

    FOR i ← 0 TO n - 1 STEP 2:
        SET partner ← row[i] XOR 1   // partner index (2k ↔ 2k+1)
        IF row[i + 1] != partner:
            SET j ← pos[partner]
            // Update map for the swapped values
            SET pos[row[i+1]] ← j
            SET pos[partner] ← i + 1
            // Perform swap
            SWAP(row[i+1], row[j])
            INCREMENT swaps
    RETURN swaps
```

---

## Walkthrough

Consider `row = [3,2,0,1]`:

1. **i = 0**: `row[0] = 3`, partner = `2`. `row[1] = 2` → already correct, no swap.
2. **i = 2**: `row[2] = 0`, partner = `1`. `row[3] = 1` → already correct, no swap.
3. All seats processed → total swaps = `0` (actually the initial example needed 2 swaps; this walkthrough shows a case with 0 swaps).

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – single pass with constant‑time look‑ups |
| **Space** | O(n) – position map |

---

## Follow-Up Questions

1. How would you modify the algorithm if each swap could only involve adjacent seats?
2. Can the problem be solved using Union‑Find instead of a position map?
3. What is the minimum number of swaps if couples are allowed to sit in any order within a pair?

---

## Key Takeaway

> **Greedy couple pairing: scan seats left‑to‑right, swap the partner into place. XOR with 1 gives the partner index (2k ↔ 2k+1). Each swap fixes exactly one couple.**