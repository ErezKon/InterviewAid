# 2234. Maximum Total Beauty of the Gardens

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-total-beauty-of-the-gardens](https://leetcode.com/problems/maximum-total-beauty-of-the-gardens)
**Companies:** Intuit

---

## Problem Description
Given `n` gardens, each with a beauty value and a set of constraints on which other gardens can be adjacent, select a subset of gardens to maximize the sum of their beauty values while satisfying all adjacency constraints.

## Examples
**Example 1:**
Input: `beauties = [4,2,7,1]`, `constraints = [[0,1],[2,3]]`
Output: `11`
Explanation: Choose gardens 0 and 2 (beauty 4+7) which do not violate any constraints.

**Example 2:**
Input: `beauties = [5,5,5]`, `constraints = [[0,1],[1,2],[0,2]]`
Output: `5`
Explanation: Only one garden can be chosen because every pair conflicts.

## Approach
**Greedy with Interval Scheduling** – Sort gardens by beauty descending, then iteratively pick the highest‑beauty garden that does not conflict with already selected gardens.

```text
FUNCTION MaxTotalBeauty(beauties, constraints):
    // Build conflict map
    SET conflictMap ← MAP from garden → SET of conflicting gardens
    FOR each (a, b) IN constraints:
        ADD b TO conflictMap[a]
        ADD a TO conflictMap[b]
    // Sort gardens by beauty descending
    SET ordered ← LIST of indices sorted by beauties DESC
    SET selected ← SET()
    SET total ← 0
    FOR idx IN ordered:
        IF idx NOT IN conflictMap OR conflictMap[idx] ∩ selected = Ø:
            ADD idx TO selected
            SET total ← total + beauties[idx]
    RETURN total
```

## Walkthrough
| Step | Garden Index | Beauty | Conflicts with Selected | Action | Total |
|------|--------------|--------|------------------------|--------|-------|
| 1 | 2 | 7 | Ø | Select | 7 |
| 2 | 0 | 4 | Ø | Select | 11 |
| 3 | 1 | 2 | Conflicts with 0 | Skip | 11 |
| 4 | 3 | 1 | Conflicts with 2 | Skip | 11 |

## Complexity Analysis
- **Time:** `O(n log n + m)` where `n` is number of gardens and `m` is number of constraint pairs (sorting + building map).
- **Space:** `O(n + m)` for the conflict map and selected set.

## Follow‑Up Questions
1. How would the solution change if each garden could be selected at most `k` times?
2. Can you extend the algorithm to return the actual set of selected gardens?
3. What if constraints form a weighted graph and you need to maximize beauty minus penalty for conflicts?

## Key Takeaway
Sorting by beauty and greedily picking non‑conflicting gardens yields an optimal solution for this interval‑style selection problem.
