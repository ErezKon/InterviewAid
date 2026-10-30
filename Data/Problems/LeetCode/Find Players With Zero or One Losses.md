# 2225. Find Players With Zero or One Losses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-players-with-zero-or-one-losses](https://leetcode.com/problems/find-players-with-zero-or-one-losses)
**Companies:** Google, Indeed, Karat, Palantir

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Map Counting — O(n log n) ✅](#4-approach-hash-map-counting--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer array `matches` where `matches[i] = [winner_i, loser_i]` indicates that the player `winner_i` defeated player `loser_i` in a match.

Return *a list *`answer`* of size *`2`* where:*

- `answer[0]` is a list of all players that have **not** lost any matches.
- `answer[1]` is a list of all players that have lost exactly **one** match.

The values in the two lists should be returned in **increasing** order.

**Note:**

- You should only consider the players that have played **at least one** match.
- The testcases will be generated such that **no** two matches will have the **same** outcome.

**Constraints:**
- `1 <= matches.length <= 10^5`
- `matches[i].length == 2`
- `1 <= winner_i, loser_i <= 10^5`
- `winner_i != loser_i`
- All `matches[i]` are **unique**.

---

## 2. Examples

**Example 1:**
```
Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation: Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].
```

**Example 2:**
```
Input: matches = [[2,3],[1,3],[5,4],[6,4]]
Output: [[1,2,5,6],[]]
Explanation: Players 1, 2, 5, and 6 have not lost any matches.
Players 3 and 4 each have lost two matches.
Thus, answer[0] = [1,2,5,6] and answer[1] = [].
```

---

## 3. Key Insight

> Track every player that appears and count losses only. Players with 0 losses go in list 1; players with exactly 1 loss go in list 2. A **hash map** of loss counts solves this in one pass.

---

## 4. Approach: Hash Map Counting — O(n log n) ✅

```
FUNCTION findWinners(matches):
    losses = Counter()
    players = set()
    FOR [w, l] IN matches:
        players.ADD(w); players.ADD(l)
        losses[l] += 1
    noLoss = sorted(p for p in players if losses[p] == 0)
    oneLoss = sorted(p for p in players if losses[p] == 1)
    RETURN [noLoss, oneLoss]
```

---

## 5. Walkthrough

```
matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]

After processing all matches:
  players = {1,2,3,4,5,6,7,8,9,10}
  losses  = {3:2, 6:2, 7:1, 5:1, 8:1, 9:2, 4:1}

  noLoss  (losses[p]==0): 1, 2, 10  → sorted: [1, 2, 10]
  oneLoss (losses[p]==1): 4, 5, 7, 8 → sorted: [4, 5, 7, 8]

Result: [[1,2,10], [4,5,7,8]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — O(n) to count, O(n log n) to sort results |
| **Space** | O(n) — hash map + set for all players |

---

## 7. Follow-Up Questions

### 7.1 Can you do it without a set for players?

Yes — use only the loss map. Winners not in the map have 0 losses. Or use a map initialized to 0 for all encountered players.

### 7.2 What if you need players with exactly k losses?

Generalize the filter: `losses[p] == k`. The structure is the same.

### 7.3 Could you use a sorted map (TreeMap) to avoid the final sort?

Yes — a `TreeMap` keeps keys sorted, so you can iterate in order without an explicit sort step.

---

## 8. Key Takeaway

> **Hash map counting** is the go-to pattern for "classify entities by frequency." Count the relevant metric (losses here), then filter by count thresholds.
