# 2866. Beautiful Towers II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-ii](https://leetcode.com/problems/beautiful-towers-ii)
**Companies:** Salesforce

---

## 1. Problem Description

Given an array `maxHeights`, choose heights `h[i] ≤ maxHeights[i]` forming a **mountain** (increases then decreases) to maximize the total sum. Return the max sum.

---

## 2. Examples

**Example 1:**
```
Input: maxHeights = [5,3,4,1,1]
Output: 13
Explanation: Choose heights [5,3,4,1,0] forming a mountain with peak at index 2. Sum = 13.
```

**Example 2:**
```
Input: maxHeights = [6,5,3,9,2,7]
Output: 20
Explanation: Choose heights [6,5,3,9,2,0] with peak at index 3. Sum = 20.
```

---

## 3. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maximumSumOfHeights(maxHeights):
    n ← LENGTH(maxHeights)
    left ← ARRAY[n] INITIALIZED TO 0
    stack ← EMPTY
    FOR i ← 0 TO n-1:
        WHILE stack NOT EMPTY AND maxHeights[stack.TOP] >= maxHeights[i]:
            stack.POP()
        IF stack NOT EMPTY:
            prev ← stack.TOP
            left[i] ← left[prev] + maxHeights[i] * (i - prev)
        ELSE:
            left[i] ← maxHeights[i] * (i + 1)
        stack.PUSH(i)

    right ← ARRAY[n] INITIALIZED TO 0
    stack ← EMPTY
    FOR i ← n-1 DOWNTO 0:
        WHILE stack NOT EMPTY AND maxHeights[stack.TOP] >= maxHeights[i]:
            stack.POP()
        IF stack NOT EMPTY:
            prev ← stack.TOP
            right[i] ← right[prev] + maxHeights[i] * (prev - i)
        ELSE:
            right[i] ← maxHeights[i] * (n - i)
        stack.PUSH(i)

    best ← 0
    FOR i ← 0 TO n-1:
        total ← left[i] + right[i] - maxHeights[i]  // peak counted twice
        best ← MAX(best, total)
    RETURN best
```

---

## 4. Walkthrough

Consider `maxHeights = [5,3,4,1,1]`.

| i | maxHeights[i] | left[i] (max sum ending at i) |
|---|---------------|------------------------------|
| 0 | 5 | 5 * 1 = 5 |
| 1 | 3 | 3 * 2 = 6 |
| 2 | 4 | left[1] + 4 * (2-1) = 6 + 4 = 10 |
| 3 | 1 | 1 * 4 = 4 |
| 4 | 1 | 1 * 5 = 5 |

Similarly compute `right[i]` from the right side. The best peak is at index 2 with total = left[2] + right[2] - maxHeights[2] = 10 + 7 - 4 = 13.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The monotonic stacks traverse the array twice, each element is pushed and popped at most once.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm if the mountain could have multiple peaks?
2. Can the solution be adapted for a circular array where the mountain may wrap around?
3. What if each tower has a cost and you need to maximize profit = height – cost?

---

## Key Takeaway

> Monotonic stack computes prefix/suffix mountain sums in O(n). For each peak candidate, answer = left sum + right sum - peak height (counted twice). This is the O(n) optimization of the brute-force O(n²) approach in Beautiful Towers I.
