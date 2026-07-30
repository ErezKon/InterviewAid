# 2906. Construct Product Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-product-matrix](https://leetcode.com/problems/construct-product-matrix)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given a 2‑D integer array `grid` of size `m × n`, construct a new matrix of the same dimensions where each cell contains the product of **all other** elements in `grid` (i.e., the product of every element except the one at that position), modulo `12345`.

## Examples
**Example 1:**
```
grid = [[1,2],[3,4]]
All elements product = 1·2·3·4 = 24
Result matrix = [[(24/1) % 12345, (24/2) % 12345],
                [(24/3) % 12345, (24/4) % 12345]]
=> [[24,12],[8,6]]
```
**Example 2:**
```
grid = [[5]]
Result = [[1]]   // product of empty set is defined as 1
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
