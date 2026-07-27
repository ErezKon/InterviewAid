# 846. Hand of Straights

**Difficulty:** 🟡 Medium
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/hand-of-straights](https://leetcode.com/problems/hand-of-straights)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Visa

---

## 1. Problem Description

Given `hand` (array of integers) and `groupSize`, return `true` if the hand can be rearranged into groups of `groupSize` consecutive integers.

---

## 2. Approach: Sorted Map — O(n log n) ✅

```
FUNCTION isNStraightHand(hand, groupSize):
    IF len(hand) % groupSize != 0: RETURN false

    count = sorted frequency map

    WHILE count:
        start = MIN key in count

        FOR i ← start TO start + groupSize - 1:
            IF i NOT IN count: RETURN false
            count[i] -= 1
            IF count[i] == 0: DELETE count[i]

    RETURN true
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> Greedy: always start from the smallest available card. Try to form a group of `groupSize` consecutive cards. If any card is missing, return false.
