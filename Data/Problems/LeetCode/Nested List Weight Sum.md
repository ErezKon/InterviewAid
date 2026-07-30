# 339. Nested List Weight Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nested-list-weight-sum](https://leetcode.com/problems/nested-list-weight-sum)
**Companies:** Adobe, Amazon, Apple, Google, Linkedin, Meta, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a nested list of integers, return the sum where each integer is multiplied by its **depth** (1-indexed).

---

## 2. Key Insight

> Recursive DFS: pass depth as parameter. Integers are multiplied by their depth; nested lists recurse with `depth + 1`.

---

## 3. Approach: DFS — O(n) ✅

```text
FUNCTION depthSum(nestedList, depth ← 1):
    // Return weighted sum for this sublist
    SET total ← 0
    FOR item IN nestedList:
        IF item.isInteger():
            SET total ← total + item.getInteger() * depth
        ELSE:
            SET total ← total + depthSum(item.getList(), depth + 1)
    RETURN total
```

---

## 4. Examples

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Output: 8
Explanation: depth 1 integers: 2*1 = 2
Depth 2 integers: (1+1+1+1)*2 = 8
Total = 2 + 6 = 8
```

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Output: 27
Explanation: 1*1 + 4*2 + 6*3 = 27
```

---

## 5. Walkthrough

Consider `nestedList = [1,[4,[6]]]`.
1. Call `depthSum` with depth = 1.
2. Encounter integer `1` → add `1*1 = 1`.
3. Encounter sublist `[4,[6]]` → recurse with depth = 2.
   - Inside, integer `4` → add `4*2 = 8`.
   - Sublist `[6]` → recurse with depth = 3.
     * Integer `6` → add `6*3 = 18`.
4. Sum contributions: 1 + 8 + 18 = 27.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element visited once |
| **Space** | O(d) — recursion depth (max nesting) |

---

## 7. Follow-Up Questions

- How would you compute the inverse depth weighted sum (shallower integers weighted more) without a separate pass?
- Can the algorithm be adapted to handle very deep nesting without recursion (iterative stack)?
- What changes are needed if the weight is defined as `depth^2`?

---

## 8. Key Takeaway

> **DFS with depth parameter.** Multiply values by nesting depth. Simple recursive traversal of a nested structure.
