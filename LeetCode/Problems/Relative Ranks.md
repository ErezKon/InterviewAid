# 506. Relative Ranks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/relative-ranks](https://leetcode.com/problems/relative-ranks)
**Companies:** Amazon, Bloomberg, Electronic Arts, Google, Microsoft

---

## Problem Description
Given an integer array `score` where `score[i]` is the score of the `i`‑th athlete, assign ranks to each athlete. The highest score receives "Gold Medal", the second "Silver Medal", the third "Bronze Medal", and the rest receive their numeric rank (1‑based) as a string.

Constraints:
- `1 <= score.length <= 10⁴`
- `0 <= score[i] <= 10⁶`
- All scores are unique.

## Examples
**Example 1**
```
Input: [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
```

**Example 2**
```
Input: [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
```

## Approach
Sort the indices of `score` in descending order to determine the ranking order, then map each original index to its appropriate label.

```text
FUNCTION findRelativeRanks(score):
    n ← LENGTH(score)
    // Pair each score with its original index
    pairs ← [(score[i], i) FOR i FROM 0 TO n-1]
    // Sort pairs by score descending
    SORT pairs BY first DESCENDING
    medals ← ["Gold Medal", "Silver Medal", "Bronze Medal"]
    result ← ARRAY of n empty strings
    FOR rank FROM 0 TO n-1:
        (_, idx) ← pairs[rank]
        IF rank < 3:
            result[idx] ← medals[rank]
        ELSE:
            result[idx] ← STRING(rank + 1)
    RETURN result
```

## Walkthrough
For `score = [10,3,8,9,4]`:
1. Pairing → `[(10,0),(3,1),(8,2),(9,3),(4,4)]`.
2. Sorting descending → `[(10,0),(9,3),(8,2),(4,4),(3,1)]`.
3. Assign medals: index 0 → "Gold Medal", index 3 → "Silver Medal", index 2 → "Bronze Medal".
4. Remaining indices get numeric ranks: index 4 → "4", index 1 → "5".
5. Result array ordered by original indices → `["Gold Medal","5","Bronze Medal","Silver Medal","4"]`.

## Complexity Analysis
- Sorting `n` elements: **Time O(n log n)**.
- Additional passes: O(n) time, O(n) extra space for pairs and result.
Overall: **Time O(n log n), Space O(n)**.

## Follow‑Up Questions
1. How would you modify the algorithm if scores could be duplicate, requiring ties to share the same rank?
2. Can you achieve O(n) time using a counting sort or bucket sort given the score range?
3. How would you adapt the solution for a streaming scenario where scores arrive one by one?

## Key Takeaway
Sorting indices by score provides a simple way to map each athlete to its rank, then translate the top three positions into medal strings.
