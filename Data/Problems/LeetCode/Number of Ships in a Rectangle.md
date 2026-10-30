# 1274. Number of Ships in a Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ships-in-a-rectangle](https://leetcode.com/problems/number-of-ships-in-a-rectangle)
**Companies:** Applied Intuition, Bloomberg

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

*(This problem is an **interactive problem**.)*

Each ship is located at an integer point on the sea represented by a cartesian plane, and each integer point may contain at most 1 ship.

You have a function `Sea.hasShips(topRight, bottomLeft)` which takes two points as arguments and returns `true` If there is at least one ship in the rectangle represented by the two points, including on the boundary.

Given two points: the top right and bottom left corners of a rectangle, return the number of ships present in that rectangle. It is guaranteed that there are **at most 10 ships** in that rectangle.

Submissions making **more than 400 calls** to `hasShips` will be judged *Wrong Answer*. Also, any solutions that attempt to circumvent the judge will result in disqualification.

**Example :**
![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1274.Number%20of%20Ships%20in%20a%20Rectangle/images/1445_example_1.png)

```
**Input:**
ships = [[1,1],[2,2],[3,3],[5,5]], topRight = [4,4], bottomLeft = [0,0]
**Output:** 3
**Explanation:** From [0,0] to [4,4] we can count 3 ships within the range.
```

**Example 2:**

```
**Input:** ans = [[1,1],[2,2],[3,3]], topRight = [1000,1000], bottomLeft = [0,0]
**Output:** 3
```

**Constraints:**
- On the input `ships` is only given to initialize the map internally. You must solve this problem "blindfolded". In other words, you must find the answer using the given `hasShips` API, without knowing the `ships` position.
- `0 <= bottomLeft[0] <= topRight[0] <= 1000`
- `0 <= bottomLeft[1] <= topRight[1] <= 1000`
- `topRight != bottomLeft`

---

## 2. Examples



---

## 3. Approach

**Algorithm:** Quad‑tree divide and conquer with API pruning.

Recursively split the current rectangle into four quadrants. Before recursing, call `hasShips` on each quadrant; if it returns `false`, that quadrant contains no ships and can be discarded. The recursion stops when the rectangle collapses to a single point, at which point a ship is counted if `hasShips` is `true`.

**Pseudocode:**
```text
FUNCTION countShips(topRight, bottomLeft):
    // Base cases
    IF bottomLeft.x > topRight.x OR bottomLeft.y > topRight.y:
        RETURN 0
    IF NOT hasShips(topRight, bottomLeft):
        RETURN 0
    IF topRight == bottomLeft:
        RETURN 1

    // Compute mid points (integer division)
    SET midX ← (bottomLeft.x + topRight.x) DIV 2
    SET midY ← (bottomLeft.y + topRight.y) DIV 2

    // Recurse on four sub‑rectangles
    RETURN countShips((midX, midY), bottomLeft) +
           countShips((midX, topRight.y), (bottomLeft.x, midY + 1)) +
           countShips(topRight, (midX + 1, midY + 1)) +
           countShips((topRight.x, midY), (midX + 1, bottomLeft.y))
```

---

## 4. Walkthrough

Assume ships are located at points `(1,1)`, `(3,4)`, and `(6,2)` and we query the rectangle `bottomLeft = (0,0)`, `topRight = (7,5)`.

1. Call `hasShips((7,5),(0,0))` → `true`.
2. Split at `midX = 3`, `midY = 2` → four quadrants:
   - Q1: `(3,2),(0,0)` → contains ship `(1,1)` → recurse → eventually counts 1.
   - Q2: `(3,5),(0,3)` → contains ship `(3,4)` → recurse → counts 1.
   - Q3: `(7,5),(4,3)` → contains ship `(6,2)`? No, y‑range excludes it → `hasShips` false → 0.
   - Q4: `(7,2),(4,0)` → contains ship `(6,2)` → recurse → counts 1.
3. Sum of counts = 3, which matches the expected answer.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(S · log(area)) where `S` is the number of ships |
| **Space** | O(log(area)) recursion depth |

---

## 6. Follow-Up Questions

1. How would the solution change if the API returned the exact count of ships in a rectangle instead of a boolean?
2. Can you adapt the algorithm for a three‑dimensional space with a similar `hasShips3D` API?
3. What optimizations are possible if ships are known to be clustered in a small region?

---

## 7. Key Takeaway

> **Quad‑tree search with API pruning** efficiently locates a few ships in a huge grid by discarding empty quadrants early, achieving near‑optimal query complexity.
