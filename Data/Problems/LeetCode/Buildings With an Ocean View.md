# 1762. Buildings With an Ocean View

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/buildings-with-an-ocean-view](https://leetcode.com/problems/buildings-with-an-ocean-view)
**Companies:** Amazon, Anduril, Coupang, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `heights` representing the heights of buildings from left to right, a building has an ocean view if all buildings to its right are shorter. Return the indices of the buildings that have an ocean view, ordered from left to right.

## Examples
- Input: `heights = [4,2,3,1]` → Output: `[0,2,3]`. Buildings at indices 0, 2, and 3 have no taller building to their right.
- Input: `heights = [4,3,2,1]` → Output: `[0,1,2,3]` (all buildings see the ocean).

## Approach
**Right‑to‑Left Scan** – Iterate from the end of the array, tracking the maximum height seen so far. If the current building is taller than `maxHeight`, it has an ocean view; record its index and update `maxHeight`. Finally, reverse the collected indices to obtain left‑to‑right order.

```text
FUNCTION findBuildings(heights):
    SET result ← empty list
    SET maxHeight ← 0
    FOR i FROM LENGTH(heights)-1 DOWNTO 0:
        IF heights[i] > maxHeight:
            result.APPEND(i)
            SET maxHeight ← heights[i]
    RETURN REVERSE(result)
```

## Walkthrough
For `heights = [4,2,3,1]`:
- Start with `i=3` (height 1) → `maxHeight=0` → add index 3, `maxHeight=1`.
- `i=2` (height 3) > 1 → add index 2, `maxHeight=3`.
- `i=1` (height 2) ≤ 3 → skip.
- `i=0` (height 4) > 3 → add index 0, `maxHeight=4`.
Reverse `[3,2,0]` → `[0,2,3]`.

## Complexity Analysis
- **Time:** O(n) – single pass.
- **Space:** O(k) for the result list, where k is the number of ocean‑view buildings (≤ n).

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual heights instead of indices?
2. Can you solve the problem in a single pass without using extra space for the result (e.g., outputting as you go)?
3. What if the buildings are arranged in a circular fashion?

## Key Takeaway
Scanning from right to left with a running maximum efficiently identifies all buildings that dominate all to their right.
