# 562. Longest Line of Consecutive One in Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix](https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix)
**Companies:** Google

---

## 1. Problem Description

Find the longest line of consecutive 1s in a binary matrix (horizontal, vertical, diagonal, or anti-diagonal).

---

## 2. Approach: DP in 4 Directions — O(m·n) ✅

```
FUNCTION longestLine(mat):
    m, n = dimensions
    // dp[r][c] = (horizontal, vertical, diagonal, anti-diagonal)
    dp = m×n of (0,0,0,0)
    maxLen = 0

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF mat[r][c] == 1:
                h = (dp[r][c-1][0] + 1 IF c > 0 ELSE 1)
                v = (dp[r-1][c][1] + 1 IF r > 0 ELSE 1)
                d = (dp[r-1][c-1][2] + 1 IF r > 0 AND c > 0 ELSE 1)
                a = (dp[r-1][c+1][3] + 1 IF r > 0 AND c < n-1 ELSE 1)
                dp[r][c] = (h, v, d, a)
                maxLen = MAX(maxLen, h, v, d, a)

    RETURN maxLen
```

---

## 3. Examples

**Example 1:**
```
Input: mat = [[0,1,1,0],
              [0,1,1,0],
              [0,1,1,0]]
Output: 3
Explanation: The longest line of 1s is vertical in the second column.
```

**Example 2:**
```
Input: mat = [[1,1,0,0],
              [0,1,1,0],
              [0,0,1,1]]
Output: 3
Explanation: The longest line is the diagonal from (0,0) to (2,2).
```

---

## 4. Walkthrough

Consider Example 1. The DP table stores four direction lengths for each cell. When processing cell (1,1) which is `1`:
- Horizontal extends from (1,0): length 1 → becomes 2.
- Vertical extends from (0,1): length 1 → becomes 2.
- Diagonal extends from (0,0): `0` → starts at 1.
- Anti‑diagonal extends from (0,2): `1` → becomes 2.
Continuing this for every `1` updates `maxLen` to 3 at column 1.

---

## 5. Complexity Analysis

- **Time:** O(m·n) – each cell is visited once.
- **Space:** O(m·n) for the DP table (can be reduced to O(n) by keeping only the previous row).

---

## 6. Follow‑Up Questions

- How would you modify the solution to return the coordinates of the longest line?
- Can the space be reduced to O(1) by updating in‑place?
- How does the algorithm change for a toroidal (wrap‑around) matrix?

---

## 7. Key Takeaway

> Track 4 directions per cell. Each direction extends from its predecessor. Similar to "Maximal Square" but for lines in 4 orientations.
