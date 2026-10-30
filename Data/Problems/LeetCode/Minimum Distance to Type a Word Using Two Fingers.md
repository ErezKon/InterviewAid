# 1320. Minimum Distance to Type a Word Using Two Fingers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers](https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP on (index, finger1, finger2) — O(n·26²)](#approach-dp-on-index-finger1-finger2--on26)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

![img](https://assets.leetcode.com/uploads/2026/06/04/image.png)
You have a keyboard layout as shown above in the **X-Y** plane, where each English uppercase letter is located at some coordinate.

- For example, the letter `'A'` is located at coordinate `(0, 0)`, the letter `'B'` is located at coordinate `(0, 1)`, the letter `'P'` is located at coordinate `(2, 3)` and the letter `'Z'` is located at coordinate `(4, 1)`.

Given the string `word`, return *the minimum total **distance** to type such string using only two fingers*.

The **distance** between coordinates `(x_1, y_1)` and `(x_2, y_2)` is `|x_1 - x_2| + |y_1 - y_2|`.

**Note** that the initial positions of your two fingers are considered free so do not count towards your total distance, also your two fingers do not have to start at the first letter or the first two letters.

**Constraints:**
- `2 <= word.length <= 300`
- `word` consists of uppercase English letters.

---

## Examples

**Example 1:**
```
Input: word = "CAKE"
Output: 3
Explanation: Using two fingers, one optimal way to type "CAKE" is:
Finger 1 on letter 'C' -> cost = 0
Finger 1 on letter 'A' -> cost = Distance from letter 'C' to letter 'A' = 2
Finger 2 on letter 'K' -> cost = 0
Finger 2 on letter 'E' -> cost = Distance from letter 'K' to letter 'E' = 1
Total distance = 3
```

**Example 2:**
```
Input: word = "HAPPY"
Output: 6
Explanation: Using two fingers, one optimal way to type "HAPPY" is:
Finger 1 on letter 'H' -> cost = 0
Finger 1 on letter 'A' -> cost = Distance from letter 'H' to letter 'A' = 2
Finger 2 on letter 'P' -> cost = 0
Finger 2 on letter 'P' -> cost = Distance from letter 'P' to letter 'P' = 0
Finger 1 on letter 'Y' -> cost = Distance from letter 'A' to letter 'Y' = 4
Total distance = 6
```

---

## Key Insight

> State: `(index, pos_finger1, pos_finger2)` — which character we're typing and where each finger is. At each step, we choose which finger types the next character. One finger is always at `word[index-1]`, so we can reduce state to `(index, other_finger_position)`.

The Manhattan distance between letters: `|r1-r2| + |c1-c2|` where `r = char/5, c = char%5` (5-column grid, not 6).

---

## Approach: DP on (index, finger1, finger2) — O(n·26²) ✅

```
FUNCTION minimumDistance(word):
    FUNCTION dist(a, b):
        IF a == -1: RETURN 0   // free starting position
        RETURN ABS(a/6 - b/6) + ABS(a%6 - b%6)

    // dp[i][other] = min cost to type word[i..] when the "other" finger is at position 'other'
    // One finger is always at word[i-1]
    n ← len(word)
    dp ← (n+1) × 27 array of infinity
    dp[n][*] ← 0   // base case

    FOR i ← n-1 DOWNTO 0:
        target ← word[i] - 'A'
        FOR other ← 0 TO 26:   // 26 = "not placed yet"
            prev ← (word[i-1] - 'A') IF i > 0 ELSE 26
            // Option 1: move the "active" finger (prev → target)
            dp[i][other] = MIN(dp[i][other], dist(prev, target) + dp[i+1][other])
            // Option 2: move the "other" finger (other → target)
            dp[i][prev] = MIN(dp[i][prev], dist(other, target) + dp[i+1][prev])

    RETURN dp[0][26]
```

---

## Walkthrough

```
word = "CAKE" → [2, 0, 10, 4]
```

At each step, decide which finger moves to the next key, minimizing total Manhattan distance. The DP explores all assignment possibilities.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 27) — for each character, enumerate 27 other-finger positions |
| **Space** | O(n · 27) — DP table (can be space-optimized to O(27)) |

---

## Follow-Up Questions

1. **Why 27 states for the other finger?** 26 letters + 1 for "not yet placed" (free start).
2. **Why not track both fingers explicitly?** One finger is always at the last typed position — we only need to track where the *other* finger is.
3. **What if there were 3 fingers?** State expands to track 2 "other" finger positions — O(n · 27²).

---

## Key Takeaway

> For two-pointer typing problems, reduce the state by noting that one pointer is always at the last action — only track the **idle pointer's position**, cutting state from O(26²) to O(26).
