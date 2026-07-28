# 2260. Minimum Consecutive Cards to Pick Up

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up)
**Companies:** Google

---

## Problem Description

You are given an array `cards` where each element represents a card value. In one move you may pick up a **consecutive** segment of cards. The goal is to pick up a segment that contains **at least two cards with the same value**. Return the length of the smallest such segment, or `-1` if no such segment exists.

Constraints:
- `1 ≤ cards.length ≤ 10^5`
- `1 ≤ cards[i] ≤ 10^9`

## Examples

**Example 1**
```
Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: The segment cards[0..3] = [3,4,2,3] contains two 3's and has length 4, which is minimal.
```

**Example 2**
```
Input: cards = [1,0,5,3]
Output: -1
Explanation: No duplicate values, so no valid segment exists.
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
