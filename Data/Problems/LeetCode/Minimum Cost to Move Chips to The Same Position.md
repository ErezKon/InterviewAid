# 1217. Minimum Cost to Move Chips to The Same Position

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position](https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position)
**Companies:** Amazon, Bloomberg, Microsoft, Morgan Stanley

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Parity Count — O(n)](#approach-parity-count--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` chips at various positions on a number line. You can perform two types of moves:
- Move a chip by **2** positions (left or right): cost **0**
- Move a chip by **1** position (left or right): cost **1**

Return the **minimum cost** to move all chips to the same position.

**Constraints:**
- `1 ≤ n ≤ 100`
- `1 ≤ position[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input: position = [1, 2, 3]
Output: 1
Explanation: Move chip at 3 to 1 (cost 0, move by 2). Move chip at 2 to 1 (cost 1, move by 1). Total = 1.
```

**Example 2:**
```
Input: position = [2, 2, 2, 3, 3]
Output: 2
Explanation: Move the two chips at position 3 to position 2 (cost 1 each). Total = 2.
```

---

## Key Insight

> Moving by 2 is free, so all chips at **even** positions can be gathered at any even position for free, and all chips at **odd** positions can be gathered at any odd position for free. The only cost comes from moving one group to the other — **move the smaller group**.

This reduces the problem to simply counting even vs. odd positions.

---

## Approach: Parity Count — O(n) ✅

```
FUNCTION minCostToMoveChips(position):
    evens = SUM(1 for p in position if p % 2 == 0)
    odds = len(position) - evens
    RETURN MIN(evens, odds)
```

---

## Walkthrough

```
position = [2, 2, 2, 3, 3]
```

| Position | Parity |
|----------|--------|
| 2 | Even |
| 2 | Even |
| 2 | Even |
| 3 | Odd |
| 3 | Odd |

- evens = 3, odds = 2
- Move the 2 odd chips to an even position → cost = **2** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass to count parities |
| **Space** | O(1) — just two counters |

---

## Follow-Up Questions

1. **Why does parity matter?** Moving by 2 doesn't change parity, so it's free. Moving by 1 flips parity, which costs 1.
2. **Does the actual position value matter?** No — only whether it's even or odd, since moves of 2 are free.
3. **What if moves by 2 also had a cost?** Then you'd need to consider actual distances, making it a median-finding problem.

---

## Key Takeaway

> When one operation is free and the other costs 1, look for an **invariant** (here, parity) that the free operation preserves — the problem reduces to counting which group is smaller.
