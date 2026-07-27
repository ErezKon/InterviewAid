# 1298. Maximum Candies You Can Get from Boxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes](https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes)
**Companies:** Airbnb, Bloomberg, Google, Lyft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: BFS Simulation — O(n)](#approach-bfs-simulation--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You start with some boxes. Each box may be open or locked, contain candies, keys to other boxes, and other boxes. Open all reachable boxes and collect maximum candies.

**Constraints:**
- `1 ≤ n ≤ 1000`

---

## Key Insight

> BFS/simulation: process boxes you can open (have the box + it's open or you have the key). Opening a box may give you new keys and new boxes, which can unlock previously inaccessible boxes. Keep re-processing until no new boxes can be opened.

---

## Approach: BFS Simulation — O(n) ✅

```
FUNCTION maxCandies(status, candies, keys, containedBoxes, initialBoxes):
    queue = deque(initialBoxes)
    hasKey = set(); hasBox = set(initialBoxes); opened = set()
    total = 0

    WHILE queue:
        box = queue.POPLEFT()
        IF box IN opened: CONTINUE
        IF status[box] == 0 AND box NOT IN hasKey:
            queue.APPEND(box); CONTINUE
        opened.ADD(box)
        total += candies[box]
        FOR key IN keys[box]:
            hasKey.ADD(key)
            IF key IN hasBox: queue.APPEND(key)
        FOR b IN containedBoxes[box]:
            hasBox.ADD(b)
            queue.APPEND(b)

    RETURN total
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS Simulation | **O(n)** | O(n) |

---

## Key Takeaway

> **Simulation with BFS: track what you have (boxes, keys) and process anything newly openable.** The key-and-lock mechanic just requires re-enqueuing boxes when new keys arrive.
