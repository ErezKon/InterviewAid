# Grid DP Patterns

Related: #62, #63, #64, #120, #174, #221, #931

---

## Table of Contents

1. [Pattern Overview](#1-pattern-overview)
2. [Template: Min/Max Path in Grid](#2-template-minmax-path-in-grid)
3. [Problem Variations](#3-problem-variations)
4. [Visual: DP Flow Direction](#4-visual-dp-flow-direction)
5. [Space Optimization](#5-space-optimization)
6. [When to Use Reverse DP](#6-when-to-use-reverse-dp)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Pattern Overview

Grid DP problems share a common structure: compute an optimal value for each cell based on previously computed cells. The direction of computation and the combining operation define the variant.

---

## 2. Template: Min/Max Path in Grid

```
dp[i][j] = optimal value to reach (i, j)

Base: dp[0][0] = grid[0][0]
Transition: dp[i][j] = grid[i][j] + MIN(dp[i-1][j], dp[i][j-1])
Answer: dp[m-1][n-1]
```

---

## 3. Problem Variations

| Problem | Direction | Operation |
|---------|-----------|-----------|
| Unique Paths (#62) | right/down | SUM (count) |
| Unique Paths II (#63) | right/down | SUM, 0 at obstacles |
| Min Path Sum (#64) | right/down | MIN |
| Triangle (#120) | down-left/down-right | MIN |
| Dungeon Game (#174) | **Reverse** (bottom-right to top-left) | MIN health |
| Maximal Square (#221) | right/down/diagonal | MIN of 3 neighbors |
| Falling Path (#931) | down ± 1 col | MIN |

---

## 4. Visual: DP Flow Direction

```
Standard (top-left → bottom-right):     Reverse (bottom-right → top-left):

  → → → →                                          ← ← ← ←
  ↓       ↓                                ↑       ↑
  → → → →                                          ← ← ← ←
  ↓       ↓                                ↑       ↑
  → → → →                                          ← ← ← ←

  Used for: #62, #63, #64                 Used for: #174 (Dungeon Game)
```

**When to go forward:** The answer at `(i,j)` depends only on cells above/left.
**When to go backward:** The answer at `(i,j)` depends on what's ahead (e.g., minimum health needed to survive the rest of the path).

---

## 5. Space Optimization

Most grid DPs only need the previous row → O(n) space instead of O(mn).

```
// Instead of dp[m][n]:
prev = [0] * n
curr = [0] * n

FOR i ← 0 TO m - 1:
    FOR j ← 0 TO n - 1:
        curr[j] = grid[i][j] + MIN(prev[j], curr[j-1])
    prev = curr.copy()
```

For in-place modification (like Min Path Sum), space is O(1) by modifying the grid directly.

---

## 6. When to Use Reverse DP

Use reverse DP when:
- The optimal decision at a cell depends on **future** cells (e.g., "how much health do I need to survive from here to the end?")
- Forward DP would require tracking additional state (like minimum health along the path)

**Dungeon Game example:** `dp[i][j] = min health needed at (i,j)` to reach `(m-1, n-1)` alive. Computed from bottom-right to top-left.

---

## 7. Key Takeaway

> **Grid DP is one template with many faces** — the direction (forward/reverse), the operation (min/max/sum/count), and movement rules define the variant. Master the template and you solve the entire family.
