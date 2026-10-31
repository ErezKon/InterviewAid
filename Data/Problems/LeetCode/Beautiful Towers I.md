# 2865. Beautiful Towers I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-i](https://leetcode.com/problems/beautiful-towers-i)
**Companies:** Meta, Salesforce

---

## 1. Problem Description

You are given an array `heights` of `n` integers representing the number of bricks in `n` consecutive towers. Your task is to remove some bricks to form a **mountain-shaped** tower arrangement. In this arrangement, the tower heights are non-decreasing, reaching a maximum peak value with one or multiple consecutive towers and then non-increasing.

Return the **maximum possible sum** of heights of a mountain-shaped tower arrangement.

**Constraints:**
- `1 ≤ n == heights.length ≤ 10³`
- `1 ≤ heights[i] ≤ 10⁹`

---

## 2. Examples

```
Example 1:
  Input: heights = [5,3,4,1,1]
  Output: 13
  Explanation: We remove some bricks to make heights = [5,3,3,1,1], the peak is at index 0.

Example 2:
  Input: heights = [6,5,3,9,2,7]
  Output: 22
  Explanation: We remove some bricks to make heights = [3,3,3,9,2,2], the peak is at index 3.

Example 3:
  Input: heights = [3,2,5,5,2,3]
  Output: 18
  Explanation: We remove some bricks to make heights = [2,2,5,5,2,2], the peak is at index 2 or 3.
```

---

## 3. Approach: Brute Force — O(n²) ✅

```text
FUNCTION maximumSumOfHeights(maxHeights):
    SET n ← LENGTH(maxHeights)
    SET ans ← 0
    FOR peak ← 0 TO n-1:
        SET total ← maxHeights[peak]
        // extend left (non-increasing)
        SET curMin ← maxHeights[peak]
        FOR j ← peak-1 DOWNTO 0:
            SET curMin ← MIN(curMin, maxHeights[j])
            SET total ← total + curMin
        // extend right (non-increasing)
        SET curMin ← maxHeights[peak]
        FOR j ← peak+1 TO n-1:
            SET curMin ← MIN(curMin, maxHeights[j])
            SET total ← total + curMin
        SET ans ← MAX(ans, total)
    RETURN ans
```

---

## 4. Walkthrough

Consider `maxHeights = [5,3,4,1,1]`.
| Peak | Left extension (min) | Right extension (min) | Total |
|------|----------------------|-----------------------|-------|
| 0 | N/A | min(5,3)=3 → +3, min(3,4)=3 → +3, min(3,1)=1 → +1, min(1,1)=1 → +1 | 5+3+3+1+1 = 13 |
| 1 | min(3,5)=3 → +3 | min(3,4)=3 → +3, min(3,1)=1 → +1, min(1,1)=1 → +1 | 3+3+3+1+1 = 11 |
| ... | ... | ... | ... |
The maximum total is 13 at peak 0.

---

## 5. Complexity Analysis

- **Time:** O(n²) – for each possible peak we scan left and right.
- **Space:** O(1) – only a few scalar variables.

---

## 6. Follow-Up Questions

- How would you improve the solution to O(n) using monotonic stacks? (See Beautiful Towers II.)
- What if `maxHeights` length is up to 10⁵? Discuss memory and time constraints.
- Can the problem be extended to allow multiple peaks (multiple mountains) while still maximizing sum?

---

## Key Takeaway

> For each peak candidate, greedily extend left/right taking the running minimum. This O(n²) brute-force works for small inputs; the O(n) monotonic-stack method is the scalable improvement.
