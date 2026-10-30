# 2906. Construct Product Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-product-matrix](https://leetcode.com/problems/construct-product-matrix)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given a **0-indexed** 2D integer matrix `grid` of size `n * m`, we define a **0-indexed** 2D matrix `p` of size `n * m` as the **product** matrix of `grid` if the following condition is met:

- Each element `p[i][j]` is calculated as the product of all elements in `grid` except for the element `grid[i][j]`. This product is then taken modulo `12345`.

Return *the product matrix of* `grid`.

**Constraints:**
- `1 <= n == grid.length <= 10^5`
- `1 <= m == grid[i].length <= 10^5`
- `2 <= n * m <= 10^5`
- `1 <= grid[i][j] <= 10^9`

## Examples
```
Example 1:
  Input: grid = [[1,2],[3,4]]
  Output: [[24,12],[8,6]]
  Explanation: p[0][0] = grid[0][1] * grid[1][0] * grid[1][1] = 2 * 3 * 4 = 24
    p[0][1] = grid[0][0] * grid[1][0] * grid[1][1] = 1 * 3 * 4 = 12
    p[1][0] = grid[0][0] * grid[0][1] * grid[1][1] = 1 * 2 * 4 = 8
    p[1][1] = grid[0][0] * grid[0][1] * grid[1][0] = 1 * 2 * 3 = 6
    So the answer is [[24,12],[8,6]].
```
```
Example 2:
  Input: grid = [[12345],[2],[1]]
  Output: [[2],[0],[0]]
  Explanation: p[0][0] = grid[0][1] * grid[0][2] = 2 * 1 = 2.
    p[0][1] = grid[0][0] * grid[0][2] = 12345 * 1 = 12345. 12345 % 12345 = 0. So p[0][1] = 0.
    p[0][2] = grid[0][0] * grid[0][1] = 12345 * 2 = 24690. 24690 % 12345 = 0. So p[0][2] = 0.
    So the answer is [[2],[0],[0]].
```

## Approach
Flatten the grid to a 1‑D list. Pre‑compute prefix and suffix products modulo `MOD`. For each index `i`, the product of all other elements equals `prefix[i] * suffix[i+1] % MOD`.

```text
FUNCTION constructProductMatrix(grid):
    SET MOD ← 12345
    // flatten
    SET flat ← []
    FOR each row IN grid:
        FOR each val IN row:
            APPEND val TO flat
    SET n ← LEN(flat)
    // prefix products
    SET prefix ← ARRAY of size n+1 filled with 1
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← (prefix[i] * flat[i]) % MOD
    // suffix products
    SET suffix ← ARRAY of size n+1 filled with 1
    FOR i ← n-1 DOWNTO 0:
        SET suffix[i] ← (suffix[i+1] * flat[i]) % MOD
    // build result matrix
    SET result ← MATRIX with same dimensions as grid
    SET idx ← 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            SET result[r][c] ← (prefix[idx] * suffix[idx+1]) % MOD
            SET idx ← idx + 1
    RETURN result
```

## Walkthrough
| idx | flat[idx] | prefix[idx] | suffix[idx+1] | result cell |
|-----|-----------|-------------|---------------|------------|
| 0 | 1 | 1 | (2·3·4) % 12345 = 24 | 24 |
| 1 | 2 | (1) | (3·4) % 12345 = 12 | 12 |
| 2 | 3 | (1·2) % 12345 = 2 | (4) % 12345 = 4 | 8 |
| 3 | 4 | (1·2·3) % 12345 = 6 | 1 | 6 |

## Complexity Analysis
- **Time:** `O(m·n)` – one pass to flatten and one pass to fill result.
- **Space:** `O(m·n)` for the flattened list and prefix/suffix arrays (can be reduced to O(1) with two passes).

## Follow‑Up Questions
1. How would you adapt the algorithm to avoid overflow without using modulo until the end?
2. Can you compute the matrix in‑place without extra arrays?
3. How would the solution change if `grid` could contain zeros?

## Key Takeaway
Prefix and suffix products let you compute the product of all other elements for each position in linear time without repeated multiplication.
