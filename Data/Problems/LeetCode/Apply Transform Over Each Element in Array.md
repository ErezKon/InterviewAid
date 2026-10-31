# 2635. Apply Transform Over Each Element in Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/apply-transform-over-each-element-in-array](https://leetcode.com/problems/apply-transform-over-each-element-in-array)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an integer array `arr` and a mapping function `fn`, return a new array with a transformation applied to each element.

The returned array should be created such that `returnedArray[i] = fn(arr[i], i)`.

Please solve it without the built-in `Array.map` method.

**Constraints:**
- `0 <= arr.length <= 1000`
- `-10^9 <= arr[i] <= 10^9`
- `fn` returns an integer.

## Examples
```
Example 1:
  Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
  Output: [2,3,4]
  Explanation:
  const newArray = map(arr, plusone); // [2,3,4]
  The function increases each value in the array by one.
```
```
Example 2:
  Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
  Output: [1,3,5]
  Explanation: The function increases each value by the index it resides in.
```
```
Example 3:
  Input: arr = [10,20,30], fn = function constant() { return 42; }
  Output: [42,42,42]
  Explanation: The function always returns 42.
```

## Approach
Iterate over the array, apply the provided function to each element together with its index, and collect the results into a new array.

```text
FUNCTION mapArray(arr, fn):
    SET result ← []
    FOR i FROM 0 TO LENGTH(arr) - 1:
        SET transformed ← fn(arr[i], i)
        APPEND transformed TO result
    RETURN result
```

## Walkthrough
| i | arr[i] | fn(arr[i], i) | result |
|---|--------|---------------|--------|
| 0 | 1      | 1*0 = 0       | [0] |
| 1 | 2      | 2*1 = 2       | [0,2] |
| 2 | 3      | 3*2 = 6       | [0,2,6] |

## Complexity Analysis
- **Time:** O(n) – one pass over the array.
- **Space:** O(n) – space for the output array.

## Follow-Up Questions
1. How would you implement this lazily, generating elements on demand?
2. What if the transformation function can fail for some elements?
3. Can you perform the transformation in place without extra space?

## Key Takeaway
Mapping an array is a simple linear scan where each element is transformed independently using the provided function.
