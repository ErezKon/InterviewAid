# 2260. Minimum Consecutive Cards to Pick Up

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up](https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up)
**Companies:** Google

---

## Key Insight

> Find the shortest subarray containing a duplicate. Track **last seen index** of each card value. For each card, if seen before, the window size is `i - lastSeen[card] + 1`.

---

## Approach: Hash Map — O(n) ✅

```
FUNCTION minimumCardPickup(cards):
    lastSeen ← MAP()
    minLen ← INFINITY
    
    FOR i ← 0 TO LEN(cards) - 1 DO
        IF cards[i] IN lastSeen THEN
            minLen ← MIN(minLen, i - lastSeen[cards[i]] + 1)
        lastSeen[cards[i]] ← i
    
    RETURN minLen IF minLen ≠ INFINITY ELSE -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash map | **O(n)** | **O(n)** |

---

## Key Takeaway

> **Shortest window with a duplicate** — track last occurrence and compute window length on each repeat.

---
