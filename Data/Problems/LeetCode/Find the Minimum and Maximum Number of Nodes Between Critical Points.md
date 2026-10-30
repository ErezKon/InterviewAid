# 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points](https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points)
**Companies:** Amazon, Bloomberg, Google, Info Edge, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Collect Critical Points — O(n) ✅](#4-approach-collect-critical-points--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

A **critical point** in a linked list is defined as **either** a **local maxima** or a **local minima**.

A node is a **local maxima** if the current node has a value **strictly greater** than the previous node and the next node.

A node is a **local minima** if the current node has a value **strictly smaller** than the previous node and the next node.

Note that a node can only be a local maxima/minima if there exists **both** a previous node and a next node.

Given a linked list `head`, return *an array of length 2 containing* `[minDistance, maxDistance]` *where* `minDistance` *is the **minimum distance** between **any two distinct** critical points and* `maxDistance` *is the **maximum distance** between **any two distinct** critical points. If there are **fewer** than two critical points, return* `[-1, -1]`.

**Constraints:**
- The number of nodes in the list is in the range `[2, 10⁵]`.
- `1 <= Node.val <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: head = [3,1]
  Output: [-1,-1]
  Explanation: There are no critical points in [3,1].

Example 2:
  Input: head = [5,3,1,2,5,1,2]
  Output: [1,3]
  Explanation: There are three critical points:
  - [5,3,(1),2,5,1,2]: The third node is a local minima because 1 is less than 3 and 2.
  - [5,3,1,2,(5),1,2]: The fifth node is a local maxima because 5 is greater than 2 and 1.
  - [5,3,1,2,5,(1),2]: The sixth node is a local minima because 1 is less than 5 and 2.
  The minimum distance is between the fifth and the sixth node. minDistance = 6 - 5 = 1.
  The maximum distance is between the third and the sixth node. maxDistance = 6 - 3 = 3.

Example 3:
  Input: head = [1,3,2,2,3,2,2,2,7]
  Output: [3,3]
  Explanation: There are two critical points:
  - [1,(3),2,2,3,2,2,2,7]: The second node is a local maxima because 3 is greater than 1 and 2.
  - [1,3,2,2,(3),2,2,2,7]: The fifth node is a local maxima because 3 is greater than 2 and 2.
  Both the minimum and maximum distances are between the second and the fifth node.
  Thus, minDistance and maxDistance is 5 - 2 = 3.
  Note that the last node is not considered a local maxima because it does not have a next node.
```

---

## 3. Key Insight

> Traverse once collecting indices of critical points. Min distance = minimum of consecutive differences. Max distance = last - first.

---

## 4. Approach: Collect Critical Points — O(n) ✅

```
FUNCTION nodesBetweenCriticalPoints(head):
    criticals = []
    prev = head; curr = head.next; idx = 1

    WHILE curr.next:
        IF (curr.val > prev.val AND curr.val > curr.next.val) OR
           (curr.val < prev.val AND curr.val < curr.next.val):
            criticals.ADD(idx)
        prev = curr; curr = curr.next; idx += 1

    IF len(criticals) < 2: RETURN [-1, -1]
    minDist = MIN(criticals[i+1] - criticals[i] for i)
    maxDist = criticals[-1] - criticals[0]
    RETURN [minDist, maxDist]
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(c) — c = number of critical points |

---

## 6. Key Takeaway

> Collect critical point indices in one pass. **Min distance is between consecutive critical points; max distance is between first and last.**
