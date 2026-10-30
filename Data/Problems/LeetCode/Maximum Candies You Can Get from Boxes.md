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

You have `n` boxes labeled from `0` to `n - 1`. You are given four arrays: `status`, `candies`, `keys`, and `containedBoxes` where:

- `status[i]` is `1` if the `i^th` box is open and `0` if the `i^th` box is closed,
- `candies[i]` is the number of candies in the `i^th` box,
- `keys[i]` is a list of the labels of the boxes you can open after opening the `i^th` box.
- `containedBoxes[i]` is a list of the boxes you found inside the `i^th` box.

You are given an integer array `initialBoxes` that contains the labels of the boxes you initially have. You can take all the candies in **any open box** and you can use the keys in it to open new boxes and you also can use the boxes you find in it.

Return *the maximum number of candies you can get following the rules above*.

**Constraints:**
- `n == status.length == candies.length == keys.length == containedBoxes.length`
- `1 <= n <= 1000`
- `status[i]` is either `0` or `1`.
- `1 <= candies[i] <= 1000`
- `0 <= keys[i].length <= n`
- `0 <= keys[i][j] < n`
- All values of `keys[i]` are **unique**.
- `0 <= containedBoxes[i].length <= n`
- `0 <= containedBoxes[i][j] < n`
- All values of `containedBoxes[i]` are unique.
- Each box is contained in one box at most.
- `0 <= initialBoxes.length <= n`
- `0 <= initialBoxes[i] < n`

---

## Examples

**Example 1:**
```
Input: status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
Output: 16
Explanation: You will be initially given box 0. You will find 7 candies in it and boxes 1 and 2.
Box 1 is closed and you do not have a key for it so you will open box 2. You will find 4 candies and a key to box 1 in box 2.
In box 1, you will find 5 candies and box 3 but you will not find a key to box 3 so box 3 will remain closed.
Total number of candies collected = 7 + 4 + 5 = 16 candy.
```

**Example 2:**
```
Input: status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys = [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]], initialBoxes = [0]
Output: 6
Explanation: You have initially box 0. Opening it you can find boxes 1,2,3,4 and 5 and their keys.
The total number of candies will be 6.
```

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
