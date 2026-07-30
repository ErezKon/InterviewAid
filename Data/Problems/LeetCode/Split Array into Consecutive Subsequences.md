# 659. Split Array into Consecutive Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-into-consecutive-subsequences](https://leetcode.com/problems/split-array-into-consecutive-subsequences)
**Companies:** Google, Phonepe

---

## Problem Description
Given a sorted integer array `nums`, determine if it can be split into one or more subsequences such that each subsequence consists of consecutive integers and has length at least three.

## Examples
- **Input:** `nums = [1,2,3,3,4,5]`
  **Output:** `true`
  *Explanation:* Split into `[1,2,3]` and `[3,4,5]`.
- **Input:** `nums = [1,2,3,4,4,5]`
  **Output:** `false`
  *Explanation:* The second `4` cannot start a valid subsequence of length ≥ 3.

## Approach
Use a greedy strategy with two hash maps: `freq` counts remaining occurrences of each number, and `appendable` tracks how many subsequences end with a given value and thus can be extended. Iterate through `nums`; for each number, either append it to an existing subsequence or start a new one of length three using the next two numbers.

```text
FUNCTION isPossible(nums):
    SET freq ← MAP counting each number in nums
    SET appendable ← MAP default 0
    FOR num ← each element in nums:
        IF freq[num] == 0: CONTINUE
        SET freq[num] ← freq[num] - 1
        IF appendable[num] > 0:
            // extend existing subsequence ending at num-1
            SET appendable[num] ← appendable[num] - 1
            SET appendable[num + 1] ← appendable[num + 1] + 1
        ELSE IF freq[num + 1] > 0 AND freq[num + 2] > 0:
            // start new subsequence of length 3
            SET freq[num + 1] ← freq[num + 1] - 1
            SET freq[num + 2] ← freq[num + 2] - 1
            SET appendable[num + 3] ← appendable[num + 3] + 1
        ELSE:
            RETURN false
    RETURN true
```

## Walkthrough
For `nums = [1,2,3,3,4,5]`:
| Step | num | Action | freq after | appendable after |
|------|-----|--------|------------|-----------------|
| 1 | 1 | start new (needs 2,3) | {2:0,3:0,…} | {4:1} |
| 2 | 2 | used in start, freq 0 | … | … |
| 3 | 3 (first) | extend subsequence ending at 3 → now ends at 4 | … | {5:1} |
| 3 | 3 (second) | start new using 4,5 | … | {6:1} |
Result is true.

## Complexity Analysis
- **Time:** Each element processed O(1) → `O(n)`.
- **Space:** Hash maps store at most distinct numbers → `O(n)` in worst case.

## Follow‑Up Questions
1. How would the algorithm change if subsequences could be of length 2?
2. Can the solution be adapted for unsorted input?
3. What if we need to output the actual subsequences, not just a boolean?

## Key Takeaway
Greedy use of frequency and pending‑extension maps ensures we always extend existing sequences when possible, otherwise we must create a new length‑three sequence, leading to an optimal linear‑time solution.
