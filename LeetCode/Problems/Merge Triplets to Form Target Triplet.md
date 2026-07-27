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

Given a 2D array `triplets` where `triplets[i] = [a_i, b_i, c_i]` and a `target = [x, y, z]`, determine if you can select some triplets and take the element-wise **maximum** to form the target exactly.

**Constraints:**
- `1 ≤ triplets.length ≤ 10⁵`
- `1 ≤ a_i, b_i, c_i, x, y, z ≤ 1000`

---

## Examples

**Example 1:**
```
Input:  triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
Explanation: Select triplets [2,5,3] and [1,7,5]. Max = [2,7,5].
```

**Example 2:**
```
Input:  triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
Output: false
Explanation: No triplet has b_i ≤ 2 with b_i contributing to target[1]=2.
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
