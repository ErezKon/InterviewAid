# 2766. Relocate Marbles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/relocate-marbles](https://leetcode.com/problems/relocate-marbles)
**Companies:** Amazon

---

## Problem Description
You are given an integer array `nums` representing positions of marbles on a number line and an integer `k`. In one operation you may choose any marble and move it to any integer position. Determine the minimum number of operations required to make all marbles occupy at most `k` distinct positions.

Constraints:
- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`
- `1 <= k <= nums.length`

## Examples
**Example 1**
```
Input: nums = [1,2,2,3,4], k = 2
Output: 2
Explanation: Move marbles at positions 1 and 4 to position 2, resulting positions [2,2,2,2,3] → only positions 2 and 3 remain.
```

**Example 2**
```
Input: nums = [5,5,5,5], k = 1
Output: 0
Explanation: All marbles already share a single position.
```

## Approach
The goal is to keep the most frequent positions and relocate the rest. Count occurrences of each position, sort frequencies descending, and sum the counts of positions beyond the top `k`.

```text
FUNCTION relocateMarbles(nums, k):
    // Count frequency of each position
    freqMap ← EMPTY MAP
    FOR pos IN nums:
        freqMap[pos] ← freqMap.get(pos, 0) + 1
    // Extract frequencies and sort descending
    frequencies ← LIST of values in freqMap
    SORT frequencies DESCENDING
    // If there are ≤ k distinct positions, no moves needed
    IF LENGTH(frequencies) <= k:
        RETURN 0
    // Sum counts of positions beyond the top k
    moves ← 0
    FOR i FROM k TO LENGTH(frequencies)-1:
        moves ← moves + frequencies[i]
    RETURN moves
```

## Walkthrough
For `nums = [1,2,2,3,4]`, `k = 2`:
1. Frequencies: `{1:1, 2:2, 3:1, 4:1}` → `[2,1,1,1]` sorted.
2. Top 2 frequencies: `2` and `1` (positions 2 and any one of {1,3,4}).
3. Remaining frequencies sum = `1 + 1 = 2` → need 2 moves.

## Complexity Analysis
- Counting frequencies: O(n) time, O(d) space where d = distinct positions.
- Sorting frequencies: O(d log d) time.
Overall: **Time O(n + d log d), Space O(d)**.

## Follow‑Up Questions
1. How would the solution change if moving a marble incurs a cost proportional to the distance moved?
2. Can you solve the problem in O(n) time without explicit sorting using a selection algorithm to find the k‑th largest frequency?
3. How would you handle the case where `k` can be larger than the number of distinct positions?

## Key Takeaway
Minimizing moves reduces to keeping the `k` most frequent positions and relocating all others.
