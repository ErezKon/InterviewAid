# 2061. Number of Spaces Cleaning Robot Cleaned

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/number-of-spaces-cleaning-robot-cleaned
**Companies:** Geico, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A room is represented by a **0-indexed** 2D binary matrix `room` where a `0` represents an **empty** space and a `1` represents a space with an **object**. The top left corner of the room will be empty in all test cases.

A cleaning robot starts at the top left corner of the room and is facing right. The robot will continue heading straight until it reaches the edge of the room or it hits an object, after which it will turn 90 degrees **clockwise** and repeat this process. The starting space and all spaces that the robot visits are **cleaned** by it.

Return *the number of **clean** spaces in the room if the robot runs indefinitely.*

**Constraints:**
- `m == room.length`
- `n == room[r].length`
- `1 <= m, n <= 300`
- `room[r][c]` is either `0` or `1`.
- `room[0][0] == 0`

---

## 2. Examples

**Example 1:**
```
Input: room = [[0,0,0],[1,1,0],[0,0,0]]
Output: 7
Explanation: - The robot cleans the spaces at (0, 0), (0, 1), and (0, 2).
- The robot is at the edge of the room, so it turns 90 degrees clockwise and now faces down.
- The robot cleans the spaces at (1, 2), and (2, 2).
- The robot is at the edge of the room, so it turns 90 degrees clockwise and now faces left.
- The robot cleans the spaces at (2, 1), and (2, 0).
- The robot has cleaned all 7 empty spaces, so return 7.
```

**Example 2:**
```
Input: room = [[0,1,0],[1,0,0],[0,0,0]]
Output: 1
Explanation: - The robot cleans the space at (0, 0).
- The robot hits an object, so it turns 90 degrees clockwise and now faces down.
- The robot hits an object, so it turns 90 degrees clockwise and now faces left.
- The robot is at the edge of the room, so it turns 90 degrees clockwise and now faces up.
- The robot is at the edge of the room, so it turns 90 degrees clockwise and now faces right.
- The robot is back at its starting position.
- The robot has cleaned 1 space, so return 1.
```

**Example 3:**
```
Input: room = [[0,0,0],[0,0,0],[0,0,0]]
Output: 8
```

---

## 3. Approach

Simulate the robot while tracking visited **states** `(row, col, direction)`. Use a set for states and another set for cleaned cells. At each step:
1. If the current state is already in the visited set, stop.
2. Add the state to visited and the cell to cleaned.
3. Attempt to move forward; if blocked, rotate direction clockwise.

```text
FUNCTION countCleanedSpaces(room):
    SET dirs ← [(0,1),(1,0),(0,-1),(-1,0)]  // right, down, left, up
    SET visited ← empty set
    SET cleaned ← empty set
    SET r ← 0; SET c ← 0; SET d ← 0
    WHILE (r, c, d) NOT IN visited:
        ADD (r, c, d) TO visited
        ADD (r, c) TO cleaned
        SET nr ← r + dirs[d][0]
        SET nc ← c + dirs[d][1]
        IF nr IN bounds AND nc IN bounds AND room[nr][nc] == 0:
            SET r ← nr; SET c ← nc
        ELSE:
            SET d ← (d + 1) MOD 4
    RETURN SIZE(cleaned)
```

---

## 4. Walkthrough

For `room = [[0,0,0],[0,1,0],[0,0,0]]`:

| Step | (r,c) | d (0=→,1=↓,2=←,3=↑) | Action | Cleaned cells |
|------|-------|-------------------|--------|----------------|
| 1 | (0,0) | 0 | Move right to (0,1) | {(0,0)} |
| 2 | (0,1) | 0 | Move right to (0,2) | {(0,0),(0,1)} |
| 3 | (0,2) | 0 | Forward blocked → turn down | {(0,0),(0,1),(0,2)} |
| 4 | (0,2) | 1 | Move down to (1,2) | … |
| … | … | … | … | … |

The simulation continues until the state `(0,0,0)` reappears after 7 unique cells have been cleaned.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·4) – each cell can be visited at most four times (once per direction) |
| **Space** | O(m·n) – visited states and cleaned cells sets |

---

## 6. Follow-Up Questions

1. How would the algorithm change if the robot could also move left when blocked?
2. Can you compute the number of steps taken (including turns) before stopping?
3. How would you adapt the solution for a toroidal grid (edges wrap around)?

---

## 7. Key Takeaway

> **State‑based simulation** with a visited‑state set guarantees termination and lets you count unique cells efficiently.
