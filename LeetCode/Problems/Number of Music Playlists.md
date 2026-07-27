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

Create a playlist of `goal` songs from `n` unique songs. Every song must be played at least once. A song can be replayed only after `k` other songs have been played. Count valid playlists mod 10⁹+7.

---

## 2. Key Insight

> `dp[i][j]` = number of playlists of length `i` using exactly `j` unique songs. For the i-th song, either introduce a new song (`n-j+1` choices) or replay an old one (`max(0, j-k)` choices).

---

## 3. Approach: DP — O(goal · n) ✅

```
FUNCTION numMusicPlaylists(n, goal, k):
    MOD = 10^9 + 7
    dp = [[0] * (n+1) for _ in range(goal+1)]
    dp[0][0] = 1

    FOR i ← 1 TO goal:
        FOR j ← 1 TO MIN(i, n):
            // Add a new song
            dp[i][j] = dp[i-1][j-1] * (n - j + 1)
            // Replay an old song (must have > k unique to choose from)
            IF j > k:
                dp[i][j] += dp[i-1][j] * (j - k)
            dp[i][j] %= MOD

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
