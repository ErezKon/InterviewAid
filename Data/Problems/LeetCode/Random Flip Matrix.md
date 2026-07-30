# 519. Random Flip Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-flip-matrix](https://leetcode.com/problems/random-flip-matrix)
**Companies:** Google

---

## Problem Description
You are given the dimensions of a binary matrix `n x m` initially filled with zeros. Implement a class with two methods:
- `flip()`: Randomly select a cell that is still `0`, change it to `1`, and return its `[row, col]` coordinates. All remaining zero cells must have equal probability of being chosen.
- `reset()`: Reset the matrix to all zeros.
The goal is to achieve `O(1)` average time per operation and use `O(k)` extra space where `k` is the number of flips performed.

## Examples
**Example 1:**
```
obj = RandomFlipMatrix(2, 3)
obj.flip() // might return [0,1]
obj.flip() // might return [1,2]
obj.reset()
obj.flip() // now any of the 6 cells could be returned
```
**Example 2:**
```
obj = RandomFlipMatrix(1, 1)
obj.flip() // returns [0,0]
obj.flip() // undefined behavior (no zero cells left)
obj.reset()
obj.flip() // returns [0,0] again
```

## Approach
**Reservoir‑style Mapping (Hash‑based Indexing)**
Treat the matrix as a flat list of `n*m` cells indexed from `0` to `n*m-1`. Maintain a hash map that records a remapped index for each flipped cell. When `flip()` is called:
1. Choose a random integer `x` in `[0, remaining-1]` where `remaining` is the count of still‑zero cells.
2. The actual index to return is `map.get(x, x)` (if `x` has been remapped, use its value; otherwise `x`).
3. Decrease `remaining` by 1.
4. Map `x` to `map.get(remaining, remaining)` to keep the pool compact.
`reset()` clears the map and restores `remaining = n*m`.
This ensures each zero cell is equally likely while using only `O(k)` extra space.

```text
CLASS RandomFlipMatrix:
    CONSTRUCTOR(n, m):
        SET total ← n * m
        SET remaining ← total
        SET mapping ← DICTIONARY()
        SET rows ← n
        SET cols ← m

    FUNCTION flip():
        IF remaining == 0:
            RETURN null // or raise error
        SET randIdx ← RANDOM_INTEGER(0, remaining - 1)
        SET actualIdx ← mapping.GET(randIdx, randIdx)
        SET lastIdx ← remaining - 1
        SET lastMapped ← mapping.GET(lastIdx, lastIdx)
        SET mapping[randIdx] ← lastMapped
        SET remaining ← remaining - 1
        RETURN [actualIdx DIVIDE rows, actualIdx MOD rows]

    FUNCTION reset():
        CLEAR mapping
        SET remaining ← total
```

## Walkthrough
For a `2×3` matrix (`total = 6`):
1. `remaining = 6`. Suppose `randIdx = 4` → `actualIdx = 4` → cell `[1,1]`. Map `4 → 5` and `remaining = 5`.
2. Next call: `remaining = 5`. Random `randIdx = 2` → `actualIdx = 2` → cell `[0,2]`. Map `2 → 4` (since `5` was previously mapped to `5`). `remaining = 4`.
The map now contains `{4:5, 2:4}` representing the swapped indices.

## Complexity Analysis
Time: O(1) average for both `flip()` and `reset()`.
Space: O(k) where `k` is the number of flips performed (size of the map).

## Follow‑Up Questions
1. How would you modify the design to support weighted probabilities for each cell?
2. Can the solution be extended to a 3‑D grid with similar performance guarantees?
3. What are the trade‑offs of using a balanced BST instead of a hash map for deterministic ordering?

## Key Takeaway
By treating the matrix as a flat pool and lazily swapping used indices into a hash map, we achieve constant‑time random flips with minimal extra memory.
