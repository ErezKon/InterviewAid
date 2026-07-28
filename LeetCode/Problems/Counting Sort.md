# Counting Sort Pattern

---

## Problem Description
Counting sort is a non‑comparison sorting technique useful when the range of input values is limited (e.g., all numbers are between 0 and *k*). It counts the occurrences of each value and then reconstructs the sorted array in linear time.

## Examples
```text
Input: nums = [4,2,2,8,3,3,1], maxVal = 8
Output: [1,2,2,3,3,4,8]
Explanation: Count each value, then write them back in order.
```

## Approach
1. Create a count array of size *maxVal+1* initialized to zero.
2. Iterate over the input and increment the corresponding count.
3. Iterate over the count array, writing each value the number of times it appears back into the original array.

## Pseudocode
```text
FUNCTION countingSort(nums, maxVal):
    SET count ← array of (maxVal + 1) zeros
    FOR each num IN nums:
        SET count[num] ← count[num] + 1
    SET idx ← 0
    FOR val ← 0 TO maxVal:
        WHILE count[val] > 0:
            SET nums[idx] ← val
            SET idx ← idx + 1
            SET count[val] ← count[val] - 1
    RETURN nums
```

## Walkthrough
| Step | num processed | count array (partial) |
|------|---------------|-----------------------|
| 1    | 4             | count[4]=1            |
| 2    | 2             | count[2]=1            |
| 3    | 2             | count[2]=2            |
| ...  | ...           | ...                   |
| Reconstruct | – | Write values 1,2,2,3,3,4,8 back to `nums` |

## Complexity Analysis
- **Time:** O(n + k) where *n* is the number of elements and *k* = maxVal.
- **Space:** O(k) for the count array.

## Follow‑Up Questions
- How would you modify the algorithm to sort negative numbers?
- Can you make counting sort stable to preserve the relative order of equal elements?
- When is counting sort preferable to comparison‑based sorts like quicksort?

## Key Takeaway
When the value range is small relative to the input size, counting sort achieves linear time sorting by counting occurrences instead of comparing elements.
