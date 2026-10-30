# 519. Random Flip Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-flip-matrix](https://leetcode.com/problems/random-flip-matrix)
**Companies:** Google

---

## Problem Description
There is an `m x n` binary grid `matrix` with all the values set `0` initially. Design an algorithm to randomly pick an index `(i, j)` where `matrix[i][j] == 0` and flips it to `1`. All the indices `(i, j)` where `matrix[i][j] == 0` should be equally likely to be returned.

Optimize your algorithm to minimize the number of calls made to the **built-in** random function of your language and optimize the time and space complexity.

Implement the `Solution` class:

- `Solution(int m, int n)` Initializes the object with the size of the binary matrix `m` and `n`.
- `int[] flip()` Returns a random index `[i, j]` of the matrix where `matrix[i][j] == 0` and flips it to `1`.
- `void reset()` Resets all the values of the matrix to be `0`.

**Constraints:**

- `1 <= m, n <= 10⁴`
- There will be at least one free cell for each call to `flip`.
- At most `1000` calls will be made to `flip` and `reset`.

## Examples

```
Example 1:
  Input: ["Solution", "flip", "flip", "flip", "reset", "flip"]
         [[3, 1], [], [], [], [], []]
  Output: [null, [1, 0], [2, 0], [0, 0], null, [2, 0]]
  Explanation:
    Solution solution = new Solution(3, 1);
    solution.flip();  // return [1, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.
    solution.flip();  // return [2, 0], Since [1,0] was returned, [2,0] and [0,0]
    solution.flip();  // return [0, 0], Based on the previously returned indices, only [0,0] can be returned.
    solution.reset(); // All the values are reset to 0 and can be returned.
    solution.flip();  // return [2, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.
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
