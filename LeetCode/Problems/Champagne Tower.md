# 799. Champagne Tower

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/champagne-tower](https://leetcode.com/problems/champagne-tower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description
Given `poured` liters of champagne poured into the top glass of a pyramid, compute how much champagne is in the glass located at `query_row` and `query_glass` (0‑indexed). Each glass can hold at most 1 liter; any excess spills equally to the two glasses immediately below it.

## Examples
**Example 1:**
```
Input: poured = 1, query_row = 1, query_glass = 1
Output: 0.0
Explanation: Only the top glass receives champagne; the second row glasses stay empty.
```
**Example 2:**
```
Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.5
Explanation: After filling the top glass, 1 liter overflows equally to the two glasses in row 1.
```

## Approach
Simulate the pyramid row by row, storing the amount in each glass. For each glass, compute overflow = max(0, amount‑1) / 2 and add it to the two glasses below. Stop after processing `query_row` because deeper rows do not affect the target glass.

```text
FUNCTION ChampagneTower(poured, query_row, query_glass):
    // Initialize pyramid up to the needed row
    SET tower ← 2‑D array of size (query_row+1) × (query_row+1) filled with 0
    SET tower[0][0] ← poured

    FOR r ← 0 TO query_row‑1:
        FOR c ← 0 TO r:
            SET overflow ← MAX(0, tower[r][c]‑1) / 2
            IF overflow > 0:
                SET tower[r+1][c] ← tower[r+1][c] + overflow
                SET tower[r+1][c+1] ← tower[r+1][c+1] + overflow

    RETURN MIN(1, tower[query_row][query_glass])
```

## Walkthrough
| Row | Glass Index | Amount before overflow | Overflow added to next row |
|-----|-------------|------------------------|----------------------------|
| 0   | 0           | 2                      | 0.5 to (1,0) and 0.5 to (1,1) |
| 1   | 0           | 0.5                    | 0 (no overflow) |
| 1   | 1           | 0.5                    | 0 |
The target `(1,1)` holds 0.5 liters, capped at 1.

## Complexity Analysis
- **Time:** O(query_row²) – we process each glass up to the target row.
- **Space:** O(query_row²) for the 2‑D array (can be reduced to O(query_row) with rolling arrays).

## Follow‑Up Questions
1. How would you compute the amount for many queries efficiently?
2. Can the solution be adapted for a triangular pyramid with different glass capacities?
3. What is the effect of using a streaming approach that processes rows on the fly?

## Key Takeaway
Simulating overflow row by row with simple arithmetic yields the exact amount in any glass, and the problem’s constraints keep the simulation inexpensive.
