# 920. Number of Music Playlists

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-music-playlists](https://leetcode.com/problems/number-of-music-playlists)
**Companies:** Coursera, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(goal · n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Your music player contains `n` different songs. You want to listen to `goal` songs (not necessarily different) during your trip. To avoid boredom, you will create a playlist so that:

- Every song is played **at least once**.
- A song can only be played again only if `k` other songs have been played.

Given `n`, `goal`, and `k`, return *the number of possible playlists that you can create*. Since the answer can be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `0 <= k < n <= goal <= 100`

---

## 2. Key Insight

> `dp[i][j]` = number of playlists of length `i` using exactly `j` unique songs. For the i-th song, either introduce a new song (`n-j+1` choices) or replay an old one (`max(0, j-k)` choices).

---

## 3. Approach: DP — O(goal · n) ✅

```text
FUNCTION numMusicPlaylists(n, goal, k):
    MOD ← 10^9 + 7
    dp ← MATRIX (goal+1) × (n+1) FILLED WITH 0
    dp[0][0] ← 1
    FOR i ← 1 TO goal:
        FOR j ← 1 TO MIN(i, n):
            // Add a new song
            dp[i][j] ← dp[i-1][j-1] * (n - j + 1)
            // Replay an old song (must have > k unique to choose from)
            IF j > k:
                dp[i][j] ← dp[i][j] + dp[i-1][j] * (j - k)
            dp[i][j] ← dp[i][j] MOD MOD
    RETURN dp[goal][n]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(goal · n) |
| **Space** | O(goal · n), optimizable to O(n) |

---

## 5. Key Takeaway

> **DP on (playlist length, unique songs used).** Two transitions: introduce new song or replay old one. The replay constraint `k` limits which songs are eligible for repeat.

---

## Examples

**Example 1:**
```
Input: n = 3, goal = 3, k = 1
Output: 6
Explanation: There are 6 possible playlists: [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], and [3, 2, 1].
```

**Example 2:**
```
Input: n = 2, goal = 3, k = 0
Output: 6
Explanation: There are 6 possible playlists: [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2, 1], [2, 1, 2], and [1, 2, 2].
```

**Example 3:**
```
Input: n = 2, goal = 3, k = 1
Output: 2
Explanation: There are 2 possible playlists: [1, 2, 1] and [2, 1, 2].
```

---

## Walkthrough

Take the second example (`n=2, goal=3, k=1`).
| i (length) | j (unique used) | Transition | New dp value |
|------------|-----------------|------------|--------------|
| 1 | 1 | add new song (`2` choices) | dp[1][1] = 2 |
| 2 | 2 | add new song (`1` choice) | dp[2][2] = dp[1][1] * 1 = 2 |
| 3 | 2 | replay old song (`j‑k = 1` choice) | dp[3][2] = dp[2][2] * 1 = 2 |
The final answer `dp[3][2] = 2` matches the output.
