# 160. Intersection of Two Linked Lists

**Difficulty:** 🟢 Easy
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/intersection-of-two-linked-lists](https://leetcode.com/problems/intersection-of-two-linked-lists)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Samsung, Tcs, Tiktok, Wells Fargo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(m+n) ✅](#4-approach-two-pointers--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given the heads of two singly linked lists `headA` and `headB`, return the node at which they intersect. If they don't intersect, return `null`. The lists must retain their original structure.

**Constraints:**
- `m, n` = lengths of the two lists
- `1 <= m, n <= 3 × 10⁴`
- `1 <= Node.val <= 10⁵`

---

## 2. Examples

```
Example 1:
  A: 4 → 1 ↘
              8 → 4 → 5
  B: 5 → 6 → 1 ↗
  Output: node with value 8

Example 2:
  A: 2 → 6 → 4
  B: 1 → 5
  Output: null (no intersection)
```

---

## 3. Key Insight

If pointer A traverses `listA` then `listB`, and pointer B traverses `listB` then `listA`, both travel exactly `m + n` nodes total. They will meet at the intersection point (or both reach null) because the **difference in prefix lengths is canceled out** by the switch.

---

## 4. Approach: Two Pointers — O(m+n) ✅

```
FUNCTION getIntersectionNode(headA, headB):
    pA = headA
    pB = headB

    WHILE pA != pB:
        pA = pA.next IF pA != null ELSE headB
        pB = pB.next IF pB != null ELSE headA

    RETURN pA      // either intersection node or null
```

---

## 5. Walkthrough

```
A: 4 → 1 → 8 → 4 → 5   (length 5)
B: 5 → 6 → 1 → 8 → 4 → 5   (length 6)
Intersection at node 8.
```

| Step | pA | pB |
|------|----|----|
| 1-5 | 4→1→8→4→5 | 5→6→1→8→4 |
| 6 | pA→null→headB(5) | pB→5→null→headA(4) |
| 7-8 | 5→6 | 4→1 |
| 9 | 1 | **8** ... wait |

After switch: pA travels `[4,1,8,4,5,null→5,6,1,8...]`, pB travels `[5,6,1,8,4,5,null→4,1,8...]`. Both meet at node **8** after `m + n - shared` steps. ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | Each pointer traverses both lists once |
| Space | O(1) | Only two pointers |

---

## 7. Follow-Up Questions

### 7.1 Alternative: compute lengths first?

Find lengths m and n, advance the longer list's pointer by `|m-n|` steps, then walk both together. Same O(m+n) but two passes.

### 7.2 Can we use a hash set?

Yes — store all nodes of list A in a set, then walk list B and check. O(m+n) time but O(m) space.

### 7.3 How to detect intersection in the first place?

If two lists intersect, they share the same tail node. Compare the last nodes of both lists.

---

## 8. Key Takeaway

> The elegant two-pointer technique equalizes path lengths by switching lists. After switching, both pointers are the same distance from the intersection (or from null). This is O(m+n) time and O(1) space — a classic "aha" problem.
