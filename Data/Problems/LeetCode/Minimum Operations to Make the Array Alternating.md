# 2170. Minimum Operations to Make the Array Alternating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-the-array-alternating](https://leetcode.com/problems/minimum-operations-to-make-the-array-alternating)
**Companies:** Amazon, Bloomberg

---

## Problem Description
You are given a **0-indexed** array `nums` consisting of `n` positive integers.

The array `nums` is called **alternating** if:

- `nums[i - 2] == nums[i]`, where `2 <= i <= n - 1`.
- `nums[i - 1] != nums[i]`, where `1 <= i <= n - 1`.

In one **operation**, you can choose an index `i` and **change** `nums[i]` into **any** positive integer.

Return *the **minimum number of operations** required to make the array alternating*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

```
Example 1:
  Input: nums = [3,1,3,2,4,3]
  Output: 3
  Explanation:
  One way to make the array alternating is by converting it to [3,1,3,1,3,1].
  The number of operations required in this case is 3.
  It can be proven that it is not possible to make the array alternating in less than 3 operations.
```

```
Example 2:
  Input: nums = [1,2,2,2,2]
  Output: 2
  Explanation:
  One way to make the array alternating is by converting it to [1,2,1,2,1].
  The number of operations required in this case is 2.
  Note that the array cannot be converted to [2,2,2,2,2] because in this case nums[0] == nums[1] which violates the conditions of an alternating array.
```

## Approach
Count the frequency of each value separately for even and odd positions.
- Let `evenFreq` and `oddFreq` be maps from value → count.
- Identify the most frequent value and its count for each parity (`evenMax1`, `evenCnt1`, `evenMax2`, `evenCnt2`, similarly for odd).
- If the top values for even and odd positions differ, the answer is `len(nums) - evenCnt1 - oddCnt1`.
- If they are the same, we must choose the second-best value for one side, giving the minimum of:
  `len(nums) - evenCnt1 - oddCnt2` and `len(nums) - evenCnt2 - oddCnt1`.
This greedy selection ensures the fewest changes.

```text
FUNCTION minOperations(nums):
    evenFreq ← MAP()
    oddFreq ← MAP()
    FOR i ← 0 TO LEN(nums) - 1:
        IF i % 2 == 0:
            INCREMENT evenFreq[nums[i]]
        ELSE:
            INCREMENT oddFreq[nums[i]]
    (evenMax1, evenCnt1, evenMax2, evenCnt2) ← TOP_TWO(evenFreq)
    (oddMax1, oddCnt1, oddMax2, oddCnt2) ← TOP_TWO(oddFreq)
    IF evenMax1 != oddMax1:
        RETURN LEN(nums) - evenCnt1 - oddCnt1
    RETURN MIN(
        LEN(nums) - evenCnt1 - oddCnt2,
        LEN(nums) - evenCnt2 - oddCnt1)
```
`TOP_TWO` returns the two most frequent values and their counts (second may be zero).

## Walkthrough
Consider `nums = [3,1,3,2,4,3]`.
1. Even indices (0,2,4): values `[3,3,4]` → `evenFreq = {3:2, 4:1}`.
2. Odd indices (1,3,5): values `[1,2,3]` → `oddFreq = {1:1,2:1,3:1}`.
3. `evenMax1 = 3 (cnt=2)`, `evenMax2 = 4 (cnt=1)`.
4. `oddMax1 = 1 (cnt=1)`, `oddMax2 = 2 (cnt=1)` (any tie works).
5. Top values differ (`3` vs `1`), so answer = `6 - 2 - 1 = 3` changes.

## Complexity Analysis
- **Time:** O(n) to scan the array and O(k log k) for extracting top two frequencies where k is distinct values (practically O(n)).
- **Space:** O(k) for the frequency maps.

## Follow-Up Questions
1. How would the solution change if the array must alternate between two *given* values?
2. Can you extend the approach to a 2-D grid requiring a checkerboard pattern?
3. What if each change has a different cost depending on the new value?

## Key Takeaway
Separate frequency analysis for even and odd positions lets a greedy choice of the most common values achieve the minimum number of modifications.
