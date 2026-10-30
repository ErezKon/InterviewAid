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

Given the heads of two singly linked-lists `headA` and `headB`, return *the node at which the two lists intersect*. If the two linked lists have no intersection at all, return `null`.

For example, the following two linked lists begin to intersect at node `c1`:
![img](https://assets.leetcode.com/uploads/2021/03/05/160_statement.png)
The test cases are generated such that there are no cycles anywhere in the entire linked structure.

**Note** that the linked lists must **retain their original structure** after the function returns.

**Custom Judge:**

The inputs to the **judge** are given as follows (your program is **not** given these inputs):

- `intersectVal` - The value of the node where the intersection occurs. This is `0` if there is no intersected node.
- `listA` - The first linked list.
- `listB` - The second linked list.
- `skipA` - The number of nodes to skip ahead in `listA` (starting from the head) to get to the intersected node.
- `skipB` - The number of nodes to skip ahead in `listB` (starting from the head) to get to the intersected node.

The judge will then create the linked structure based on these inputs and pass the two heads, `headA` and `headB` to your program. If you correctly return the intersected node, then your solution will be **accepted**.

**Follow up:** Could you write a solution that runs in `O(m + n)` time and use only `O(1)` memory?

**Constraints:**
- The number of nodes of `listA` is in the `m`.
- The number of nodes of `listB` is in the `n`.
- `1 <= m, n <= 3 * 10^4`
- `1 <= Node.val <= 10^5`
- `0 <= skipA <= m`
- `0 <= skipB <= n`
- `intersectVal` is `0` if `listA` and `listB` do not intersect.
- `intersectVal == listA[skipA] == listB[skipB]` if `listA` and `listB` intersect.

---

## 2. Examples

**Example 1:**
```
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
- Note that the intersected node's value is not 1 because the nodes with value 1 in A and B (2^nd node in A and 3^rd node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3^rd node in A and 4^th node in B) point to the same location in memory.
```

**Example 2:**
```
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.
```

**Example 3:**
```
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
Explanation: The two lists do not intersect, so return null.
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
