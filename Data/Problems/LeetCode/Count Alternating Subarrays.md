# 3101. Count Alternating Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-alternating-subarrays](https://leetcode.com/problems/count-alternating-subarrays)
**Companies:** Capital One

---

## 1. Problem Description

You are given a binary array `nums`.

We call a subarray **alternating** if **no** two **adjacent** elements in the subarray have the **same** value.

Return *the number of alternating subarrays in* `nums`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

---

## 2. Key Insight

> Track the length of the current alternating run. Each position contributes `runLength` new alternating subarrays ending at that position.

---

## 3. Approach: Running Count — O(n) ✅

```text
FUNCTION countAlternatingSubarrays(nums):
    SET count ← 1
    SET result ← 1
    FOR i ← 1 TO len(nums) - 1:
        IF nums[i] != nums[i-1]:
            SET count ← count + 1
        ELSE:
            SET count ← 1
        SET result ← result + count
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Examples

```
Example 1:
  Input: nums = [0,1,1,1]
  Output: 5
  Explanation: The following subarrays are alternating: [0], [1], [1], [1], and [0,1].
  (For comparison, a fully alternating array of length 4 has 4 single-element subarrays, 3 of length 2, 2 of length 3, and 1 of length 4, totaling 10.)
```

```
Example 2:
  Input: nums = [1,0,1,0]
  Output: 10
  Explanation: Every subarray of the array is alternating. There are 10 possible subarrays that we can choose.
```

---

## Walkthrough

Consider Example 1 (`[1,0,1,0]`).
| Index | Value | `count` (run length) | `result` (total so far) |
|-------|-------|----------------------|------------------------|
| 0     | 1     | 1                    | 1                      |
| 1     | 0     | 2 (different)       | 3 (=1+2)                |
| 2     | 1     | 3 (different)       | 6 (=3+3)                |
| 3     | 0     | 4 (different)       | 10 (=6+4)               |
The final `result` equals 10, matching the expected output.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables are used.

---

## Follow-Up Questions

1. How would you modify the algorithm to count subarrays with at most `k` alternating segments?
2. Can you extend the solution to handle arrays with more than two distinct values where adjacent elements must differ?
3. What if you need to return the list of all alternating subarrays instead of just the count?

---

## Key Takeaway

> For contiguous subarray counting with a property, maintain a running length. An alternating run of length `k` contributes `k` new subarrays at each extension.
