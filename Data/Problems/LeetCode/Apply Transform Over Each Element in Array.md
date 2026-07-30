# 2635. Apply Transform Over Each Element in Array

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an integer array `arr` and a function `fn` that takes an element value and its index, return a new array where each element is the result of applying `fn` to the corresponding element of `arr`.

## Examples
- **Input:** `arr = [1,2,3]`, `fn = (val, idx) => val * idx` **Output:** `[0,2,6]`
  *Explanation:* 1*0=0, 2*1=2, 3*2=6.
- **Input:** `arr = [5,10]`, `fn = (val, idx) => val + idx` **Output:** `[5,11]`
  *Explanation:* 5+0=5, 10+1=11.

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

## Follow‑Up Questions
1. How would you implement this lazily, generating elements on demand?
2. What if the transformation function can fail for some elements?
3. Can you perform the transformation in place without extra space?

## Key Takeaway
Mapping an array is a simple linear scan where each element is transformed independently using the provided function.
