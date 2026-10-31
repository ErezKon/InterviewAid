# 80. Remove Duplicates from Sorted Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii)
**Companies:** Accolite, Amazon, Bloomberg, Freshworks, Google, Meta, Microsoft, Tcs, Tiktok

---

## Problem Description
Given an integer array `nums` sorted in **non-decreasing order**, remove some duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` *after placing the final result in the first* `k` *slots of* `nums`.

Do **not** allocate extra space for another array. You must do this by **modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with O(1) extra memory.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

**Constraints:**

- `1 <= nums.length <= 3 * 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`
- `nums` is sorted in **non-decreasing** order.

## Examples

```
Example 1:
  Input: nums = [1,1,1,2,2,3]
  Output: 5, nums = [1,1,2,2,3,_]
  Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).
```

```
Example 2:
  Input: nums = [0,0,1,1,1,1,2,3,3]
  Output: 7, nums = [0,0,1,1,2,3,3,_,_]
  Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).
```

## Approach
Use the two-pointer technique. Maintain a `write` pointer indicating the position to write the next allowed element. Start `write` at 2 because the first two elements are always allowed. Iterate `read` from index 2 onward; for each `nums[read]`, compare it with `nums[write-2]`. If they differ, the element can be kept and written at `write`, then increment `write`.

```text
FUNCTION removeDuplicates(nums):
    IF LENGTH(nums) <= 2:
        RETURN LENGTH(nums)
    SET write ← 2
    FOR read ← 2 TO LENGTH(nums) - 1:
        IF nums[read] != nums[write - 2]:
            SET nums[write] ← nums[read]
            SET write ← write + 1
    RETURN write
```

## Walkthrough
| Step | read index | nums[read] | nums[write-2] | Action | write after |
|------|------------|-----------|--------------|--------|------------|
| 1 | 2 | 1 | 1 | equal → skip | 2 |
| 2 | 3 | 2 | 1 | not equal → write 2 at idx2 | 3 |
| 3 | 4 | 2 | 1 | not equal → write 2 at idx3 | 4 |
| 4 | 5 | 3 | 2 | not equal → write 3 at idx4 | 5 |

Resulting array `[1,1,2,2,3]` with length 5.

## Complexity Analysis
- **Time:** O(N) where N is the length of `nums`.
- **Space:** O(1) extra space (in-place).

## Follow-Up Questions
1. How would you modify the algorithm to allow at most *k* duplicates for any k?
2. Can you solve the problem without modifying the input array (return a new array instead)?
3. How would you handle the case where the array is not sorted?

## Key Takeaway
Two-pointer scanning with a lag of two positions lets you enforce the “at most two duplicates” rule in a single pass and O(1) space.
