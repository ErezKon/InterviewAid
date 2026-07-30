# 2410. Maximum Matching of Players With Trainers

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta
---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two integer arrays `players` and `trainers` where `players[i]` is the ability of the `i-th` player and `trainers[j]` is the training capacity of the `j-th` trainer. A player can be matched with a trainer only if the player's ability is **less than or equal to** the trainer's capacity. Each player and trainer can be matched at most once.

Return the **maximum number** of matchings.

**Constraints:**
- `1 <= players.length, trainers.length <= 10^5`
- `1 <= players[i], trainers[j] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  players = [4, 7, 9], trainers = [8, 2, 5, 8]
Output: 2
Explanation: Player 4 → trainer 5, player 7 → trainer 8. Player 9 has no match.
```

**Example 2:**
```
Input:  players = [1, 1, 1], trainers = [10]
Output: 1
Explanation: Only one trainer, so only one match.
```

---

## Key Insight

> **Greedy + Sorting**: Sort both arrays. Match the weakest unmatched player with the weakest available trainer that can handle them. This greedy approach is optimal because using a weaker trainer for a weaker player leaves stronger trainers for stronger players.

---

## Approach

```
FUNCTION matchPlayersAndTrainers(players, trainers)
    SORT players
    SORT trainers
    i ← 0, j ← 0, count ← 0

    WHILE i < len(players) AND j < len(trainers) DO
        IF players[i] <= trainers[j] THEN
            count ← count + 1
            i ← i + 1
        j ← j + 1

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
players = [4, 7, 9]  →  sorted: [4, 7, 9]
trainers = [8, 2, 5, 8]  →  sorted: [2, 5, 8, 8]
```

| Step | i | j | players[i] | trainers[j] | Match? | count |
|------|---|---|-----------|-------------|--------|-------|
| 1    | 0 | 0 | 4         | 2           | No     | 0     |
| 2    | 0 | 1 | 4         | 5           | Yes ✅ | 1     |
| 3    | 1 | 2 | 7         | 8           | Yes ✅ | 2     |
| 4    | 2 | 3 | 9         | 8           | No     | 2     |

j=4 → loop ends. **Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n + m log m)** — sorting both arrays |
| Space  | **O(1)** — in-place sort, two pointers |

---

## Follow-Up Questions

1. **Why is greedy optimal here?**
   Exchange argument: if you skip a valid match to "save" a trainer, you can never do better since both arrays are sorted.

2. **How does this relate to "Assign Cookies" (LeetCode 455)?**
   Identical pattern — match children (players) with cookies (trainers) using sorted greedy.

3. **What if each trainer could handle multiple players?**
   Would need a different approach — possibly a priority queue or bin-packing strategy.

---

## Key Takeaway

> **Sort + two-pointer greedy** is the canonical approach for maximum bipartite matching when the condition is a simple threshold comparison — O(n log n) and exchange-argument provable.
