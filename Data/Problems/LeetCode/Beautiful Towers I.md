# 2865. Beautiful Towers I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-i](https://leetcode.com/problems/beautiful-towers-i)
**Companies:** Meta, Salesforce

---

## 1. Problem Description

Given an array `maxHeights`, choose heights `h[i] ≤ maxHeights[i]` forming a **mountain** shape to maximize total sum. Same as Beautiful Towers II but with smaller constraints allowing O(n²).

---

## 2. Examples

**Example 1:**
```
maxHeights = [5,3,4,1,1]
Output: 13
```
*Explanation:* Choose heights `[5,3,3,1,1]` forming a mountain with peak at index 0.

**Example 2:**
```
maxHeights = [6,5,3,9,2,7]
Output: 35
```
*Explanation:* Optimal heights `[6,5,5,9,2,2]` give sum 35.

---

## 3. Approach: Brute Force — O(n²) ✅

```text
FUNCTION maximumSumOfHeights(maxHeights):
    SET n ← LENGTH(maxHeights)
    SET ans ← 0
    FOR peak ← 0 TO n-1:
        SET total ← maxHeights[peak]
        // extend left (non‑increasing)
        SET curMin ← maxHeights[peak]
        FOR j ← peak-1 DOWNTO 0:
            SET curMin ← MIN(curMin, maxHeights[j])
            SET total ← total + curMin
        // extend right (non‑increasing)
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

> For each peak candidate, greedily extend left/right taking the running minimum. This O(n²) brute‑force works for small inputs; the O(n) monotonic‑stack method is the scalable improvement.
