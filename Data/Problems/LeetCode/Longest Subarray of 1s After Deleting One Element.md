# 1493. Longest Subarray of 1s After Deleting One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs, Vk, Yandex

---

## 1. Problem Description

Delete exactly one element from a binary array. Return the longest subarray consisting solely of 1s.

---

## 2. Approach: Sliding Window — O(n) ✅

Maintain a window that contains at most one zero. The window size minus one (for the mandatory deletion) gives the candidate length.

```text
FUNCTION longestSubarray(nums):
    SET left ← 0
    SET zeros ← 0
    SET maxLen ← 0
    SET n ← LENGTH(nums)

    FOR right ← 0 TO n - 1:
        IF nums[right] == 0:
            SET zeros ← zeros + 1
        WHILE zeros > 1:
            IF nums[left] == 0:
                SET zeros ← zeros - 1
            SET left ← left + 1
        // window size is right - left + 1, but one element must be deleted
        SET maxLen ← MAX(maxLen, right - left)
    RETURN maxLen
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,1,0,1,1,1,0,1,1]` | `5` | Delete the zero at index 2; longest block of 1s becomes length 5. |
| `[0,0,0]` | `0` | After deleting one zero, no 1s remain. |
| `[1,1,1,1]` | `3` | Must delete one element, so longest remaining block is 3.

---

## 4. Walkthrough

Consider the first example `[1,1,0,1,1,1,0,1,1]`.

1. Initialise `left=0, zeros=0, maxLen=0`.
2. Expand `right` until the first zero at index 2 → `zeros=1`.
3. Window `[0..2]` size 3, `maxLen = 2` (`right-left = 2`).
4. Continue expanding; when second zero at index 6 appears, `zeros` becomes 2, trigger shrink:
   - Move `left` past first zero (index 2) → `zeros=1`, `left=3`.
5. Window now `[3..6]` size 4, `maxLen = max(2, 6-3)=3`.
6. Continue to end; the largest `right-left` observed is 5, which is the answer.

---

## 5. Complexity Analysis

- **Time:** Each element is visited at most twice (once by `right`, once by `left`) → **O(n)**.
- **Space:** Only constant extra variables → **O(1)**.

---

## 6. Follow‑Up Questions

1. How would the solution change if you could delete **at most** `k` zeros?
2. What if the array contained other values besides 0/1 and you needed the longest subarray of a given target value after one deletion?
3. Can you adapt the sliding‑window to return the actual subarray indices instead of just the length?

---

## 7. Key Takeaway

> Sliding window allowing at most 1 zero. Answer = `right - left` (not +1) because one element must be deleted.
