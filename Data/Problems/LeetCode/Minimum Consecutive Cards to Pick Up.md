# 2260. Minimum Consecutive Cards to Pick Up

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up)
**Companies:** Google

---

## Problem Description

You are given an integer array `cards` where `cards[i]` represents the **value** of the `i^th` card. A pair of cards are **matching** if the cards have the **same** value.

Return* the **minimum** number of **consecutive** cards you have to pick up to have a pair of **matching** cards among the picked cards.* If it is impossible to have matching cards, return `-1`.

**Constraints:**
- `1 <= cards.length <= 10^5`
- `0 <= cards[i] <= 10^6`

## Examples

**Example 1:**
```
Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.
```

**Example 2:**
```
Input: cards = [1,0,5,3]
Output: -1
Explanation: There is no way to pick up a set of consecutive cards that contain a pair of matching cards.
```

## Approach

**Algorithm:** Hash Map + Sliding Window (track last seen index)

For each card we store its most recent index. When we encounter a card that has been seen before, the window from the previous index to the current index (inclusive) forms a candidate segment. We keep the minimum length among all candidates.

```text
FUNCTION minimumCardPickup(cards):
    lastSeen ← MAP()
    minLen ← INFINITY
    FOR i ← 0 TO LEN(cards) - 1 DO
        val ← cards[i]
        IF val IN lastSeen THEN
            // duplicate found, compute window size
            candidate ← i - lastSeen[val] + 1
            minLen ← MIN(minLen, candidate)
        END IF
        lastSeen[val] ← i
    END FOR
    RETURN minLen IF minLen ≠ INFINITY ELSE -1
```

## Walkthrough

| Index `i` | `cards[i]` | `lastSeen` before step | Action | `minLen` |
|-----------|------------|------------------------|--------|----------|
| 0 | 3 | {} | store 3→0 | ∞ |
| 1 | 4 | {3:0} | store 4→1 | ∞ |
| 2 | 2 | {3:0,4:1} | store 2→2 | ∞ |
| 3 | 3 | {3:0,4:1,2:2} | duplicate, candidate = 3-0+1 = 4 → minLen=4 | 4 |
| … | … | … | … | … |

The algorithm finishes with `minLen = 4`.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n)** – single pass over the array |
| Space  | **O(n)** – hashmap storing last indices |

## Follow‑Up Questions

1. How would you modify the solution to return the actual segment indices?
2. Can the approach be adapted to find the shortest segment containing **k** equal cards?
3. What if the array is streamed and you cannot store all previous indices?

## Key Takeaway

By remembering the last occurrence of each card, we can compute the length of the smallest duplicate‑containing segment in linear time.
