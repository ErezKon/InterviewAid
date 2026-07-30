# 1051. Height Checker

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/height-checker](https://leetcode.com/problems/height-checker)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft, Salesforce

---

## 1. Problem Description

Count how many students are not standing in the correct position when sorted by height.

## 2. Approach: Sort + Compare — O(n log n) ✅

```text
FUNCTION heightChecker(heights):
    expected ← SORTED(heights)
    mismatches ← 0
    FOR i ← 0 TO LENGTH(heights) - 1:
        IF heights[i] ≠ expected[i]:
            mismatches ← mismatches + 1
    RETURN mismatches
```

## Examples

| heights | expected (sorted) | mismatches |
|---------|-------------------|------------|
| [1,1,4,2,1,3] | [1,1,1,2,3,4] | 3 |
| [5,1,2,3,4]   | [1,2,3,4,5]   | 5 |

*Explanation*: Compare each position with the sorted order; count differences.

## Walkthrough

Take `heights = [1,1,4,2,1,3]`:
1. Sort → `[1,1,1,2,3,4]`
2. Compare index 0: 1 vs 1 → match
3. Index 1: 1 vs 1 → match
4. Index 2: 4 vs 1 → mismatch (count=1)
5. Index 3: 2 vs 2 → match
6. Index 4: 1 vs 3 → mismatch (count=2)
7. Index 5: 3 vs 4 → mismatch (count=3)
Result = 3.

## Complexity Analysis

- **Time:** O(n log n) – sorting dominates.
- **Space:** O(n) for the sorted copy (or O(1) if sorting in‑place).

## Follow-Up Questions

- Can you solve it in O(n) time using counting sort given height limits?
- How would you handle a stream of heights where you need to report mismatches online?
- What if heights can be negative or very large?

## Key Takeaway

> Sort the heights to get the correct order, then count positions where the original array differs.
