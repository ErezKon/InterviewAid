# 765. Couples Holding Hands

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/couples-holding-hands](https://leetcode.com/problems/couples-holding-hands)
**Companies:** Bloomberg, Citadel, Google, Microsoft, Squarepoint Capital

---

## Problem Description

There are `n` couples sitting in `2n` seats arranged in a row and want to hold hands.

The people and seats are represented by an integer array `row` where `row[i]` is the ID of the person sitting in the `i`-th seat. The couples are numbered in order, the first couple being `(0, 1)`, the second couple being `(2, 3)`, and so on with the last couple being `(2n - 2, 2n - 1)`.

Return *the minimum number of swaps so that every couple is sitting side by side*. A swap consists of choosing any two people, then they stand up and switch seats.

**Constraints:**
- `2n == row.length`
- `2 <= n <= 30`
- `n` is even.
- `0 <= row[i] < 2n`
- All the elements of `row` are **unique**.

---

## Examples

```
Example 1:
  Input: row = [0,2,1,3]
  Output: 1
  Explanation: We only need to swap the second (row[1]) and third (row[2]) person.
```

```
Example 2:
  Input: row = [3,2,0,1]
  Output: 0
  Explanation: All couples are already seated side by side.
```

---

## Approach: Greedy — O(n) ✅

```text
FUNCTION minSwapsCouples(row):
    // Build position map for O(1) look-ups
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
| **Time** | O(n) – single pass with constant-time look-ups |
| **Space** | O(n) – position map |

---

## Follow-Up Questions

1. How would you modify the algorithm if each swap could only involve adjacent seats?
2. Can the problem be solved using Union-Find instead of a position map?
3. What is the minimum number of swaps if couples are allowed to sit in any order within a pair?

---

## Key Takeaway

> **Greedy couple pairing: scan seats left-to-right, swap the partner into place. XOR with 1 gives the partner index (2k ↔ 2k+1). Each swap fixes exactly one couple.**