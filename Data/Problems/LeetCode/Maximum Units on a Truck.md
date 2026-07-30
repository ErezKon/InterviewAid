# 1710. Maximum Units on a Truck

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-units-on-a-truck](https://leetcode.com/problems/maximum-units-on-a-truck)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are putting boxes on a truck. You are given `boxTypes` where `boxTypes[i] = [numberOfBoxes_i, numberOfUnitsPerBox_i]`. The truck can carry at most `truckSize` boxes. Return the **maximum total number of units** that can be put on the truck.

**Constraints:**
- `1 ≤ boxTypes.length ≤ 1000`
- `1 ≤ numberOfBoxes_i, numberOfUnitsPerBox_i ≤ 1000`
- `1 ≤ truckSize ≤ 10⁶`

---

## Examples

**Example 1:**
```
Input:  boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
Explanation: Take 1 box of 3 units, 2 boxes of 2 units, 1 box of 1 unit → 3+4+1 = 8.
```

**Example 2:**
```
Input:  boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
Output: 91
```

---

## Key Insight

> This is a classic **fractional knapsack** variant. Since all boxes of the same type are identical and we want to maximize units, always pick boxes with the **highest units-per-box first**. Greedy works because there's no constraint coupling different box types.

---

## Approach

Greedy: sort by units per box descending, then greedily load.

```
FUNCTION maximumUnits(boxTypes, truckSize):
    SORT boxTypes BY unitsPerBox DESCENDING
    total ← 0
    FOR [count, units] IN boxTypes DO
        take ← MIN(count, truckSize)
        total ← total + take * units
        truckSize ← truckSize - take
        IF truckSize = 0 THEN BREAK
    RETURN total
```

---

## Walkthrough

```
boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4

After sorting by units desc: [[1,3],[2,2],[3,1]]

Iteration 1: type=[1,3], take=MIN(1,4)=1, total=3,  remaining=3
Iteration 2: type=[2,2], take=MIN(2,3)=2, total=3+4=7, remaining=1
Iteration 3: type=[3,1], take=MIN(3,1)=1, total=7+1=8, remaining=0 → BREAK

Return 8 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy (sort + scan) | **O(n log n)** | **O(1)** |

Where `n` = number of box types.

---

## Follow-Up Questions

1. **Why does greedy work here?** Each box is independent — taking a high-unit box never prevents us from taking another. This satisfies the greedy-choice property.
2. **What if each box had a weight and the truck had a weight limit?** Then it becomes the 0/1 Knapsack problem, requiring DP.
3. **Can you solve it in O(n) without sorting?** With counting sort on units (max 1000), yes — O(n + U) where U is max units.

---

## Key Takeaway

> **Greedy "take the best first" works when items are independent and the objective is linear** — sort by value density and fill greedily.

---
