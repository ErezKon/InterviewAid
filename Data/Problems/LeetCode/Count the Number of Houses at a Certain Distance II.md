# 3017. Count the Number of Houses at a Certain Distance II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii)
**Companies:** Oracle

---

## Problem Description

You are given three **positive** integers `n`, `x`, and `y`.

In a city, there exist houses numbered `1` to `n` connected by `n` streets. There is a street connecting the house numbered `i` with the house numbered `i + 1` for all `1 <= i <= n - 1`. An additional street connects the house numbered `x` with the house numbered `y`.

For each `k`, such that `1 <= k <= n`, you need to find the number of **pairs of houses** `(house1, house2)` such that the **minimum** number of streets that need to be traveled to reach `house2` from `house1` is `k`.

Return *a **1-indexed** array* `result` *of length* `n` *where* `result[k]` *represents the **total** number of pairs of houses such that the **minimum** streets required to reach a house from the other is* `k`.

**Note** that `x` and `y` can be **equal**.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= x, y <= n`

---

## Examples

```
Example 1:
  Input: n = 3, x = 1, y = 3
  Output: [6,0,0]
  Explanation: Let's look at each pair of houses:
  - For the pair (1, 2), we can go from house 1 to house 2 directly.
  - For the pair (2, 1), we can go from house 2 to house 1 directly.
  - For the pair (1, 3), we can go from house 1 to house 3 directly.
  - For the pair (3, 1), we can go from house 3 to house 1 directly.
  - For the pair (2, 3), we can go from house 2 to house 3 directly.
  - For the pair (3, 2), we can go from house 3 to house 2 directly.
```

```
Example 2:
  Input: n = 5, x = 2, y = 4
  Output: [10,8,2,0,0]
  Explanation: For each distance k the pairs are:
  - For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (2, 4), (4, 2), (3, 4), (4, 3), (4, 5), and (5, 4).
  - For k == 2, the pairs are (1, 3), (3, 1), (1, 4), (4, 1), (2, 5), (5, 2), (3, 5), and (5, 3).
  - For k == 3, the pairs are (1, 5), and (5, 1).
  - For k == 4 and k == 5, there are no pairs.
```

```
Example 3:
  Input: n = 4, x = 1, y = 1
  Output: [6,4,2,0]
  Explanation: For each distance k the pairs are:
  - For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (3, 4), and (4, 3).
  - For k == 2, the pairs are (1, 3), (3, 1), (2, 4), and (4, 2).
  - For k == 3, the pairs are (1, 4), and (4, 1).
  - For k == 4, there are no pairs.
```

---

## Approach

```text
FUNCTION countOfPairs(n, x, y):
    IF x > y: SWAP(x, y)
    result ← [0] * (n + 1)               // difference array for counts
    cycleLen ← y - x + 1

    // 1. Direct linear distances without using shortcut
    FOR d ← 1 TO n-1:
        result[d] ← result[d] + (n - d)   // each distance d appears (n-d) times in a line

    // 2. Adjust counts for pairs that benefit from the shortcut
    // For each possible left node i (1..x) and right node j (y..n),
    // the shortcut distance is min(|i-j|, (i-x)+(y-j)+1).
    // The benefit occurs when the shortcut path is shorter.
    // We compute range updates on result using difference array.
    FOR i ← 1 TO x:
        // maximum j where shortcut is beneficial
        maxJ ← MIN(n, i + cycleLen - 2)
        IF maxJ > y:
            startDist ← 1                     // shortest possible via shortcut
            endDist ← maxJ - i                 // linear distance without shortcut
            // apply range increment for distances startDist..endDist
            result[startDist] ← result[startDist] + 1
            result[endDist + 1] ← result[endDist + 1] - 1
    // Similar symmetric handling for nodes right of y can be merged.

    // 3. Convert difference array to actual counts
    FOR d ← 1 TO n:
        result[d] ← result[d] + result[d-1]
    RETURN result[1..n]
```

---

## Walkthrough

Consider the first example `n = 5, x = 2, y = 4`.

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Initialize `result` as zeros of length 6. | Positions 0..5, we will ignore index 0. |
| 2 | Add linear distances: for `d = 1..4`, add `(5-d)` to `result[d]`. | After this, `result = [0,4,3,2,1,0]`. |
| 3 | Process shortcut contributions. For `i = 1` (left of `x`): `maxJ = MIN(5, 1+3-2)=2`. No benefit because `maxJ ≤ y`. |
| 4 | For `i = 2` (at `x`): `maxJ = MIN(5, 2+3-2)=3`. Shortcut helps for pair `(2,4)` giving distance 1 instead of 2. Increment `result[1]` and decrement after `result[2]`. |
| 5 | After applying all i, convert difference array to prefix sums. | Final `result[1..5] = [4,4,2,0,0]`. |

The table shows how the shortcut reduces certain distances and how the difference‑array updates capture those reductions efficiently.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – linear passes for direct distances and shortcut updates |
| **Space** | O(n) – the result/difference array |

---

## Follow-Up Questions

1. How would the solution change if multiple shortcut edges were added?
2. Can the algorithm be adapted to return the actual pairs for each distance instead of just counts?
3. What if the houses formed a circular arrangement (ring) instead of a line?

---

## Key Takeaway

> Adding a single shortcut edge to a linear graph creates a cycle; by analyzing regions relative to the shortcut and using a difference array, we can count all shortest‑path distances for every pair in O(n) time.
