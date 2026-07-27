# 514. Freedom Trail

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/freedom-trail](https://leetcode.com/problems/freedom-trail)
**Companies:** Google, Phonepe, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n · m · n) ✅](#3-approach-dp--on--m--n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A ring of characters can rotate clockwise or counterclockwise. Spell a key by rotating to each character and pressing a button. Find the minimum number of steps.

**Constraints:**
- `1 <= ring.length, key.length <= 100`

---

## 2. Key Insight

> Use DP where state = current ring position. For each key character, try all positions of that character on the ring, computing the minimum rotation distance (min of clockwise/counterclockwise).

---

## 3. Approach: DP — O(n · m · n) ✅

```
FUNCTION findRotateSteps(ring, key):
    n = len(ring); m = len(key)
    pos = defaultdict(list)
    FOR i, c IN enumerate(ring): pos[c].ADD(i)

    dp = {0: 0}    // ring position → min steps
    FOR ch IN key:
        newDp = {}
        FOR ringPos, cost IN dp.items():
            FOR target IN pos[ch]:
                dist = MIN(ABS(target - ringPos), n - ABS(target - ringPos))
                newCost = cost + dist + 1
                newDp[target] = MIN(newDp.get(target, infinity), newCost)
        dp = newDp

    RETURN MIN(dp.values())
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n²) where m = key length, n = ring length |
| **Space** | O(n) — DP states |

---

## 5. Key Takeaway

> **State = ring position.** For each key character, transition to all matching positions on the ring. The circular distance is `min(|a-b|, n-|a-b|)`.
