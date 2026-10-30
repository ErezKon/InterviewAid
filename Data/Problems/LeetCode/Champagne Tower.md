# 799. Champagne Tower

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/champagne-tower](https://leetcode.com/problems/champagne-tower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

## Problem Description
We stack glasses in a pyramid, where the **first** row has `1` glass, the **second** row has `2` glasses, and so on until the 100th row. Each glass holds one cup of champagne.

Then, some champagne is poured into the first glass at the top. When the topmost glass is full, any excess liquid poured will fall equally to the glass immediately to the left and right of it. When those glasses become full, any excess champagne will fall equally to the left and right of those glasses, and so on. (A glass at the bottom row has its excess champagne fall on the floor.)

For example, after one cup of champagne is poured, the top most glass is full. After two cups of champagne are poured, the two glasses on the second row are half full. After three cups of champagne are poured, those two cups become full - there are 3 full glasses total now. After four cups of champagne are poured, the third row has the middle glass half full, and the two outside glasses are a quarter full.

Now after pouring some non-negative integer cups of champagne, return how full the `j`-th glass in the `i`-th row is (both `i` and `j` are 0-indexed.)

**Constraints:**
- `0 <= poured <= 10^9`
- `0 <= query_glass <= query_row < 100`

## Examples
```
Example 1:
  Input: poured = 1, query_row = 1, query_glass = 1
  Output: 0.00000
  Explanation: We poured 1 cup of champange to the top glass of the tower (which is indexed as (0, 0)). There will be no excess liquid so all the glasses under the top glass will remain empty.
```

```
Example 2:
  Input: poured = 2, query_row = 1, query_glass = 1
  Output: 0.50000
  Explanation: We poured 2 cups of champange to the top glass of the tower (which is indexed as (0, 0)). There is one cup of excess liquid. The glass indexed as (1, 0) and the glass indexed as (1, 1) will share the excess liquid equally, and each will get half cup of champange.
```

```
Example 3:
  Input: poured = 100000009, query_row = 33, query_glass = 17
  Output: 1.00000
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
