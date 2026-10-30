# 1899. Merge Triplets to Form Target Triplet

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-triplets-to-form-target-triplet](https://leetcode.com/problems/merge-triplets-to-form-target-triplet)
**Companies:** Google

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

A **triplet** is an array of three integers. You are given a 2D integer array `triplets`, where `triplets[i] = [a_i, b_i, c_i]` describes the `i^th` **triplet**. You are also given an integer array `target = [x, y, z]` that describes the **triplet** you want to obtain.

To obtain `target`, you may apply the following operation on `triplets` **any number** of times (possibly **zero**):

- Choose two indices (**0-indexed**) `i` and `j` (`i != j`) and **update** `triplets[j]` to become `[max(a_i, a_j), max(b_i, b_j), max(c_i, c_j)]`.

- For example, if `triplets[i] = [2, 5, 3]` and `triplets[j] = [1, 7, 5]`, `triplets[j]` will be updated to `[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]`.

Return `true` *if it is possible to obtain the *`target`* **triplet** *`[x, y, z]`* as an** element** of *`triplets`*, or *`false`* otherwise*.

**Constraints:**
- `1 <= triplets.length <= 10^5`
- `triplets[i].length == target.length == 3`
- `1 <= a_i, b_i, c_i, x, y, z <= 1000`

---

## Examples

**Example 1:**
```
Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and last triplets [[2,5,3],[1,8,4],[1,7,5]]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4],[2,7,5]]
The target triplet [2,7,5] is now an element of triplets.
```

**Example 2:**
```
Input: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
Output: false
Explanation: It is impossible to have [3,2,5] as an element because there is no 2 in any of the triplets.
```

**Example 3:**
```
Input: triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and third triplets [[2,5,3],[2,3,4],[1,2,5],[5,2,3]]. Update the third triplet to be [max(2,1), max(5,2), max(3,5)] = [2,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,2,3]].
- Choose the third and fourth triplets [[2,5,3],[2,3,4],[2,5,5],[5,2,3]]. Update the fourth triplet to be [max(2,5), max(5,2), max(5,3)] = [5,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,5,5]].
The target triplet [5,5,5] is now an element of triplets.
```

---

## Key Insight

> A triplet is **usable** only if none of its values exceed the corresponding target value (otherwise, taking the max would overshoot). Among all usable triplets, check if we can collectively achieve each target component.

---

## Approach

```
FUNCTION mergeTriplets(triplets, target):
    found ← [false, false, false]
    
    FOR [a, b, c] IN triplets DO
        // Skip triplets that would overshoot any target component
        IF a > target[0] OR b > target[1] OR c > target[2] THEN
            CONTINUE
        
        // This triplet is usable — check which target components it matches
        IF a = target[0] THEN found[0] ← true
        IF b = target[1] THEN found[1] ← true
        IF c = target[2] THEN found[2] ← true
    
    RETURN found[0] AND found[1] AND found[2]
```

---

## Walkthrough

```
triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]

[2,5,3]: 2≤2, 5≤7, 3≤5 → usable. a=2=target[0] ✓
[1,8,4]: 8 > 7 → skip (would overshoot target[1])
[1,7,5]: 1≤2, 7≤7, 5≤5 → usable. b=7=target[1] ✓, c=5=target[2] ✓

found = [true, true, true] → return true ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass filter | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why filter out triplets exceeding any target component?** The max operation can only increase values. If any component exceeds the target, including that triplet guarantees the result overshoots.
2. **Why is one pass sufficient?** We don't need to track which triplets to combine — we just need to verify that each target component is achievable by at least one valid triplet.
3. **What if we needed to return the actual subset?** Track which triplets contributed each component and reconstruct.

---

## Key Takeaway

> **Greedy filtering** — discard any triplet that would overshoot, then check if the remaining triplets collectively cover all target components. O(n) with no sorting needed.

---
