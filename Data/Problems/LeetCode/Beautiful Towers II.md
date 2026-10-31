# 2866. Beautiful Towers II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-ii](https://leetcode.com/problems/beautiful-towers-ii)
**Companies:** Salesforce

---

## 1. Problem Description

You are given a **0-indexed** array `maxHeights` of `n` integers.

You are tasked with building `n` towers in the coordinate line. The `iᵗʰ` tower is built at coordinate `i` and has a height of `heights[i]`.

A configuration of towers is **beautiful** if the following conditions hold:

- `1 ≤ heights[i] ≤ maxHeights[i]`
- `heights` is a **mountain** array.

Array `heights` is a **mountain** if there exists an index `i` such that:

- For all `0 < j ≤ i`, `heights[j - 1] ≤ heights[j]`
- For all `i ≤ k < n - 1`, `heights[k + 1] ≤ heights[k]`

Return *the **maximum possible sum of heights** of a beautiful configuration of towers*.

**Constraints:**
- `1 ≤ n == maxHeights.length ≤ 10⁵`
- `1 ≤ maxHeights[i] ≤ 10⁹`

---

## 2. Examples

```
Example 1:
  Input: maxHeights = [5,3,4,1,1]
  Output: 13
  Explanation: One beautiful configuration with a maximum sum is heights = [5,3,3,1,1]. This configuration is beautiful since:
  - 1 ≤ heights[i] ≤ maxHeights[i]
  - heights is a mountain of peak i = 0.
  It can be shown that there exists no other beautiful configuration with a sum of heights greater than 13.

Example 2:
  Input: maxHeights = [6,5,3,9,2,7]
  Output: 22
  Explanation: One beautiful configuration with a maximum sum is heights = [3,3,3,9,2,2]. This configuration is beautiful since:
  - 1 ≤ heights[i] ≤ maxHeights[i]
  - heights is a mountain of peak i = 3.
  It can be shown that there exists no other beautiful configuration with a sum of heights greater than 22.

Example 3:
  Input: maxHeights = [3,2,5,5,2,3]
  Output: 18
  Explanation: One beautiful configuration with a maximum sum is heights = [2,2,5,5,2,2]. This configuration is beautiful since:
  - 1 ≤ heights[i] ≤ maxHeights[i]
  - heights is a mountain of peak i = 2.
  Note that, for this configuration, i = 3 can also be considered a peak.
  It can be shown that there exists no other beautiful configuration with a sum of heights greater than 18.
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

Similarly compute `right[i]` from the right side. The best peak is at index 2 with total = left[2] + right[2] - maxHeights[2] = 10 + 7 - 4 = 13.

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
