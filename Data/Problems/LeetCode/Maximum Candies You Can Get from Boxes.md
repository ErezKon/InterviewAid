# 1298. Maximum Candies You Can Get from Boxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes](https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes)
**Companies:** Airbnb, Bloomberg, Google, Lyft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS Simulation — O(n)](#approach-bfs-simulation--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You start with some boxes. Each box may be open or locked, contain candies, keys to other boxes, and other boxes. Open all reachable boxes and collect maximum candies.

**Constraints:**
- `1 ≤ n ≤ 1000`

---

## Examples

**Example 1:**
```
status = [1,0,1,0]
candies = [7,5,4,100]
keys = [[],[0],[1,2],[]]
containedBoxes = [[1,2],[],[3],[]]
initialBoxes = [0]
```
**Output:** `111`
**Explanation:**
- Start with box 0 (open) → collect 7 candies, obtain boxes 1 and 2.
- Box 2 is open → collect 4 candies, obtain box 3.
- Box 3 is locked but we now have key 3 from box 2, so open it → collect 100 candies.
- Total = 7 + 4 + 100 = 111.

**Example 2:**
```
status = [0,0,1]
candies = [5,10,15]
keys = [[],[0],[]]
containedBoxes = [[1],[2],[]]
initialBoxes = [0]
```
**Output:** `15`
**Explanation:**
Only box 2 is initially reachable (open) and contains 15 candies. Other boxes remain locked.

---

## Key Insight

> BFS/simulation: process boxes you can open (have the box + it's open or you have the key). Opening a box may give you new keys and new boxes, which can unlock previously inaccessible boxes. Keep re-processing until no new boxes can be opened.

---

## Approach: BFS Simulation — O(n) ✅

```text
FUNCTION maxCandies(status, candies, keys, containedBoxes, initialBoxes):
    queue ← deque(initialBoxes)
    hasKey ← SET()
    hasBox ← SET(initialBoxes)
    opened ← SET()
    total ← 0

    WHILE queue IS NOT EMPTY:
        box ← queue.POPLEFT()
        IF box IN opened: CONTINUE
        IF status[box] = 0 AND box NOT IN hasKey:
            queue.APPEND(box)
            CONTINUE
        opened.ADD(box)
        total ← total + candies[box]
        FOR key IN keys[box]:
            hasKey.ADD(key)
            IF key IN hasBox: queue.APPEND(key)
        FOR b IN containedBoxes[box]:
            hasBox.ADD(b)
            queue.APPEND(b)

    RETURN total
```

---

## Walkthrough

Consider **Example 1** step‑by‑step:
| Step | Queue | Opened Boxes | Keys Owned | Candies Collected |
|------|-------|--------------|-----------|-------------------|
| 0 | [0] | {} | {} | 0 |
| 1 | [] | {0} | {1,2} | 7 |
| 2 | [1,2] | {0} | {1,2} | 7 |
| 3 | [2,1] | {0,2} | {1,2,3} | 11 |
| 4 | [1,3] | {0,2} | {1,2,3} | 11 |
| 5 | [3,1] | {0,2,3} | {1,2,3} | 111 |
| 6 | [1] | {0,2,3} | {1,2,3} | 111 |
| 7 | [] | {0,2,3,1} | {1,2,3} | 111 |
All boxes processed, total candies = **111**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS Simulation | **O(n)** | O(n) |

---

## Follow-Up Questions
- How would the solution change if each box could contain a limited number of keys?
- Can you adapt the algorithm to return the order in which boxes are opened?
- What if boxes could be reopened to retrieve newly added candies after obtaining more keys?

---

## Key Takeaway

> **Simulation with BFS: track what you have (boxes, keys) and process anything newly openable.** The key‑and‑lock mechanic just requires re‑enqueuing boxes when new keys arrive.
