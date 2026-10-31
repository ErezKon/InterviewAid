# 2210. Count Hills and Valleys in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-hills-and-valleys-in-an-array](https://leetcode.com/problems/count-hills-and-valleys-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given a **0-indexed** integer array `nums`. An index `i` is part of a **hill** in `nums` if the closest non-equal neighbors of `i` are smaller than `nums[i]`. Similarly, an index `i` is part of a **valley** in `nums` if the closest non-equal neighbors of `i` are larger than `nums[i]`. Adjacent indices `i` and `j` are part of the **same** hill or valley if `nums[i] == nums[j]`.

Note that for an index to be part of a hill or valley, it must have a non-equal neighbor on **both** the left and right of the index.

Return the number of hills and valleys in `nums`.

**Constraints:**
- `3 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples
```
Example 1:
  Input: nums = [2,4,1,1,6,5]
  Output: 3
  Explanation:
  At index 0: There is no non-equal neighbor of 2 on the left, so index 0 is neither a hill nor a valley.
  At index 1: The closest non-equal neighbors of 4 are 2 and 1. Since 4 > 2 and 4 > 1, index 1 is a hill.
  At index 2: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 2 is a valley.
  At index 3: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 3 is a valley, but note that it is part of the same valley as index 2.
  At index 4: The closest non-equal neighbors of 6 are 1 and 5. Since 6 > 1 and 6 > 5, index 4 is a hill.
  At index 5: There is no non-equal neighbor of 5 on the right, so index 5 is neither a hill nor a valley.
  There are 3 hills and valleys so we return 3.
```

```
Example 2:
  Input: nums = [6,6,5,5,4,1]
  Output: 0
  Explanation:
  At index 0: There is no non-equal neighbor of 6 on the left, so index 0 is neither a hill nor a valley.
  At index 1: There is no non-equal neighbor of 6 on the left, so index 1 is neither a hill nor a valley.
  At index 2: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 2 is neither a hill nor a valley.
  At index 3: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 3 is neither a hill nor a valley.
  At index 4: The closest non-equal neighbors of 4 are 5 and 1. Since 4 < 5 and 4 > 1, index 4 is neither a hill nor a valley.
  At index 5: There is no non-equal neighbor of 1 on the right, so index 5 is neither a hill nor a valley.
  There are 0 hills and valleys so we return 0.
```

## Approach
Iterate once to build a `unique` list without consecutive duplicates. Then scan the `unique` list from the second to the penultimate element, checking the hill/valley condition.

```text
FUNCTION countHillValley(nums):
    SET n ← LENGTH(nums)
    SET unique ← []
    APPEND nums[0] TO unique
    FOR i ← 1 TO n - 1:
        IF nums[i] != nums[i-1]:
            APPEND nums[i] TO unique
    SET count ← 0
    FOR i ← 1 TO LENGTH(unique) - 2:
        IF (unique[i] > unique[i-1] AND unique[i] > unique[i+1]) OR
           (unique[i] < unique[i-1] AND unique[i] < unique[i+1]):
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For `nums = [2,4,1,1,6,5]`:
1. Build `unique = [2,4,1,6,5]`.
2. i=1: 4 > 2 and 4 > 1 → hill → count=1.
3. i=2: 1 < 4 and 1 < 6 → valley → count=2.
4. i=3: 6 > 1 and 6 > 5 → hill → count=3.
Result is 3.

## Complexity Analysis
- **Time:** O(n) where n is the length of `nums` (single pass for deduplication and another for counting).
- **Space:** O(n) in the worst case for the `unique` list.

## Follow-Up Questions
1. How would you solve the problem in-place without extra storage?
2. Can the algorithm be extended to count plateaus (equal neighbours) as a separate category?
3. What changes are needed if the input size is extremely large (streaming data)?

## Key Takeaway
Removing consecutive duplicates simplifies hill/valley detection to a single linear scan.
